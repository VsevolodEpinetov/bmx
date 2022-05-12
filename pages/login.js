/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";

import { auth, firestore, googleAuthProvider } from '../lib/auth/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { UserContext } from '../lib/auth/context'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Transition,
  Center,
  Box
} from '@mantine/core';
import { ArrowLeft } from 'tabler-icons-react';

export default function LoginPage({ }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, userName } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [hideLoginForm, setHideLoginForm] = useState(false)
  const [hideForgotPasswordForm, setHideForgotPasswordForm] = useState(true)

  const scaleY = {
    in: { opacity: 1, transform: 'transformX(0)' },
    out: { opacity: 0, transform: 'transformX(-350)' },
    common: { transitionDelay: '500' },
    transitionProperty: 'transform, opacity',
  };

  const scaleXFirst = {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-350)' },
    transitionProperty: 'transform, opacity',
  };

  const scaleXSecond = {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-350)' },
    transitionProperty: 'transform, opacity',
  };


  return (
    <div>
      {!user && (
        <div>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
              Create account
            </Anchor>
          </Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Transition mounted={!hideLoginForm} duration={400} transition='slide-right' timingFunction="ease" onExited={(e) => setHideForgotPasswordForm(false)}>
              {(styles) => (
                <div style={styles}>
                  <TextInput label="Почта" placeholder="mail@mail.ru" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <PasswordInput label="Пароль" placeholder="*********" required mt="md" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Group position="apart" mt="md">
                    <Checkbox label="Запомните меня" />
                    <Anchor onClick={(e) => {
                      setPassword('')
                      setHideLoginForm(true)
                    }} href="#" size="sm">
                      Мой пароль съела собака
                    </Anchor>
                  </Group>
                  <Button fullWidth mt="xl" disabled={email === '' || password === ''}
                    onClick={async (e) => {
                      e.preventDefault();
                      await auth
                        .signInWithEmailAndPassword(email, password)
                        .then(function () {
                          window.location.href = '/'
                        })
                        .catch(function (error) {
                          setMessage(error.message);
                          setOpen(true);
                        })
                    }}>
                    Sign in
                  </Button>
                </div>
              )}
            </Transition>
            <Transition mounted={!hideForgotPasswordForm} duration={400} transition='slide-left' timingFunction="ease" onExited={(e) => setHideLoginForm(false)}>
              {(styles) => (
                <div style={{...styles}}>
                  <TextInput label="Почта" placeholder="mail@mail.ru" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Group position="apart" mt="lg">
                    <Anchor color="dimmed" size="sm">
                      <Center inline>
                        <ArrowLeft size={12} />
                        <Box ml={5} onClick={(e) => setHideForgotPasswordForm(true)}>Назад к входу</Box>
                      </Center>
                    </Anchor>
                    <Button disabled={email === ''}
                      onClick={async (e) => {
                        e.preventDefault();
                        const resAuth = getAuth();
                        sendPasswordResetEmail(resAuth, email)
                          .then(function () {
                            setMessage('Пароль сброшен');
                          })
                          .catch(function (error) {
                            setMessage(error.message);
                            setOpen(true);
                          })
                      }}
                    >Сбросить пароль</Button>
                  </Group>
                </div>
              )}
            </Transition>
          </Paper>
        </div>
      )}
      {user && (
        <>
          Иди на главную, дружок-пирожок
        </>
      )}
      {message}
    </div>
  );
}