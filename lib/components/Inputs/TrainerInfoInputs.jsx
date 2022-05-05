import React from 'react';

const TrainerInfoInputs = ({trainer, setTrainer}) => {
  return (
    <div>
      <input
        id="phone"
        placeholder="Телефон"
        type="text"
        value={trainer.phone}
        onChange={(e) => setTrainer({ ...trainer, phone: e.target.value })}
      />
      <input
        id="surname"
        placeholder="Фамилия"
        type="text"
        value={trainer.surname}
        onChange={(e) => setTrainer({ ...trainer, surname: e.target.value })}
      />
      <input
        id="name"
        placeholder="Имя"
        type="text"
        value={trainer.name}
        onChange={(e) => setTrainer({ ...trainer, name: e.target.value })}
      />
      <input
        id="patronymic"
        placeholder="Отчество"
        type="text"
        value={trainer.patronymic}
        onChange={(e) => setTrainer({ ...trainer, patronymic: e.target.value })}
      />
    </div>
  );
};

export default TrainerInfoInputs;