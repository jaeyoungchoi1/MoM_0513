import React from "react";
import { useState } from "react";
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

React.useLayoutEffect = React.useEffect;

const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

  const [input, setInput] = useState("");
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState();

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
      position: { latitude: 37.509, longitude: 127.03 },
      imgUrl: attachmentUrl,
    });

    setInput("");
    setFile("");
    setAttachment();
  };

  const onClearAttachment = () => {
    setAttachment(null);
    setFile("");
  };

  return (
    <div className="base">
      <center>
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
      </center>

      <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
        className="drawer"
      >
        <div className="drawer-content">
          <ul>
            {props.places.map((place, index) => {
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
            })}
          </ul>

          <FormGroup>
            <InputLabel>입력하시오..!</InputLabel>
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
            <Input
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
            ></Input>
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
          </FormGroup>

          <Button
            disabled={!input} //! 인풋값이 없을 경우 기능이 작동하지 않도록!
            type="submit"
            onClick={addPlace}
            variant="contained"
            color="primary"
          >
            add
          </Button>

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
