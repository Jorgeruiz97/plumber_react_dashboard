import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    height: 70
  },
  content: {
    paddingTop: 4
  },
  title: {
    fontSize: 42,
    marginTop: 0
  },
  iconContainer: {
    position: "absolute",
    textOverflow: "clip",
    whiteSpace: "nowrap"
  },
  icon:{
    position: "absolute",
    top: 2,
    left: 50,
    right: "auto"
  }
});

export default function SummaryCard(props) {
  const classes = useStyles();
  const { title, icon, number, type, color, backgroundColor } = props;
  return (
    <Card className={classes.card} style={{"backgroundColor": backgroundColor}} >
      <CardContent className={classes.content}>
        <Grid container justify="space-evenly" spacing={0} >
          <Grid item >
            <Typography style={{ "color": color }} className={classes.title} variant="h3" component="h4">
              {number}
              <span> </span>
              {type}
            </Typography>
            <Typography style={{ "color": color }} >
              {title}
            </Typography>
          </Grid>
          <Grid className={classes.iconContainer} item>
            <Typography className={classes.icon}>
              {icon}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}