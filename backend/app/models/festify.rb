class Festify < ApplicationRecord
  scope :filter_by_grade, -> (grade) { where(grade: grade) if grade.present? }
  scope :filter_by_department, -> (department) { where(department: department) if department.present? }
  scope :search_by_keyword, -> (keyword) { where('title LIKE ? OR description LIKE ?', "%#{keyword}%", "%#{keyword}%") if keyword.present? }
end
