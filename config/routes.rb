Rails.application.routes.draw do
  # Allow sign in through regular devise POST and DELETE
  devise_for :users, skip: :all
  devise_scope :user do
    post 'devise/sign_in', to: 'devise/sessions/#create'
    delete 'devise/sign_out', to: 'devise/sessions#destroy'
  end

  # All communication with the frontend should use this API
  namespace :api, constraints: { format: 'json' } do
    resources :test, only: :index
  end

  # Redirect all other paths to the frontend / react
  get '*path', to: 'pages#home'
  root to: 'pages#home'
end
