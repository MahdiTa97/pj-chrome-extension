import React from 'react';
import { Login, Panel } from '../../components/popupComponents';
import { useChromeStorageLocal } from '../../lib/hooks';
import './Popup.css';

const Popup = () => {
  const [options, setOptions] = useChromeStorageLocal('options', null);

  console.log('=====> options <=====', options);

  return <div dir="rtl">{options?.isLoggedIn ? <Panel /> : <Login />}</div>;
};

export default Popup;
