import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(title, tags, rating) {
  return {title, tags, rating};
}



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  //console.log(props.createdRecipes)
  //console.log(props.createdRecipes)
	const rows = props.createdRecipes.map(recipe => {
		console.log(recipe)
		const sortedTags = recipe.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ")
		return createData(recipe.title, sortedTags, recipe.rating)
	})
  /*const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];*/
  console.log(rows)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Title</StyledTableCell>
            <StyledTableCell align="right">Top-Voted Tags</StyledTableCell>
            <StyledTableCell align="right">Average Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell style = {{fontWeight: "bold"}} component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.tags}</StyledTableCell>
              <StyledTableCell align="right">{row.rating}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}