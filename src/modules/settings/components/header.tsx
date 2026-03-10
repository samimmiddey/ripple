import { Text } from '@/components/common/global-text'
import HeaderLayout from '@/components/layouts/header-layout'
import { settingsData } from '@/data/settings/settings.data'

const Header = () => {
   return (
      <HeaderLayout>
         <Text className="text-[24px] font-interSemiBold text-text-primary text-center">
            {settingsData.title}
         </Text>
      </HeaderLayout>
   )
}

export default Header