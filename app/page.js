"use client"

import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#003387] p-10 flex flex-col justify-center items-center">
      <Card>
        <Text className="text-6xl font-bold text-center mb-10">Weather AI</Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAi, NextJs 13, Tremor
        </Subtitle>
        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#003387]">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
