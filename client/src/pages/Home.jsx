import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: token }
        });
        setUser(res.data); // ✅ Store user info in state
      } catch (err) {
        console.log('User not authenticated');
      }
    };

    fetchLoggedInUser();
  }, []);
  return (
    <>
      <div>
        <h1>Welcome {user ? user.name : 'Guest'}!</h1>
        {/* your routes/components */}
      </div>
    </>
  )
}

export default Home