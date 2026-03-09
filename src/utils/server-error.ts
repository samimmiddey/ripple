import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export default function serverError(error: unknown) {
   let errorMsg = "Something went wrong!";

   if (error instanceof AxiosError) {
      const status = error.response?.status;

      // Specific status handling
      if (status === 204) {
         errorMsg = "Content not found!";
      } else {
         const data = error.response?.data;
         if (data && typeof data === "object") {
            errorMsg =
               (typeof data.title === "string" && data.title) ||
               (typeof data.message === "string" && data.message) ||
               errorMsg;
         }
      }
   }

   Toast.show({
      type: "error",
      text1: "Error",
      text2: errorMsg,
   });
}