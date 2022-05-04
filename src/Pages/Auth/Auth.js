import React, { useState } from 'react'
import {
  Button,
  Container,
}
  from "@material-ui/core";
import styles from '../../styles/Style.module.css';
import SignUp from './SignUp';

import SignIn from './SignIn';
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Auth = () => {

  const [state, setState] = useState(true);
  function handelShowSignUp() {
    setState(!state)
  }

  function handelShowSignIn() {
    setState(!state)
  }
  return (
    <>

      <div className={styles.root}>


        <Container className={styles.container} maxWidth="md">

          <SwitchTransition mode={'out-in'}>
            <CSSTransition
              key={state}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames={styles.fade}
            >
              {state ? 
              <SignIn id={"loginPage"} showSignUp={handelShowSignUp} /> 

              : 
              <SignUp id={"signUpPage"} showSignIn={handelShowSignIn} />}
            </CSSTransition>
          </SwitchTransition>
        </Container>
      </div>
    </>
  );

}


export default Auth;