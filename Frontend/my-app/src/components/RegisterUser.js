import React from 'react';

export default class RegisterUser extends React.Component {

    render(){

        return (
            <div>
                <label>name</label><br></br>
                <input type="text" name="name" /><br></br>
                <label>email</label><br></br>
                <input type="text" name="email" /><br></br>
                <label>password</label><br></br>
                <input type="password" name="password"/>
            </div>
            
        );
    }
}