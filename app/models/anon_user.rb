class AnonUser < ApplicationRecord
  belongs_to :conversation

  attr_accessor :conversation_key
  attr_accessor :password

  before_create(:generate_keys)

  private

  def generate_keys
    # Generate a public/private RSA key pair
    keys = CryptoService.generate_rsa

    # Generate an URL safe reference
    self.reference = CryptoService.random_url_safe

    # Generate an URL safe password
    self.password = CryptoService.random_url_safe

    # Encrypt the private key with the user password and a random salt + IV
    symmetric_output = CryptoService.symmetric_encrypt(password, keys.to_pem)

    # Store the public key, encrypted private key, salt and IV
    # Note: The keys can't be saved as is. Use Base64 encoding instead
    self.public_key = keys.public_key.to_pem
    self.encrypted_private_key = symmetric_output[:ciphertext]
    self.private_key_salt = symmetric_output[:salt]
    self.private_key_iv = symmetric_output[:iv]

    # Encrypt the conversation key
    self.encrypted_conversation_key = keys.public_encrypt(conversation_key)
  end
end
