import { View } from 'react-native';
import { Text } from './global-text';

interface Props {
    children: React.ReactNode
    title: string;
    body: string;
}

const ListEmptyText = ({ children, title, body }: Props) => {
    return (
        <View className='flex-1 items-center justify-center gap-2'>
            {children}
            <Text className='text-text-primary text-xl font-interSemiBold mt-2'>{title}</Text>
            <Text className='text-text-secondary'>{body}</Text>
        </View>
    )
}

export default ListEmptyText