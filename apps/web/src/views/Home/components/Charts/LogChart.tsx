import { Box, Text, Skeleton } from '@pancakeswap/uikit'
import { fromUnixTime } from 'date-fns'
import { useState, useMemo, memo, useEffect } from 'react'
import { ChartEntry, ProtocolData } from 'state/info/types'
import { formatAmount } from 'utils/formatInfoNumbers'
import LineChart from './LineChart'
import BeamChart from './BeamChart'

interface LogChartProps {
  chartData: ChartEntry[]
  protocolData: ProtocolData
  currentDate: string
  valueProperty: string
  title: string
  ChartComponent: typeof BeamChart | typeof LineChart
}

const LogChart = ({
  chartData,
  protocolData,
  currentDate,
  valueProperty,
  title,
  ChartComponent,
}: LogChartProps) => {
  const [hover, setHover] = useState<number | undefined>()
  const [dateHover, setDateHover] = useState<string | undefined>()

  // Getting latest data to display on top of chart when not hovered
  useEffect(() => {
    setHover(null)
  }, [protocolData])

  useEffect(() => {
    if (hover == null && protocolData) {
      setHover(protocolData[valueProperty])
    }
  }, [protocolData, hover, valueProperty])

  const formattedData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day[valueProperty],
        }
      })
    }
    return []
  }, [chartData, valueProperty])

  if (ChartComponent === BeamChart) {
    return (
      <Box p={['16px', '16px', '24px']}>
        <Box height="250px">
          <ChartComponent data={formattedData} setHoverValue={setHover} setHoverDate={setDateHover} />
        </Box>
      </Box>
    )
  }

  return (
    <Box p={['16px', '16px', '24px']}>
      <Text bold color="secondary">
        {title}
      </Text>
      {hover > -1 ? ( // sometimes data is 0
        <Text bold fontSize="24px">
          ${formatAmount(hover)}
        </Text>
      ) : (
        <Skeleton width="128px" height="36px" />
      )}
      <Text>{dateHover ?? currentDate}</Text>
      <Box height="250px">
        <ChartComponent data={formattedData} setHoverValue={setHover} setHoverDate={setDateHover} />
      </Box>
    </Box>
  )
}

export default memo(LogChart)
