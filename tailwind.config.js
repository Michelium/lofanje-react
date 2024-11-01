/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    'sm': '100%',
                    'md': '1024px',  // Wider for medium screens
                    'lg': '1440px',  // Wider for large screens
                    'xl': '1580px',  // Extra-wide for extra-large screens
                    '2xl': '1820px', // Very wide for extra-extra-large screens
                },
            },
            colors: {
                'button': {
                    'enabled': '#3A3A3A',
                    'hovered': '#4E4E4E',
                    'focused': '#5C5C5C',
                    'pressed': '#6B6B6B',
                    'dragged': '#7A7A7A',
                    'disabled': '#2C2C2C',
                },
                'purple': {
                    '50': '#F2E7FE',
                    '100': '#DBB2FF',
                    '200': '#BB86FC',
                    '300': '#985EFF',
                    '400': '#7F39FB',
                    '500': '#6200EE',
                    '600': '#5600E8',
                    '700': '#3700B3',
                    '800': '#30009C',
                    '900': '#23036A',
                },
            }
        },
    },
    plugins: [],
}

