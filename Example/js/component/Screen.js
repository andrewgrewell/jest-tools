//@flow
import React, { Component } from 'react';
import {
    View,
    Text,
    ViewPropTypes
} from 'react-native';

import styles from './Screen.styles';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import colorsStyles from '../styles/colorStyles';

type Props = {
    headerBgColor: ?ViewPropTypes.style,
    headerTextColor: ?ViewPropTypes.style,
    headerText: string,
};

class Screen extends Component<Props> {
    constructor(props) {
        super(props);
    }

    static defaultProps: {
        screenBg: colorsStyles.bgLight
    };

    render() {
        return (
            <View style={[layoutStyles.fullView, this.props.screenBg]}>
                <View style={[styles.header, this.props.headerBgColor]}>
                    <Text style={[textStyles.headerText, colorsStyles.light, this.props.headerTextColor]}>
                        {this.props.headerText}
                    </Text>
                </View>
            </View>
        );
    }
}


export default Screen;