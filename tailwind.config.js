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
        'user-info': "url('http://training-timesheet.nccsoft.vn/user-img-background.7f354e93c30f9d51fc3a.jpg')"
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
