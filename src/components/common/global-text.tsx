import { cn } from "@/lib/cn";
import { Text as RNText, TextProps } from "react-native";

export function Text({ className, ...props }: TextProps) {
   return (
      <RNText
         {...props}
         className={cn("font-interRegular text-text-primary", className)}
      />
   );
}