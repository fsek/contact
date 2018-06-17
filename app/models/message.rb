class Message < ApplicationRecord
  belongs_to :user, required: false
  belongs_to :anon_user, required: false
  belongs_to :conversation

  validates :ciphertext, :iv, :salt, presence: true
end
