import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStateValue } from "./StateLib";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  addPlaylistInputContainer: {
    marginTop: '20px'
  },
  addPlaylistInput: {
    '& .MuiInputBase-root': {
      backgroundColor: "white"
    },
    '& .MuiFormLabel-root': {
      backgroundColor: "white"
    },
  },
  addPlaylistButton: {
    height: "56px",
    backgroundColor: "#3db4d1",
    color: "#333",
    marginLeft: "10px",
    '&:hover': {
      backgroundColor: "#33a0ba"
    },
    '& .MuiButton-label': {
      color: "white"
    },
  },
  cancelButton: {
    height: "56px",
    marginLeft: "10px",
    backgroundColor: "#737677",
    '&:hover': {
      backgroundColor: "#33a0ba"
    },
    '& .MuiButton-label': {
      color: "white"
    },
    '&:hover': {
      backgroundColor: "#a7a9aa"
    },
  }
}));

export default function AddPlaylistForm(props) {
  const classes = useStyles();
  const [playlistName, setPlaylistName] = React.useState('');
  const [{ playlists }, changePlaylistsDispatch] = useStateValue();
  const [, changeSelectedPlaylistIdDispatch] = useStateValue();
  const [{ openAddPlaylistInput }, changeOpenAddPlaylistInputDispatch] = useStateValue();

  const handlePlaylistNameChange = (event, val) => {
    // TODO: add validation to this input
    if (event.target.value) {
      setPlaylistName(event.target.value);
    }
  }
  const handleAddPlaylist = () => {
    const emptyPlaylist = [];
    if (playlistName) {
      axios({
        url: `playlist`,
        method: "post",
        data: { "name": playlistName, "songs": emptyPlaylist },
      }).then((result) => {
        if (result.data.id) {
          playlists.push({
            id: result.data.id,
            name: playlistName,
            songs: emptyPlaylist
          });
          changePlaylistsDispatch({
            type: "changePlaylists",
            newPlaylists: playlists,
          });
          changeOpenAddPlaylistInputDispatch({
            type: "changeOpenAddPlaylistInput",
            newOpenAddPlaylistInput: false,
          });
          changeSelectedPlaylistIdDispatch({
            type: "changeSelectedPlaylistId",
            newSelectedPlaylistId: result.data.id,
          });
        }
      });
    }
  }
  const handleCancel = () => {
    changeOpenAddPlaylistInputDispatch({
      type: "changeOpenAddPlaylistInput",
      newOpenAddPlaylistInput: false,
    });
  }

  return (
    <form className={classes.addPlaylistInputContainer}>
      <TextField id="addPlaylist" label="Add Playlist" variant="outlined" className={classes.addPlaylistInput} onChange={handlePlaylistNameChange} />
      <Button variant="contained" color="primary" disableElevation onClick={handleAddPlaylist} className={classes.addPlaylistButton}>
        Add Playlist
      </Button>
      <Button variant="contained" disableElevation onClick={handleCancel} className={classes.cancelButton}>
        Cancel
      </Button>
    </form>
  );
}
