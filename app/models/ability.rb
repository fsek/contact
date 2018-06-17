class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    # Permissions for everyone
    # None!! Don't use cancan for the public endpoints

    if user.present?
      # Permissions for signed in users
      can [:index, :show, :destroy], Conversation
      can [:create], Message
    end
  end
end
