/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         colors: {
            brand: {
               primary: "rgb(var(--brand-primary) / <alpha-value>)",
               secondary: "rgb(var(--brand-secondary) / <alpha-value>)",
            },
            surface: {
               primary: "rgb(var(--surface-primary) / <alpha-value>)",
               secondary: "rgb(var(--surface-secondary) / <alpha-value>)",
               tertiary: "rgb(var(--surface-tertiary) / <alpha-value>)",
               muted: "rgb(var(--surface-muted) / <alpha-value>)",
            },
            text: {
               primary: "rgb(var(--text-primary) / <alpha-value>)",
               secondary: "rgb(var(--text-secondary) / <alpha-value>)",
               muted: "rgb(var(--text-muted) / <alpha-value>)",
               inverse: "rgb(var(--text-inverse) / <alpha-value>)",
            },
            border: {
               primary: "rgb(var(--border-primary) / <alpha-value>)",
               secondary: "rgb(var(--border-secondary) / <alpha-value>)",
            }
         },
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