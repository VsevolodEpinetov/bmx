import React from 'react';
import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';

const TrainerInfoInputs = ({ trainer, setTrainer, blankFields }) => {

  const getAndValidateName = (name) => {
    let newString = name.replace(/[^а-яА-Я]+/g, '');
    if (newString.length == 0) {
      return '';
    } else {
      newString = newString[0].toUpperCase() + newString.slice(1).toLowerCase();
      return newString;
    }
  }

  const getAndValidatePhone = (stringToValidate) => {
    let justNumbersFromPhone = stringToValidate.length > 0 ? stringToValidate.replace(/[^0-9]+/g, '') : '';
    if (justNumbersFromPhone.length > 1) {
      justNumbersFromPhone = justNumbersFromPhone.substring(1);
      let newString = `+7 (${justNumbersFromPhone.substring(0, 3)}) ${justNumbersFromPhone.substring(3, 6)}-${justNumbersFromPhone.substring(6, 8)}-${justNumbersFromPhone.substring(8, 10)}`;
      return newString;
    } else {
      let newString = `+7 () --`;
      return newString;
    }
  }

  return (
    <div>
      <TextInput
        required
        label="Телефон"
        placeholder="Иванов"
        description='Нужен только для организационных моментов'
        value={trainer.phone}
        onChange={(e) => setTrainer({ ...trainer, phone: getAndValidatePhone(e.target.value) })}
        error={blankFields.includes('phone')}
      />
      <TextInput
        required
        label="Фамилия"
        placeholder="Иванов"
        value={trainer.surname}
        onChange={(e) => setTrainer({ ...trainer, surname: getAndValidateName(e.target.value) })}
        error={blankFields.includes('surname')}
      />
      <TextInput
        required
        label="Имя"
        placeholder="Иван"
        value={trainer.name}
        onChange={(e) => setTrainer({ ...trainer, name: getAndValidateName(e.target.value) })}
        error={blankFields.includes('name')}
      />
      <TextInput
        required
        label="Отчество"
        placeholder="Иванович"
        value={trainer.patronymic}
        onChange={(e) => setTrainer({ ...trainer, patronymic: getAndValidateName(e.target.value) })}
        error={blankFields.includes('patronymic')}
      />
    </div>
  );
};

export default TrainerInfoInputs;