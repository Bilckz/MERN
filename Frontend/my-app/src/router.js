import React from 'react';

import { BrowserRouter, Route, Swith, Redirect} from "react-router-dom";

const Routes = () => (
    <BrowserRouter>
        <Swith>
            <Route exact path="/" component={() => <h1>Hello World</h1>}/>
        </Swith>
    </BrowserRouter>
);