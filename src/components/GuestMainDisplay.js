import React, { useState, useEffect } from 'react'
import GuestHeader from './GuestHeader'
import MainRecipeList from './MainRecipeList'
import MainUsersList from './MainUsersList'


import { Container } from '@material-ui/core'
import { Typography, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import HomeHeaderButtons from './HomeHeaderButtons'
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
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
	
}));
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

const GuestMainDisplay = (props) => {
	//console.log("Main Displayed")
	const classes = useStyles()
	let displayPossibilities 

	const allUsers = useSelector(state => {
		//console.log(state)
		return state.users ? state.users: null
	})
	const allRecipes = useSelector(state => {
		//console.log(state)
		return state.recipes ? state.recipes: null
	})
	
	const topRecipes = allRecipes
	const topUsers = allUsers

	displayPossibilities = [topRecipes, topUsers]
	
	const [view, setView] = React.useState(props.view ? props.view : 0);
	const [search, setSearch] = useState('')
	useEffect(() => {
		window.scrollTo(0,0)
	}, [])
	const handleChange = event => {
		setView(event.target.value);
	};

	function onChangeSearch(event) {
		setSearch(event.target.value)
	}
	return (
		<div>
			<GuestHeader>
				<HomeHeaderButtons/>
			</GuestHeader>
			<br></br>
			<Container align = "center">
				<Box height={6} mx={0.5} width={120} display="inline">
					<div>
						<Typography display="inline" variant="h4" className={classes.message}>Search: </Typography>
						<TextField variant = "outlined" onChange = {onChangeSearch} value = {search}placeholder = "Some Name..." />
					</div>
					<br></br>
					<div>
						<Typography display = "inline" variant = "h4" className = {classes.message}>View: </Typography>
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
							</Select>
						</FormControl>
					</div>
				</Box>
			</Container>
			<br></br>
			{!(view === 1) && <MainRecipeList displayItems={displayPossibilities[view].filter(item => (item.title.toLowerCase().includes(search.toLowerCase()) || item.tags.find(tag => tag.title.includes(search.toLowerCase()))))}/>}
			{(view === 1) && <MainUsersList displayItems={displayPossibilities[view].filter(item => (item.firstName.toLowerCase().includes(search.toLowerCase()) || item.lastName.toLowerCase().includes(search.toLowerCase())))}/>}
			<br></br>
			<br></br>
		</div>
	)
}

export default GuestMainDisplay

