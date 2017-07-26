# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :piwik
  skip_before_action :store_current_location, only: :piwik
  # rubocop sees that as a hash ?!
  before_action :authenticate_user!, :except => %i(piwik) # rubocop:disable Style/HashSyntax
  before_action :set_initial_state_json, :except => %i(piwik)

  def index
    @body_classes = 'app-body'
  end

  def piwik
    piwik_user_id =  user_signed_in? ? current_user.id.to_s : ''
    render js: "<!-- Piwik -->
  var _paq = _paq || [];
  /* tracker methods like 'setCustomDimension' should be called before 'trackPageView' */
  _paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
  _paq.push(['setCookieDomain', '*." + ENV['LOCAL_DOMAIN'] + "']);
  _paq.push(['setDomains', ['*." + ENV['LOCAL_DOMAIN'] + "']]);
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
    redirect_to(single_user_mode? ? account_path(Account.first) : about_path) unless user_signed_in?
  end

  def set_initial_state_json
    serializable_resource = ActiveModelSerializers::SerializableResource.new(InitialStatePresenter.new(initial_state_params), serializer: InitialStateSerializer)
    @initial_state_json   = serializable_resource.to_json
  end

  def initial_state_params
    {
      settings: Web::Setting.find_by(user: current_user)&.data || {},
      push_subscription: current_account.user.web_push_subscription(current_session),
      current_account: current_account,
      token: current_session.token,
      admin: Account.find_local(Setting.site_contact_username),
      piwik_enabled: ENV.has_key?('PIWIK_DOMAIN') ? 'true' : 'false',
    }
  end
end
