import { MoonIcon, SunIcon } from "@heroicons/react/solid"
import Image from "next/image"
import CityPicker from "./CityPicker"
import weatherCodetoString from "../util/weatherCodetoString"
function InfoPanel({ city, lat, long, data }) {
  return (
    <div className="bg-gradient-to-br from-[#003358] to-[#183b7e] p-10">
      <div className="pb-5">
        <h1 className="text-white text-4xl font-bold ">{city.slice(0, 10)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />

      <div className="text-white mt-5 flex items-center justify-between space-x-10">
        <div className="text-white">
          <p className="text-xl">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        </div>
        <p className="text-xl font-bold ">
          {new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5" />
      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodetoString[data.current_weather.weathercode].icon
            }.png`}
            alt="weather icon"
            width={75}
            height={75}
          />
          <div className="text-white flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">{`${data.current_weather.temperature}°C`}</p>
            <p className="text-right font-extralight">
              {weatherCodetoString[data.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#003788] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="text-white font-extralight">Sunrise</p>
            <p className="text-2xl">
              {new Date(data.daily.sunrise[0]).toLocaleTimeString("fr-FR", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-4 py-3 border border-[#003788] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex-1 flex justify-between items-center">
            <p className="text-white font-extralight">Sunset</p>
            <p className="text-2xl">
              {new Date(data.daily.sunset[0]).toLocaleTimeString("fr-FR", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
