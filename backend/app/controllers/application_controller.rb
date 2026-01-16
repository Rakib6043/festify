
class ApplicationController < ActionController::API
  
  protected 

  # Find and return the currently logged in user (if exists)
  # This logic works correctly when using session-based auth
  def current_user
    return @current_user if defined?(@current_user)
    
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
      Rails.logger.debug "Current user from session: #{@current_user&.email || 'none'}"
    else
      @current_user = nil
      Rails.logger.debug "No session user_id found"
    end
    
    @current_user
  end

  # Check if user is logged in
  def logged_in?
    current_user.present?
  end

  # Method to require user to be logged in
  # Modified to return JSON error instead of redirect
  def login_required
    unless logged_in?
      Rails.logger.warn "Unauthorized access attempt - user not logged in"
      render json: { status: 'ERROR', message: 'このセクションにアクセスするにはログインが必要です' }, status: :unauthorized
    end
  end


  # Log in the user
  def login(user)
    session[:user_id] = user.id
  end
end