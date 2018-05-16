//@flow
import React, { Component } from 'react';
import {
    View
} from 'react-native';

import layoutStyles from './styles/layoutStyles';
import Router from './components/Router';
import appRoutes, { appRoutesLinks } from './appRoutes';
import NavigationRow from './components/NavigationRow';


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            activeRouteIndex: 0
        };
    }

    changeRoute = (index) => {
        this.setState({ activeRouteIndex: index });
    };

    render() {
        return (
            <View style={layoutStyles.fullScreen} accessibilityLabel="mainApp">
                <Router routes={appRoutes} activeRouteIndex={this.state.activeRouteIndex}/>
                <NavigationRow links={appRoutesLinks}
                               activeLinkIndex={this.state.activeRouteIndex}
                               onLinkPress={this.changeRoute}/>
            </View>
        );
    }
}