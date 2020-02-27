import React, { Suspense } from 'react';
import { IAppProps } from '../../props/AppProps';
import Routes from '../Routes';

const Body: React.FC = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes></Routes>
        </Suspense>
    )
}

export default Body;