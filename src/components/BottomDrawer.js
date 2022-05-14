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
} from "@mui/material";
import Typography from "@mui/material/Typography";
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
import Detail from "./Detail";
import Memoriebox from "./Memoriebox"

React.useLayoutEffect=React.useEffect



const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);
  
  const [input, setInput] = useState("");

  const save = (e) => {
    setDoc(
      doc(firestore, "places", "3"),
      {
        name: "3",
        location: "ddd",
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

  const addPlace = (event) => {
    event.preventDefault();
    firestore.collection("places").add({
      name: input,
    });
  
    setInput("");
  };

  return (
    <div className="base">
      <center>
        <Box sx={{ bottom: 0, textAlign: "center", pt: 1 }}>
          <Button onClick={openDrawer}>여기를 누르세요</Button>
          <Button
            onClick={save}
          >
            저장
          </Button>
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

          <FormControl>
            <InputLabel>입력하시오..!</InputLabel>
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </FormControl>
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
            {props.infos.map((info) => (
              <Memoriebox info={info} />
            ))}
          </ul>


          <List>
            {props.infos.map((info, index) => {
              return (
                <ListItem key={index}>
                <ListItemText>
                  {info.name}
                </ListItemText>
                </ListItem>
              )
            })}
          </List>
        </div>

        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
