# app/controllers/api/v1/festifies_controller.rb
class Api::V1::FestifiesController < ApplicationController
  # Sử dụng before_action để tìm và thiết lập @festify cho các action cần thiết
  # Điều này giúp tránh lặp lại code
  before_action :set_festify, only: [:show, :update, :destroy]
  before_action :login_required, except: [:index, :show, :vote]

  # GET /api/v1/festifies
  # Action này sẽ lấy danh sách các festifies và hỗ trợ tìm kiếm
  def index
    @festifies = Festify.all
    @festifies = @festifies.search_by_keyword(params[:keyword])
    @festifies = @festifies.filter_by_grade(params[:grade])
    @festifies = @festifies.filter_by_department(params[:department])

    render json: @festifies
  end

  # GET /api/v1/festifies/:id
  # Hiển thị thông tin chi tiết của một festify
  def show
    render json: @festify
  end

  # POST /api/v1/festifies
  # Tạo một festify mới
  def create
    # Permission check
    unless current_user.admin? || (current_user.class_rep? && correct_class_rep_params?)
       return render json: { status: 'ERROR', message: 'You are not authorized to create this project' }, status: :forbidden
    end

    @festify = Festify.new(festify_params)

    if @festify.save
      render json: { status: 'SUCCESS', message: 'Tạo thành công', data: @festify }, status: :created
    else
      render json: { status: 'ERROR', message: 'Không thể tạo', errors: @festify.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/festifies/:id
  # Cập nhật một festify đã có
  def update
    # Permission check
    unless authorized_to_edit?(@festify)
       return render json: { status: 'ERROR', message: 'You are not authorized to edit this project' }, status: :forbidden
    end

    if @festify.update(festify_params)
      render json: { status: 'SUCCESS', message: 'Cập nhật thành công', data: @festify }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Không thể cập nhật', errors: @festify.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/festifies/:id
  # Xóa một festify
  def destroy
    # Permission check
    unless authorized_to_delete?(@festify)
       return render json: { status: 'ERROR', message: 'You are not authorized to delete this project' }, status: :forbidden
    end

    @festify.destroy
    render json: { status: 'SUCCESS', message: 'Xóa thành công', data: @festify }, status: :ok
  end

  # POST /api/v1/festifies/:id/vote
  def vote
    @festify = Festify.find(params[:id])
    @festify.increment!(:likes)
    render json: { status: 'SUCCESS', message: 'Voted successfully', data: @festify }, status: :ok
  end


  private # Các phương thức dưới đây là private

  # Phương thức này tìm festify dựa trên id từ URL
  def set_festify
    @festify = Festify.find(params[:id])
  end

  # Phương thức này định nghĩa các tham số (params) an toàn được phép nhận từ client
  def festify_params
    params.require(:festify).permit(
      :title,
      :description,
      :creator,
      :department,
      :grade,
      :place_text,
      :image1,
      :image2,
      :image3,
      :image3,
      :place_image,
      :likes,
      :map_x,
      :map_y
    )
  end

  # Check if class rep is creating for their own department/grade
  def correct_class_rep_params?
    return true if festify_params[:department] == current_user.department && festify_params[:grade].to_i == current_user.grade
    false
  end

  def authorized_to_edit?(festify)
    return true if current_user.admin?
    # Class Rep can only edit projects if they belong to their department/grade
    # OR if we assume the user created it (but we don't store creator_id yet, so we use dept/grade match + class_rep role)
    # Stricter: festify.department == current_user.department && festify.grade == current_user.grade
    return true if current_user.class_rep? && festify.department == current_user.department && festify.grade == current_user.grade
    false
  end

  def authorized_to_delete?(festify)
    # Only Admin can delete? Or Class Rep too? Let's say Admin only for safety, or Class Rep can delete their own.
    # Requirement says "Super Admin (manage all) and Class Representative (only edit their class's works)".
    # Usually Class Rep should be able to delete too if mistakes.
    authorized_to_edit?(festify)
  end
end