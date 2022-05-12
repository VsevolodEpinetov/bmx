/*eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import { auth, firestore, googleAuthProvider } from '../lib/auth/firebase';

export default function CreateThingsPage({ }) {

  const [club, setClub] = useState({
    name: '',
    address: ''
  });
  const [message, setMessage] = useState();


  const generateAndAddClub = async (e) => {
    e.preventDefault();
    const firstPart = ['Клуб', 'Сообщество', 'Альянс', 'Объединение', 'Партия', 'Команда', 'Товарищество', 'Коалиция', 'Братство', 'Орден', 'Федерация'];
    const secondPart = ['развития', 'улучшения', 'совершенствования', 'формирования', 'продвижения', 'изменения', 'воспитания', 'процветания']
    const thirdPart = ['тела', 'разума', 'силы', 'себя', 'друзей', 'жизни', 'ловкости', 'интеллекта', 'товарищей', 'этики', 'сна', 'движения', 'бега', 'спорта', 'общения']

    setClub({ ...club, name: `${firstPart[Math.floor(Math.random() * firstPart.length)]} ${secondPart[Math.floor(Math.random() * secondPart.length)]} ${thirdPart[Math.floor(Math.random() * thirdPart.length)]}` })

    const addressCity = ['Москва', 'Астрахань', 'Санкт-Петербург', 'Томск', 'Самара', 'Саратов', 'Тюмень', 'Бобруйск', 'Минск']
    const addressStreet = ['Первая', 'Красная', 'Ленина', 'Производственная', 'Внуковская', 'Победы', 'Тестовая', 'Разработчиков', 'Скриптеров']


    let address = `${addressCity[Math.floor(Math.random() * addressCity.length)]}, ул. ${addressStreet[Math.floor(Math.random() * addressStreet.length)]}, д.${Math.floor(Math.random() * (100 - 1 + 1) + 1)}`;
    let name = `${firstPart[Math.floor(Math.random() * firstPart.length)]} ${secondPart[Math.floor(Math.random() * secondPart.length)]} ${thirdPart[Math.floor(Math.random() * thirdPart.length)]}`;
    setClub({ ...club, address: address, name: name })

    let clubObj = {
      name: name,
      address: address,
      isActive: true
    }

    await firestore
      .collection('clubs')
      .add(clubObj)
      .catch(function (error) {
        setMessage(error.message);
      }).then(() => {
        setMessage('done')
      })
      //setMessage('done')
  }


  return (
    <div>
      <input type='text' id='name' style={{ width: '70%' }} value={club.name} onChange={e => setClub({ ...club, name: e.target.value })} /> <br />
      <input type='text' id='address' style={{ width: '70%' }} value={club.address} onChange={e => setClub({ ...club, address: e.target.value })} /> <br />
      <button onClick={generateAndAddClub}>Сгенерировать клуб</button> <br />
      {message}
    </div>
  );
}