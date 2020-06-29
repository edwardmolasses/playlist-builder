import React from "react";
import SongList from "./SongList";
import LibrarySong from "./LibrarySong";
import { useStateValue } from "./StateLib";

export default function Library(props) {
  const [{ songLibrary }] = useStateValue();

  return !!songLibrary && (
    <SongList {...props} songListItem={<LibrarySong />} songList={songLibrary} />
  );
}
