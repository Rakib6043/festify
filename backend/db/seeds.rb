puts "=== Seeding Users ==="

# 1. Admin User
admin = User.find_or_initialize_by(email: "admin@festify.com")
admin.name = "Admin User"
if admin.new_record?
  admin.password = "password"
  admin.password_confirmation = "password"
end
admin.role = "admin"
admin.save!

puts "✅ Admin Account: admin@festify.com / password"

# 2. Class Rep User (Design Dept, Grade 2)
user = User.find_or_initialize_by(email: "user@festify.com")
user.name = "Class Rep User"
if user.new_record?
  user.password = "password"
  user.password_confirmation = "password"
end
user.role = "class_rep"
user.department = "デザイン科"
user.grade = 2
user.save!

puts "✅ User Account: user@festify.com / password"
puts "=== Seeding Completed ==="
