import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../component/Screen';

const ScreenThree = () => (
    <Screen headerText="Screen Three"
            headerBgColor={colorsStyles.bgGreen}
            headerTextColor={colorsStyles.light}/>
);


export default ScreenThree;