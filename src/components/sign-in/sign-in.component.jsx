import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: ''
        }
       

    }


    componentDidMount(){
        
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState({email: '', password: ''});
    }

    handleChange = (e)=>{
       const { value, name } = e.target;
       this.setState({ [name]: value })

    }

    render(){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" value={this.state.email} type="email" label='email' handleChange={this.handleChange} required/>
                    <FormInput name="password" value={this.state.password} type="password" label='password' handleChange={this.handleChange} required/>
                    <div className="buttons">
                    <CustomButton type="submit" value="submit">sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>sign in with gmail</CustomButton>
                    </div>

                </form>    
            </div>
        )
    }
}

export default SignIn
