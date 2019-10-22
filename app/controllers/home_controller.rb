# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :piwik
  skip_before_action :store_current_location, only: :piwik
  # rubocop sees that as a hash ?!
  before_action :authenticate_user!, :except => %i(piwik) # rubocop:disable Style/HashSyntax
  before_action :set_initial_state_json, :except => %i(piwik)
  before_action :set_referrer_policy_header

  def index
    @body_classes = 'app-body'
  end

  def piwik
    piwik_user_id =  user_signed_in? ? current_user.id.to_s : ''
    render js: "<!-- Piwik -->
  var _paq = _paq || [];
  /* tracker methods like 'setCustomDimension' should be called before 'trackPageView' */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u='//" + ENV['PIWIK_DOMAIN'] + "/';
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '" + ENV['PIWIK_SITEID'] + "']);
    _paq.push(['setUserId', '" + piwik_user_id + "']);
    _paq.push(['trackVisibleContentImpressions']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
<!-- End Piwik Code -->"
  end

  private

  def authenticate_user!
    return if user_signed_in?

    matches = request.path.match(/\A\/web\/(statuses|accounts)\/([\d]+)\z/)

    if matches
      case matches[1]
      when 'statuses'
        status = Status.find_by(id: matches[2])

        if status&.distributable?
          redirect_to(ActivityPub::TagManager.instance.url_for(status))
          return
        end
      when 'accounts'
        account = Account.find_by(id: matches[2])

        if account
          redirect_to(ActivityPub::TagManager.instance.url_for(account))
          return
        end
      end
    end

    matches = request.path.match(%r{\A/web/timelines/tag/(?<tag>.+)\z})
    redirect_to(matches ? tag_path(CGI.unescape(matches[:tag])) : default_redirect_path)
  end

  def default_redirect_path
    if request.path.start_with?('/web') || whitelist_mode?
      new_user_session_path
    elsif single_user_mode?
      short_account_path(Account.local.without_suspended.where('id > 0').first)
    else
      about_path
    end
  end

  def set_referrer_policy_header
    response.headers['Referrer-Policy'] = 'origin'
  end
end
