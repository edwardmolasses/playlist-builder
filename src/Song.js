import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    margin: "10px 0"
  },
  ListItemText: {
    color: "#333",
  },
  SecondaryText: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.875rem"
  }
}));

export default function Song(props) {
  const classes = useStyles();
  const secondsMoment = moment("1900-01-01 00:00:00").add(props.duration, 'seconds');
  const hoursDuration = secondsMoment.format("HH") > 0 ? `${secondsMoment.format("H")}h` : '';
  const minutesDuration = secondsMoment.format("mm") > 0 ? `${secondsMoment.format("m")}m` : '';
  const secondsDuration = secondsMoment.format("ss") > 0 ? `${secondsMoment.format("s")}s` : '';

  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Avatar>
          <MusicNoteIcon />
        </Avatar>
      </ListItemAvatar>
      <div className={classes.ListItemText}>
        <Typography component="div">
          <div fontWeight="fontWeightBold" m={1}>
            {props.title} <span className={classes.SecondaryText}>{`${hoursDuration} ${minutesDuration} ${secondsDuration}`}</span>
          </div>
          <div fontWeight="fontWeightLight" m={1} className={classes.SecondaryText}>
            Album: {props.album}
          </div>
          <div fontWeight="fontWeightLight" m={1} className={classes.SecondaryText}>
            Artist: {props.artist}
          </div>
        </Typography>
      </div>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={props.handleClick}>
          {props.songButton}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Song.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number,
  album: PropTypes.string,
  artist: PropTypes.string,
  songButton: PropTypes.object
};