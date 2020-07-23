import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// Destructure props
const FirstStep = ({
	handleNext,
	handleChange,
	values: { title, tags, cookTime, preparationTime },
	filedError,
	isError
}) => {
	// Check if all values are not empty
	const isEmpty = title.length > 0 && preparationTime.length > 0 && cookTime.length > 0

	return (
		<Fragment>
			<Grid container spacing={2} noValidate>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Title"
						name="title"
						placeholder="Recipe name"
						defaultValue={title}
						onChange={handleChange('title')}
						margin="normal"
						error={filedError.title !== ''}
						helperText={filedError.title !== '' ? `${filedError.title}` : ''}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Tags"
						name="tags"
						placeholder="fun, quirky, spicy"
						defaultValue={tags}
						onChange={handleChange('tags')}
						margin="normal"
						error={filedError.tags !== ''}
						helperText={filedError.tags !== '' ? `${filedError.tags}` : ''}
						/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Cook Time (min)"
						name="cookTime"
						placeholder="40"
						type="cookTime"
						defaultValue={cookTime}
						onChange={handleChange('cookTime')}
						margin="normal"
						error={filedError.cookTime !== ''}
						helperText={filedError.cookTime !== '' ? `${filedError.cookTime}` : ''}
						required
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Prep Time (min)"
						name="preparationTime"
						placeholder="15"
						type="preparationTime"
						defaultValue={preparationTime}
						onChange={handleChange('preparationTime')}
						margin="normal"
						error={filedError.preparationTime !== ''}
						helperText={filedError.preparationTime !== '' ? `${filedError.preparationTime}` : ''}
						required
					/>
				</Grid>
			</Grid>
			<div style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}>
				<Button variant="contained" disabled={!isEmpty || isError} color="primary" onClick={handleNext}>
					Next
				</Button>
			</div>
		</Fragment>
	)
}

export default FirstStep
