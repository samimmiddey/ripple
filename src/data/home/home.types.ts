import { ImageSourcePropType } from "react-native";

export interface SliderItem {
   id: string;
   img: ImageSourcePropType;
   name: string;
}

export interface ChatItem extends SliderItem {
   lastMessage: string;
   time: string;
   notificationCount: number;
}

export interface HomeData {
   title: string;
   slider: SliderItem[];
   chats: ChatItem[];
}