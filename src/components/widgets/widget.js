
import { useDrag } from "react-use-gesture";
import React, { useEffect, useRef,useState } from 'react';
import "./widgets.css"

export default function Widget(props) {

    const [widgetsPos, setWidgetsPos] = useState({x:0,y:0});
   
    const bindWidgetsPos=useDrag((params)=>{
     setWidgetsPos({
      x:params.offset[0],
      y:params.offset[1]
     })
    });
    const closeWidget =() => {
     
        props.saveSketch()
     
      }
     

  return (
    <div {...bindWidgetsPos()} style={{ 
        position:"absolute",
        top:widgetsPos.y,
        left:widgetsPos.x
        }}> 
        
         <div style={{ width:"400px", height:"400px", backgroundColor:"white" }}>
            <div className="WidgetHeader">
            <div className="widgetExit" onClick={closeWidget}>
                 {/* Div en rouge (red) avec forme de cercle */}
            </div>
            <div className="widgetZoom">
                {/* Div en bleu (blue) avec forme de cercle */}
            </div>
            </div>
            <h2>TEST</h2>
        </div> 
    </div>
 
  )
}
