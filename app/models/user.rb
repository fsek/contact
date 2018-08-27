class User < ApplicationRecord
  devise :database_authenticatable,
         :rememberable, :trackable, :validatable

  has_many :user_keys
  has_many :conversations, through: :user_keys

  before_create(:generate_keys)
  before_update(:update_keys)

  def get_private_key(password)
    CryptoService.symmetric_decrypt(password,
                                    private_key_salt,
                                    private_key_iv,
                                    encrypted_private_key)
  end

  def to_s
    email
  end

  private

  def generate_keys
    # Generate a public/private RSA key pair
    keys = CryptoService.generate_rsa

    # Encrypt the private key with the user password and a random salt + IV
    symmetric_output = CryptoService.symmetric_encrypt(password, keys.to_pem)

    # Store the public key, encrypted private key, salt and IV
    self.public_key = keys.public_key.to_pem
    self.encrypted_private_key = symmetric_output[:ciphertext]
    self.private_key_salt = symmetric_output[:salt]
    self.private_key_iv = symmetric_output[:iv]
  end

  def update_keys
    if password.present? && current_password.present?
      # Decrypt the private key with the old password
      private_key = CryptoService.symmetric_decrypt(current_password,
                                                    private_key_salt,
                                                    private_key_iv,
                                                    encrypted_private_key)

      # Encrypt the private key with the new password
      encrypted_data = CryptoService.symmetric_encrypt(password, private_key)

      # Store the encrypted private key, salt and IV
      self.encrypted_private_key = encrypted_data[:ciphertext]
      self.private_key_salt = encrypted_data[:salt]
      self.private_key_iv = encrypted_data[:iv]
    end
  end
end
