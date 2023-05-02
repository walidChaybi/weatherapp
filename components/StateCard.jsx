"use client"

import { Card, Metric, Text } from "@tremor/react"

export default function StateCard({ title, metric, color }) {
  return (
    <Card decoration="top" decorationColor={color}>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  )
}
