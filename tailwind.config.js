/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        72.5: '300px',
        '550px': '550px',
        '160px': '160px'
      },
      height: {
        17.5: '70px',
        21.5: '86px',
        '610px': '610px',
        '450px': '450px'
      },
      colors: {
        'green-550': '#4caf50'
      },
      backgroundImage: {
        'user-info': "url('https://i.pinimg.com/originals/c4/75/75/c47575e3d421a3a87981e07b24a4b51f.jpg')"
      },
      minWidth: {
        '1/2': '50%',
        24: '96px',
        '80px': '80px'
      },
      maxWidth: {
        24: '96px',
        '600px': '600px',
        '160px': '160px',
        '400px': '400px',
        36: '144px'
      },
      minHeight: {
        '250px': '250px',
        '120px': '120px'
      },
      spacing: {
        '2px': '2px'
      }
    }
  },
  plugins: []
};
