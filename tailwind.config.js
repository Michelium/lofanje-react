/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
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
                // 'gray': {
                //     '50': '#f6f6f6',
                //     '100': '#e7e7e7',
                //     '200': '#d1d1d1',
                //     '300': '#b0b0b0',
                //     '400': '#888888',
                //     '500': '#6d6d6d',
                //     '600': '#5d5d5d',
                //     '700': '#4f4f4f',
                //     '800': '#434343',
                //     '900': '#3d3d3d',
                //     '950': '#262626',
                // },
            }
        },
    },
    plugins: [],
}

