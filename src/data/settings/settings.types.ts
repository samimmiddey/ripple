import { ImageSourcePropType } from "react-native";

export interface StatItem {
   title: string;
   count: number;
   bgColor: string;
}

export interface SettingsItem {
   title: string;
   bgColor: string;
   iconColor: string;
}

export interface SettingsData {
   title: string;
   user: {
      fallbackImg: ImageSourcePropType;
   };
   stats: StatItem[];
   settings: {
      appearance: {
         header: string;
         appearanceContent: SettingsItem;
      },
      otherSettings: {
         header: string;
         notificationContent: SettingsItem;
         profileContent: SettingsItem;
      }
   }
}