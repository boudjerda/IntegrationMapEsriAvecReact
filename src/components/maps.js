import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import React, { useEffect, useRef,useState } from 'react';
import Sketch from "@arcgis/core/widgets/Sketch";
import { featureLayers} from '../configs/featureLayersConfig';
import "./map.css"
import Widget from "./widgets/widget";

const MapComponent = () => {

  const mapDiv = useRef(null);
  const [drawnElements, setDrawnElements] = useState([]);
  const drawnElementsRef = useRef(drawnElements);

  const [widgetsDiv, setWidgetsDiv] = useState(false);

  const saveSketch =() => {
    setWidgetsDiv(!widgetsDiv)
    console.log("sketch", drawnElements )
    console.log("widgetsDiv", widgetsDiv )
}



  useEffect(() => {
    if (mapDiv.current) {
      const graphicsLayer = new GraphicsLayer();
      /**
       * Initialize application
       */
      const webmap = new Map({
        basemap: "topo-vector",
        layers: [graphicsLayer]
      });

      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: [-117.1490,32.7353],
        scale: 10000000 // Represents the map scale at the center of the view.
      });
      view.on("click", async (event) => {
        const screenPoint = {
          x: event.x,
          y: event.y,
        };
  
        // Utilisation de la fonction hitTest pour détecter les entités sous le point de clic
        const hitTestResults = await view.hitTest(screenPoint);
  
        if (hitTestResults && hitTestResults.length > 0) {
          // Récupérer l'entité cliquée (première entité trouvée)
          const clickedGraphic = hitTestResults[0].graphic;
  
          // Faire quelque chose avec l'entité cliquée, par exemple, afficher ses propriétés dans la console
          console.log("Clicked Graphic Attributes:", clickedGraphic.attributes);
        }else{
          console.log("Clicked Graphic Attributes:");
        }
      });
      view.when(() => {
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: view,
        //  creationMode: "update"
        });
        sketch.on("create", (event) => {
            if (event.state === "complete") {
                console.log("object",event.graphic)
              // Lorsque le dessin est terminé, ajoutez le graphique à votre tableau d'éléments dessinés
              drawnElementsRef.current.push(event.graphic);
              setDrawnElements([...drawnElementsRef.current]);
             console.log("draw",drawnElements)
            }
          });
        view.ui?.add(sketch,"top-right");
        webmap.addMany(featureLayers);
      });
      return () => view && view.destroy()

    }
  }, []);

  return(
    <div style={{ height: "100vh", width: "100%" }}>
        <div className="mapDiv" ref={mapDiv} style={{height: '100vh', width: "100%"}}>
         </div>
         {widgetsDiv ? <Widget widgetsDiv={widgetsDiv} saveSketch={saveSketch}/> :null}
         
         <button  className="submit-button" onClick={saveSketch}>submit</button>
    </div>)
   
}

export default MapComponent;


