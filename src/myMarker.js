import { useState,useRef,useEffect } from "react";
import { OverlayView } from "@react-google-maps/api";
import { MyImage } from "./GetMyProf";



const MyMarker = ({ marker , onClickedChange, status}) => {
  const [clicked,setClicked] = useState(false)
  const divRef = useRef(null);
  const [color,setColor]=useState("#999999")

  useEffect(() => {
    // statusが200の場合にcolorを明るい色に変更
    if (status === 200) {
      setColor("#447520");  
    } else {
      setColor("#B0B0B0");  // 他の状態では灰色に設定
    }
  }, [status]);




  const showinfo = () => {
    const newClickedState = !clicked;
    setClicked(newClickedState); 
    if (onClickedChange) {
      onClickedChange(newClickedState); 
    }
    console.log(clicked);
  };

    return (
    <>
    { MyImage? (
         <OverlayView
         position={marker}  // Markerの位置にオーバーレイを表示
         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // マウスターゲットにオーバーレイを表示
       >
         <div
           ref={divRef}
           style={{
             position: "absolute",  // 位置を絶対配置
             width: "35px", 
             height: "35px",
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
            e.currentTarget.style.transform = "translate(-50%, -120%) scale(1.1)"; // ホバー時に拡大
            e.currentTarget.style.boxShadow = "0px 0px 80px rgba(0,0,0,0.5)"; // ホバー時に影を強く
           }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translate(-50%, -120%) scale(1)"; // ホバーを外すと元に戻す
      e.currentTarget.style.boxShadow = "0px 0px 50px rgba(0,0,0,0.3)"; // 元の影
    }}
         >
           {/* ユーザー画像を丸く表示 */}
           <img
  onClick={showinfo}  // 画像をクリックしたときにhandleClickが実行される
  src={MyImage}  // userImageがない場合はサンプル画像を表示
  alt="user"
  style={{
    width: "100%",  // 親要素にフィットさせる
    height: "100%", // 親要素にフィットさせる
    borderRadius: "50%",  // 丸い形にする
    objectFit: "cover",  // 画像の切り抜きを防ぐ
    transition: "transform 0.2s",  // 画像のホバー時の遷移
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1)"; // 画像がホバーで拡大
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)"; // 画像が元に戻る
  }}
/>
           {/* 下向きの三角形（ポインタ） */}
           <div
             style={{
               position: "absolute",
               top: "95%",  // 画像の下に配置
               left: "50%",
               transform: "translateX(-50%)",
               width: "0",
               height: "0",
               borderLeft: "8px solid transparent",
               borderRight: "8px solid transparent",
               borderTop: `8px solid ${color}`,  // ポインタの色
             }}
           />
         </div>
       </OverlayView>

             ):(
              null

            )
          }
    </>);
};

export default MyMarker;

