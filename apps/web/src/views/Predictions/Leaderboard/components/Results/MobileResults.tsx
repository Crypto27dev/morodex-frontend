import { Box } from '@pancakeswap/uikit'
import { PredictionUser } from 'state/types'
import MobileRow from './MobileRow'

interface MobileResultsProps {
  results: PredictionUser[]
}

const MobileResults: React.FC<React.PropsWithChildren<MobileResultsProps>> = ({ results }) => {
  return (
    <Box mb="24px">
      {results.map((result, index) => (
        <MobileRow key={result.id} rank={index + 4} user={result} />
      ))}
    </Box>
  )
}

export default MobileResults
