import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import {
	Link
} from "react-router-dom"
import LinkTag from '@material-ui/core/Link';

var HeaderLogo = require('./headerLogo.png')

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
	},
	title: {
		flexGrow: 1,
		fontWeight: "bold"
	},
}));

export default function GuestHeader(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" >
				<CssBaseline />

				<Toolbar>
					<LinkTag component={Link} to="/home">
						<img src={HeaderLogo} style ={{maxWidth: "60px"}}/>
					</LinkTag>
					<Typography variant="h4" className={classes.title}>
						ecipeyent
					</Typography>
				  &nbsp;
					{props.children}
				</Toolbar>
			</AppBar>
		</div>
	);
}