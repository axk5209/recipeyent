import React, { useState, Fragment } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Confirm from './Confirm'
import Success from './Success'

const cookTimeRegex = RegExp('^[1-9]\\d*$')
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
const timeRegex = RegExp(/^\d+$/)
// Step titles
const labels = [ 'First Step', 'Second Step', 'Confirmation' ]

const StepForm = () => {
	const [ steps, setSteps ] = useState(0)
	const [ fields, setFields ] = useState({
		title: '',
		tags: '',
		cookTime: '',
		preparationTime: '',
		ingredients: '',
		procedure: '',
		pictureInput: '',
		previewSource: ''
	})
	// Copy fields as they all have the same name
	const [ filedError, setFieldError ] = useState({
		...fields
	})

	const [ isError, setIsError ] = useState(false)

	// Proceed to next step
	const handleNext = () => setSteps(steps + 1)
	// Go back to prev step
	const handleBack = () => setSteps(steps - 1)

	// Handle fields change
	const handleChange = input => ({ target }) => {
		// Set values to the fields

		if (input === "picture")
		{
			const picture = target.files[0]
			previewPicture(picture)
		}
		else
		{
			setFields({
				...fields,
				[input]: target.value
			})	
		}
		const formErrors = { ...filedError }

		switch (input) {
			case 'cookTime':
				formErrors.cookTime = timeRegex.test(target.value) ? '' : 'Cook time must be integer'
				break
			case 'preparationTime':
				formErrors.preparationTime = timeRegex.test(target.value) ? '' : 'Prep time must be integer'
				break
			default:
				break
		}

		// set error hook
		Object.values(formErrors).forEach(error => (error.length > 0 ? setIsError(true) : setIsError(false)))
		// set errors hook
		setFieldError({
			...formErrors
		})
		


	}

	const previewPicture = (picture) => {
		const reader = new FileReader()
		reader.readAsDataURL(picture)
		reader.onloadend = () => setFields({
			...fields,
			"previewSource": reader.result
		})
	}


	const handleSteps = step => {
		switch (step) {
			case 0:
				return (
					<FirstStep
						handleNext={handleNext}
						handleChange={handleChange}
						values={fields}
						isError={isError}
						filedError={filedError}
					/>
				)
			case 1:
				return (
					<SecondStep
						handleNext={handleNext}
						handleBack={handleBack}
						handleChange={handleChange}
						values={fields}
						isError={isError}
						filedError={filedError}

					/>
				)
			case 2:
				return <Confirm handleNext={handleNext} handleBack={handleBack} values={fields} />
			default:
				break
		}
	}

	// Handle components
	return (
		<Fragment>
			{steps === labels.length ? (
				<Success />
			) : (
				<Fragment>
					<Stepper activeStep={steps} style={{ paddingTop: 30, paddingBottom: 50 }} alternativeLabel>
						{labels.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{handleSteps(steps)}
				</Fragment>
			)}
		</Fragment>
	)
}

export default StepForm
