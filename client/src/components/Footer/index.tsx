import React from "react";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

export const Footer = (props: any) => {
  return (
    <Paper {...props} elevation={3} component="footer">
       <Typography variant="h3" component="div" align="center">
        FOOTER
      </Typography>
    </Paper>
  )
}