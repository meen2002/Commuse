import React,{ useState, useEffect } from 'react';


const buildUrlWithParams = () => {
  const baseUrl = "https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/insert_userdata?";
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryString}`;
};

const GenerateUrl = (marker,musicId) => {
 const [userName, setUserName] = useState("");
 const [lat,setLat] = useState(null)
 const [lng,setLng] = useState(null)

  useEffect(() => {
    const storedUserName = localStorage.getItem(getTokenFromUrl().access_token+"userName")
    setUserName(storedUserName || "Unknown User"); // 値がなければ "Unknown User" を設定
    setLat(marker.lat||26.6537);
    setLng(marker.lng||134.75546);
  }, []);

  return (
null
  );
};

export default GenerateUrl;
