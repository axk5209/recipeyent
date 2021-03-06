import React, { useState } from 'react'
import { setCurrentUserAction } from "../reducers/currentUser"
import { useDispatch } from 'react-redux'
import loginService from "../services/logins"
//import recipeService from "../services/recipes"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinkTag from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/alert';
import {
	Typography, CssBaseline
} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import GuestHeader from "./GuestHeader"
import recipeService from '../services/recipes';
import {
	Link as LinkRouter, useHistory
} from "react-router-dom"
const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	buttonBar: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
		marginLeft: "24px",
		marginRight: "0px",
		color: "white",
		fontWeight: "bold",
		"&:hover": {
			//you want this to be the same as the backgroundColor above
			backgroundColor: "#8359ff"
		}
	}
}));


const Login = function (props) {
	const history = useHistory()
	const classes = useStyles();
	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState(null)


	function onChange(event) {
		if (event.target.name === "username") {
			setUsername(event.target.value)
		}
		else if (event.target.name === "password") {
			setPassword(event.target.value)
		}
	}

	async function onSubmit(event) {
		event.preventDefault()
		const user = await loginService.login({ username: username, password: password }) //will be null if login doesn't happen
		if (user) //newUser is not null (login worked correctly)
		{
			await dispatch(setCurrentUserAction(user))
			recipeService.setToken(user.token)
			window.localStorage.setItem("currentUser", JSON.stringify(user))
			//history.push("/main")
		}
		else {
			setErrorMessage('Invalid credentials. Please try again')
		}
		setUsername('')
		setPassword('')
	}

	const googleButtonStyle = {
		width: "inherit",
		display: "inherit",
		alignItems: "inherit",
		justifyContent: "inherit"
	}
	return (
		<React.Fragment>
		<CssBaseline></CssBaseline>
		
		<GuestHeader> 
			<Button component={LinkRouter} to={"/home"} color = "inherit" className={classes.buttonBar}>Home</Button>
		</GuestHeader>
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<br></br>
				<br></br>
				<Typography variant="h3">Login Page</Typography>
				<br></br>
				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={onChange}
						value={username}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={onChange}
						value={password}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						name="login"
						className={classes.submit}
						onClick={onSubmit}
					>
						Login
          			</Button>
					{/*<GoogleLogin style = {googleButtonStyle}
						clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
						onSuccess={responseGoogle}
						isSignedIn={true}
					/>
					<br></br>
					<br></br>*/}
					<Grid container>
						<Grid item>
							<LinkTag component={LinkRouter} to="/signup" variant="body2">
								{"Don't have an account? Sign Up Here"}
							</LinkTag>
						</Grid>
					</Grid>
				</form>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		</Container>
		</React.Fragment>

	)
}


export default Login