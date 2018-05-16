//@flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

type Route = {
    Component: PropTypes.node
};

type Props = {
    routes: Array<Route>,
    activeRouteIndex: number
};

class Router extends Component<Props> {
    constructor(props) {
        super(props);
    }

    static defaultProps: {
        activeRouteIndex: 0
    };

    render() {
        let { Component: RouteComponent } = this.props.routes[this.props.activeRouteIndex];
        return <RouteComponent/>;
    }
}


export default Router;