import React from "react";
import { useEffect, useState } from "react";
import Drawer from "react-bottom-drawer";
import DrawerContent from "./DrawerContent";
import {
  Fab,
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
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
import { isReturnStatement } from "typescript";

const BottomDrawer = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

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

  return (
    <div className="base">
      <center>
        <Box sx={{ bottom: 0, textAlign: "center", pt: 1 }}>
          <Button onClick={openDrawer}>여기를 누르세요</Button>
          <Button
            onClick={(e) => {
              save(e);
            }}
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
          <ul>
            {props.infos.map((info, index) => {
              return (
                <Typography key={index}>
                  {info.name}
                </Typography>
              )
            })}
          </ul>
        </div>

        <DrawerContent />
      </Drawer>
    </div>
  );
};

export default BottomDrawer;
