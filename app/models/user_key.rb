class UserKey < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  attr_accessor :key
  before_create(:encrypt_key)

  private

  def encrypt_key
    self.encrypted_key = CryptoService.public_encrypt(user.public_key, key)
  end
end
