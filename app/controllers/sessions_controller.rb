class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  skip_before_action :require_no_authentication

  def create
    @user = User.find_by_email(user_params[:email])
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
      bypass_sign_in @user

      # We must store the private key (encrypted of course) in Redis,
      # because it can't fit in the session cookie. We can however
      # store a reference to the redis row in the session cookie +
      # a password that will decrypt the secret key
      session_data = SessionData.store_private_key(@user.get_private_key(user_params[:password]))
      session[:private_key_reference] = session_data[:reference]
      session[:private_key_password] = session_data[:password]

      render json: {email: @user.email}
    else
      invalid_login_attempt
    end
  end

  def destroy
    sign_out(@user)

    SessionData.remove_private_key(session[:private_key_reference])
    session[:private_key_reference] = nil
    session[:private_key_password] = nil

    render json: { success: true }
  end

  def check_auth
    if current_user.present?
      render json: { }, status: :ok
    else
      render json: { }, status: 401
    end
  end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: { error: 'Invalid credentials' }, status: :unprocessable_entity
  end

  def user_params
     params.require(:user).permit(:email, :password)
  end

end
