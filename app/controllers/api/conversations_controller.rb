class Api::ConversationsController < Api::BaseController
  def create
    user = User.find(params[:user_id])
    @result = MessageService.new_conversation(user, params[:message])

    render json: @result, status: :ok
  end

  def show
    anon_user = AnonUser.find_by!(reference: params[:reference])
    conversation = anon_user.conversation
    @messages = MessageService.get_messages_for_anon(anon_user, conversation, params[:password])

    render json: @messages, status: :ok
  end
end
