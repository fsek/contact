class Api::MessagesController < Api::BaseController
  def create
    anon_user = AnonUser.find_by!(reference: params[:reference])
    conversation = anon_user.conversation
    MessageService.anon_add_message(anon_user, conversation, params[:content], params[:password])

    render json: { }, status: :ok
  end
end
