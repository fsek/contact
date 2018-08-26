class SessionData
  KEY_BASE = 'SESS_'.freeze

  def self.redis
    @redis ||= ::Redis.new(url: RedisConfig[:url])
  end

  def self.store_private_key(private_key)
    # Encrypt the private key with a random password and a unique, random reference.
    # Return the password and the reference, which are to be stored in the user's session cookie
    password = CryptoService.random_url_safe

    # Encrypt the private key and convert the output to JSON
    # Note: We must convert the data to Base64 before we can convert it to JSON
    symmetric_output = CryptoService.symmetric_encrypt(password, private_key)
    data = symmetric_output.transform_values { |v| Base64.encode64(v) }.to_json

    # Generate a new reference and store the data in Redis
    reference = loop do
      reference = CryptoService.random_url_safe
      break reference if redis.setnx(KEY_BASE + reference, data)
    end

    expires = 2.hours.from_now.to_i
    redis.expireat(KEY_BASE + reference, expires)

    # Return the reference and password
    { reference: reference, password: password }
  end

  def self.get_private_key(reference, password)
    # Get the data from Redis
    jsonData = redis.get(KEY_BASE + reference)
    data = JSON.parse(jsonData, symbolize_names: true)

    # Decrypt the private key
    CryptoService.symmetric_decrypt(password,
                                    Base64.decode64(data[:salt]),
                                    Base64.decode64(data[:iv]),
                                    Base64.decode64(data[:ciphertext]))
  end

  def self.remove_private_key(reference)
    unless reference.present?
      return
    end

    redis.del(reference)
  end
end
