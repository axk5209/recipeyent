import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import StepForm from './StepForm'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import LoggedInHeaderButtons from "./LoggedInHeaderButtons"
import LoggedInHeader from "./LoggedInHeader"

const styles = theme => ({
	appBar: {
		position: 'relative',
		paddingRight: 10,
		paddingLeft: 10
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(8),
			marginBottom: theme.spacing(8),
			padding: theme.spacing(3)
		}
	}
})

const App = ({ classes }) => {
	return (
		<div className="App">
			<CssBaseline />
			<LoggedInHeader>
					<LoggedInHeaderButtons currentView = "Dashboard"/>
			</LoggedInHeader>
			<main className={classes.layout}>
				<Typography variant="h4" align="center" style={{ marginTop: 80 }}>
					Create Recipe
				</Typography>
				<Paper className={classes.paper}>
					<StepForm />
				</Paper>				
			</main>
		</div>
	)
}

App.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
