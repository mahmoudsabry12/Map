import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
 import Map, { Popup } from 'react-map-gl';
// import { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./app.css"
import axios from "axios"
import {Room, ToggleOff} from "@material-ui/icons"
import {format} from "timeago.js"

const TOKEN = "pk.eyJ1IjoibWFobW91ZDExIiwiYSI6ImNsaGo2cW82eDBmMWUzcHAxYnR0ZDBrMzAifQ.-HdQJp9cTcdmjzfTsNF6tA"

function App() {

  const [pins,setPins] = useState([])
  const [radarLoc,setRadarLoc] = useState([])
  const [showPopup, setShowPopup] = useState(true);
  const [radarDesc,setRadarDesc] = useState('')
  const [currentPlaceId,setCurrentPlaceId]= useState(null)
  const [newPlace,setNewPlace]= useState(null)
  const currentUser = "Mahmoud"


  const [lngLat, setLngLat] = useState({ lng: null, lat: null });
  const [description, setDescription] = useState('');

console.log(radarLoc)
  const [viewPort,setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 7
  })

useEffect(()=>{
  const getPins = async ()=>{
    try {
      const res = await axios.get("/pins")
      setPins(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  getPins()
},[])
useEffect(()=>{
  const getRadarLoc = async ()=>{
    try {
      const res = await axios.get("/RadarLoc")
      setRadarLoc(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  getRadarLoc()
},[])

const handleMarkerClick = (id)=>{
  setCurrentPlaceId(id)
}

const handleAddClick = (e)=>{
 console.log(e)
 console.log(e.lngLat)
  const {lng,lat} = e.lngLat
  //   var iterator = e.values(); 
// // All the elements of the array the array  
// // is being printed. 
// var myLng = iterator.next().value;
// var myLat = iterator.next().value;
// console.log('Lng = ' + myLng); 
// console.log('Lat = ' + myLat);

  setNewPlace({
    
    lat,
    long:lng
  })
}
const handleInputChange = (e) => {
  // e.preventdefault()
  setRadarDesc(e.target.value);
};

const handleSaveClick = async (e) => {
 
  setRadarDesc(e.target.value)
  // setRadarLoc({long:newPlace.long,lat: newPlace.lat ,desc:radarDesc})
    try {
      const response = await axios.post('/radarLoc', {
        long:newPlace.long,
        lat: newPlace.lat ,
        desc:radarDesc
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }

    
  
};




  return (
    <div className="App" >
<ReactMapGL 
      initialViewState={{
        longitude: 26.8206,
        latitude: 30.8025,
        zoom: 5
      }}
      mapboxAccessToken={TOKEN}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      {pins.map(p=>(
        <>
    <Marker
     latitude={p.lat} 
     longitude={p.long} 
     offsetLeft={-20}
     offsetTop={-10}
     anchor="bottom" >
       <Room 
       style={{fontSize: viewPort.zoom * 4 , 
        color:p.username === currentUser?"tomato":"blue" , 
        cursor:"pointer"}}
       onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
       /> 
      
    </Marker>
    console.log(p)
    {p._id == currentPlaceId && (
      <Popup 
        latitude={p.lat} 
        longitude={p.long} 
        anchor="bottom"
         onClose={() => setCurrentPlaceId(null)}
        >
      <div className='card'>
        <h4>Radar</h4>
        <label>{p.title}</label>
        <label>{p.desc}</label>
        <label>Radar Info</label>
        <label>{format(p.createdAt)}</label>
      </div>
      </Popup>
      )} 
     
    </>
    ))}

    {newPlace && (
      <>
    <Popup 
   latitude={newPlace.lat} 
    longitude={newPlace.long} 
    closeButton={true}
    closeOnClick = {true}
    anchor="left"
      onClose={() => setNewPlace(null)}
    > hello
  <div className='card'>
    <h4>Radar</h4>
    <label>{newPlace.title}</label>
    <label>{newPlace.desc}</label>
    <label>Radar Info</label>
    <label>Lat: ${newPlace.lat}</label>
    <label>Long: ${newPlace.long}</label>
    <input type='text'  placeholder='Enter Radar Name'
    value={radarDesc}
      onChange={handleInputChange}
    />
    <button onClick={handleSaveClick}> Add </button>
    <label>{format(newPlace.createdAt)}</label>
  </div>
  </Popup>

  
  </>
    )}

    {radarLoc.map(r=>(
        <>
    <Marker
     latitude={r.lat} 
     longitude={r.long} 
     offsetLeft={-20}
     offsetTop={-10}
     anchor="right" >
       <Room 
       style={{fontSize: viewPort.zoom * 4 , 
color:"green",        cursor:"pointer"}}
       /> 
      
    </Marker>
    {/* console.log(r) */}
      <Popup 
        latitude={r.lat} 
        longitude={r.long} 
        anchor="bottom"
        >
        <h4>{r.desc}</h4>
     
      </Popup>
       
     
    </>
    ))}

   


    </ReactMapGL>
    </div>
  );
}

export default App;
