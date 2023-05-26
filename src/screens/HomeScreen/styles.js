import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, grayColor } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white
    },
    imageCategory: {
        width: 100,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 5,
        margin: 5,
    },
    banner: {
        alignItems: 'center',
        position: "relative"
    },
    titleBanner: {
        fontSize: 20,
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    imageBanner: {
        width: Dimensions.get('window').width * 10/12,
        height: Dimensions.get('window').height * 8/12,
        resizeMode:'cover',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: grayColor(0.7),
    },
    iconPlay: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
    },

    // Button
    playButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    playButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 6,
        marginVertical: 5,
        width: '80%',
    },
});

export default styles;