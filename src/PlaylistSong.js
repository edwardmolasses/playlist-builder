import React from "react";
import Song from "./Song";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "./StateLib";
import axios from "axios";

export default function PlaylistSong(props) {
  const [{ playlists }, changePlaylistsDispatch] = useStateValue();
  const [{ selectedPlaylistId }] = useStateValue();
  const removeSongFromPlaylist = (event) => {
    let newPlaylist = playlists[selectedPlaylistId].songs;
    newPlaylist.splice(props.index, 1);

    axios({
      url: `playlist/${selectedPlaylistId}`,
      method: "post",
      data: { "name": playlists[selectedPlaylistId].name, "songs": newPlaylist },
    }).then((result) => {
      if (result.data.id === selectedPlaylistId) {
        playlists[selectedPlaylistId] = {
          id: playlists[selectedPlaylistId].id,
          name: playlists[selectedPlaylistId].name,
          songs: newPlaylist,
        }
        changePlaylistsDispatch({
          type: "changePlaylists",
          newPlaylists: playlists,
        });
      }
    });
  };

  return (
    <Song {...props} handleClick={removeSongFromPlaylist} songButton={<DeleteIcon />} />
  );
}
