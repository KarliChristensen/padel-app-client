/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    env: {
      customKey: 'my-value',
      SERVER: `https://padle-app-server.onrender.com/api`,
      TEST: 'Test completed',
    },
  }

  // http://localhost:5005/api - replaced with - ${process.env.SERVER}
