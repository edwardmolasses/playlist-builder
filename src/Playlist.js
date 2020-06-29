import React from "react";
import SongList from "./SongList";
import { useStateValue } from "./StateLib";
import PlaylistSong from "./PlaylistSong";

export default function Playlist(props) {
  const [{ songLibrary }] = useStateValue();
  const [{ selectedPlaylistId }] = useStateValue();
  const [{ playlists }] = useStateValue();
  const selectedPlaylist =
    !!playlists && typeof selectedPlaylistId === "number"
      ? playlists.find((playlist) => playlist.id === selectedPlaylistId)
      : "";
  // TODO: put this in useEffect to only update on library or playlist change
  const playlistSongs = !!songLibrary && !!selectedPlaylist && songLibrary.reduce((acc, song) => {
    const librarySong = song;
    if (selectedPlaylist.songs.includes(librarySong.id)) {
      const accIndices = selectedPlaylist.songs.map((playlistSongId, index) => playlistSongId === librarySong.id ? index : []).flat();
      accIndices.forEach(index => acc[index] = librarySong);
    }
    return acc;
  }, []);

  return !!playlistSongs && (
    <SongList {...props} songListItem={<PlaylistSong />} songList={playlistSongs} />
  );
}
