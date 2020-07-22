import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkTag from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import usersService from "../services/users"
import uploadsService from "../services/uploads"

import { useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/alert';
import {
	useHistory
} from 'react-router-dom'
import GuestHeader from "./GuestHeader"
import {
	Link as LinkRouter
} from "react-router-dom"

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
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: 'none',
	},
	uploadButton: {
		backgroundColor: "cyan"
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [username, setUsername] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [pictureInput, setPictureInput] = useState('')
	const [previewSource, setPreviewSource] = useState('')

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
			case "picture":
				{
					const picture = event.target.files[0]
					previewPicture(picture)
				}
			default:
				{

				}
		}
	}

	const previewPicture = (picture) => {
		const reader = new FileReader()
		reader.readAsDataURL(picture)
		reader.onloadend = () => {
			setPreviewSource(reader.result)
		}
	}

	const uploadImage = async (base64EncodedImage) => {
		try {
			const newFileInfo = await uploadsService.create({file: base64EncodedImage })
			const pictureId = newFileInfo.pictureId 
			return pictureId
		}
		catch (error) {
			console.error(error)
		}
	}

	//Redirects to login page if successful, otherwise displays error
	async function onSubmit(event) {
		event.preventDefault()
		if (!(username && firstName && lastName && email && password && previewSource)) {
			setErrorMessage('Please fill all the required fields.')
		}
		else {
			try {
				const pictureId = await uploadImage(previewSource)
				const userInfo = await usersService.create({ username, firstName, lastName, email, password, pictureId })
				history.push("/login")
			}
			catch (error) {
				setErrorMessage('This username has been taken. Please enter another username.')
			}
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<GuestHeader>
				<Button component={LinkRouter} to={"/home"} variant="contained" className={classes.menuButton}>Home</Button>
			</GuestHeader>
			<Container component="main" maxWidth="xs">

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
							<Grid item container xs={12} justify="center" >
								{
									previewSource &&
									<div>
										<img src={previewSource} alt="chosen" style={{ height: "350px", width: "300px" }} />
										<br></br>
										<br></br>
									</div>
								}
								<div className={classes.root}>
									<input
										accept="image/*"
										className={classes.input}
										id="contained-button-file"
										multiple
										type="file"
										name="picture"
										onChange={onChange}
										value={pictureInput}
									/>
									<label htmlFor="contained-button-file">
										<Button variant="contained" className={classes.uploadButton} component="span" color="secondary" align="center">
											{previewSource ? "Change Pic" : "Upload Pic"}
										</Button>
									</label>
								</div>
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
								<LinkTag component={LinkRouter} to="/login" variant="body2">
									Already have an account? Login Here
              					</LinkTag>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</React.Fragment>
	);
}