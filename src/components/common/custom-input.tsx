import { cn } from '@/lib/cn'
import { TextInput, TextInputProps } from 'react-native'

interface PropsType extends TextInputProps {
   value: string
   placeholder: string
   placeholderTextColor: string
   onChangeText: (code: string) => void
   type?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad';
   className?: string
}

const CustomInput = ({
   value,
   placeholder,
   placeholderTextColor,
   onChangeText,
   type,
   className,
   ...rest
}: PropsType) => {
   return (
      <TextInput
         className={cn('border border-border-secondary bg-surface-secondary p-4 text-[16px] rounded-xl focus:outline-none focus:border-brand-primary text-text-primary', className)}
         value={value}
         placeholder={placeholder}
         placeholderTextColor={placeholderTextColor}
         onChangeText={onChangeText}
         keyboardType={type}
         {...rest}
      />
   )
}

export default CustomInput