import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    link: {
        minWidth: 75,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeLink: {
        borderBottomWidth: 1,
        borderBottomColor: '#757575'
    }
});