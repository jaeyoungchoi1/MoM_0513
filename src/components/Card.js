import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';

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
    height:180,
    width: 400,
    objectFit: "cover"
  },
  content: {
    textAlign: "center",
  },
  divider: {
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20
  },
  subheading: {
    lineHeight: 1.8
  },
  action : {
  }
});

const getDday = (date) => {
  const Dday = new Date(2022, 1, 11);
  const gap = date.getTime() - Dday.getTime();
  return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
}

const MediaCard = (props) => {
  const classes = useStyles();
  const item = props.selectedItem;

  useEffect(() => {
    console.log(item.date);
    const Dday = new Date(2022, 1, 11);
    const gap = item.date.getTime() - Dday.getTime();
    console.log(Math.floor(gap / (1000 * 60 * 60 * 24)) * -1);
  }, []);


  return (
    <Card className={classes.card}>
      
      <CardMedia
      className={classes.media}
        component="img"
        src={props.imgUrl}
      />
      <CardContent className={classes.content}>

      <Typography 
        className={classes.heading}
        gutterBottom 
        component="div">
          {item.name}
        </Typography>
        
        <Typography
            className={classes.subheading}
            variant={"caption"}
          >
            We are going to learn different kinds of species in nature that live
            together to form amazing environment.
          </Typography>
      {console.log(item.date)}
      </CardContent>
      <CardActions>
        <Button size="small">lll</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
