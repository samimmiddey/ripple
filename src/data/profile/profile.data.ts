import { ProfileData } from "./profile.types";

export const profileData: ProfileData = {
   title: 'Profile',
   user: {
      fallbackImg: require('@/assets/images/user-fallback.png')
   },
   stats: [
      {
         title: 'Messages',
         count: 999,
         bgColor: '#155dfc15'
      },
      {
         title: 'Groups',
         count: 134,
         bgColor: '#00a63e15'
      },
      {
         title: 'Files',
         count: 124,
         bgColor: '#d0870015'
      }
   ],
   settings: {
      appearance: {
         header: 'Appearance',
         appearanceContent: {
            title: 'Dark Mode',
            bgColor: '#f54a0015',
            iconColor: '#f54a00'
         }
      },
      otherSettings: {
         header: 'Settings',
         notificationContent: {
            title: 'Notification',
            bgColor: '#ad46ff15',
            iconColor: '#ad46ff'
         },
         profileContent: {
            title: 'Profile',
            bgColor: '#00a63e15',
            iconColor: '#00a63e'
         }
      }
   }
}