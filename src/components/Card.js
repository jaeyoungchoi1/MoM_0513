import React, { useState, useEffect } from "react";
import {Card, Box
} from "@mui/material";
import Stack from '@mui/material/Stack';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import { firestore } from "../firebase";
import { borderRadius } from "@mui/system";
import defaultImage from '../image/default.png'


const useStyles = makeStyles({
  card: {
    padding: 0,
    maxWidth: 400,
    height: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    width:275,
    height:180,
    objectFit: "cover"
  },
  content: {

    marginTop:-3,
    position: "relative", 
    padding: 20, 
    height: 80,
    fontFamily: "'Gowun Batang', serif",
  },
  divider: {
  },
  dDay: {
    position: "absolute",
  left: "0",
  top: "-25px",
  height: "25px",
  padding: "0 15px",
  color: "#FFF",
  fontSize: "11px",
  lineHeight: "25px",
  textTransform: "uppercase",
  backgroundColor: "#97C4B8",
  borderTopLeftRadius:"5px",
  borderTopRightRadius:"5px"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    
  },
  subheading: {
    lineHeight: 1.8
  },
  action : {
  },
  button : {
    alignItems: "center",
    fontFamily: "'Gowun Batang', serif",
  },
  
  x : {
    position: "absolute",
    top: "4px",
    right: "4.5px",
    width: "25px",
    height: "25px",
    color: "#FFF",
    //lineHeight: "13px",
    backgroundColor: "white",
    opacity:"40%",
    borderRadius: "50%"
  },
  cardfooter : {
    position: "absolute",
  bottom: "20px",
  left: "20px",
  right: "20px",
  fontSize: "11px",
  color: "#A3A9AB",
  },
  info : {
    margin:0,
    display: 'inline-block'
  }
});


const MediaCard = (props) => {
  const classes = useStyles();
  const item = props.selectedItem;
/*
  const [dDay, setDDay] = useState();

  
  const getDday = (date) => {
    const Dday = new Date("Jan 11, 2022");
    const gap = item.date - Dday;
    
    console.log(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
    return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
  }

  useEffect(() => {
    console.log(item.date.toDate());
    const Dday = new Date("Jan 11, 2022");
    const gap = item.date - Dday;
    setDDay(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
  }, []);
*/
  const show = (e, item) => {
    console.log(item.name);
  };

  return (
    <Card className={classes.card}>

      <Box className={classes.x} />
      
      <CardMedia
      className={classes.media}
        component="img"
        src={item.imgUrl?item.imgUrl:defaultImage}
      />
      <CardContent className={classes.content}>
    <Box className={classes.dDay}>
    💕{props.dDay>=0?" +":" "}{props.dDay}
    </Box>
      <Typography 
        className={classes.heading}
        gutterBottom 
        component="div">
          {item.name}
        </Typography>
        
        <Stack className={classes.cardfooter}>
          <Typography className={classes.info}>
          💕+{props.dDay}
          </Typography>
          <Typography className={classes.info}>
          {props.dDay}
          </Typography>
        </Stack>

      </CardContent>
      {/*<CardActions className={classes.button}>
        <Button >D+{props.dDay}</Button>
        <Button >Learn More</Button>
      </CardActions>*/
  }
    </Card>
  );
};

export default MediaCard;
