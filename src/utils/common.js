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

export const BACKGROUND_LOGIN = 'https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg';
