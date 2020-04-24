import React from 'react';
import Login from './Login';
import RegisterUser from './RegisterUser';

export default class App extends React.Component {

    render(){

        return (
            <div>
                <Login/>
                <br></br>
                <RegisterUser/>
            </div>
            
        );
    }
}