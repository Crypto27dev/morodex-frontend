import { Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianAxis, CartesianGrid } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'utils/formatInfoNumbers'
import { LineChartLoader } from 'components/ChartLoaders'
import { useTranslation } from '@pancakeswap/localization'

export type BeamChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const BeamChart = ({ data, setHoverValue, setHoverDate }: BeamChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={300}
        height={308}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.inputSecondary} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          tick={false}
          tickLine={false}
          minTickGap={30}
        />
        <YAxis
          dataKey="value"
          tickCount={5}
          tickLine={false}
          scale="linear"
        />
        <Tooltip
          cursor={{ stroke: theme.colors.secondary }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => {
            setHoverValue(props.payload.value)
            setHoverDate(
              props.payload.time.toLocaleString(locale, {
                year: 'numeric',
                day: 'numeric',
                month: 'short',
              }),
            )
            return null
          }}
        />
        <Area dataKey="value" type="monotone" stroke={theme.colors.secondary} fill="url(#gradient)" strokeWidth={2} />
        <CartesianAxis tick={false} />
        <CartesianGrid horizontal={true} stroke="rgba(255, 255, 255, 0.2)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default BeamChart
