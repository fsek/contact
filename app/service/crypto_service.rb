module CryptoService
  def self.generate_rsa
    OpenSSL::PKey::RSA.generate(4096)
  end

  def self.public_encrypt(public_key, plaintext)
    OpenSSL::PKey::RSA.new(public_key).public_encrypt(plaintext)
  end

  def self.private_decrypt(private_key, ciphertext)
    OpenSSL::PKey::RSA.new(private_key).private_decrypt(ciphertext)
  end

  def self.random_password
    OpenSSL::Random.random_bytes(32)
  end

  def self.random_url_safe
    SecureRandom.urlsafe_base64(32)
  end

  def self.symmetric_encrypt(password, plaintext)
    cipher = OpenSSL::Cipher::AES256.new(:CBC)
    cipher.encrypt
    iv = cipher.random_iv

    # Generate key
    salt = OpenSSL::Random.random_bytes(32) if salt.nil?
    iter = 20000
    key_len = 32
    cipher.key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(password, salt, iter, key_len)

    ciphertext = cipher.update(plaintext) + cipher.final

    { ciphertext: ciphertext, iv: iv, salt: salt }
  end

  def self.symmetric_decrypt(password, salt, iv, ciphertext)
    cipher = OpenSSL::Cipher::AES256.new(:CBC)
    cipher.decrypt
    cipher.iv = iv

    # Generate key
    iter = 20000
    key_len = 32
    cipher.key = OpenSSL::PKCS5.pbkdf2_hmac_sha1(password, salt, iter, key_len)

    # Decrypt
    plaintext = cipher.update(ciphertext) + cipher.final
    plaintext.force_encoding('utf-8')
  end
end
