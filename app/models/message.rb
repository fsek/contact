class Message < ApplicationRecord
  belongs_to :user, required: false
  belongs_to :anon_user, required: false
  belongs_to :conversation

  attr_accessor :content

  validates :ciphertext, :iv, :salt, presence: true
end
