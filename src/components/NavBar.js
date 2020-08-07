import React, { useContext, useEffect } from 'react';
import { Button } from 'antd';
import { UserContext } from '../context/user-context';

export default function NavBar (props) {
  const [state, dispach] = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => dispach({ type: 'SET_JWT', jwt: 'foo'}), 5000);
  });

  return (<Button type="primary">{state.jwt}</Button>);
}