class Api::UsersController < Api::BaseController
  def check_auth
    if current_user.present?
      render json: { }, status: :ok
    else
      render json: { }, status: 401
    end
  end
end
