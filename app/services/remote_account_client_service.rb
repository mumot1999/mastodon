# frozen_string_literal: true

class RemoteAccountClientService < BaseService
  include JsonLdHelper

  ACCEPT_HEADER = 'application/activity+json, application/ld+json; profile="https://www.w3.org/ns/activitystreams", text/html;q=0.1'

  attr_reader :response_code

  def initialize(origin, token)
    @origin = origin
    @token = token
  end

  def call(url, verb, data = '')
    return if url.blank?

    res = process(url, verb, data)
    body_to_json(res.to_s)
  rescue HTTP::Error, OpenSSL::SSL::SSLError, Addressable::URI::InvalidURIError, Mastodon::HostValidationError, Mastodon::LengthValidationError => e
    Rails.logger.debug "Error fetching resource #{@url}: #{e}"
    nil
  end

  private

  def process(url, verb, data)
    @url = @origin + url

    r = ''
    # perform_request verb, data
    Request.new(verb, @url, 'body' => data).tap do |request|
      request.add_headers('Accept' => ACCEPT_HEADER)
      request.add_headers('Content-Type' => 'application/json')
      request.add_headers('Authorization' => 'Bearer ' + @token)
    end.perform do |res|
      # Doesnt work without puts (the return value is null)
      puts res
      r = res
    end
    r
  end

  def perform_request(verb, data)
    r = Request.new(verb, @url, 'body' => data).tap do |request|
      request.add_headers('Accept' => ACCEPT_HEADER)
      request.add_headers('Content-Type' => 'application/json')
      request.add_headers('Authorization' => 'Bearer ' + @token)
    end.perform
    r
  end
end
