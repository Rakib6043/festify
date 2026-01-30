const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000"; // Backend Rails server URL

const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // To send session cookies
        body: JSON.stringify({
          session: {
            email: credentials.email,
            password: credentials.password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return { success: true };
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  // Check login status
  checkLoginStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logged_in`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to check login status");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user: userData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors ? data.errors[0] : "Registration failed");
      }
      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  // Update Profile
  updateProfile: async (userData) => {
    try {
      // For update we usually need user ID but current_user in backend handles it.
      // But API REST usually expects ID on URL. Our controller `update` uses `current_user`.
      // The route is `resources :users`, so it expects `/api/v1/users/:id`.
      // Wait, if I used `resources :users`, the update path is `PATCH /api/v1/users/:id`.
      // But my controller `update` uses `current_user`, ignoring the ID param effectively?
      // Or should I define a singular resource `resource :user`?
      // For simplicity, let's assume I pass the ID or just use a collection route? 
      // Actually standard Rails `resources` needs ID. 
      // Let's pass the ID.
      
      const response = await fetch(`${API_BASE_URL}/api/v1/users/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user: userData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors ? data.errors[0] : "Update failed");
      }
      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  }
};

export default authService;
