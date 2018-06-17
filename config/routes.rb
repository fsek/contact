Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }

  # All communication with the frontend (except authentication) should use this API
  namespace :api, constraints: { format: 'json' } do
    resources :conversations, only: [:create, :show]
    resources :admin_conversations, only: [:index, :show, :destroy] do
      resources :messages, only: [:create]
    end
  end

  # Redirect all other paths to the frontend / react
  get '*path', to: 'pages#home'
  root to: 'pages#home'
end
