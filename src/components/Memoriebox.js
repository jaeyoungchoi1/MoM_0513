import React from "react";

import { useState } from "react";
import {
    Modal,
    Box,
    List,
    ListItem,
    ListItemText,
    Input,
    Button
} from "@mui/material"
import { firestore } from "../firebase";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Memoriebox = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateInfo = () => {
    firestore.collection("places").doc(props.info.id).set(
      {
        name: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
      <>
        <Modal open={open} onClose={(e) => setOpen(false)}>
            <Box sx = {style} >
                <h1>fix it!</h1>
                <Input
                placeholder={props.info.name}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                />
                <Button onClick={(e) => updateInfo()}>update</Button>
                <Button onClick={(e)=>setOpen(false)}>닫기</Button>
            </Box>
        </Modal>
        <List className="todolist-entry">
            <ListItem className="todo-inputbox">

            <ListItemText
                primary={props.info.name}
                secondary="마감 기한"
            ></ListItemText>
            </ListItem>
            <Button className="update-button" onClick={(e) => setOpen(true)}>
            수정
            </Button>
        </List>
        <div className="delete-button">
        <DeleteForeverIcon
            onClick={(event) =>
            firestore.collection("places").doc(props.info.id).delete()
            }
        />
        </div>
      </>
      
  );
};

export default Memoriebox;



