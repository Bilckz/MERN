import React from 'react';

export default class Login extends React.Component {

    render(){

        return (
            <div>
                <label>email</label><br></br>
                <input type="text" name="email" /><br></br>
                <label>password</label><br></br>
                <input type="password" name="password"/>
            </div>
            
        );
    }
}