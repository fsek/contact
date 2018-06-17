class Conversation < ApplicationRecord
  has_one :user_key
  has_one :anon_user
  has_one :user, through: :user_key

  has_many :messages
end
