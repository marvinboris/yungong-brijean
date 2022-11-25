/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Euclid Circular A', ...defaultTheme.fontFamily.sans],
                display: ['"sweet purple"', ...defaultTheme.fontFamily.sans],
                body: ['"Plus Jakarta Display"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#1F4F97',
                secondary: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#505356',
                    700: '#374151',
                    800: '#262626',
                    900: '#171717',
                },
                blue: '#2129EE',
                sky: '#0590DE',
                night: '#2E5C9E',
                green: '#91B505',
                orange: '#F59C1C',
                red: '#dc3545',
                yellow: '#FDAF17',
            },
            backgroundImage: {
                dark: "linear-gradient(342.89deg, #0B1120 0%, #252E35 64.53%, #112428 102.26%)",
            }
        },
    },
    plugins: [],
}
