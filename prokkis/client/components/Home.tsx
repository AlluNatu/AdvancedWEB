import React, { useEffect, useState } from 'react'
import NoteCard  from "./noteCard"
import { Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ResponsiveFont from './responsiveTypo';
import PopUp from './popUp';
import PopUpColumn from './PopUpColumn';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

// Setup interfaces, because typescript is more fun with these

interface IComment{
  text: string,
  createdat: Date
}

interface INote {
  title: string;
  content: string;
  status: string;
}

interface INoteCard {
  _id: string;
  title: string;
  content: string;
  createdat: Date;
  userID: string;
  status: string;
  comments: IComment[];
}

interface IColumn {
  name: string;
}

interface IColumnCard {
  _id: string;
  name: string;
}

function Home() {
  // Usestates to use later
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<INoteCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<IColumnCard[]>([]);

  // Check if token is there rightaway. If not go back to login LOGIN CHECK
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      window.location.href = '/login'
      return
    }
    setToken(storedToken)
  }, []);

  // Get all notesandcolumns from user. Has token for reason that user gets their own notes and columns
  useEffect(() => {
    if (!token) return
    else {
      fetch('http://localhost:3001/api/getNotesandColumns', {
        headers: {
          'Content-Type': 'application/json',
          method: "GET",
          'Authorization': `Bearer ${token}`
        }})
        .then((res) => res.json()).then((data) => {
        console.log(data);
        if (data.error) {
          window.location.href = '/login'
        } else {
          setLoading(false)
          setItems(data.notesList)
          setColumns(data.columnsList)
          console.log(data);
          
        }
      })
  }
  }, [token]);

  if (loading) {
    return null
  }

  // Function to handle when note is dropped. Puts it to the other column
  // And checks new status for it for the backend, so it can be put to the right column on next render
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("id");
      const updatedItems = items.map((item: INoteCard) => {
        if (item._id === id) {
          return { ...item, status: status };
        }
        return item;
      });
      setItems(updatedItems);
      if (token) {
        fetch('http://localhost:3001/api/updateNoteStatus', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id, status }),
        })
        .then(res => res.json())
        .then(data => {
          console.log("Status updated:", data);
        })
        .catch(err => {
          console.error("Failed to update status:", err);
        });
      }
    };
    

    // Deletes note. Takes it from items and backend database
    function deleteCard (id: string) {
      console.log(id);
      
      const newList = items.filter((item) => item._id !== id);
      fetch('http://localhost:3001/api/noteDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
      ,})
        .then((res) => res.json()).then((data) => {
          console.log(data);
          setItems(newList);
        })
      }

      // Function to move noteup. Checks that the note is not on the top already
      // Then changes the position indexes with the one on top
      // Then renders the change and sends new data to backend to save into db
      function moveNoteUp (id: string) {
        const noteIndex = items.findIndex((item) => item._id === id);
        if (noteIndex > 0) {
          const updatedItems = [...items];
          [updatedItems[noteIndex], updatedItems[noteIndex - 1]] = [updatedItems[noteIndex - 1], updatedItems[noteIndex]];
          setItems(updatedItems);
          if (token) {
            fetch('http://localhost:3001/api/updateNotePositionUp', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ id, position: noteIndex - 1, positionLast: noteIndex, updatedItems: updatedItems }),
            })
            .then(res => res.json())
            .then(data => {
              console.log("Position updated:", data);
            })
            .catch(err => {
              console.error("Failed to update position:", err);
            });
          }
        }
      }
      

      // Same as move note up but reverse. Checks that is not the last and etc....
        function moveNoteDown (id: string) {
          const noteIndex = items.findIndex((item) => item._id === id);
          if (noteIndex < items.length - 1) {
            const updatedItems = [...items];
          [updatedItems[noteIndex], updatedItems[noteIndex + 1]] = [updatedItems[noteIndex + 1], updatedItems[noteIndex]];
          setItems(updatedItems);
          if (token) {
            fetch('http://localhost:3001/api/updateNotePositionUp', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ id, position: noteIndex + 1, positionLast: noteIndex, updatedItems: updatedItems }),
            })
            .then(res => res.json())
            .then(data => {
              console.log("Position updated:", data);
            })
            .catch(err => {
              console.error("Failed to update position:", err);
            });
          }
        }
      }
  

      // Adds column. Gives a popup where user gives column a name
      // After adding renders the new column and sends it to backend to save into db
      const addColumn = (newColumn: IColumn) => {
        if (columns.some(col => col.name === newColumn.name)) {
          alert("A column with this name already exists");
          return;
        }
        const cool = newColumn
        fetch('http://localhost:3001/api/addColumn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(cool),})
          .then((res) => res.json()).then((data) => {
            console.log(data);
            setColumns([...columns, data.sendColumn])
          })
      };

      // Almost the same as addcolumn but lets the user give the note status from current columns
      // And ofcourse title and content, then send it to db
      const addNote = (newNote: INote) => {
        if (!newNote.status){
          alert("Cannot make a new note without column")
          return
        }
        const cool = newNote
        console.log("Sending new note:", cool);
        fetch('http://localhost:3001/api/addNote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(cool),})
          .then((res) => res.json()).then((data) => {
            console.log(data);
            setItems([...items, data.sendNote])
          })
      };

      // Deletes column. Finds the right column by id
      // Takes it from the list of columns
      // Sends data to backend to delete from db.
      // Deletes all notes at the same time from db and items
      function deleteColumn(id: string, status:string) {
        console.log(id);
        const newList = columns.filter((column) => column._id !== id);
        const newCardList = items.filter((item) => item.status !== status);
        fetch('http://localhost:3001/api/deleteColumn', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({id, status})
        ,})
          .then((res) => res.json()).then((data) => {
            console.log(data);
            setColumns(newList);
            setItems(newCardList);
          })
    }

    // Change name of column
    // When iconbutton clicked opens prompt and gives user ability to change name
    // If no name given does nothing
    // If given finds old column, gives new name, renders it
    // Then sends all data to backend where it can change the data for future
    function changeName(id: string, status:string){
       const newName = prompt("Enter new name for the column");
       if (newName === null || newName === "") {
        return;
      }
      if (columns.some(col => col.name === newName)) {
        alert("A column with this name already exists");
        return;
      }      
      const updatedColumns = columns.map((column) =>
        column._id === id ? { ...column, name: newName } : column
      );

      const updatedItems = items.map((item) =>
        item.status === status ? { ...item, status: newName } : item
      );    
      setColumns(updatedColumns);
      setItems(updatedItems);
      if (token) {
        fetch('http://localhost:3001/api/changeName', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id, name: newName, status }),
        })
        .then(res => res.json())
        .then(data => {
          console.log("Name updated:", data);
        })
        .catch(err => {
          console.error("Failed to update name:", err);
        });
      }
    }

    // Add comment to note
    // Opens prompt where one can make a comment
    // If no text does nothing
    // If text finds the correct note with id
    // Gives it a comment, as all notes have a array for comments
    // Sets the items to render
    // And sends data to backend for db data change
    function addComment(id: string) {
      const newCommentText = prompt("Enter new comment");
      if (!newCommentText) return;
    
      const newComment: IComment = {
        text: newCommentText,
        createdat: new Date()
      };
    
      const updatedItems = items.map(item => {
        if (item._id === id) {
          return { ...item, comments: [...item.comments, newComment] };
        }
        return item;
      });
      setItems(updatedItems);
    
      if (token) {
        fetch('http://localhost:3001/api/addComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id, comment: newCommentText }),
        })
        .catch(err => {
          console.error("Failed to add comment:", err);
        });
      }
    }
    

  return (
    <>
    <Box sx={{ p: 0.5 }}>
      <Grid sx={{ 
        // Create a grid to use for columns
      }} container direction={"row"} columns={36}>
        {/* Map all of the columns from data and columnslist to render on screen */}
        {/* All of them are identified by a key which is the columns own id */}
        {columns.map((column, index) => {
          // Give each column a columnItems array where notes for each column are saved
          const columnItems = items.filter(item => item.status === column.name)
          return (
            <Grid 
              key={column._id}
              sx={{
                borderRight: index < columns.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"
              }} 
              size="grow"
            >
              {/* Make the column a div for the user can drop notes here */}
              {/* Given minheight so it isnt as small as the text or the first note, makes easier */}
              <div id='columnDiv'
                onDrop={(e) => handleDrop(e, column.name)} 
                onDragOver={(e) => e.preventDefault()}
                style={{ minHeight: "80vh" }}
              >
                {/* Column name and its buttons render */}
                <ResponsiveFont text={column.name} variantText='h3'/>
                <IconButton onClick={() => {changeName(column._id, column.name)}} id='changeName' aria-label="settings" size="small">
                  <SettingsIcon fontSize="inherit"/>
                </IconButton>
                <IconButton onClick={() => {deleteColumn(column._id, column.name)}} id='deleteColumn' aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>
                {/* Map all the notes from the column to render */}
                {/* All of them are identified by a key which is the notes own id */}
                {/* One can see that has pointers to different functions that are earlier mentioned */}
                {columnItems.map((item: INoteCard) => (
                  <NoteCard 
                    key={item._id} 
                    title={item.title} 
                    content={item.content} 
                    status={item.status} 
                    id={item._id}
                    comments={item.comments}
                    deleteCard={deleteCard}
                    moveNoteDown={moveNoteDown}
                    moveNoteUp={moveNoteUp}
                    addComment={addComment}
                    createdat={item.createdat}
                  />
                ))}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
    {/* Popup buttons for user to add note or column */}
    <PopUp columns={columns} addNote={addNote}/>
    <PopUpColumn addColumn={addColumn}/>
  </>
  )}

export default Home