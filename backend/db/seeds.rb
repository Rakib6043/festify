# Admin User
User.create!(
  name: "Admin User",
  email: "admin@festify.com",
  password: "password",
  password_confirmation: "password",
  role: "admin"
)

# Class Rep User (Design Dept, Grade 2)
User.create!(
  name: "Class Rep User",
  email: "user@festify.com",
  password: "password",
  password_confirmation: "password",
  role: "class_rep",
  department: "デザイン科",
  grade: 2
)

puts "Seeding executed successfully. Created admin@festify.com and user@festify.com with password 'password'."
