import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  Home2,
  UserPlus,
  Key,
  User,
  Tools,
  Logout
} from 'tabler-icons-react';
import MyUserButton from '../UI/MyUserButton';

import { auth } from '../../lib/auth/firebase'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  };
});

import { UserContext } from '../../lib/auth/context';

export function MyNavbar({ }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { user, userData } = useContext(UserContext);

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR &&
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <MyUserButton
            name={userData.name ? `${userData.surname} ${userData.name[0]}.${userData.patronymic[0]}.` : 'Нет пользователя'}
            email={user ? user.email : ''}
          />
        </Group>
        <a
          className={cx(classes.link, { [classes.linkActive]: '/' === router.asPath })}
          href='/'
          key='Главная'
        >
          <Home2 className={classes.linkIcon} />
          <span>Главная</span>
        </a>
        {
          !user &&
          <>
            <a
              className={cx(classes.link, { [classes.linkActive]: '/registration' === router.asPath })}
              href='/registration'
              key='Регистрация'
            >
              <UserPlus className={classes.linkIcon} />
              <span>Регистрация</span>
            </a>
            <a
              className={cx(classes.link, { [classes.linkActive]: '/login' === router.asPath })}
              href='/login'
              key='Вход'
            >
              <Key className={classes.linkIcon} />
              <span>Вход</span>
            </a>
          </>
        }
        {
          user &&
          <a
            className={cx(classes.link, { [classes.linkActive]: '/profile' === router.asPath })}
            href='/profile'
            key='Профиль'
          >
            <User className={classes.linkIcon} />
            <span>Профиль</span>
          </a>
        }
        {userData.isAdmin &&
          <a
            className={cx(classes.link, { [classes.linkActive]: '/admin' === router.asPath })}
            href='/admin'
            key='Админка'
          >
            <Tools className={classes.linkIcon} />
            <span>Админка</span>
          </a>
        }
      </Navbar.Section>

      {user &&
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={async (e) => {
            e.preventDefault();
            auth.signOut()
          }}>
            <Logout className={classes.linkIcon} />
            <span>Выйти</span>
          </a>
        </Navbar.Section>
      }
    </Navbar>
  );
}