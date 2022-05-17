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
  TextField
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
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import "../styles.css";
import { CenterFocusStrong } from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

React.useLayoutEffect = React.useEffect;

const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};


  const [input, setInput] = useState("");
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState();
  //const [selected, setSelected] = useState();
  const [inputPlace, setInputPlace] = useState();
  const [lat, setLat] = useState(37.5);
  const [lng, setLng] = useState(127);

  const [date, setDate] = React.useState(new Date());
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const save = (e) => {
    setDoc(
      doc(firestore, "places", "3"),
      {
        name: "3",
        position: "ddd",
      },
      { merge: true }
    );

    /*
    firestore.collection("places").addDoc({
      name: "3",
      location: "ddd"
    })
    .then((docRef) => {
      console.log("가능", docRef.id);
    })
    .catch((error) => {
      console.log("안됨", error);
    });*/
  };

  const addPlace = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = firestorage.ref().child("image/" + file);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await firestore.collection("places").add({
      name: input,
      position: { latitude: inputPlace.geometry.location.lat(), longitude: inputPlace.geometry.location.lng() },
      imgUrl: attachmentUrl,
      date: date,
    });

    setInput("");
    setFile("");
    setAttachment();
    setLat(37.5);
    setLng(127);
    setInputPlace();
    setDate(new Date())
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
          color="secondary"
          aria-label="favorite"
          sx={{ position: "absolute", bottom: 16, right: 16, zIndex:5 }}
        >
          <FavoriteTwoToneIcon />
        </Fab>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{textAlign:"center"}}>새로운 추억</DialogTitle>
          <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="추억의 이름"
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
                placeholder={inputPlace?inputPlace.formatted_address:null}
                inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                  <Autocomplete
                    apiKey={"AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY"}
                    {...props}
                    onPlaceSelected={(selected) => {
                      setInputPlace(selected)
                      const selectedLat = selected.geometry.location.lat();
                      const selectedLng = selected.geometry.location.lng();
                      setLat(selectedLat);
                      setLng(selectedLng);
                      console.log(selected, selectedLat, selectedLng, lat, lng);
                    }}
                    options={{
                      types: [],
                      componentRestrictions: { country: "KR" },
                    }}
                  />
                )}
              />

            <Input
              fullWidth
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
              <div>
                <img
                  src={attachment}
                  width="50px"
                  height="50px"
                  alt="attachment"
                />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}

            <LocalizationProvider dateAdapter={AdapterDateFns} 
                  >
                <MobileDatePicker
                  variant="standard"
                  label="pick date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} variant="standard"/>}
                />
            </LocalizationProvider>
                
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
            disabled={!input} //! 인풋값이 없을 경우 기능이 작동하지 않도록!
            type="submit"
            variant="contained"
            color="primary"
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

          

          <ul>
            {props.infos.map((info, index) => (
              <>
                <Typography
                  sx={{ p: 2, color: "text.secondary" }}
                  key={index}
                  onClick={(e) => {
                    closeDrawer();
                    props.onClick(e, info);
                    
                  }}
                >
                  {info.name}
                </Typography>
                <Memoriebox info={info} onClick={props.onClick} />
              </>
            ))}
          </ul>

          <List>
            {props.infos.map((info, index) => {
              return (
                <ListItem key={index}>
                  <ListItemText>{info.name}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
