import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch currency data')
                }
                
                const result = await response.json()
                setData(result[currency] || {})
            } catch (err) {
                setError(err.message)
                // Set fallback data for common currencies
                setData({
                    usd: 1,
                    eur: 0.92,
                    gbp: 0.79,
                    inr: 83.12,
                    jpy: 149.50,
                    cad: 1.36,
                    aud: 1.53,
                    chf: 0.88,
                    cny: 7.24,
                    rub: 92.50
                })
            } finally {
                setLoading(false)
            }
        }

        fetchCurrencyData()
    }, [currency])

    return { data, loading, error }
}

export default useCurrencyInfo;
