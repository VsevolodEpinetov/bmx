import React from 'react';

const CredentialsInputs = ({credentials, setCredentials}) => {
  return (
    <div>
      <input
        id="mail"
        placeholder="Почта"
        type="mail"
        value={credentials.mail}
        onChange={(e) => setCredentials({ ...credentials, mail: e.target.value })}
      />
      <input
        id="pass"
        placeholder="Пароль"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
    </div>
  );
};

export default CredentialsInputs;