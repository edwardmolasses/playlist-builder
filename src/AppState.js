import React from "react";
import App from './App';
import { StateProvider } from "./StateLib";

export default function AppState() {
  const initialState = {
    songLibrary: null,
    playlists: null,
	selectedPlaylistId: null,
	openAddPlaylistInput: false
  };
	const reducer = (state, action) => {
		switch (action.type) {
			case "changeSongLibrary":
				return {
					...state,
					songLibrary: action.newSongLibrary
				};
			case "changePlaylists":
				return {
					...state,
					playlists: action.newPlaylists
				};
			case "changeSelectedPlaylistId":
				return {
					...state,
					selectedPlaylistId: action.newSelectedPlaylistId
				};
			case "changeOpenAddPlaylistInput":
				return {
					...state,
					openAddPlaylistInput: action.newOpenAddPlaylistInput
				};
			
			default:
				return state;
		}
	};
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}
