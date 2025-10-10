
class ApplicationController < ActionController::API
  
  protected 

  # ログインしているユーザーを検索して返す（存在する場合）
  # この論理はsession-based authを使用する場合でも正しく動作します
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

  # ユーザーがログインしているかどうかを確認する
  def logged_in?
    current_user.present?
  end

  # ユーザーがログインする必要があることを要求するメソッド
  # redirectの代わりにJSONエラーを返すように修正済み
  def login_required
    unless logged_in?
      Rails.logger.warn "Unauthorized access attempt - user not logged in"
      render json: { status: 'ERROR', message: 'このセクションにアクセスするにはログインが必要です' }, status: :unauthorized
    end
  end
end