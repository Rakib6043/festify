class User < ApplicationRecord
  has_secure_password
  
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  before_save { self.email = email.downcase }
  
  # Find user by email (case insensitive)
  def self.find_by_email(email)
    find_by(email: email.downcase)
  end
end
