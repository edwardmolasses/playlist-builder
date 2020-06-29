import React from "react";
import Playlist from './Playlist';
import Library from './Library';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PlaylistListBar from './PlaylistListBar';
import LibraryListBar from './LibraryListBar';
import AddPlaylistForm from './AddPlaylistForm';
import { useStateValue } from "./StateLib";
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '40px 20px 0 20px',
  },
  paper: {
    padding: "0 16px 10px 16px",
    marginTop: "15px",
    textAlign: 'center',
    backgroundColor: "rgba( 255,255, 255, 0.1)",
    color: "white",
    borderRadius: "5px",
    maxHeight: "556px",
  }
}));

export default function AppGrid(props) {
  const classes = useStyles();
  const [{ openAddPlaylistInput }] = useStateValue();
  const [{ songLibrary }] = useStateValue();

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <LibraryListBar />
            {!!songLibrary && (
              <Paper className={classes.paper}>
                <Library />
              </Paper>
            )}
          </Grid>
          <Grid item xs={6}>
            <PlaylistListBar />
            <Collapse in={openAddPlaylistInput}>
              <AddPlaylistForm />
            </Collapse>
            {!!songLibrary && (
              <Paper className={classes.paper}>
                <Playlist  />
              </Paper>
            )}
          </Grid>
        </Grid>
    </div>
  );
}
