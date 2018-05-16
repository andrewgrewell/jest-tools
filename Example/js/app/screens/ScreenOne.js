import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../components/Screen';

const ScreenOne = () => (
    <Screen headerText="Screen One"
            headerBgColor={colorsStyles.bgPurple}
            headerTextColor={colorsStyles.light}/>
);


export default ScreenOne;