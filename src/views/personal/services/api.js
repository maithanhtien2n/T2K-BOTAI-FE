import { AxiosInstance } from "@/services/api";

class ApiPersonal {
  getUserInfo = async (params, noLoading = false) => {
    return await AxiosInstance({
      method: "GET",
      url: `user/${params}`,
      noLoading,
    });
  };

  saveUserInfo = async (params, args) => {
    return await AxiosInstance({
      method: "PUT",
      url: `user?userId=${params}`,
      data: args,
    });
  };
}

export const API_PERSONAL = new ApiPersonal();
