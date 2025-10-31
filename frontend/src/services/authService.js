const API_BASE_URL = "http://localhost:3000"; // Backend Rails server URL

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
};

export default authService;
