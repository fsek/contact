Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }

  devise_scope :sessions do
    get 'users/check_auth' => "sessions_controller"
  end

  # All communication with the frontend (except authentication) should use this API
  namespace :api, constraints: { format: 'json' } do
    resources :conversations, only: :create
    resource :conversation, only: :show, controller: :conversations
    resources :messages, only: :create
    resources :admin_conversations, only: [:index, :show, :destroy] do
      resources :messages, only: :create, controller: :admin_messages
    end
    resource :users, only: [] do
      get 'check_auth'
    end
  end

  # Redirect all other paths to the frontend / react
  get '*path', to: 'pages#home'
  root to: 'pages#home'
end
