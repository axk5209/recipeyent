import React from 'react'
import LoggedInHeader from './LoggedInHeader'
import LoggedInHeaderButtons from './LoggedInHeaderButtons'

const MainDisplay = () => {
	
	return (
		<div>
			<LoggedInHeader>
				<LoggedInHeaderButtons />
			</LoggedInHeader>
			Dashboard
			{/*Pagination-based view of "your blogs" (for now, just display random 5)*/}
		</div>
	)
}

export default MainDisplay

