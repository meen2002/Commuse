import React, { useRef } from 'react';
import { OverlayView } from '@react-google-maps/api';

const CustomOverlayView = ({position,content}) => {
  const divRef = useRef(null);

  return (
    <OverlayView
  position={position}
  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
>
  <div
    ref={divRef}
    style={{
        width: "180px",
        height: "50px",
        backgroundColor: "white",
        padding: "3px",
        boxShadow: "0px 0px 50px rgba(0,0,0,0.3)",
        borderRadius: "8px",  // 角を丸くする
        display: "flex",  // 表示確認のためにflexboxを使用
        justifyContent: "start",  // コンテンツが中央に来るように
        alignItems: "center"  // コンテンツが中央に来るように
    }}
  >
    {content}
  </div>
</OverlayView>
  );

};
export default CustomOverlayView;
//プロップをカレントプレイングからもらう、マーカーの位置ももらう