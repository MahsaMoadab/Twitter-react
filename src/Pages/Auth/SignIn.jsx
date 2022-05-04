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
import { signInApi } from '../../api/api_auth';
import { useNavigate } from 'react-router-dom';



const SignIn = (props) => {
    const [passwordLogin, setPasswordLogin] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [usernameLogin, setUsernameLogin] = useState('');

    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setPasswordLogin({ ...passwordLogin, [prop]: event.target.value });
    };

    const handleChangeUsername = (event) => {
        setUsernameLogin(event.target.value);
    };


    const handleClickShowPassword = () => {
        setPasswordLogin({
            ...passwordLogin,
            showPassword: !passwordLogin.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handelLogin = () => {
        const user = {
            username: usernameLogin,
            password: passwordLogin.password
        }
        const error = validationLogin(user)
        if (error)
            return toast.warn(error)
        signInApi(user, (isOk, data) => {
            if (!isOk)
                return toast.error(data)
            localStorage.setItem('x-auth-token', data['x-auth-token']);
            localStorage.setItem('name', data.name);
            localStorage.setItem('image', data.image);
            localStorage.setItem('username', data.username);

            toast.success('شما با موفقیت وارد شدید.')
            window.location.reload()
            //  navigate('/')
        })

    }


    const validationLogin = (user) => {
        if (!user.username) {
            return ('نام کاربری را وارد نکرده اید.')
        }
        if (!user.password) {
            return ('رمز عبور را وارد نکرده اید.')
        }
    }


    return (
        <>
            <div id={'loginPage'} className={styles.loginPage}>
                <Grid container item className={styles.loginBox}>
                    <Grid item className={styles.contentBox}>
                        <Grid className={styles.logo} container>
                            <img src={'/images/twitter-logo.png'} alt={'twitter-logo'} />
                            <Typography>
                                توییتر فارسی
                            </Typography>
                            |
                            <Typography>
                                ورود
                            </Typography>
                        </Grid>
                        <TextField id={'usernameLogin'} className={styles.textField} value={usernameLogin} onChange={handleChangeUsername} label="نام کاربری" variant="outlined" />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="passwordLogin">رمز عبور</InputLabel>
                            <OutlinedInput
                                id="passwordLogin"
                                type={passwordLogin.showPassword ? 'text' : 'password'}
                                value={passwordLogin.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {passwordLogin.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Button className={styles.btnLogin} onClick={handelLogin} variant="contained">ورود</Button>
                        <Button onClick={props.showSignUp} className={styles.linkSignUp}>
                            حساب کاربری ندارید؟ ثبت نام
                        </Button>
                    </Grid>
                    <Grid item className={styles.contentBox}>
                        <img className={styles.imgFlex} src={"/images/login-page.jpg"} alt={""} />
                    </Grid>
                </Grid>
            </div>
        </>
    );

}


export default SignIn;