# config/initializers/datadog-tracer.rb
require 'ddtrace'


#Rails.configuration.datadog_trace = {
#  auto_instrument: true,
#  auto_instrument_redis: true,
#  default_service: 'my-rail-app'
#}

Datadog.configure do |c|
	  c.use :rails
	  c.use :redis
	  c.use :sidekiq
	  c.use :http
	  c.use :aws
end
