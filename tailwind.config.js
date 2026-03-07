/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         fontFamily: {
            interRegular: ['regular'],
            interRegularItalic: ['regularItalic'],
            interMedium: ['medium'],
            interMediumItalic: ['mediumItalic'],
            interSemiBold: ['semiBold'],
            interSemiBoldItalic: ['semiBoldItalic'],
            interBold: ['bold'],
            interBoldItalic: ['boldItalic'],
            interBlack: ['black'],
         },
      },
   },
   plugins: [],
}