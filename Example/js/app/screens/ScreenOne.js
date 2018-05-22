import React from 'react';
import colorsStyles from '../styles/colorStyles';
import Screen from '../components/Screen';
import {
    Text,
    View
} from 'react-native';

const ScreenOne = () => (
    <Screen headerText="Screen One"
            accessibilityLabel="screenOne"
            headerBgColor={colorsStyles.bgPurple}
            headerTextColor={colorsStyles.light}>
        <View>
            <Text>
                Some new text
            </Text>
            <Text>
                Some more new text
            </Text>
        </View>
    </Screen>
);


export default ScreenOne;