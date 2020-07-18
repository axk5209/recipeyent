import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
	useHistory
} from "react-router-dom"
const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
		fontWeight: "bold",
		fontSize: 16,
	},
	body: {
		fontSize: 16,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(title, tags, rating, id) {
	return { title, tags, rating, id };
}



const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function CustomizedTables(props) {
	const classes = useStyles();
	const history = useHistory()
	//console.log(props.createdRecipes)
	//console.log(props.createdRecipes)
	const rows = props.createdRecipes.map(recipe => {
		//console.log(recipe)
		const sortedTags = recipe.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ")
		return createData(recipe.title, sortedTags, recipe.rating, recipe.id)
	})
	/*const rows = [
	  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	  createData('Eclair', 262, 16.0, 24, 6.0),
	  createData('Cupcake', 305, 3.7, 67, 4.3),
	  createData('Gingerbread', 356, 16.0, 49, 3.9),
	];*/
	//console.log(rows)
	function onClick (id)
	{
		history.push(`/recipes/${id}`)
	}
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell >Title</StyledTableCell>
						<StyledTableCell align="right">Top-Voted Tags</StyledTableCell>
						<StyledTableCell align="right">Rating</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.id} style={{cursor: 'pointer'}} onClick = {() => {onClick(row.id)}}>
							<StyledTableCell style={{ fontWeight: "bold" }} scope="row">
								{row.title}
							</StyledTableCell>
							<StyledTableCell align="right">{row.tags ? row.tags : "No Tags Yet"}</StyledTableCell>
							<StyledTableCell align="right">{row.rating ? `${row.rating.toFixed(2)}` : " (unrated)"}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}