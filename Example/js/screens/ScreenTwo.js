import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../component/Screen';

const ScreenTwo = () => (
    <Screen headerText="Screen Two"
            headerBgColor={colorsStyles.bgBlue}
            headerTextColor={colorsStyles.light}/>
);


export default ScreenTwo;