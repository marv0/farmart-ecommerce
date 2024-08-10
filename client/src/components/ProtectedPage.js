import React, { useState, useEffect } from 'react';

function ProtectedPage({ token }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/protected', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      setMessage(data.message);
    }

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default ProtectedPage;