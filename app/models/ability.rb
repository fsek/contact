class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    # Permissions for everyone

    if user.present?
      # Permissions for signed in users
      can :index, :test
    end
  end
end
