// https://itnext.io/react-hooks-tutorial-on-developing-a-custom-hook-for-data-fetching-8ad5840db7ae
import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (response.ok) {
          const dataRes = await response.json()
          setData(dataRes)
        } else {
          setError(new Error(response.statusText))
        }
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    })()
  }, [url])
  return { error, loading, data }
}

export default useFetch
