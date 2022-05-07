import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  BellRinging,
  Fingerprint,
  Key,
  Settings,
  TwoFA,
  DatabaseImport,
  Receipt2,
  SwitchHorizontal,
  Logout,
  FileAlert,
} from 'tabler-icons-react';
import MyUserButton from '../UI/MyUserButton';

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

const data = [
  { link: '/', label: 'Главная', icon: BellRinging },
  { link: '/trainers', label: 'Спортсмены', icon: Receipt2 },
  { link: '/registration', label: 'Регистрация', icon: Fingerprint },
  { link: '/profile', label: 'Админка', icon: Key },
];

import { UserContext } from '../../lib/auth/context';

export function MyNavbar({ }) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { user, userData } = useContext(UserContext);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.link === router.asPath })}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <MyUserButton 
            name={`${userData.surname} ${userData.name[0]}.${userData.patronymic[0]}.`}
            email={user.email}
          />
        </Group>
        {links}
        {userData.isAdmin &&
          <a
            className={cx(classes.link, { [classes.linkActive]: '/admin' === router.asPath })}
            href='/admin'
            key='Админка'
          >
            <FileAlert className={classes.linkIcon} />
            <span>Админка</span>
          </a>
        }
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <Logout className={classes.linkIcon} />
          <span>Выйти</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}