import { Text } from '@/components/common/global-text'
import HeaderLayout from '@/components/layouts/header-layout'
import { profileData } from '@/data/profile/profile.data'

const Header = () => {
   return (
      <HeaderLayout>
         <Text className="text-[24px] font-interSemiBold text-text-primary text-center">
            {profileData.title}
         </Text>
      </HeaderLayout>
   )
}

export default Header