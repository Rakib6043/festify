class Api::V1::StatsController < ActionController::API
  def index
    total_projects = Festify.count
    by_department = Festify.group(:department).count
    total_likes = Festify.sum(:likes)

    render json: {
      status: 'SUCCESS',
      data: {
        total_projects: total_projects,
        by_department: by_department,
        total_likes: total_likes
      }
    }, status: :ok
  end
end
