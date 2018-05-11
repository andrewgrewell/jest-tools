//@flow
import React, { Component } from 'react';
import {
    View
} from 'react-native';

import layoutStyles from './styles/layoutStyles';
import Router from './component/Router';
import appRoutes, { appRoutesLinks } from './appRoutes';
import NavigationRow from './component/NavigationRow';


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={layoutStyles.fullScreen}>
                <Router routes={appRoutes} activeRouteIndex={0}/>
                <NavigationRow links={appRoutesLinks}/>
            </View>
        );
    }
}