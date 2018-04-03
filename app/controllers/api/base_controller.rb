class Api::BaseController < ApplicationController
  rescue_from CanCan::AccessDenied do
    render(json: { success: false, errors: ['Unauthorized!'] }, status: 401)
  end
end
