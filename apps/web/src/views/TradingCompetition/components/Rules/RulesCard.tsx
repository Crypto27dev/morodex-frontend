import { Heading, Card, CardBody } from '@pancakeswap/uikit'

const RulesCard: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
  return (
    <Card mb="16px">
      <CardBody>
        <Heading textAlign="center" color="secondary" mb="16px">
          {title}
        </Heading>
        {children}
      </CardBody>
    </Card>
  )
}

export default RulesCard
