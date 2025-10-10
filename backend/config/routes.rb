Rails.application.routes.draw do
  
  post '/login',    to: 'login#create'
  delete '/logout', to: 'login#destroy'
  get '/logged_in', to: 'login#status'

  namespace :api do
    namespace :v1 do
      # Lệnh này tự động tạo ra tất cả các route RESTful chuẩn cho Festify
      # GET    /api/v1/festifies
      # POST   /api/v1/festifies
      # GET    /api/v1/festifies/:id
      # PATCH  /api/v1/festifies/:id
      # DELETE /api/v1/festifies/:id
      resources :festifies
    end
  end
    
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
