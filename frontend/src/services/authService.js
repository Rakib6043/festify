const API_BASE_URL = "http://localhost:3000"; // Backend Rails server URL

const authService = {
  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Để gửi cookies session
        body: JSON.stringify({
          session: {
            email: credentials.email,
            password: credentials.password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ログインに失敗しました");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "ネットワークエラーが発生しました");
    }
  },

  // Đăng xuất
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
        throw new Error("ログアウトに失敗しました");
      }

      return { success: true };
    } catch (error) {
      throw new Error(error.message || "ネットワークエラーが発生しました");
    }
  },

  // Kiểm tra trạng thái đăng nhập
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
        throw new Error("ログイン状態の確認に失敗しました");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "ネットワークエラーが発生しました");
    }
  },
};

export default authService;
