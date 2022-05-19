import React from "react";
import { useState, useRef } from "react";
import Drawer from "react-bottom-drawer";
import DrawerContent from "./DrawerContent";
import {
  Fab,
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
  Modal,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { firestorage, firestore } from "../firebase";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import Detail from "./Detail";
import Memoriebox from "./Memoriebox";
import SearchBar from "./SearchBar";
import Autocomplete, {usePlacesWidget} from "react-google-autocomplete";
import { Opacity } from "@material-ui/icons";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import "../styles.css";
import { CenterFocusStrong } from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import defaultImage from '../image/default.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

React.useLayoutEffect = React.useEffect;

const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {
    setInput("");
    setFile("");
    setAttachment(null);
    setInputPlace();
    setPlaceName();
    setDate(new Date());
    setOpen(false);
  };


  const [input, setInput] = useState("");
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState(null);
  //const [selected, setSelected] = useState();
  const [inputPlace, setInputPlace] = useState();
  const [placeName, setPlaceName] = useState();

  const [date, setDate] = useState(new Date());
  const handleChange = (newValue) => {
    setDate(newValue);
  };


  const addPlace = async (event) => {
    event.preventDefault();
    let attachmentUrl = null;

    if (attachment !== null) {
      const attachmentRef = firestorage.ref().child("image/" + file);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await firestore.collection("places").add({
      name: input,
      position: { latitude: inputPlace.geometry.location.lat(), longitude: inputPlace.geometry.location.lng() },
      imgUrl: attachmentUrl,
      date: date,
      placeName: placeName,
    });

    setInput("");
    setFile("");
    setAttachment(null);
    setInputPlace();
    setPlaceName();
    setDate(new Date());
  };

  const updateInfo = () => {
    firestore.collection("places").doc(props.info.id).set(
      {
      name: input,
      position: { latitude: inputPlace.geometry.location.lat(), longitude: inputPlace.geometry.location.lng() },
      date: date,
      placeName: placeName,
      },
      { merge: true }
    );
    setInput("");
    setInputPlace();
    setPlaceName();
    setDate(new Date());
    setModalOpen(false);
  };

  const onClearAttachment = () => {
    setAttachment(null);
    setFile("");
  };



  const inputRef = useRef(null);
  const { ref: materialRef } = usePlacesWidget({
    apiKey: "AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY",
    options: {
      types: [],
      componentRestrictions: { country: "KR" },
    },
  });


  const photoInput = useRef(null);
  const handleClick = () => {
    photoInput.current.click();
  };







  const [modalOpen, setModalOpen] = useState(false);
  const [editInput, setEditInput] = useState();
  const [editInputPlace, setEditInputPlace] = useState();
  const [editPlaceName, setEditPlaceName] = useState();
  const [editDate, setEditDate] = React.useState(new Date());


  return (
    <div className="base">
      {/*<center>
        <Box sx={{ bottom: 0, textAlign: "center", pt: 1 }}>
          <Button onClick={openDrawer}>여기를 누르세요</Button>
          <Button onClick={save}>저장</Button>
        </Box>
        <Fab
          disabled={isVisible ? true : false}
          onClick={openDrawer}
          color="secondary"
          aria-label="add"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        ></Fab>
  </center>*/}
        <Fab
          onClick={handleClickOpen}
          aria-label="favorite"
          sx={{ background: "#F9CEEE", position: "absolute", bottom: 16, right: 16, zIndex:5 }}
        >
          <FavoriteBorderOutlinedIcon sx={{color:"#fff"}}/>
        </Fab>

        <Dialog 
          PaperProps={{ sx: { background: "#CCF3EE", borderRadius:"10px" } }}
        open={open} onClose={handleClose}>
          <DialogTitle sx={{textAlign:"center", fontFamily: "'Gowun Batang', serif"}}>새로운 추억</DialogTitle>
          <DialogContent className="dialogContainer" sx={{display:"flex", height:"200px", maxWidth:"350px", justifyContent:"space-between"}}>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <Input 
              autoFocus
              margin="dense"
              placeholder="어떤 추억인가요?"
              fullWidth
              variant="standard"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />

            <Input
                fullWidth
                color="secondary"
                placeholder={inputPlace?placeName:null}
                inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                  <Autocomplete
                  
                    apiKey={"AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY"}
                    {...props}
                    onPlaceSelected={(selected) => {
                      setInputPlace(selected)
                      setPlaceName(selected.name)
                      console.log(selected);
                    }}
                    options={{
                      types: [],
                      fields: ["place_id", "geometry", "name"],
                      componentRestrictions: { country: "KR" },
                    }}
                  />
                )}
              />

            <LocalizationProvider dateAdapter={AdapterDateFns} 
                  >
                <MobileDatePicker
                sx={{fontFamily: "'Gowun Batang', serif"}}
                  variant="standard"
                  //label="pick date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} variant="standard"/>}
                />
            </LocalizationProvider>
            </Box>

            <Box sx={{display:"flex", width:"50px", alignItems:"center", marginLeft:"20px", marginRight:"10px"}}>
            {!attachment&&(
            <Button sx={{height:"50px", background:"#97C4B8", color:"#fff", '&:hover': {
              background: "#5b887c",}}}
            onClick={handleClick}>
              <AddPhotoAlternateOutlinedIcon sx={{fontSize:"medium"}}/>
            </Button>
            )
            }

                <input
                  style={{display:"none"}}
                  ref={photoInput}
                  type="file"
                  value={file}
                  onChange={(event) => {
                    const {
                      target: { files, value },
                    } = event;
                    const theFile = files[0];
                    const reader = new FileReader();
                    setFile(value);
                    reader.onloadend = (finishedEvent) => {
                      const {
                        currentTarget: { result },
                      } = finishedEvent;
                      setAttachment(result);
                    };
                    reader.readAsDataURL(theFile);
                  }}
                />
                {attachment && (
                  <Box>
                    <img
                      src={attachment}
                      width="65px"
                      height="65px"
                      alt="attachment"
                      objectFit= "cover"
                    />
                    <Button sx={{background:"#97C4B8", color:"#fff", '&:hover': {
                  background: "#5b887c",}}}
                    onClick={onClearAttachment}>Clear</Button>
                  </Box>
                )}
            </Box>
            
                
          </DialogContent>
          <DialogActions>
            <Button sx={{color:"black"}}onClick={handleClose}>Cancel</Button>
            <Button
            disabled={!input||!inputPlace} //! 인풋값이 없을 경우 기능이 작동하지 않도록!
            type="submit"
            variant="contained"
            sx={{background:"#97C4B8", '&:hover': {
              background: "#5b887c",
           },}}
            
            onClick={(event)=>{addPlace(event); handleClose();}}
          >
            add
          </Button>
          </DialogActions>
        </Dialog>


      
      <img className="arrow-button"
      
      onClick={openDrawer}
      alt = "arrow" src={require("../image/arrow_button.gif").default} />
      
      <Drawer
        duration={250}
        hidebars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
        className="drawer"
      >
        <div className="drawer-content">
          <ul>
            {/*props.places.map((place, index) => {
              return (
                <Typography
                  sx={{ p: 2, color: "text.secondary" }}
                  key={index}
                  onClick={(e) => {
                    closeDrawer();
                    props.onClick(e, place);
                  }}
                >
                  {place.name}번째 장소
                </Typography>
              );
            })*/}
          </ul>



          
          

          <List sx={{marginLeft:"10px", marginRight:"10px"}}>
            {props.infos.map((info, index) => (
              <>
              <Memoriebox info={info} index={index} onClick={(e) => {
                    closeDrawer();
                    props.onClick(e, info);
                    
                  }}/>
        

                
                  
                
              </>
            ))}
          </List>

        </div>
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
