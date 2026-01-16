module Api
  module V1
    class UsersController < ApplicationController
      # Allow registration without login, but update requires login
      before_action :login_required, only: [:update, :show]

      def create
        @user = User.new(user_params)
        # Default role for public registration is 'class_rep' or just empty if logic requires. 
        # But per previous context, maybe 'class_rep' or just visitor.
        # Let's default to a basic role or let them pick if we want to support 'class_rep' registration.
        # For safety, let's just create them. If no role is provided, model defaults? 
        # User model doesn't seem to have default. 
        # Let's assign 'class_rep' if they provide department/grade, else maybe 'guest'?
        # But the User model defines ROLES = %w[admin class_rep].
        # Let's default to 'class_rep' for now as the app seems school focused.
        
        @user.role ||= 'class_rep'

        if @user.save
          login(@user) # Log them in immediately
          render json: {
            logged_in: true,
            user: @user.as_json(only: [:id, :name, :email, :role, :department, :grade])
          }, status: :created
        else
          render json: {
            status: 500,
            errors: @user.errors.full_messages
          }, status: :internal_server_error
        end
      end

      def update
        if current_user.update(user_params)
          render json: {
            status: :created,
            user: current_user.as_json(only: [:id, :name, :email, :role, :department, :grade])
          }
        else
          render json: {
            status: 500,
            errors: current_user.errors.full_messages
          }, status: :internal_server_error
        end
      end

      def show
        render json: {
          user: current_user.as_json(only: [:id, :name, :email, :role, :department, :grade])
        }
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :department, :grade)
      end
    end
  end
end
