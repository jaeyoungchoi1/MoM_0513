import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import { firestore } from "../firebase";


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
    height:200,
    width: 400,
    objectFit: "cover"
  },
  content: {
    textAlign: "center",
    
    fontFamily: 'Gowun Batang',
  },
  divider: {
  },
  heading: {
    marginTop: 2,
    fontWeight: "bold",
    fontSize: 23,
    
  },
  subheading: {
    lineHeight: 1.8
  },
  action : {
  },
  button : {
    alignItems: "center",
    fontFamily: 'Gowun Batang',
  },
  info : {
    direction: "row",
    spacing : 2
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
      
      <CardMedia
      className={classes.media}
        component="img"
        src={item.imgUrl}
      />
      <CardContent className={classes.content}>

      <Typography 
        className={classes.heading}
        gutterBottom 
        component="div">
          {item.name}
        </Typography>
        
        <Stack className={classes.info}>
          <Typography style={{display: 'inline-block'}}>
          💕+{props.dDay}
          </Typography>
          <Typography style={{display: 'inline-block'}}>
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
