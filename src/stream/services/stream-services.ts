import apiClient from "@/lib/axios-instance"
import axios from "axios"

export const syncUserToStream = async (userId: string, name: string, image: string): Promise<boolean> => {
   try {
      await apiClient.post('/api/sync-user', { userId, name, image })
      return true
   } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
         throw error
      }

      throw new Error("Failed to sync user to stream")
   }
}

export const streamTokenProvider = async (userId: string): Promise<string> => {
   try {
      const res = await apiClient.post('/api/token', { userId })
      return res.data.token;
   } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
         throw error
      }

      throw new Error("Failed to fetch stream token")
   }
}