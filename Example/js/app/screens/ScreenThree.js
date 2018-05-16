import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../components/Screen';

const ScreenThree = () => (
    <Screen headerText="Screen Three"
            headerBgColor={colorsStyles.bgGreen}
            headerTextColor={colorsStyles.light}/>
);


export default ScreenThree;