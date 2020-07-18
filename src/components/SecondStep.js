import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// Destructure props
const SecondStep = ({ handleNext, handleBack, handleChange, values: {ingredients, procedure }, filedError, isError }) => {
	// Check if all values are not empty
	const isEmpty = ingredients.length > 0 && procedure.length > 0
	return (
		<Fragment>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						multiline
						fullWidth
						label="Ingredients (line-delimited)"
						name="ingredients"
						placeholder="2/3 cups of milk, 5 tbs salt"
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
						label="Procedure (line-delimited: don't number each step)"
						name="procedure"
						placeholder={"1. Pour milk \n2. Add salt"}
						defaultValue={procedure}
						onChange={handleChange('procedure')}
						margin="normal"
						error={filedError.procedure !== ''}
						helperText={filedError.procedure !== '' ? `${filedError.procedure}` : ''}
						required
					/>
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
