import axios from 'axios'
import { useState } from 'react'

const Weather = () => {
    const [locations , setLocations] = useState()
    const [city , setCity] = useState<string>('')
    const [color , setColor] = useState("")
    const [status , setStatus] = useState("")
    const API_KEY = "z58eyd++N7DwC2v8dnTVfw==BKgHpX1CO9lafO8N";
 
 
  const Fetcher = async ()=>{
      try {
        const URL = await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${city}` ,{
       headers: { "X-API-Key": API_KEY}
    })
   
       setLocations(URL.data.overall_aqi)
       if(URL.data.overall_aqi <=50){
        setColor("green")
        setStatus(`that means the AQI of ${city} is good`)
       }else if(URL.data.overall_aqi <= 100 && URL.data.overall_aqi >50){
        setColor("yellow")
        setStatus(`that means the AQI of ${city} is moderate`)
       }else{
        setColor("red")
        setStatus(`that means the AQI of ${city} is Unhealthy`)
       }
      } catch (err) {
        console.log("Error fetching air quality" + err)
      }
  }


  return (
    <>
<div className=' rounded-lg p-4  flex flex-col items-center justify-center h-screen  text-center '>
    <h1 className='text-center p-12 text-6xl mb-24 font-bold text-purple-600'>Air Monitor</h1>
    <div className='border-4 border-purple-600 bg-white p-8 sm:p-12 rounded-2xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto flex flex-col items-center'>
  
  <h1 className='text-purple-600 text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6'>
    Air Quality Locations
  </h1>

  <input 
    className='p-3 sm:p-4 w-full sm:w-64 rounded-full bg-purple-600 font-bold text-white mb-6'
    placeholder='Enter a city'
    type='text'
    value={city}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
  />

  <p 
    className='mt-2 text-base sm:text-lg text-black rounded-full text-center w-full sm:w-96 font-bold p-2'
    style={{backgroundColor: `${color}`}}
  >
    {locations} {status}
  </p> 

  <button 
    onClick={Fetcher} 
    className='text-xl sm:text-2xl mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition w-full sm:w-auto'
  >
    Search
  </button>

</div>

</div>

   
    </>
  )
}

export default Weather