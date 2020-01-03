import React from 'react';
import { IAppProps } from '../../props/AppProps';
import Routes from '../Routes';

class Body extends React.Component<IAppProps> {

  closeInsideDiv()
  {
let htmlEl:any=document.getElementById("dropLanguage");
htmlEl.classList.remove("show");
htmlEl.classList.add("hide");
  }
  render() {
    return (
<div id="RouteDiv" onClick={this.closeInsideDiv}>
<Routes></Routes>
  </div>
    )
    
    
  }
}

export default Body;
