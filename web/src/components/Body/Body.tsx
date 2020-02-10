import React, { Suspense } from 'react';
import { IAppProps } from '../../props/AppProps';
import Routes from '../Routes';

class Body extends React.Component<IAppProps> {


  render() {
    return (
<div>
<Suspense fallback={<div>Loading...</div>}>
<Routes></Routes>
</Suspense>
  </div>
    )
    
    
  }
}

export default Body;
