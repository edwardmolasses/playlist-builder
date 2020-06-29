import React, { useEffect, useRef } from "react";
import './App.css';
import AppGrid from './AppGrid';
import TitleBar from './TitleBar';
import axios from "axios";
import { useStateValue } from "./StateLib";

export default function App() {
  const [, changeSongLibraryDispatch] = useStateValue();
  const [, changePlaylistsDispatch] = useStateValue();
  const [, changeSelectedPlaylistIdDispatch] = useStateValue();
  const isInitialMount = useRef(true);

  const getSongLibrary = () => {
    axios({
      url: "library",
      method: "get"
    }).then(result => {
      changeSongLibraryDispatch({
        type: "changeSongLibrary",
        newSongLibrary: result.data,
      });
    });
  }
  const getPlaylists = () => {
    axios({
      url: "playlist",
      method: "get"
    }).then(result => {
      changePlaylistsDispatch({
        type: "changePlaylists",
        newPlaylists: result.data,
      });
      changeSelectedPlaylistIdDispatch({
        type: "changeSelectedPlaylistId",
        newSelectedPlaylistId: 0,
      });
    });
  }

	useEffect(() => {
		if (isInitialMount.current) {
      getSongLibrary();
      getPlaylists();
			isInitialMount.current = false;
		} else {
		}
  });
  
  return (
    <div className="App">
        <TitleBar />
        <AppGrid />
    </div>
  );
}
