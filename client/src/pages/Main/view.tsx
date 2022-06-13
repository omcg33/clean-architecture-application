import * as React from "react";
import { Helmet }   from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Link from '@mui/material/Link';

import { PAGES_URL_ALIASES } from "../../../../common/dist";
import { generatePageUrl } from "../../app/router/helpers";

import { CatCard, ICatProps } from "../../components/CatCard";
import { DogCard, IDogProps } from "../../components/DogCard";

import styles from "./styles.less";

export interface IViewProps {
  cats: ICatProps["cat"][];
  dogs: IDogProps["dog"][];
}

export class View extends React.PureComponent<IViewProps> {

  render() {
    const { cats, dogs } = this.props;

    return (
      <Container>
        <Helmet>
          <title>Главная</title>
        </Helmet>
        <Grid container spacing={5}>
          
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Link component={RouterLink} to={generatePageUrl(PAGES_URL_ALIASES.DOGS_LIST)}>
                Список Собачек
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Link component={RouterLink} to={generatePageUrl(PAGES_URL_ALIASES.CATS_LIST)}>
                Список Кошачек
              </Link>
            </Paper>
          </Grid>

          {
            cats
              .map((cat,i) => 
                <Grid item xs={6} key={i}>                      
                  <CatCard cat={cat} className={styles.cat}/>
                </Grid>
            )
          }  

          {
            dogs
              .map((dog,i) => 
                <Grid item xs={6} key={i}>                  
                  <DogCard dog={dog} className={styles.dog}/>
                </Grid>
              )
          } 

          <Grid item xs={6}>
            <Paper elevation={3}>
              <Link component={RouterLink} to={generatePageUrl(PAGES_URL_ALIASES.DOG, { id:10 })}>
                Не существующая собака
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Link component={RouterLink} to={generatePageUrl(PAGES_URL_ALIASES.CAT, { id: 10 })}>
              Не существующая кошка
              </Link>
            </Paper>
          </Grid>
        </Grid>
        
      </Container>
    );
  }
};
