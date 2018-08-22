class ApplicationController < ActionController::Base
  protect_from_forgery
  prepend_view_path Rails.root.join("frontend")
end
