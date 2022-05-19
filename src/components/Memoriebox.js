import React from "react";

import { useState } from "react";
import {
    Modal,
    Box,
    List,
    ListItem,
    ListItemText,
    Input,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions
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
import defaultImage from '../image/default.png'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editName, setEditName] = useState();
  const info = props.info;
  const index = props.index;
  const onClick = props.onClick;

  const updateInfo = () => {
    firestore.collection("places").doc(props.info.id).set(
      {
        name: editName,
      },
      { merge: true }
    );
    setModalOpen(false);
  };

  return (
      <>
      <Card height="100" sx={{borderRadius:"10px", marginBottom:"8px"}}>
                  <CardActionArea onClick={onClick}>
                    <CardMedia component="img"  height="100" image={info.imgUrl?info.imgUrl:defaultImage} sx={{filter:"brightness(80%)"}}/>
                    <CardContent  sx={{ width:'100%', p:"20px", '&:last-child': { pb: 0 }, position:"absolute", 
                    top:"14px", display:"flex", flexDirection:"row", color:"#fff", alignItems:"center",
                    fontWeight: "bold", fontSize:"13px", justifyContent:"space-between"}}>
                      <Box sx={{width:50}}>
                        # {index+1}
                      </Box>
                      <Box sx={{width:300,display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                        <Box>{info.name}</Box>
                        <Box sx={{fontWeight:"normal", fontSize:"10px"}}>{info.toDate}</Box>
                      </Box>
                      <Box sx={{width:100}}>
                        💕{info.dDay>=0?" +":" "}{info.dDay}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ p:"0px", '&:last-child': { pb: 0 },float:"right", background:"#F9F3EE"}}>
                    <Button sx={{ minWidth:"1px", opacity:"50%"}} onClick={(e) => setModalOpen(true)}>
                      <EditIcon color="action" fontSize="small"/>
                    </Button>
                    <Button sx={{ minWidth:"1px", opacity:"50%"}}>
                      <DeleteIcon color="action" fontSize="small" onClick={(event) =>
            firestore.collection("places").doc(props.info.id).delete()
            }/>
                    </Button>
                  </CardActions>
                </Card>
        <Modal open={modalOpen} onClose={(e) => setModalOpen(false)}>
            <Box sx = {style} >
                <h1>수정하기</h1>
                <Input
                placeholder={props.info.name}
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                />
                <Button onClick={(e) => updateInfo()}>update</Button>
                <Button onClick={(e)=>setModalOpen(false)}>닫기</Button>
            </Box>
        </Modal>
        
      </>
      
  );
};

export default Memoriebox;



