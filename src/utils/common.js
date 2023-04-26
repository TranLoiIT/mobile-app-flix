import { Alert } from "react-native";
import { TEXT } from "../constants/message";

export const showAlert = (message) => {
    Alert.alert(
        TEXT.NOTIFICATION,
        `${message}`,
        [
            {
                text: 'OK',
                onPress: () => console.log('Cancel Pressed'),
                style: 'OK',
            }
        ],
    )
};