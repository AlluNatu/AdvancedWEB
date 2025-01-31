import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useFetch from './useFetch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


interface IJoke {
    setup: string,
    punchline: string,
    id: number
}

interface FrontPageProps {
    saveJoke?: (joke: IJoke) => void,
  }


const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {    // SE .FC AUTTAA SIIHEN ETTÄ NE MITÄ ON SULKEIS ON SE MITÄ OTTAA VASTAA. EI SE MITÄ LÄHETTÄÄ
    let [generate, setGenerate] = useState(true);
    const url:string = "https://official-joke-api.appspot.com/random_joke"
    const {data, loading, error} = useFetch(url, generate)
    const convertedData: IJoke = data as IJoke

    function handleClick(){
        setGenerate(!generate)
    }

    function handleClickSave () {
      if (saveJoke) {
        saveJoke(convertedData)
      }
    }


  return (
    <>
        <Button onClick={handleClick} variant="outlined">GetJoke</Button>
        <Button onClick={handleClickSave} variant="outlined">Save</Button>
        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        {convertedData && (
                    <Card key={convertedData.id} style={{ margin: "20px auto", maxWidth: 400 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5">{convertedData.setup}</Typography>
                      <Typography variant="body1" style={{ marginTop: "10px" }}>
                        {convertedData.punchline}
                      </Typography>
                    </CardContent>
                  </Card>
        )}
    </>
  )
}


export default FrontPage