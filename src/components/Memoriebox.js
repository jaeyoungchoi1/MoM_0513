import React from "react";

import { useState, useRef } from "react";
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
  CardActions,
  TextField,
} from "@mui/material";
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
import defaultImage from "../image/default.png";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Autocomplete from "react-google-autocomplete";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "../styles.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import imageCompression from "browser-image-compression";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Memoriebox = (props) => {
  
  const info = props.info;
  const index = props.index;
  const onClick = props.onClick;
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(info.name);
  const [attachment, setAttachment] = useState(info.imgUrl);
  const [inputPlace, setInputPlace] = useState();
  const [placeName, setPlaceName] = useState(info.placeName);
  const [date, setDate] = useState(info.date);

  const updateInfo = () => {
    firestore.collection("places").doc(props.info.id).set(
      {
        name: name,
      },
      { merge: true }
    );
    setModalOpen(false);
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const photoInput = useRef(null);
  const handleClick = () => {
    photoInput.current.click();
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };


  return (
    <>
      <Card height="100" sx={{ borderRadius: "10px", marginBottom: "8px" }}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="100"
            image={info.imgUrl ? info.imgUrl : defaultImage}
            sx={{ filter: "brightness(80%)" }}
          />
          <CardContent
            sx={{
              width: "100%",
              p: "20px",
              "&:last-child": { pb: 0 },
              position: "absolute",
              top: "14px",
              display: "flex",
              flexDirection: "row",
              color: "#fff",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "13px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: 50 }}># {index + 1}</Box>
            <Box
              sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box>{info.name}</Box>
              <Box sx={{ fontWeight: "normal", fontSize: "10px" }}>
                {info.toDate}
              </Box>
            </Box>
            <Box sx={{ width: 100 }}>
              💕{info.dDay >= 0 ? " +" : " "}
              {info.dDay}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            p: "0px",
            "&:last-child": { pb: 0 },
            float: "right",
            background: "#F9F3EE",
          }}
        >
          <Button
            sx={{ minWidth: "1px", opacity: "50%" }}
            onClick={(e) => setModalOpen(true)}
          >
            <EditIcon color="action" fontSize="small" />
          </Button>
          <Button sx={{ minWidth: "1px", opacity: "50%" }}>
            <DeleteIcon
              color="action"
              fontSize="small"
              onClick={(event) =>
                firestore.collection("places").doc(props.info.id).delete()
              }
            />
          </Button>
        </CardActions>
      </Card>
      <Modal open={modalOpen} onClose={(e) => setModalOpen(false)}>
        <Box sx={style}>
          <h1>수정하기</h1>
          <Input
            autoFocus
            margin="dense"
            placeholder="어떤 추억인가요?"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
{/*
            <Input
              fullWidth
              color="secondary"
              placeholder={placeName}
              inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                <Autocomplete
                  apiKey={"AIzaSyBU-hDVtV5lNXc4jsnr0AIaUAUcMylVhpY"}
                  {...props}
                  onPlaceSelected={(selected) => {
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

          */}




          <Button onClick={(e) => updateInfo()}>update</Button>
          <Button onClick={(e) => setModalOpen(false)}>닫기</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Memoriebox;
