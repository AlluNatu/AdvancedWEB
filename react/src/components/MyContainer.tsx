import { useState } from 'react';
import MyList from './MyList';

type TItem = {
    id: string,
    text: string,
    clicked: boolean
  };

function MyContainer() {
    const header: string = "this is list header"
    const [items, setItems] = useState<TItem[]>([
        {id: "1", text: 'This is first task', clicked: false},
        {id: '2', text: "This is second task", clicked: false}]); //Rakentaa state componentin. Tarkottaen sitä joka seuraa jatkuvaa muutosta. setItems on funktio joka toimii items muuttujaan.
    const [newItem, setNewItem] = useState(''); // Kuten tässä, funktio setNewItem kokoajan tallentuu newItem paikalle, kun muutos tapahtuu.

    const addItem = () => {
          const madeItem: TItem = {                  // Ymmärrät varmaa, että rakentaa uuden itemin.
            id: Math.random().toString(),
            text: newItem,     
            clicked: false                
          };
          setItems([...items, madeItem]);            // Jokaisella state componentilla on oma funktion, tässä se lisää listaan ...items uuden itemin
          setNewItem('');                       // Laittaa tekstin takaisin tyhjäksi.
      };

      function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {                    
        setNewItem(e.target.value)              // Laittaa newItem paikalle sen mitä on saanut, kun seuraa textarea päivitystä
      }

      function updateList (id: string) {
        const newList = items.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                clicked: !item.clicked,
              };
              return updatedItem;
            }
            return item;
          });
          setItems(newList);
        } //https://www.robinwieruch.de/react-update-item-in-list/
    

  return (
    <div>
        <textarea value={newItem}               // Se mitä on newItem sisällä jatkuvasti tallentuu textareaa nähtäväksi.
        onChange={handleChange}                     // Kun tapahtuu muutosta, se tallentuu välittömästi setNewItem avulla newItem paikalle.
        placeholder='Here new'></textarea>
        <button onClick={addItem}>Add item</button>
      <MyList header={header} items={items} updateList={updateList}/>
    </div>
  );
};

export default MyContainer;