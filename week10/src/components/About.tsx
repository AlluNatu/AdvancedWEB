//import React from 'react';
import {useState, useEffect} from 'react';
import "../styles/About.css"

function About() {

  function showMoreFunction () {
      setItemSee(itemSee => itemSee + 12)
  }

  type TItem = {
    id: number
    title: string
    body: string
  }

  const [apiItem, setApiItem] = useState<TItem[]>([]);
  const [itemSee, setItemSee] = useState<number>(12);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => setApiItem(data))
  },[])

  return (
    <div>
      <h1>HELO THIS ABOUT</h1>
      <div className='grid-container'>
          {apiItem.slice(0,itemSee).map((item) => (
            <div key={item.id} className='grid-item'>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            </div>
          ))}
      </div>
      {itemSee < apiItem.length && (
        <button onClick={showMoreFunction}>
          Show more items
        </button>
    )}</div>
  );
};

export default About;