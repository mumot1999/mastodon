# config/initializers/datadog-tracer.rb

Rails.configuration.datadog_trace = {
  auto_instrument: true,
  auto_instrument_redis: true,
  default_service: 'my-rail-app'
}

#Datadog.configure do |c|
#	  c.use :rails, options
#end
