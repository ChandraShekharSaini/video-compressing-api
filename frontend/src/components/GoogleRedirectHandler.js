import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleData = async () => {
      try {
        // Capture the response from the server after redirect
        const response = await fetch('http://localhost:3000/auth/google/callback', {
          method: 'GET',
          credentials: 'include',  // Ensure session or cookies are sent
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);  // User data from the server
          
          // Save the user data (like a JWT or session) to local storage or state
          localStorage.setItem('authToken', data.token); // or use Redux/state to store the token
          
          // Redirect the user to the dashboard or another page
          navigate('/');
        } else {
          console.error('Authentication failed', await response.json());
          navigate('/sign-in');  // Redirect to the sign-in page if authentication failed
        }
      } catch (error) {
        console.error('Error during authentication', error);
        navigate('/sign-in');
      }
    };

    // Call the function to handle Google callback response
    getGoogleData();
  }, [navigate]);

  return <div>Loading...</div>; // Or show a loading spinner
};

export default GoogleRedirectHandler;
