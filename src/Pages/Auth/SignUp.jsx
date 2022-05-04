import React, { useState } from 'react'
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
}
    from "@material-ui/core";
import styles from '../../styles/Style.module.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { signUpApi } from '../../api/api_auth';

const SignUp = (props) => {

    const [nameSignup, setNameSignup] = useState();
    const [usernameSignup, setUsernameSignup] = useState();
    const [passwordSignup, setPasswordSignup] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setPasswordSignup({ ...passwordSignup, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPasswordSignup({
            ...passwordSignup,
            showPassword: !passwordSignup.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handelSighnUp = ()=>{
        const newUser = {
            name:nameSignup,
            username: usernameSignup,
            password: passwordSignup.password,
            image: "undefined"
        }
        const error = validationSignup(newUser);

        if(error)
            return toast.warn(error);
        signUpApi(newUser, (isOk,data) => {
            if (!isOk)
            return toast.error(data)
            toast.success('شما با موفقیت وارد شدید.')
            localStorage.setItem('name',data.name);
            localStorage.setItem('image',data.image);
            localStorage.setItem('username',data.username);
            localStorage.setItem('x-auth-token',data['x-auth-token']);
        })
    }

    const validationSignup = (user) =>{
        if(!user.name){
            return ('نام کاربر را وارد نکرده اید.')
       }
        if(!user.username){
            return ('نام کاربری را وارد نکرده اید.')
       }
       if(!user.password){
            return ('رمز عبور را وارد نکرده اید.')
       }
       if(user.password.length<8){
            return ('رمز عبور باید شامل 8 کاراکتر باشد.')
        }
    }


    return (
        <>
            <div id={'signUpPage'} className={styles.signUpPage}>
                <Grid container item className={styles.loginBox}>
                    <Grid item className={styles.contentBox}>
                        <Grid className={styles.logo} container>
                            <img src={'/images/twitter-logo.png'} alt={'twitter-logo'} />
                            <Typography>
                                توییتر فارسی
                            </Typography>
                            |
                            <Typography>
                                ثبت نام
                            </Typography>
                        </Grid>
                        <TextField  id={"nameSignup"} value={nameSignup} onChange={e=>{setNameSignup(e.target.value)}} label="نام و نام خانوادگی" variant="outlined" />
                        <TextField className={styles.textField} id={"usernameSignup"} value={usernameSignup} onChange={e=>{setUsernameSignup(e.target.value)}} label="نام کاربری" variant="outlined" />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="passwordSignup">رمز عبور</InputLabel>
                            <OutlinedInput
                                id="passwordSignup"
                                type={passwordSignup.showPassword ? 'text' : 'password'}
                                value={passwordSignup.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {passwordSignup.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button onClick={handelSighnUp} className={styles.btnLogin} variant="contained">ورود</Button>
                        <Button onClick={props.showSignIn} className={styles.linkSignUp}>
                            قبلا ثبت نام کرده اید؟ ورود
                        </Button>
                    </Grid>
                    <Grid item className={styles.contentBox}>
                        <img className={styles.imgFlex} src={"/images/register-page.jpg"} alt={""} />
                    </Grid>
                </Grid>
            </div>
        </>
    );

}


export default SignUp;