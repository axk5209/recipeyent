import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
	uploadButton: {
		backgroundColor: "cyan"
	},
}));

// Destructure props
const SecondStep = ({handleNext, handleBack, handleChange, values: {ingredients, procedure, pictureInput, previewSource}, filedError, isError }) => {
	// Check if all values are not empty
	const classes = useStyles()
	const isEmpty = ingredients.length > 0 && procedure.length > 0 && previewSource
	return (
		<Fragment>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						multiline
						fullWidth
						label="Ingredients (line-delimited)"
						name="ingredients"
						placeholder={"2/3 cups of milk\n5 tbs salt"}
						defaultValue={ingredients}
						onChange={handleChange('ingredients')}
						margin="normal"
						error={filedError.ingredients !== ''}
						helperText={filedError.ingredients !== '' ? `${filedError.ingredients}` : ''}
						required
					/>
				</Grid>
				
				<Grid item xs={12}>
					<TextField
						fullWidth
						multiline
						label="Procedure (line-delimited: don't number steps)"
						name="procedure"
						placeholder={"Pour milk \nAdd salt"}
						defaultValue={procedure}
						onChange={handleChange('procedure')}
						margin="normal"
						error={filedError.procedure !== ''}
						helperText={filedError.procedure !== '' ? `${filedError.procedure}` : ''}
						required
					/>
				</Grid>

				<Grid item container xs={12} justify="center" >
					<div className={classes.root}>
						<input
							accept="image/*"
							className={classes.input}
							id="contained-button-file"
							multiple
							type="file"
							name="picture"
							onChange={handleChange("picture")}
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
			<div style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}>
				<Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 20 }}>
					Back
				</Button>
				<Button variant="contained" disabled={!isEmpty || isError} color="primary" onClick={handleNext}>
					Next
				</Button>
			</div>
		</Fragment>
	)
}

export default SecondStep
