import React, { useState, useEffect } from 'react'
import LoggedInHeader from './LoggedInHeader'
import MainRecipeList from './MainRecipeList'
import MainUsersList from './MainUsersList'

import CreatedRecipes from './CreatedRecipes'
import LoggedInHeaderButtons from './LoggedInHeaderButtons'
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core'
import { Typography, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem } from '@material-ui/core';
import { Paper } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
	createButton: {
		flexGrow: 1,
		textTransform: "none",
		color: "indigo"
	},
	message: {
		flexGrow: 1,
		fontWeight: "bold",
		color: "indigo"
	},
	subheading: {
		flexGrow: 1,
		color: "indigo",
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))
const BootstrapInput = withStyles(theme => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(3)
		}
	},
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 16,
		padding: "10px 26px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
		}
	}
}))(InputBase);

const MainDisplay = () => {
	//console.log("Main Displayed")
	const classes = useStyles()
	const currentUser = useSelector(state => {
		//console.log(state)
		return state.currentUser ? state.currentUser : null
	})
	//console.log(currentUser)
	const allUsers = useSelector(state => {
		//console.log(state)
		return state.users ? state.users : null
	})
	const allRecipes = useSelector(state => {
		//console.log(state)
		return state.recipes ? state.recipes : null
	})


	const [view, setView] = React.useState(0);
	const [search, setSearch] = useState('')

	const queuedRecipes = currentUser.queuedRecipes.map(id => allRecipes.find((item) => item.id === id))
	const favoritedRecipes = currentUser.favoritedRecipes.map(id => allRecipes.find((item) => item.id === id))
	const followedUsers = currentUser.followedUsers.map(id => allUsers.find((item) => item.id === id))
	const topRecipes = allRecipes.sort((a, b) => b.rating - a.rating)
	const topUsers = allUsers.sort((a, b) => b.followerCount - a.followerCount)
	const displayPossibilities = [topRecipes, topUsers, followedUsers, favoritedRecipes, queuedRecipes]


	const handleChange = event => {
		setView(event.target.value);
	};

	function onChangeSearch(event) {
		setSearch(event.target.value)
	}


	return (
		<div>
			<LoggedInHeader>
				<LoggedInHeaderButtons currentView="Main" />
			</LoggedInHeader>
			<br></br>
			<Container align="center">
				
				{/* <div className={classes.search}>
					<Typography display="inline" variant="h4" className={classes.message}>Search: </Typography>
					<TextField variant = "outlined" />
				</div> */}
				{/* <div className={classes.search}>
					
					<InputBase
						placeholder="Search for…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
				</div> */}
					<Box height={6} mx={0.5} width={120} display="inline">
						<div>
							<Typography display="inline" variant="h4" className={classes.message}>Search: </Typography>
							<TextField variant = "outlined" onChange = {onChangeSearch} value = {search}placeholder = "Some Name..." />
						</div>
						<br></br>
						<div>
							<Typography display="inline" variant="h4" className={classes.message}>View: </Typography>
							<FormControl>
								<Select
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									value={view}
									onChange={handleChange}
									input={<BootstrapInput />}
								>
									<MenuItem value={0}>Top Recipes</MenuItem>
									<MenuItem value={1}>Top Users</MenuItem>
									<MenuItem value={2}>Followed Users</MenuItem>
									<MenuItem value={3}>Favorited Recipes</MenuItem>
									<MenuItem value={4}>Queued Recipes</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Box>
				{/* <TextField />
      			<SearchIcon /> */}
				{/* <SearchBar></SearchBar> */}				
				
			</Container>
			{!(view === 1 || view == 2) && <MainRecipeList displayItems={displayPossibilities[view].filter(item => (item.title.includes(search) || item.tags.includes(search)))}/>}
			{(view === 1 || view == 2) && <MainUsersList displayItems={displayPossibilities[view].filter(item => (item.firstName.includes(search) || item.lastName.includes(search)))} />}
			<br></br>
			<br></br>
		</div>
	)
}

export default MainDisplay

