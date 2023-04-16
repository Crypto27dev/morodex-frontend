import { Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'utils/formatInfoNumbers'
import { LineChartLoader } from 'components/ChartLoaders'
import { useTranslation } from '@pancakeswap/localization'

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate }: LineChartProps) => {
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
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
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
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => time.toLocaleDateString(undefined, { month: '2-digit' })}
          minTickGap={30}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => `$${formatAmount(val)}`}
          orientation="right"
          tick={{ dx: 10, fill: theme.colors.textSubtle }}
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
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
