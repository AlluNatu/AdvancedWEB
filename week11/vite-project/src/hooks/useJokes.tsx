import { useState } from 'react'

interface IJoke {
    setup: string,
    punchline: string,
    id: number
}

const useJokes = () => {
    const [savedJokes, setSavedJokes] = useState<IJoke[]>([])

    const saveJoke = (joke:IJoke) => {            
        setSavedJokes([...savedJokes, joke])
    };

    const deleteJoke = (id: number) => {
        console.log(id);
        
        const newList = savedJokes.filter((joke) => joke.id !== id);
        setSavedJokes(newList);
    }


  return {saveJoke, savedJokes, deleteJoke}
}

export { useJokes };