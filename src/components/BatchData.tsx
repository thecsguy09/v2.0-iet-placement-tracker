import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface BatchDataProps {
  batch: string
}

export default function BatchData({ batch }: BatchDataProps) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/batch/${batch}`)
  }, [batch, navigate])

  return null
}
