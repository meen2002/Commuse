import {
    MarkerF,
    CircleF
} from "@react-google-maps/api";

const BlueCircleMarker = (prop) => {
    return (<>
    <MarkerF position={prop.marker} icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10, // 円の大きさ
            fillColor: 'blue', // 青色に設定
            fillOpacity: 1.0, // 不透明度
            strokeWeight: 2, // 枠線の太さ
            strokeColor: 'white', // 枠線の色
          }}/>
    <CircleF
              center={prop.marker}
              radius={prop.accuracy} // 精度を半径として設定
              options={{
                strokeOpacity: 0,
                strokeWeight: 2,
                fillColor: '#00aaff', // 円の塗りつぶし色
                fillOpacity: 0.35, // 円の透明度
              }}
            />
    </>);
};

export default BlueCircleMarker;