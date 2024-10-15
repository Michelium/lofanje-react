/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ], 
    theme: {
        extend: {
            colors: {
                'mine-shaft': {
                    50: "#F2F2F2",
                    100: "#E8E8E8",
                    200: "#CCCCCC",
                    300: "#ABABAB",
                    400: "#7D7D7D",
                    500: "#1E1E1E",
                    600: "#1A1A1A",
                    700: "#1A1A1A",
                    800: "#1A1A1A",
                    900: "#000000",
                    950: "#000000"
                },
            }
        },
    },
    plugins: [],
}

