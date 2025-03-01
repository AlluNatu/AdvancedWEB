import './App.css'
import {useState} from "react"

type TBook = {
  name: string,
  author: string,
  pages: number
}

function App() {

  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [pages, setPages] = useState<string>('');

  const handlebuttonSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const newBook: TBook = {
      name: name,
      author: author,
      pages: parseInt(pages)
    }

    try {
      const response = await fetch('/api/book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setName('');
        setAuthor('');
        setPages('');
      } else {
        console.log('Error submitting book:', response);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };


  return (
    <>
      <h1>books</h1>
      <div>
        <label>Book Name</label>
        <input
          type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Author</label>
        <input
          type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label>Pages</label>
        <input
          type="number" id="pages" value={pages} onChange={(e) => setPages(e.target.value)}
        />
      </div>

      <div>
        <button type="submit" id="submit" onClick={handlebuttonSubmit}>Submit</button>
      </div>
    </>
  )
}

export default App
