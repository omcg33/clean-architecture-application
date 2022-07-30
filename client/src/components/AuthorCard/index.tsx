import React from "react";
import { useQuery, gql } from '@apollo/client';

import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { Spinner } from "../Spinner";

const GET_AUTHOR = gql`
  query Author($id: Int!) {
    author(id: $id) {
      id
      firstName
      posts {
        id
        title
        votes
      }
    }
  } 
`;

export type IAuthorProps = {
  id: number;
}

export function AuthorCard(props:  IAuthorProps & Omit<CardProps, 'id'>) {
  const {id, ...rest} = props;
  const { loading, error, data } = useQuery(GET_AUTHOR, { variables: { id }, ssr: false });
  
  if (loading) return (
    <Card sx={{ maxWidth: 345 }} {...rest}>
      <Spinner/>
    </Card>
  )
  if (error) return <>{ `Error! ${error}` }</>

  const { firstName: name, posts} = data.author;

  console.log(posts.length);

  return (
    <Card sx={{ maxWidth: 345 }} {...rest}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }       
        title={`${name} ${id}`}
        subheader={new Intl.DateTimeFormat('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(Date.now())}
      />
      <CardContent>    
        <pre>
        {
          posts.map(post => (
            <div>
              { post.id }<br/>
              { post.title }<br/>
              { post.votes }<br/>
            </div>
          ))
        }
        </pre>    
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>       
      </CardActions>
    </Card>
  );
}
