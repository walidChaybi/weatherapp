"use client"
import { Card, AreaChart, Title } from "@tremor/react"
function RainChart({ data }) {
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
    "Rain (%)": data.hourly.precipitation_probability[i],
  }))

  return (
    <Card>
      <Title>Chance de pluie</Title>
      <AreaChart
        showLegend
        data={chartData}
        categories={["Rain (%)"]}
        className="mt-6"
        colors={["fuchsia"]}
      />
    </Card>
  )
}

export default RainChart
