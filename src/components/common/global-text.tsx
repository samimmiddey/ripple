import { cn } from "@/src/lib/cn";
import { Text as RNText, TextProps } from "react-native";

export function Text({ className, ...props }: TextProps) {
   return (
      <RNText
         {...props}
         className={cn("font-interRegular", className)}
      />
   );
}