module RedisConfig
  # Read a value from redis.yml
  def self.[](key)
    unless @config
      template = ERB.new(File.read(Rails.root + 'config/redis.yml'))
      @config = YAML.load(template.result(binding))[Rails.env].symbolize_keys
    end

    @config[key]
  end
end
