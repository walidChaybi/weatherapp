"use client"

import { Country, City } from "country-state-city"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Select from "react-select"
import { GlobeIcon } from "@heroicons/react/solid"

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}))

const CityPicker = function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const router = useRouter()

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }

  const handleSelectedCity = (option) => {
    setSelectedCity(option)
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          <Select
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((city) => ({
              value: {
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude,
                countryCode: city.countryCode,
                stateCode: city.stateCode,
              },
              label: city.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}

export default CityPicker
