import { Text } from '@/components/common/global-text'
import HeaderLayout from '@/components/layouts/header-layout'
import { exploreData } from '@/data/explore/explore.data'

const Header = () => {
    return (
        <HeaderLayout>
            <Text className="text-[24px] font-interSemiBold text-text-primary text-center">
                {exploreData.title}
            </Text>
        </HeaderLayout>
    )
}

export default Header