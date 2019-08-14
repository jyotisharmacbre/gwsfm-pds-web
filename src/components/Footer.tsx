import { Link, Typography } from "@material-ui/core";
import React from "react";

class Footer extends React.Component {

    render(){
        return (
            <Typography variant="body2" color="textSecondary" align="center">
              {'CBRE PDS'}           
              {new Date().getFullYear()}
            </Typography>
          );
    }
   
  }
  export default Footer;