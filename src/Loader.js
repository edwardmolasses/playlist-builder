import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontStyle: "bold",
    color: "white"
  }
}));

function Loader(props) {
  const classes = useStyles();

	return (
		<div className={classes.root}>Loading...</div>
	);
}

export default Loader;
