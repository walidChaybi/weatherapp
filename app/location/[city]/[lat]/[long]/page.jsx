"use client"

import CalloutCard from "@/components/CalloutCard"
import InfoPanel from "@/components/InfoPanel"
import RainChart from "@/components/RainChart"
import StateCard from "@/components/StateCard"
import TempChart from "@/components/TempChart"
import { useEffect, useState } from "react"
import getBasePath from "../../../../../util/getBasePath"
import cleanData from "../../../../../util/cleanData"
function WeatherPage({ params: { city, lat, long } }) {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchdata = async () => {
      const weatherData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=Europe%2FLondon`
      )
      const res = await weatherData.json()
      setData(res)
    }
    fetchdata()
  }, [])
  useEffect(() => {
    if (data) {
      const {
        current_weather,
        timezone,
        hourly,
        hourly_units,
        timezone_abbreviation,
      } = data

      const handleGPT = () => {
        const res = fetch(`${getBasePath()}/api/getWeatherCummary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weatherData: {
              current_weather,
              timezone,
              hourly,
              hourly_units,
              timezone_abbreviation,
            },
          }),
        })
          .then((res) => res.json)
          .then((res) => GPTdata)

        const { content } = res
        return content
      }
      const content = handleGPT()
      console.log(content)
    }
  }, [data])

  return (
    data && (
      <div className="flex flex-col min-h-screen md:flex-row">
        <InfoPanel city={city} lat={lat} long={long} data={data} />
        <div className="flex-1 p-5 lg:p-10">
          <div className="p-5">
            <div className="pb-5">
              <h2 className="text-xl font-bold">Today's Overview</h2>

              <p className="text-sm text-gray-400">
                Last Updated at : {data.current_weather.time} {data.timezone}
              </p>
            </div>
            <div className="m-2 mb-10">
              <CalloutCard message="Chat GPT summary" />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StateCard
              title="Maximum Temperature"
              metric={`${data.daily.temperature_2m_max[0]} °C`}
              color="yellow"
            />

            <StateCard
              title="Minimum Temperature"
              metric={`${data.daily.temperature_2m_min[0]} °C`}
              color="green"
            />
            <div>
              <StateCard
                title="UV Index"
                metric={`${data.daily.uv_index_max[0]} `}
                color="rose"
              />
              {Number(data.daily.uv_index_max[0]) > 5 && (
                <CalloutCard message="Uv too high, be aware" warning />
              )}
            </div>

            <div className="flex space-x-3">
              <StateCard
                title="Wind Speed"
                metric={`${data.current_weather.windspeed} m/s`}
                color="blue"
              />
              <StateCard
                title="Wind Direction"
                metric={`${data.current_weather.winddirection}°`}
                color="violet"
              />
            </div>
          </div>
          <hr className="mb-5" />
          <div className="space-y-3">
            <TempChart data={data} />
            <RainChart data={data} />
            {/*TempChart */}
            {/*TempChart */}
          </div>
        </div>
      </div>
    )
  )
}

export default WeatherPage
