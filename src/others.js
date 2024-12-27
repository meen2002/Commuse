import axios from 'axios';
import SongComponent from "./contents";
import { useState,useRef,useEffect } from "react";
import { OverlayView } from "@react-google-maps/api";

const Others = ({userName,latitude,longitude,trackID,myId,userImage}) => {

  const [trackData, setTrackData] = useState(null);
  const [color,setColor]=useState("#888888")
  const divRef = useRef(null);

  useEffect(() => {
    const tempToken = localStorage.getItem(`spotifyToken_${myId}`);

    if (!tempToken) {
      return (null)
    }

    const fetchTrackData = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackID}`, {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });


        if (response.status === 200) {
          const track = response.data;
          // アルバムカバーのURLを取得（最も解像度の高い画像）
          const albumCoverUrl = track.album.images.length > 0 ? track.album.images[0].url : null;
          // trackDataにアルバムカバーURLを含める
          setTrackData({
            name: track.name,
            artists: track.artists[0].name,
            albumCover: albumCoverUrl,
            TrackId:trackID
          });
          setColor("blue");
        } 
        else if(response.status ===204){
          setTrackData(null)
          setColor("#888888")
        }
      } catch (err) {
        setTrackData(null)
        setColor("#888888")
      }
    };

    if (trackID) {
      fetchTrackData();
    }
  }, [trackID]);

  


  const [clicked,setClicked] = useState(false);

  const showinfo = () => {
    const newClickedState = !clicked;
    setClicked(newClickedState); 
    console.log(clicked);
  };


 




  return (
    <>

         <OverlayView
         position={{
          lat:latitude,
          lng:longitude
         }}  // Markerの位置にオーバーレイを表示
         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // マウスターゲットにオーバーレイを表示
       >
         <div
           ref={divRef}
           style={{
             position: "absolute",  // 位置を絶対配置
             width: "25px", 
             height: "25px",
             backgroundColor: color,
             padding: "2px",
             boxShadow: "0px 0px 50px rgba(0,0,0,0.3)",
             borderRadius: "50%",  // 画像を丸く表示
             display: "flex",  // flexboxを使用して中央配置
             justifyContent: "center",  // コンテンツを中央に配置
             alignItems: "center",  // コンテンツを中央に配置
             transform: "translate(-50%, -120%)",  // 中央に配置するための調整
             transition: "transform 0.2s, box-shadow 0.2s", // ホバー時の変化にスムーズな遷移を加える
              }}
              onMouseEnter={(e) => {
                // clickedがfalseの場合、ホバー時に拡大と影の強化
                
                  e.currentTarget.style.transform = "translate(-50%, -120%) scale(1.3)";
                  e.currentTarget.style.boxShadow = "0px 0px 80px rgba(0,0,0,0.5)";
                
              }}
              onMouseLeave={(e) => {
                // clickedがfalseの場合、ホバーを外すと元に戻す
                if (!clicked) {
                  e.currentTarget.style.transform = "translate(-50%, -120%) scale(1)";
                  e.currentTarget.style.boxShadow = "0px 0px 50px rgba(0,0,0,0.3)";
                }
              }}
           
         >
           {/* ユーザー画像を丸く表示 */}
           <img
             onClick={showinfo}  // 画像をクリックしたときにhandleClickが実行される
             src={userImage||null}
             alt="user"
             style={{
               width: "100%",  // 親要素にフィットさせる
               height: "100%", // 親要素にフィットさせる
               borderRadius: "90%",  // 丸い形にする
               objectFit: "cover",  // 画像の切り抜きを防ぐ
              }}

          
           />
           {/* 下向きの三角形（ポインタ） */}
           <div
             style={{
               position: "absolute",
               top: "93%",  // 画像の下に配置
               left: "50%",
               transform: "translateX(-50%)",
               width: "0",
               height: "0",
               borderLeft: "7px solid transparent",
               borderRight: "7px solid transparent",
               borderTop: `7px solid ${color}`,  // ポインタの色
             }}
           />
         </div>
       </OverlayView>



          {clicked &&(
           <SongComponent
           song={trackData}
            marker={{
              lat: latitude,
              lng: longitude
            }}
            userName={userName}
           />    
        )};


      
      
    </>
  );
};

export default Others;

