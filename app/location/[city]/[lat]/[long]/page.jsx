"use client"

import CalloutCard from "@/components/CalloutCard"
import { useEffect, useState } from "react"

function WeatherPage({ params: { city, lat, long } }) {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchdata = async () => {
      const weatherData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=Europe%2FLondon`
      )
      const res = await weatherData.json()
      setData(res)
      console.log(res.current_weather.time)
    }
    fetchdata()
  }, [])

  console.log(data)
  return (
    <div>
      {/*<InfoPanel /> */}
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's Overview</h2>
            {data && (
              <p className="text-sm text-gray-400">
                Last Updated at : {data.current_weather.time} {data.timezone}
              </p>
            )}
          </div>
          <div>
            <CalloutCard message="this is where GPT 4 summary" warning />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
