# app/controllers/api/v1/festifies_controller.rb
class Api::V1::FestifiesController < ActionController::API
  # Sử dụng before_action để tìm và thiết lập @festify cho các action cần thiết
  # Điều này giúp tránh lặp lại code
  before_action :set_festify, only: [:show, :update, :destroy]

  # GET /api/v1/festifies
  # Action này sẽ lấy danh sách các festifies và hỗ trợ tìm kiếm
  def index
    if params[:keyword].present?
      # Nếu có từ khóa, tìm các bản ghi có title HOẶC description chứa từ khóa đó
      @festifies = Festify.where('title LIKE ? OR description LIKE ?', "%#{params[:keyword]}%", "%#{params[:keyword]}%")
    else
      # Nếu không có từ khóa, lấy tất cả bản ghi
      @festifies = Festify.all
    end

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
    if @festify.update(festify_params)
      render json: { status: 'SUCCESS', message: 'Cập nhật thành công', data: @festify }, status: :ok
    else
      render json: { status: 'ERROR', message: 'Không thể cập nhật', errors: @festify.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/festifies/:id
  # Xóa một festify
  def destroy
    @festify.destroy
    render json: { status: 'SUCCESS', message: 'Xóa thành công', data: @festify }, status: :ok
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
      :place_image
    )
  end
end