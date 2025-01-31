import {useEffect, useState} from 'react'

const useFetch = (url: string, generate:boolean) => {
    const [data, setdata] = useState<unknown>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {

        const abortCTRL: AbortController = new AbortController()
        

        const fetchData = async () => {
            try {
                const response: Response = await fetch(url, {signal: abortCTRL.signal})
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }
                const data: unknown = await response.json()

                setdata(data)
                setLoading(false)

            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (error.name === "AbortError") {
                        console.log("Fetch aborted");
                    } else {
                        setError(error.message)
                        setLoading(false)
                    }
                }
            }        
        }
        fetchData()
        return () => abortCTRL.abort()
    }, [generate])


  return {data, loading, error}
}


export default useFetch

