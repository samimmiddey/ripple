import { AppContext } from "@/stream/context/app-context";
import { useContext } from "react";

const useAppContext = () => {
   const context = useContext(AppContext);

   if (!context) {
      throw new Error("useAppContext must be used within a AppProvider");
   }

   return context;
}

export default useAppContext;