class Api::AdminConversationsController < Api::BaseController
  authorize_resource :conversation, parent: false

  def index
    @conversations = current_user.conversations.by_date

    render json: @conversations, status: :ok
  end

  def show
    reference = session[:private_key_reference]
    password = session[:private_key_password]
    private_key = SessionData.get_private_key(reference, password)

    conversation = current_user.conversations.find(params[:id])
    @messages = MessageService.get_messages_for_user(current_user, conversation, private_key)

    render json: @messages, status: :ok
  end

  def destroy
    conversation = current_user.conversations.find(params[:id])

    if conversation.destroy
      render json: {}, status: :ok
    else
      render json: { error: 'Failed to destroy conversation' }, status: 500
    end
  end
end
