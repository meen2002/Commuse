import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Others from "./others.js";
import SongComponent from "./contents.js";

const ArrayMap = ({ otherData,myName }) => {
    const allUsers=otherData.body;
    
    const [userData,setUserData]=useState(null);

    useEffect(() => {
        if (allUsers) {
          const filteredUsers = otherData.body.filter(
            (allUsers) => allUsers.user_name !== myName && allUsers.user_name !== "Unknown User"
          );
          setUserData(filteredUsers); // 状態を更新して自分の情報を削除
        }
      }, [otherData, myName]);

      console.log("Users data:", userData); // Body内のデータをコンソールに出力


    
      return (
        <div>
      {userData && userData.map((userData, index) => {
        // console.log("User data at index", index, ":", userData); // ユーザーごとにコンソールに出力

        
        return (
          <div key={index}>
            


            <Others
            userName={userData.user_name}
            latitude={userData.latitude}
            longitude={userData.longitude}
            trackID={"5PJH1U5Iie893v48Fl9yaC?si"}
            />




        

            {/* ユーザー情報を表示
            <h3>{user.user_name}</h3>
            <p>Timestamp: {user.timestamp}</p>
            <p>Latitude: {user.latitude}</p>
            <p>Longitude: {user.longitude}</p>
            <p>Music ID: {user.music_id}</p> */}
          </div>
        );
      })}
    </div>
      );
}
  // Body内のユーザーデータを取得


export default ArrayMap;
