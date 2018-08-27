class Api::AdminMessagesController < Api::BaseController
  authorize_resource :conversation, parent: true
  authorize_resource :message, parent: false

  def create
    reference = session[:private_key_reference]
    password = session[:private_key_password]
    private_key = SessionData.get_private_key(reference, password)

    conversation = current_user.conversations.find(params[:admin_conversation_id])
    MessageService.user_add_message(current_user, conversation, params[:content], private_key)

    render json: { }, status: :ok
  end
end
