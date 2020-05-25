/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import './cards.css';
import './card.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 20,
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      transitionDuration: '1.8s',
      '-webkit-transition': 'transform 1.2s',
    },
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    minHeight: 300,
  },
  content: {
    minHeight: 100,
  },
  actions: {
  },

});



export default function MediaCard(props) {
  const classes = useStyles();
  const url = window.location.href.replace(/.*focus/).split('/');
  const membershipType = url[1];
  const membershipId = url[2];
  const apiUrl = `/auth/pvp/${membershipType}/${membershipId}`;

  const renderRedirect = (apiUrl) => {
    console.log(apiUrl);
    // console.log(this.state)
    return <Redirect to={apiUrl} />;
  };

  return (
    <Card className={classes.root} >
      <CardActionArea
      onClick={() => renderRedirect(apiUrl)}
      >
        <CardMedia
          style={{ backgroundColor: props.theme.colour_1 }}
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent
          style={{ backgroundColor: props.theme.colour_2 }}
        >
          <div className="blank-area">

          </div>
          <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ backgroundColor: props.theme.colour_1 }}
        >
        <Typography gutterBottom variant="h5" component="h2">
          {props.focus}
        </Typography>
        {/* <a href={apiUrl}>
        <Button size="small" color="primary">
          {props.focus}
        </Button>
        </a> */}
      </CardActions>
    </Card>
  );
}
