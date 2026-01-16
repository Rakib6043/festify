
puts "=== Setting up Users ==="

# 1. Admin User
admin = User.find_or_initialize_by(email: "admin@festify.com")
admin.name = "Admin User"
if admin.new_record?
  admin.password = "password"
  admin.password_confirmation = "password"
end
admin.role = "admin"
# Admin might not need department/grade, or we can set dummy values if validtions require it
# Based on schema, they are nullable.

if admin.save
  puts "------------------------------------------------"
  puts "✅ Admin Account Ready"
  puts "   Email:    admin@festify.com"
  puts "   Password: password"
else
  puts "❌ Failed to create Admin: #{admin.errors.full_messages}"
end

# 2. Class Rep User (Standard User)
user = User.find_or_initialize_by(email: "user@festify.com")
user.name = "Class Rep"
if user.new_record?
  user.password = "password"
  user.password_confirmation = "password"
end
user.role = "class_rep"
user.department = "デザイン科" # Design Dept
user.grade = 2

if user.save
  puts "------------------------------------------------"
  puts "✅ User Account Ready (Class Rep)"
  puts "   Email:    user@festify.com"
  puts "   Password: password"
  puts "   Info:     Design Dept / Grade 2"
else
  puts "❌ Failed to create User: #{user.errors.full_messages}"
end

puts "------------------------------------------------"
