import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { findAllByTitle } from "@testing-library/react";


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },

}));
var chefHat = require('./chefHat.jpg')
function LandingPageRecipeCard(props) {
  const classes = useStyles();
  const recipe = props.recipe
  const title = recipe.title
  const tags = recipe.tags.length > 0 ? recipe.tags.sort((a, b) => a.votes > b.votes).slice(0, 5).map(item => item.title).join(", ") : "No Tags Yet"
  return (
    <div className="App">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={chefHat}
        />
        <CardContent className={classes.content}>
          <Typography variant={"h5"} gutterbottom >{title}</Typography>
          <Typography variant={"body2"} >{tags}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default LandingPageRecipeCard