import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ResponsiveFont from './responsiveTypo';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import moment from "moment"

interface IComment{
  text: string,
  createdat: Date
}

// Props that are must given on the NoteCard
// These help keepup on different components so that user knows that all needed is coming or not coming
interface NoteCardProps {
  title: string;
  content: string;
  status: string
  id: string
  comments: IComment[]
  createdat: Date
  deleteCard: (id:string) => void
  moveNoteUp: (id:string) => void
  moveNoteDown: (id:string) => void
  addComment: (id:string) => void
}

const NoteCard: React.FC<NoteCardProps> = ({title, content, id, comments, createdat, deleteCard, moveNoteDown, moveNoteUp, addComment}) => {
  console.log(comments);
  
  // Returns only a component, no functions here only calls/pointers to them
  return (
    <div draggable id='cardDiv'
    onDragStart={(e) => {
      e.dataTransfer.setData("id", id);
    }}>
    <Card sx={{
      marginBottom: 2, 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%'
      }}>
    <CardContent>
      {/* Responsivefont made by me to make sure that the text is responsive */}
      <ResponsiveFont text={title} variantText='h5'/>
      <ResponsiveFont text={content} variantText='body2'/>
      <ResponsiveFont text={moment(createdat).format('DD/MM/YYYY')} variantText='body2'/>
      <ResponsiveFont text={"Comments:"} variantText='body2'/>
      {/* Check that there is comments
          If there is it renders them under the given note */}
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <ResponsiveFont key={index} text={moment(comment.createdat).format('DD/MM/YYYY') + "   " +comment.text} variantText='body2' />
          ))
          ) : (
            <ResponsiveFont text="No comments yet" variantText='body2' />
          )}
          <IconButton id='commentIcon' onClick={() => addComment(id)} aria-label="comment" size="small">
        <AddCommentIcon fontSize="inherit"/>
          </IconButton>
    </CardContent>
    {/* These are the buttons that are used to move the note up or down or delete the note */}
    {/* They are all IconButton components from Material UI */}
    <IconButton id='deleteNoteCard' onClick={() => deleteCard(id)} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit"/>
      </IconButton>
      <IconButton onClick={() => moveNoteUp(id)} id='noteUp' aria-label="up" size="small">
        <KeyboardArrowUpIcon fontSize="inherit"/>
      </IconButton>
      <IconButton onClick={() => moveNoteDown(id)} id='noteDown' aria-label="down" size="small">
        <KeyboardArrowDownIcon fontSize="inherit"/>
      </IconButton>
  </Card>
  </div>
  )
}

export default NoteCard