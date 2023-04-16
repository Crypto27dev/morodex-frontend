import { useMemo, ReactElement } from 'react'

interface Props {
  text: string
  element: ReactElement
  keyword: string
}

const TransWithElement: React.FC<React.PropsWithChildren<Props>> = ({ text, element, keyword }) => {
  const [head, tail] = useMemo(() => {
    return text.split(keyword)
  }, [text, keyword])

  return (
    <>
      {head}
      {element}
      {tail}
    </>
  )
}

export default TransWithElement
