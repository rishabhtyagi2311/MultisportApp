
import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error("EXPO_PUBLIC_BACKEND_URL is not set in .env");
}

interface FootballProfileData {
  userId: number;
  role: string;
  nickname: string;
  experience: string;
}

class FootballService {
  async profileRegister(data: FootballProfileData) {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/football/profileRegister`, data);
      return response?.data ?? null;
    } catch (e) {
      console.error("Error in profileRegister:", e);
      return null;
    }
  }
}

export const footballService = new FootballService();
