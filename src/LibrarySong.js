import React from "react";
import Song from './Song';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useStateValue } from "./StateLib";
import axios from "axios";

export default function LibrarySong(props) {
  const [{ playlists }, changePlaylistsDispatch] = useStateValue();
  const [{ selectedPlaylistId }] = useStateValue();

  const addSongToPlaylist = (event) => {
    playlists[selectedPlaylistId].songs.push(props.id);

    axios({
      url: `playlist/${selectedPlaylistId}`,
      method: "post",
      data: { "name": playlists[selectedPlaylistId].name, "songs": playlists[selectedPlaylistId].songs },
    }).then((result) => {
      if (result.data.id === selectedPlaylistId) {
        playlists[selectedPlaylistId] = {
          id: playlists[selectedPlaylistId].id,
          name: playlists[selectedPlaylistId].name,
          songs: playlists[selectedPlaylistId].songs,
        }
        changePlaylistsDispatch({
          type: "changePlaylists",
          newPlaylists: playlists,
        });
      }
    });
  };

  return (
    <Song {...props } handleClick={addSongToPlaylist} songButton={<AddCircleIcon />} />
  );
}
