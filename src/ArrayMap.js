import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Others from "./others.js";
import SongComponent from "./contents.js";


const ArrayMap = ({ otherData,myName }) => {
    const allUsers=otherData.body;
    
    const [userData,setUserData]=useState(null);
    console.log("allUsersData",allUsers);

    useEffect(() => {
        if (allUsers) {
          const filteredUsers = otherData.body.filter(
            (allUsers) => allUsers.user_name !== myName && allUsers.user_name !== "Unknown User"
          );
          setUserData(filteredUsers); // 状態を更新して自分の情報を削除
        }
      }, [allUsers, myName]);

    //   console.log("Users data:", userData); // Body内のデータをコンソールに出力


    
      return (
        <div>
      {userData && userData.map((userData) => {
        // console.log("User data at index", index, ":", userData); // ユーザーごとにコンソールに出力
        return (
          <div key={userData.user_name}>
            <Others
            userName={userData.user_name}
            latitude={userData.latitude}
            longitude={userData.longitude}
            trackID={"6dOtVTDdiauQNBQEDOtlAB?si"}//サンプルID,6dOtVTDdiauQNBQEDOtlAB?si
            />
          </div>
        );
      })}
    </div>
      );
}
  // Body内のユーザーデータを取得


export default ArrayMap;
