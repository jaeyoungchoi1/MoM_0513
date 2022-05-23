import React from "react";
import { useState, useRef } from "react";
import Drawer from "react-bottom-drawer";
import {
  Fab,
  Button,
  Box,
  Input,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { firestorage, firestore } from "../firebase";
import Memoriebox from "./Memoriebox";
import Autocomplete from "react-google-autocomplete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "../styles.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import imageCompression from "browser-image-compression";
import  {v4 as uuidv4} from "uuid";

React.useLayoutEffect = React.useEffect;

const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setAttachment(null);
    setInputPlace();
    setPlaceName();
    setDate(new Date());
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [attachment, setAttachment] = useState(null);
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
      const attachmentRef = firestorage.ref().child("image/" + uuidv4());
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    await firestore.collection("places").add({
      name: name,
      position: {
        latitude: inputPlace.geometry.location.lat(),
        longitude: inputPlace.geometry.location.lng(),
      },
      imgUrl: attachmentUrl,
      date: date,
      placeName: placeName,
    });

    setName("");
    setAttachment(null);
    setInputPlace();
    setPlaceName();
    setDate(new Date());
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  const photoInput = useRef(null);
  const handleClick = () => {
    photoInput.current.click();
  };

  const options = {
    maxSizeMB: 0.4,
    maxWidth: 700,
  };

  return (
    <div className="base">
      <Fab
        onClick={handleClickOpen}
        aria-label="favorite"
        sx={{
          background: "#F9CEEE",
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 5,
        }}
      >
        <FavoriteBorderOutlinedIcon sx={{ color: "#fff" }} />
      </Fab>

      <Dialog
        PaperProps={{ sx: { background: "#CCF3EE", borderRadius: "10px" } }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontFamily: "'Gowun Batang', serif" }}
        >
          새로운 추억
        </DialogTitle>
        <DialogContent
          className="dialogContainer"
          sx={{
            display: "flex",
            height: "200px",
            maxWidth: "350px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Input
              autoFocus
              margin="dense"
              placeholder="어떤 추억인가요?"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <Input
              fullWidth
              color="secondary"
              placeholder={inputPlace ? placeName : null}
              inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                <Autocomplete
                  apiKey={"AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY"}
                  {...props}
                  onPlaceSelected={(selected) => {
                    setInputPlace(selected);
                    setPlaceName(selected.name);
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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                sx={{ fontFamily: "'Gowun Batang', serif" }}
                variant="standard"
                //label="pick date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "50px",
              alignItems: "center",
              marginLeft: "20px",
              marginRight: "10px",
            }}
          >
            {!attachment && (
              <Button
                sx={{
                  height: "50px",
                  background: "#97C4B8",
                  color: "#fff",
                  "&:hover": {
                    background: "#5b887c",
                  },
                }}
                onClick={handleClick}
              >
                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "medium" }} />
              </Button>
            )}

            <input
              style={{ display: "none" }}
              ref={photoInput}
              type="file"
              onChange={async (event) => {
                const theFile = event.target.files[0];
                const compressedFile = await imageCompression(theFile, options);
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onloadend = (finishedEvent) => {
                  const {
                    currentTarget: { result },
                  } = finishedEvent;
                  setAttachment(result);
                };
              }}
            />
            {attachment && (
              <Box>
                <img
                  src={attachment}
                  width="65px"
                  height="65px"
                  alt="attachment"
                  objectFit="cover"
                />
                <Button
                  sx={{
                    background: "#97C4B8",
                    color: "#fff",
                    "&:hover": {
                      background: "#5b887c",
                    },
                  }}
                  onClick={onClearAttachment}
                >
                  Clear
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!name || !inputPlace} //! 인풋값이 없을 경우 기능이 작동하지 않도록!
            type="submit"
            variant="contained"
            sx={{
              background: "#97C4B8",
              "&:hover": {
                background: "#5b887c",
              },
            }}
            onClick={(event) => {
              addPlace(event);
              handleClose();
            }}
          >
            add
          </Button>
        </DialogActions>
      </Dialog>

      <img
        className="arrow-button"
        onClick={openDrawer}
        alt="arrow"
        src={require("../image/arrow_button.gif").default}
      />

      <Drawer
        duration={250}
        hidebars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
        className="drawer"
      >
        <div className="drawer-content">
          <List sx={{ marginLeft: "10px", marginRight: "10px" }}>
            {props.infos.map((info, index) => (
              <>
                <Memoriebox
                  info={info}
                  index={index}
                  onClick={(e) => {
                    closeDrawer();
                    props.onClick(e, info);
                  }}
                />
              </>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
