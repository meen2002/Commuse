// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TrackInfo = () => {


//   useEffect(() => {
//     const tempToken = localStorage.getItem(`spotifyToken_${myId}`);
//     const trackID = "5PJH1U5Iie893v48Fl9yaCsdf?si"
//     if (!tempToken) {
//       return (null)
//     }

//     const fetchTrackData = async () => {
//       try {
//         const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackID}`, {
//           headers: {
//             Authorization: `Bearer ${tempToken}`,
//           },
//         });

//         if (response.status === 200) {
//             console.log("i")
//         } 
//         else if(response.status === 400) {
//             console.log("oppai")



//         }
//       } catch (err) {
//         console.log("oppai")
//       }
//     };
//     if (trackID) {
//         fetchTrackData();
//       }
//     }, []);


//   return (
// null

//   );
// };

// export default TrackInfo;

