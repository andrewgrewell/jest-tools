//@flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native';
import layoutStyles from '../styles/layoutStyles';

import styles from './NavigationRow.styles';

type Link = {
    name: string,
    id: ?string
}
type Props = {
    links: Array<Link>,
    rowStyle: ViewPropTypes.style,
    onLinkPress: PropTypes.func,
    activeLinkIndex: PropTypes.number
}
class NavigationRow extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getActiveLinkStyle = (index) => index === this.props.activeLinkIndex ? styles.activeLink : null;
    renderNavButtons = () => {
        return this.props.links.map((link, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => this.props.onLinkPress(i)}>
                    <View style={[styles.link, this.getActiveLinkStyle(i)]} accessibilityLabel={`navigationLink:${i + 1}`}>
                        <Text>{link.linkText}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    render() {
        return (
            <View style={[layoutStyles.fullRow, styles.container, this.props.rowStyle]}>
                {this.renderNavButtons()}
            </View>
        );
    }
}


export default NavigationRow;