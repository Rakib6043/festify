# Festify - Festival Management System

A full-stack web application for managing festival artworks and exhibitions, built with Ruby on Rails API backend and React frontend.

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Creating User Accounts](#creating-user-accounts)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## 🛠 Technology Stack

### Backend

- **Ruby**: 3.1.7
- **Rails**: 8.0.2 (API mode)
- **Database**: SQLite3
- **Authentication**: BCrypt (session-based)

### Frontend

- **React**: 19.1.0
- **React Router DOM**: 7.9.4
- **Styling**: CSS3 with custom design system
- **HTTP Client**: Fetch API

## ✨ Features

- 🔐 **User Authentication**: Secure login/logout with session management
- 🎨 **Festival Artwork Management**: Full CRUD operations for artworks
- 👥 **User View**: Browse and search festival artworks
- 🛡️ **Admin Panel**: Manage all artworks with table view
- 📝 **Rich Information**: Support for multiple images, descriptions, locations
- 🔍 **Search Functionality**: Search by title or description
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Custom Theme**: Pink accent (#e91e63) with beige backgrounds

## 📦 Prerequisites

- Ruby 3.1.7 or higher
- Node.js 14.x or higher
- npm or yarn
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Rakib6043/festify.git
cd festify
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
bundle install

# Setup database
rails db:create
rails db:migrate
rails db:seed
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## 💾 Database Setup

The application uses SQLite3 with two main tables:

### Users Table

- `email` (string, unique)
- `name` (string)
- `password_digest` (string, encrypted with BCrypt)

### Festifies Table

- `title` (string) - Artwork title
- `description` (text) - Artwork description
- `creator` (string) - Creator name
- `department` (string) - Department (デザイン科 / IT 科)
- `grade` (integer) - Grade level (1-3)
- `place_text` (string) - Exhibition location text
- `image1`, `image2`, `image3` (string) - Artwork image URLs
- `place_image` (string) - Location image URL

### Run Migrations

```bash
cd backend
rails db:migrate
```

## � User Accounts

The system comes with a seeding script to create default accounts.

Run the seed command:

```bash
cd backend
rails db:seed
```

This will create (or ensure exist) the following accounts:

### 1. Admin Account (Administrator)

- **Role:** `admin`
- **Email:** `admin@festify.com`
- **Password:** `password`
- **Permissions:** Full access to manage all artworks, edit, delete, and view system status.

### 2. User Account (Class Representative)

- **Role:** `class_rep`
- **Email:** `user@festify.com`
- **Password:** `password`
- **Department:** デザイン科 (Design Dept)
- **Grade:** 2
- **Permissions:** Can create new artworks for their class. Can edit artworks belonging to their specific Department and Grade.

_Note: You can run `rails db:seed` multiple times safely. It will not duplicate accounts._

## 🚀 Running the Application

````ruby
# List all users
User.all

# Find specific user
User.find_by(email: 'user@example.com')

# Check total users


### Password Requirements

- Minimum 6 characters
- Stored securely with BCrypt encryption
- No special character requirements

## 🏃 Running the Application

### Start Backend Server (Port 3000)

```bash
cd backend
rails server
# or
rails s
````

Backend will be available at: `http://localhost:3000`

### Start Frontend Development Server (Port 3001)

```bash
cd frontend
npm start
```

When prompted about port 3000 being in use, type **`y`** to use port 3001.

Frontend will be available at: `http://localhost:3001`

### Login Credentials

Use the accounts you created in the console:

- **Email**: admin@festify.com
- **Password**: admin123

## 🌐 API Endpoints

### Authentication

- `POST /login` - User login
- `DELETE /logout` - User logout
- `GET /logged_in` - Check login status

### Festifies (Artworks)

- `GET /api/v1/festifies` - Get all festifies
- `GET /api/v1/festifies?keyword=search` - Search festifies
- `GET /api/v1/festifies/:id` - Get single festify
- `POST /api/v1/festifies` - Create festify
- `PATCH /api/v1/festifies/:id` - Update festify
- `DELETE /api/v1/festifies/:id` - Delete festify

### Example API Request

```bash
# Get all festifies
curl http://localhost:3000/api/v1/festifies

# Search festifies
curl "http://localhost:3000/api/v1/festifies?keyword=game"

# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"session":{"email":"admin@festify.com","password":"admin123"}}'
```

## 📁 Project Structure

```
festify/
├── backend/                 # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── application_controller.rb
│   │   │   ├── sessions_controller.rb
│   │   │   └── api/v1/
│   │   │       └── festifies_controller.rb
│   │   └── models/
│   │       ├── user.rb
│   │       └── festify.rb
│   ├── config/
│   │   ├── routes.rb
│   │   ├── database.yml
│   │   └── initializers/cors.rb
│   ├── db/
│   │   ├── migrate/
│   │   └── schema.rb
│   └── Gemfile
│
└── frontend/                # React App
    ├── public/
    │   ├── adminList_dug/   # Original HTML templates
    │   ├── details html css/
    │   └── html_css_okamoto/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── FestifyList.js
    │   │   ├── AdminFestify.js
    │   │   ├── AdminFestifyList.js
    │   │   ├── AdminFestifyEdit.js
    │   │   └── FestifyDetails.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── festifyService.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🎨 User Interface

### Pages Overview

1. **Login Page** (`/`)
   - Email and password authentication
   - Japanese language UI
   - Error handling with user feedback

2. **Dashboard** (after login)
   - User information display
   - Quick action buttons
   - Navigation to other features

3. **Festify List** (User View)
   - Grid layout of all artworks
   - Search functionality
   - Detail modal popup
   - Responsive cards

4. **Admin Panel**
   - Table view with all fields
   - Edit/Delete operations
   - Add new artwork
   - Image preview

5. **Edit/Create Form**
   - Text inputs for title, creator, description
   - Radio buttons for department and grade
   - Image URL inputs with live preview
   - Form validation

6. **Detail View**
   - Full artwork information
   - All images displayed
   - Location details
   - Delete option

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
rails s -p 3001
```

### CORS Issues

Make sure `config/initializers/cors.rb` has:

```ruby
origins 'http://localhost:3001'
credentials: true
```

### Database Issues

```bash
# Reset database
rails db:drop
rails db:create
rails db:migrate
rails db:seed
```

### Authentication Issues

1. Check if cookies are enabled in browser
2. Verify backend is running on port 3000
3. Check CORS configuration
4. Clear browser cookies and try again

### Image Not Saving

- Ensure Rails controller permits image parameters
- Check `festifies_controller.rb` has `:image1, :image2, :image3, :place_image` in `festify_params`
- Restart Rails server after code changes

### Node Modules Issues

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Common Commands

```bash
# Backend
rails console              # Open Rails console
rails db:migrate          # Run migrations
rails db:seed             # Run seeds
rails routes              # View all routes
rails db:reset            # Drop, create, migrate, seed

# Frontend
npm start                 # Start dev server
npm run build            # Build for production
npm test                 # Run tests

# Git
git add .
git commit -m "message"
git push origin main
```

## 🔐 Security Notes

- Passwords are encrypted with BCrypt
- Session-based authentication with HTTP-only cookies
- CORS configured for localhost development
- Strong parameters prevent mass assignment vulnerabilities

## 📄 License

This project is created for educational purposes.

## 👥 Contributors

- **Rakib** - Initial development
- **Contributors** - Various HTML/CSS templates

## 🆘 Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review Rails logs: `backend/log/development.log`
3. Check browser console for frontend errors
4. Create an issue on GitHub

---

**Happy Coding! 🎉**
