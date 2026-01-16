Rails.application.routes.draw do
  
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  namespace :api do
    namespace :v1 do
      # This automatically creates all RESTful routes for Festify
      # GET    /api/v1/festifies
      # POST   /api/v1/festifies
      # GET    /api/v1/festifies/:id
      # PATCH  /api/v1/festifies/:id
      # DELETE /api/v1/festifies/:id
      resources :festifies do
        member do
          post 'vote'
        end
      end
      resources :stats, only: [:index]
      resources :users, only: [:create, :update, :show]
    end
  end
    
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
