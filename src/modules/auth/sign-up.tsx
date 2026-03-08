import CustomBackButton from '@/components/common/custom-back-button'
import CustomInput from '@/components/common/custom-input'
import CustomPressable from '@/components/common/custom-pressable'
import { Text } from '@/components/common/global-text'
import useTheme from '@/hooks/use-theme'
import { useAuth, useSignUp } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import { type Href, Link, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function SignUp() {
   const { signUp, errors, fetchStatus } = useSignUp()
   const { isSignedIn } = useAuth()
   const router = useRouter()
   const { colors } = useTheme()

   const [emailAddress, setEmailAddress] = React.useState('')
   const [password, setPassword] = React.useState('')
   const [code, setCode] = React.useState('')

   const handleSubmit = async () => {
      const { error } = await signUp.password({
         emailAddress,
         password,
      })
      if (error) {
         return
      }

      if (!error) {
         await signUp.verifications.sendEmailCode()
      }
   }

   const handleVerify = async () => {
      await signUp.verifications.verifyEmailCode({
         code,
      })
      if (signUp.status === 'complete') {
         await signUp.finalize({
            // Redirect the user to the home page after signing up
            navigate: ({ session, decorateUrl }) => {
               if (session?.currentTask) {
                  return
               }

               const url = decorateUrl('/')
               if (url.startsWith('http')) {
                  window.location.href = url
               } else {
                  router.push(url as Href)
               }
            },
         })
      }
   }

   if (signUp.status === 'complete' || isSignedIn) {
      return null
   }

   if (
      signUp.status === 'missing_requirements' &&
      signUp.unverifiedFields.includes('email_address') &&
      signUp.missingFields.length === 0
   ) {
      return (
         <SafeAreaView className='flex-1 bg-surface-primary'>
            <CustomBackButton />
            <View className='px-5 mt-16'>
               <Image
                  source={require('../../assets/images/logo.png')}
                  className='h-28 w-28 mx-auto mb-6'
               />
               <View className='items-center text-center gap-3 mb-8'>
                  <Text className='text-3xl font-interBold text-text-primary leading-[1.3]'>Enter Verification Code</Text>
                  <Text className='text-lg text-text-secondary text-center leading-[1.4]'>We sent a verification code to your email. Please enter the code below.</Text>
               </View>
               <CustomInput
                  value={code}
                  placeholder="Enter your verification code"
                  placeholderTextColor={colors.text.muted}
                  onChangeText={(code) => setCode(code)}
                  type="numeric"
               />
               {errors.fields.code && (
                  <Text className='mt-2 text-[14px] text-red-500 font-interMedium'>{errors.fields.code.message}</Text>
               )}
               <CustomPressable
                  style={({ pressed }: { pressed: boolean }) => [
                     (fetchStatus === 'fetching') && styles.buttonDisabled,
                     pressed && styles.buttonPressed,
                  ]}
                  onPress={handleVerify}
                  disabled={fetchStatus === 'fetching'}
                  className='mt-6'
               >
                  {
                     fetchStatus === 'fetching' ? (
                        <ActivityIndicator size={24} color={colors.text.inverse} />
                     ) : (
                        <>
                           <Text className='text-text-inverse font-interMedium text-lg'>
                              Verifiy
                           </Text>
                        </>
                     )
                  }
               </CustomPressable>
               <Pressable
                  style={({ pressed }) => [pressed && styles.buttonPressed]}
                  onPress={async () => {
                     await signUp.verifications.sendEmailCode()
                     Toast.show({
                        type: 'success',
                        text1: 'New code sent',
                        text2: 'Please check your email'
                     });
                  }}
                  className='mt-8'
               >
                  <Text className='text-brand-primary font-interSemiBold text-lg text-center'>I need a new code</Text>
               </Pressable>
            </View>
         </SafeAreaView>
      )
   }

   return (
      <SafeAreaView className='flex-1 bg-surface-primary'>
         <CustomBackButton />
         <View className='px-5 mt-12'>
            <Image
               source={require('../../assets/images/logo.png')}
               className='h-28 w-28 mx-auto mb-2'
            />
            <View className='items-center text-center gap-2 mb-8'>
               <Text className='text-4xl font-interBold text-text-primary leading-[1.3]'>Sign Up</Text>
               <Text className='text-[15px] text-text-secondary text-center'>Please enter your details to create an account for free</Text>
            </View>
            <View className='mb-5'>
               <Text className='text-[15px] font-interSemiBold mb-2 text-text-primary'>Email address</Text>
               <CustomInput
                  value={emailAddress}
                  placeholder="Enter email"
                  placeholderTextColor={colors.text.muted}
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  type="email-address"
                  autoCapitalize="none"
               />
               {errors.fields.emailAddress && (
                  <Text className='mt-2 text-[14px] text-red-500 font-interMedium'>{errors.fields.emailAddress.message}</Text>
               )}
            </View>
            <View>
               <Text className='text-[15px] font-interSemiBold mb-2 text-text-primary'>Password</Text>
               <CustomInput
                  value={password}
                  placeholder="Enter password"
                  placeholderTextColor={colors.text.muted}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
               />
               {errors.fields.password && (
                  <Text className='mt-2 text-[14px] text-red-500 font-interMedium'>{errors.fields.password.message}</Text>
               )}
            </View>
            <CustomPressable
               style={({ pressed }: { pressed: boolean }) => [
                  (!emailAddress || !password || fetchStatus === 'fetching') && styles.buttonDisabled,
                  pressed && styles.buttonPressed,
               ]}
               onPress={handleSubmit}
               disabled={!emailAddress || !password || fetchStatus === 'fetching'}
               className='mt-7'
            >
               {
                  fetchStatus === 'fetching' ? (
                     <ActivityIndicator size={24} color={colors.text.inverse} />
                  ) : (
                     <>
                        <Text className='text-text-inverse font-interMedium text-lg'>
                           Continue
                        </Text>
                        <Ionicons name="arrow-forward" size={22} color={colors.text.inverse} />
                     </>
                  )
               }
            </CustomPressable>

            <View className='flex-row items-center gap-1 mt-9 justify-center'>
               <Text className='text-[15px]'>Already have an account? </Text>
               <Link href="/sign-in">
                  <Text className='text-[15px] font-interSemiBold text-brand-primary'>Sign in</Text>
               </Link>
            </View>

            {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
            <View nativeID="clerk-captcha" />
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   buttonPressed: {
      opacity: 0.7,
   },
   buttonDisabled: {
      opacity: 0.5,
   }
});