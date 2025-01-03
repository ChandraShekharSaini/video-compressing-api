import React from "react";

const GoogleLogo = ({ width = 100, height = 100 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={width} height={height}>
      <path fill="#EA4335" d="M24 9.5c3.64 0 6.76 1.39 9.27 3.67l6.93-6.93C36.63 2.9 30.72 0 24 0 14.73 0 6.97 5.79 3.27 14.11l8.27 6.42C13.5 14.79 18.33 9.5 24 9.5z"/>
      <path fill="#34A853" d="M9.5 24c0-1.94.37-3.8 1.04-5.5L2.27 12.11C.8 15.27 0 19.02 0 23s.8 7.73 2.27 10.89l8.27-6.42c-.67-1.7-1.04-3.56-1.04-5.47z"/>
      <path fill="#FBBC04" d="M24 38.5c-5.67 0-10.5-5.29-12.46-10.89L3.27 32.89C6.97 41.21 14.73 47 24 47c6.72 0 12.63-2.9 16.2-7.24l-6.93-6.93c-2.51 2.28-5.63 3.67-9.27 3.67z"/>
      <path fill="#4285F4" d="M46.73 20.89H24v9.5h13.2c-1.24 3.3-3.67 6.28-6.93 8.53l6.93 6.93C42.5 41.51 48 34.74 48 24c0-1.3-.13-2.57-.37-3.81z"/>
    </svg>
  );
};

export default GoogleLogo;
