"use client"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/map'), {
  ssr: false, // Ensure the component is not rendered on the server
});
import React, {useState, useEffect} from "react"
export default function Home(){
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [cords, setCords] = useState<{lat: number, long: number}>({lat:0, long:0})
  const requestLocationPermission = async () => {
    try {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCords({
            lat: latitude,
            long: longitude
          })
          setLocationAllowed(true);
        },
        (error) => {
          console.error('Error:', error.message);
          setLocationAllowed(false);
        }
      );
      
    } catch (error) {
      console.error('Error:', error);
      setLocationAllowed(false);
    }
  };
  useEffect(() => {
    

    requestLocationPermission();
  }, []); // Empty dependency array to run this effect only once
  return(
    <main className=" bg-slate-500 relative">
      {locationAllowed?(
        <section className='w-[100vw] h-[100vh] relative'>
            <Map cords={{
              long: cords.long,
              lat:cords.lat
            }}></Map>
          
        </section>
      ):(
        <section className=" h-[100vh] items-center justify-center flex">
          <div className=" bg-white shadow-xl p-5 text-center w-[400px] rounded-lg">
            <h1 className=" text-2xl">Please allow the website to access you location</h1>
            <p className=" text-sm">This website needs access to your location</p>
            <button onClick={requestLocationPermission} className="my-5 p-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-red-500 hover:to-purple-500 transition-colors duration-300">Allow</button>
            <br></br>
            <button className=' text-gray-400 hover:text-black cursor-pointer' onClick={()=>{
              setCords(
                {
                  lat:0,
                  long:0
                }
              )
              setLocationAllowed(true)
            }}>Continue as a guest</button>
          </div>
        </section>
      )}
      <footer className="bg-gray-200 p-4 text-center fixed bottom-0 w-screen">
        <p className="text-sm text-gray-600">
          Created with{' '}
          <span role="img" aria-label="Heart">
            ❤️
          </span>{' '}
          by <a href='https://github.com/Bashamega' className=' underline'>Adam Basha</a>
        </p>
      </footer>
    </main>
  )
}