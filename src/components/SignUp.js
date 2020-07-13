import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import usersService from "../services/users"
import { useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/alert';
import {
	useHistory
} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [username, setUsername] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState(null)
	const history = useHistory()
	const dispatch = useDispatch()
	function onChange(event) {
		switch (event.target.name) {
			case "username":
				{
					setUsername(event.target.value)
					break
				}
			case "firstName":
				{
					setFirstName(event.target.value)
					break
				}
			case "lastName":
				{
					setLastName(event.target.value)
					break
				}
			case "email":
				{
					setEmail(event.target.value)
					break
				}
			case "password":
				{
					setPassword(event.target.value)
					break
				}
			default:
				{

				}
		}
	}

	//Redirects to login page if successful, otherwise displays error
	async function onSubmit(event) {
		event.preventDefault()
		if (!(username && firstName && lastName && email && password))
		{
			setErrorMessage('Please fill all the required fields.')
		}
		else 
		{
			try {
				const userInfo = await usersService.create({ username, firstName, lastName, email, password })
				history.push("/login")
			}
			catch (error) {
				setErrorMessage('This username has been taken. Please enter another username.')
			}
		} 
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<br></br>
				<Typography variant="h3">Sign Up Page</Typography>
				<br></br>
				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
				<form className={classes.form} onSubmit={onSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={onChange}
								value={firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={onChange}
								value={lastName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={onChange}
								value={username}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={onChange}
								value={email}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
          </Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Login Here
              </Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}