import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/auth/context';

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);

  return user ?
    props.children :
    props.fallback ||
    (
      <div>
        <p>Нет пользователя</p>
        <a href="/login">К логину</a>
      </div>
    );
}