import React, { useState, useEffect } from "react";
import Others from "../features/others.js";
import { MyName } from "../features/GetMyProf.js";


const ArrayMap = ({ otherData,myId,myMarker }) => {
    const allUsers=otherData.body;
    
    const [userData,setUserData]=useState(null);
    console.log("allUsersData",allUsers);

    useEffect(() => {
        if (allUsers) {
          const filteredUsers = otherData.body.filter(
            (allUsers) => allUsers.user_name !== MyName && allUsers.user_name !== "Unknown User"
          );
          setUserData(filteredUsers); // 状態を更新して自分の情報を削除
        }
      }, [allUsers, MyName]);

    //   console.log("Users data:", userData); // Body内のデータをコンソールに出力


    
      return (
        <div>
      {userData && userData.map((userData) => {
        // console.log("User data at index", index, ":", userData); // ユーザーごとにコンソールに出力
        return (
          <div key={userData.user_name}>
            <Others
            myId={myId}
            userName={userData.user_name}
            latitude={userData.latitude}
            longitude={userData.longitude}
            // trackID={"6dOtVTDdiauQNBQEDOtlAB?si"}//サンプルID
            trackID={userData.music_id}
            userImage={userData.profile_image}
            myMarker={myMarker}
            />
          </div>
        );
      })}
    </div>
      );
}
  // Body内のユーザーデータを取得


export default ArrayMap;