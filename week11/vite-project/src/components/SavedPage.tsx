import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import useJokes  from "../hooks/useJokes"
import Button from '@mui/material/Button';



interface IJoke {
    setup: string,
    punchline: string,
    id: number
}


interface SavedPageProps {
    savedJokes: IJoke[],
    updateList: (joke: number) => void
}


const SavedPage: React.FC<SavedPageProps> = ({ savedJokes, updateList }) => {    // SE .FC AUTTAA SIIHEN ETTÄ NE MITÄ ON SULKEIS ON SE MITÄ OTTAA VASTAA. EI SE MITÄ LÄHETTÄÄ

    return (
        <div>
        {savedJokes.length === 0 ? (
            <Typography>No saved jokes yet.</Typography>
        ) : (
            savedJokes.map((joke) => (
            <Card key={joke.id} style={{ margin: '10px 0' }}>
                <CardContent>
                <Typography variant="h6">{joke.setup}</Typography>
                <Typography variant="body1">{joke.punchline}</Typography>
                </CardContent>
                <Button onClick={() => updateList(joke.id)} variant="outlined">Delete</Button>
            </Card>
            ))
        )}
        </div>
    );
};

export default SavedPage;