import React from 'react';
import { TextInput, Checkbox, Button, Box, PasswordInput, Grid, Progress, Group, Text, Center } from '@mantine/core';
import { EyeCheck, EyeOff, Check, X } from 'tabler-icons-react';

function PasswordRequirement({ meets, label }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <Check size={14} /> : <X size={14} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Есть число' },
  { re: /[a-z]/, label: 'Есть строчная буква' },
  { re: /[A-Z]/, label: 'Есть заглавная буква' }
];

function getStrength(password) {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const CredentialsInputs = ({ credentials, setCredentials, blankFields }) => {
  const strength = getStrength(credentials.password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(credentials.password)} />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          credentials.password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));


  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          required
          label="Почта"
          placeholder="your@email.com"
          description="Нужна только для авторизации"
          value={credentials.mail}
          onChange={(e) => setCredentials({ ...credentials, mail: e.target.value })}
          error={blankFields.includes('mail')}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <PasswordInput
          required
          label="Пароль"
          placeholder="********"
          description="Пароль должен быть не менее 8 знаков, включая хотя бы одну цифру, строчную и заглавную буквы"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
          }
          error={blankFields.includes('password')}
        />
        <Group spacing={5} grow mt="xs" mb="md">
          {bars}
        </Group>

        <PasswordRequirement label="Хотя бы 8 знаков" meets={credentials.password.length > 7} />
        {checks}
      </Grid.Col>
    </Grid>
  );
};

export default CredentialsInputs;