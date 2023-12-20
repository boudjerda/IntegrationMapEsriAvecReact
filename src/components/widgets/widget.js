
import { useDrag } from "react-use-gesture";
import React, { useEffect, useRef,useState } from 'react';

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
            <div style={{ width:"400px", height:"50px", backgroundColor:"rgba(59,57,87,.8588235294117647)", display:"flex",flexDirection: "row-reverse"}}>
            <div style={{ width: "20px", height: "20px", backgroundColor: "red", borderRadius: "50%", marginTop:"5px", marginRight:"5px" }} onClick={closeWidget}>
                 {/* Div en rouge (red) avec forme de cercle */}
            </div>
            <div style={{ width: "20px", height: "20px", backgroundColor: "#d48806", borderRadius: "50%", marginTop:"5px", marginRight:"5px"  }}>
             {/* Div en bleu (blue) avec forme de cercle */}
            </div>
            </div>
            <h2>TEST</h2>
        </div> 
    </div>
 
  )
}
