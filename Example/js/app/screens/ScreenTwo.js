import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../components/Screen';

const ScreenTwo = () => (
    <Screen headerText="Screen Two"
            accessibilityLabel="screenTwo"
            headerBgColor={colorsStyles.bgBlue}
            headerTextColor={colorsStyles.light}/>
);


export default ScreenTwo;