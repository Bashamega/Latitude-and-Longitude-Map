"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactMarker } from './react-leaftlet/map';
import { IoMdSettings } from "react-icons/io";
import { Modal } from './Modal';
import { MinimapControl } from './react-leaftlet/minimap';
import { Layers } from './react-leaftlet/layers';
type Coordinates = {
  lat: number;
  long: number;
}

type MapProps = {
  cords: Coordinates;
}
type options = {
  fly: boolean,
  miniMap:boolean,
  layers: boolean,
}

function MapComponent({ cords } : MapProps){
  const [opt, setOpt] = useState<options>({
    fly: false,
    layers:false,
    miniMap: true
  })
  const [ModalPopup, setModalPopup] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<Coordinates>({
    long: cords.long,
    lat: cords.lat,
  });

  const { lat, long } = coordinates;

  useEffect(() => {
    setCoordinates({ lat: cords.lat, long: cords.long });
  }, [cords]);

  const handleChange = (value: string, type: keyof Coordinates) => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      [type]: Number(value),
    }));
  };

  return (
    <div className="w-full h-full relative text-white" style={{
      backgroundImage: "url('pattern-bg-desktop.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: '100%'
    }}>
      <div className='text-center items-center w-[100%] relative'>
        <h1 className='text-3xl'>Latitude and Longitude Map</h1>
        <div className='mt-5 bg-white p-5 text-left w-[40%] absolute left-[30%] flex justify-center rounded-lg text-black'>
          <button
            onClick={() => { setModalPopup(!ModalPopup) }}
          >
          <IoMdSettings
            size={20}
            className="absolute top-[5px] right-[5px] cursor-pointer hover:text-slate-300"
          />
          </button>
          <input
            type="number"
            className='border-2 border-black p-2 mt-2'
            value={lat}
            onChange={(e) => handleChange(e.target.value, 'lat')}
          />
          <input
            type="number"
            className='border-2 border-black p-2 mt-2'
            value={long}
            onChange={(e) => handleChange(e.target.value, 'long')}
          />

          <div className='absolute top-0 space-x-48'>
            <span>Latitude</span>
            <span>Longitude</span>
          </div>
        </div>
      </div>

      <MapContainer
        center={[lat, long]}
        zoom={12}
        className="w-full h-[70%] absolute bottom-0"
      >
        
        <ReactMarker cords={coordinates} fly={opt.fly}/>
        {opt.miniMap?(
          <MinimapControl position='topright' zoom={5} coordinates={coordinates} />

        ):(<></>)}
        {opt.layers?(
          <Layers cords={coordinates}></Layers>
        ):(<></>)}
      </MapContainer>
      <div className={'h-[100vh] w-[100vw] absolute top-0 left-0 items-center backdrop-blur-lg justify-center ' + (ModalPopup ? "flex" : "hidden")} style={{ zIndex: 1000 }}>
        <Modal options={opt} setOptions={setOpt} close={setModalPopup}/>
      </div>


    </div>
  );
};

export default MapComponent;
