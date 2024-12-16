// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserInfoFetcher = () => {
//     const [userData, setUserData] = useState([]);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(
//             "https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/get_userdata",
//             {
//               params: {
//                 user_name: "sample_name", // ユーザー名フィルタ（任意）
//                 latitude: 26.6537,        // 緯度フィルタ（任意）
//                 longitude: 134.75546,     // 経度フィルタ（任意）
//                 music_id: "samplemusicid123", // 音楽IDフィルタ（任意）
//               },
//             }
//           );
//           setUserData(response.data);
//         } catch (err) {
//           setError(err.message || "データの取得に失敗しました");
//         }
//       };
  
//       fetchUserData();
//     }, []);
  
//     return (
//       <div>
//         <h1>ユーザー情報</h1>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <ul>
//             {userData.map((user, index) => (
//               <li key={index}>
//                 {user.user_name} - {user.latitude}, {user.longitude} -{" "}
//                 {user.music_id}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };
  
//   export default UserInfoFetcher;