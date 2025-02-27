import React, { useState, useEffect } from "react";

import { MyName,MyImage } from "../../features/GetMyProf";

const GetUrl = ({ marker, trackId, setUrl}) => {
 

  useEffect(() => {
    const generateUrl = async () => {
      try {
        // userName を親コンポーネントから取得
        const user = MyName || "Unknown User"; // もし userName が undefined や null なら "Unknown User" を使う

        // 緯度・経度を取得
        const latitude = marker.lat || 0;
        const longitude = marker.lng || 0;

        // 曲IDを設定
        const musicId = trackId || "unknown_track_id";

        const Image = MyImage || null;
        // URLの生成
        const baseUrl = "https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/insert_userdata";
        const fullUrl = `${baseUrl}?user_name=${encodeURIComponent(user)}&latitude=${latitude}&longitude=${longitude}&music_id=${encodeURIComponent(musicId)}&profile_image=${Image}`;
        
        setUrl(fullUrl); // URLをステートに保存
      } catch (error) {
        console.error("URL生成中にエラーが発生しました:", error);
      }
    };

    generateUrl();
  }, [marker, trackId, ]); // userName が変更された時に URLを再生成

  return ( null );
};

export default GetUrl;