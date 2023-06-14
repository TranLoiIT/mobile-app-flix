import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10, // Khoảng cách giữa các sao
    },
    totalStart: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
        // justifyContent: "center"
    },
    titleRating: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 12,
    },
    commnet: {
        flexDirection: "row",
        padding: 12,
        borderBottomColor: COLORS.grey,
        borderWidth: 1,
    },
    commentUserName: {
        fontWeight: "600",
        fontSize: 16,
        color: COLORS.red,
    },
    contentChat: {
        fontSize: 14,
        color: COLORS.white,
    },
    btnSendComment: {
        borderRadius: 5,
        padding: 8,
        width: 60,
        // alignContent: 'center',
        alignItems: 'center',
    },
    formRating: {
        marginTop: 24,
        marginBottom: 24,
        padding: 12,
        borderRadius: 5,
        backgroundColor: COLORS.backgroundThemeDark,
    },
    imageUser: {
        width: 64,
        height: 64,
        borderRadius: 5,
    }
})

export default styles;
