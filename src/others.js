//　他の人のマーカー表示用　アクセス数に応じてマーカー数増やしたい

import {MarkerF} from "@react-google-maps/api";
import React, { useState } from "react";

const Others = (props) => {
    const [color,setColor]=useState('silver')

    // if(props.ohterPlying=true){
    //     setColor('lime')
    // }
    return (<>
    <MarkerF position={props.marker} icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10, 
            fillColor: color, 
            fillOpacity: 1.0, 
            strokeWeight: 2, 
            strokeColor: 'white', 
          }}/>
    </>);
};

export default Others;