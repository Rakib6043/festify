class SessionsController < ApplicationController
  def new
  end

  def create
    Rails.logger.info "=== LOGIN ATTEMPT ==="
    Rails.logger.info "Raw params: #{params.inspect}"
    
    # Hỗ trợ cả hai format: params[:session] và params trực tiếp
    email = params[:session]&.dig(:email) || params[:email]
    password = params[:session]&.dig(:password) || params[:password]
    
    Rails.logger.info "Extracted - Email: #{email}, Password present: #{password.present?}"
    
    if email.blank? || password.blank?
      Rails.logger.error "Missing email or password"
      render json: { status: 'error', message: 'メールアドレスとパスワードが必要です' }, status: :bad_request
      return
    end

    user = User.find_by_email(email)
    Rails.logger.info "User found: #{user.present?}"
    Rails.logger.info "User ID: #{user&.id}, User email: #{user&.email}" if user
    
    if user
      begin
        auth_result = user.authenticate(password)
        Rails.logger.info "Authentication result: #{auth_result.present?}"
        
        if auth_result
          session[:user_id] = user.id
          Rails.logger.info "Session set successfully: #{session[:user_id]}"
          
          user_data = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
            grade: user.grade
          }
          Rails.logger.info "Returning success response"
          render json: { status: 'success', message: 'ログインが成功しました', user: user_data }, status: :ok
        else
          Rails.logger.error "Password authentication failed for user: #{user.email}"
          render json: { status: 'error', message: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
        end
      rescue => e
        Rails.logger.error "Authentication error: #{e.message}"
        render json: { status: 'error', message: '認証中にエラーが発生しました' }, status: :internal_server_error
      end
    else
      Rails.logger.error "User not found for email: #{email}"
      render json: { status: 'error', message: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
    end
  rescue => e
    Rails.logger.error "Login controller error: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    render json: { status: 'error', message: 'サーバーエラーが発生しました' }, status: :internal_server_error
  end

  def is_logged_in?
    Rails.logger.info "=== CHECK LOGIN STATUS ==="
    Rails.logger.info "Session user_id: #{session[:user_id]}"
    Rails.logger.info "Current user present: #{current_user.present?}"
    
    if logged_in? && current_user
      user_data = {
        id: current_user.id,
        email: current_user.email,
        name: current_user.name,
        role: current_user.role,
        department: current_user.department,
        grade: current_user.grade
      }
      Rails.logger.info "User is logged in: #{current_user.email}"
      render json: { logged_in: true, user: user_data }
    else
      Rails.logger.info "User is not logged in"
      render json: { logged_in: false }
    end
  end

  def destroy
    Rails.logger.info "=== LOGOUT ATTEMPT ==="
    Rails.logger.info "Current session user_id: #{session[:user_id]}"
    
    session.delete(:user_id)
    @current_user = nil
    
    Rails.logger.info "Session cleared successfully"
    render json: { status: 'success', message: 'ログアウトが成功しました' }, status: :ok
  end
end
