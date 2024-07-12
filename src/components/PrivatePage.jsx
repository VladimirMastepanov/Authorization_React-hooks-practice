import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent(data);
    };

    fetchContent();
  }, []);

  return content && <p>{content}</p>;
};

export default PrivatePage;

// const PrivatePage = () => {
//   const [res, setRes] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
//         setRes(response.data);
//       } catch (e) {
//         setError(e.message);
//       }
//     }
//     getData();
//   }, [])

//   return (
//     <>
//       {error ? <p>{error}</p> : <p>{res}</p>}
//     </>
//   )
// };
