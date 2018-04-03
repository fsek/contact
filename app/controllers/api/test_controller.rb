class Api::TestController < Api::BaseController
  authorize_resource class: false

  def index
    render json: { success: true, status: 200, data: 'Hej'}
  end
end
