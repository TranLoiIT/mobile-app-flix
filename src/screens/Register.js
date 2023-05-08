import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { ViewContainer } from "../components/ViewContainer"
import { TEXT } from "../constants/message";
import { COLORS } from "../constants/colors";
import { AppInputText } from "../components/app-inut-text";
import { useState } from "react";
import { AppButton } from "../components/app-button";
import { showAlert } from "../utils/common";
import { isEmail, isValidatePW } from "../utils/validate";
import { registerUser } from "../api/auth";
import { useDispatch } from "react-redux";
import { initialAuth, loginApp } from "../redux/authen/authSlice";
import { useNavigation } from "@react-navigation/native";
import { DATA_USER, ROUTER } from "../constants/key";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        userEmail: "loitd@gmail.com",
        userName: "loitd123",
        userPassword: "123456",
        confirmPassword: "123456",
    });

    const hanldeRegister = async () => {
        if (formData.userEmail === "" || formData.userName === "" ||
        formData.userPassword === "" || formData.confirmPassword === "") {
            showAlert(TEXT.ERROR.MSG_001);
        } else if (!isEmail(formData.userEmail)) {
            showAlert(TEXT.ERROR.MSG_003);
        } else if (formData.userPassword !== formData.confirmPassword) {
            showAlert(TEXT.ERROR.MSG_002);
        } else if (!isValidatePW(formData.userPassword)) {
            showAlert(TEXT.ERROR.MSG_004);
        } else {
            try {
                const data = await registerUser(formData);
                if (data) {
                    await AsyncStorage.setItem(DATA_USER, JSON.stringify(data));
                    dispatch(loginApp(data));
                }
                navigation.navigate(ROUTER.HOME);
            } catch (error) {
                console.log(error);
                const {response} = error;
                showAlert(response.data.msg);
            }
        }
    }

    return (
        <>
            <ViewContainer style={{paddingLeft: 20, paddingRight: 20}}>
                <Text style={styles.title}>{TEXT.REGISTER}</Text>
                <View style={{marginBottom: 12}}>
                    <AppInputText
                        value={formData.userName}
                        lable={TEXT.FORM_RS.NAME}
                        colorLable="white"
                        onChange={value => setFormData({...formData, userName: value})}
                        bgColorInput={'rgb(229 231 235)'}
                        colorText={COLORS.black}
                    />
                </View>
                <View style={{marginBottom: 12}}>
                    <AppInputText
                        value={formData.userEmail}
                        lable={TEXT.FORM_RS.EMAIL}
                        colorLable="white"
                        onChange={value => setFormData({...formData, userEmail: value})}
                        bgColorInput={'rgb(229 231 235)'}
                        colorText={COLORS.black}
                        maxLength={24}
                    />
                </View>
                <View style={{marginBottom: 12}}>
                    <AppInputText
                        value={formData.userPassword}
                        lable={TEXT.FORM_RS.PASSWORD}
                        colorLable="white"
                        onChange={value => setFormData({...formData, userPassword: value})}
                        bgColorInput={'rgb(229 231 235)'}
                        colorText={COLORS.black}
                        maxLength={24}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{marginBottom: 12}}>
                    <AppInputText
                        value={formData.confirmPassword}
                        lable={TEXT.FORM_RS.COMFIRMPW}
                        colorLable="white"
                        onChange={value => setFormData({...formData, confirmPassword: value})}
                        bgColorInput={'rgb(229 231 235)'}
                        colorText={COLORS.black}
                        maxLength={24}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <AppButton
                        label={TEXT.REGISTER}
                        onPress={() => hanldeRegister()}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <AppButton
                        label={TEXT.BACK}
                        colors={[COLORS.gradient2, COLORS.gradient2, COLORS.gradient1]}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                {/* <Pressable
                    onPress={() => {
                        // navigation.navigate()
                    }}
                    style={{marginTop: 42}}
                >
                    <Text style={[styles.back]}>{TEXT.BACK}</Text>
                </Pressable> */}
            </ViewContainer>
        </>
    )
};

export default RegisterScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 52,
        marginBottom: 32,
    },
    lable: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
    back: {
        color: "red",
        fontSize: 16,
        fontWeight: 600,
    },
});