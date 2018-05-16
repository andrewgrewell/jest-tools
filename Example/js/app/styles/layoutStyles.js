import { StyleSheet } from 'react-native';


const layoutStyles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    fullView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    row: {
        flexDirection: 'row'
    },
    fullRow: {
        alignSelf: 'stretch',
        flexDirection: 'row'
    }
});

export default layoutStyles;