// API service for festify operations
const API_BASE_URL = "http://localhost:3000/api/v1";

const festifyService = {
  // Get all festifies
  getAllFestifies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch festifies");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get all festifies error:", error);
      throw error;
    }
  },

  // Get single festify by ID
  getFestifyById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch festify");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get festify error:", error);
      throw error;
    }
  },

  // Search festifies by keyword
  // Search festifies with filters
  searchFestifies: async ({ keyword, grade, department }) => {
    try {
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (grade) params.append("grade", grade);
      if (department) params.append("department", department);

      const response = await fetch(
        `${API_BASE_URL}/festifies?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search festifies");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Search festifies error:", error);
      throw error;
    }
  },

  // Vote for a festify
  voteFestify: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies/${id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to vote");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Vote error:", error);
      throw error;
    }
  },

  // Create new festify
  createFestify: async (festifyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ festify: festifyData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create festify");
      }

      return data;
    } catch (error) {
      console.error("Create festify error:", error);
      throw error;
    }
  },

  // Update festify
  updateFestify: async (id, festifyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ festify: festifyData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update festify");
      }

      return data;
    } catch (error) {
      console.error("Update festify error:", error);
      throw error;
    }
  },

  // Delete festify
  deleteFestify: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/festifies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete festify");
      }

      return data;
    } catch (error) {
      console.error("Delete festify error:", error);
      throw error;
    }
  },
};

export default festifyService;
