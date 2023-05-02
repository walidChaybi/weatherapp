"use client"
import { Card, AreaChart, Title } from "@tremor/react"
function TempChart({ data }) {
  //Prendre juste les 24 premiere heures
  const hourly = data?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("fr-FR", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24)

  const chartData = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": data.hourly.uv_index[i],
    "Temperature (C)": data.hourly.temperature_2m[i],
  }))

  return (
    <Card>
      <Title>Temperature and UV index</Title>
      <AreaChart
        showLegend
        data={chartData}
        categories={["UV Index", "Temperature (C)"]}
        className="mt-6"
        colors={["indigo", "cyan"]}
      />
    </Card>
  )
}

export default TempChart
