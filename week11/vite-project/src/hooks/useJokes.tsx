import { useState } from 'react'

interface IJoke {
    setup: string,
    punchline: string,
    id: number
}

const useJokes = () => {
    const [jokes, setJokes] = useState<IJoke[]>([])

    const saveJoke = (joke:IJoke) => {            
        setJokes([...jokes, joke])
    };

    const updateList = (id: number) => {
        console.log(id);
        
        const newList = jokes.filter((joke) => joke.id !== id);
        setJokes(newList);
    }


  return {saveJoke, jokes, updateList}
}

export default useJokes