import React from "react";
import { useStateValue } from "./StateLib";
import ListBar from "./ListBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addPlaylistButton: {
  }
}));

export default function PlaylistBar(props) {
  const classes = useStyles();
  const [{ selectedPlaylistId }, changeSelectedPlaylistIdDispatch] = useStateValue();
  const [{ playlists }] = useStateValue();
  const [{ openAddPlaylistInput }, changeOpenAddPlaylistInputDispatch] = useStateValue();
  const selectedPlaylist = (!!playlists && typeof selectedPlaylistId === 'number') ? playlists.find(playlist => playlist.id === selectedPlaylistId) : '';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    changeSelectedPlaylistIdDispatch({
      type: "changeSelectedPlaylistId",
      newSelectedPlaylistId: index,
    });
    setAnchorEl(null);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleAddPlaylistClick = () => {
    changeOpenAddPlaylistInputDispatch({
      type: "changeOpenAddPlaylistInput",
      newOpenAddPlaylistInput: !openAddPlaylistInput,
    });
  };

  return (
    <ListBar 
      title={selectedPlaylist.name} 
      addPlaylistButton={
        <IconButton edge="end" aria-label="delete" onClick={handleAddPlaylistClick}>
          <AddCircleIcon className={classes.addPlaylistButton} />
        </IconButton>
      }
      menuButton={
        <React.Fragment>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClickMenu}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {!!playlists && playlists.map(playlist => (
              <MenuItem key={playlist.id} onClick={(event) => handleMenuItemClick(event, playlist.id)}>{playlist.name}</MenuItem>  
            ))}
          </Menu>
        </React.Fragment>
      }
    />
  );
}
