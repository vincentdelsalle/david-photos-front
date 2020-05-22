import React, { useState, Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    userName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Username'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  return (
    <Fragment>
      <Toolbar toolbarType="authToolbar" />
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div></Fragment>
  );
}

export default Auth