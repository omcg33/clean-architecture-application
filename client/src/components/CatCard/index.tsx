import React from "react";
import { Link } from "react-router-dom";
import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { PAGES_URL_ALIASES } from "../../../../common";

import { generatePageUrl } from "../../app/router/helpers";
import { ImmutableMap }    from "../../interfaces";


// TODO: Убрать
type IAdoptedCatFull = any;


export type ICatProps = {
  cat: ImmutableMap<IAdoptedCatFull>
}

export function CatCard(props: ICatProps & CardProps) {
  const {cat, ...rest} = props;
  const id = cat.get("id");
  const name = cat.get("name");
  const description = cat.get("description");
  const image = cat.get("image");

  return (
    <Card sx={{ maxWidth: 345 }} {...rest}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name} ${id}`}
        subheader={new Intl.DateTimeFormat('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(Date.now())}
      />
      <Link to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id })}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         { description }
        </Typography>
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
