import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ViewContainer = ({ children, style }) => {

    return (
        <View style={[styles.container, style]}>
            {/* <View style={styles.header}>
                <Text style={{color: 'red'}}>header</Text>
            </View> */}
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={{ flex: 1,}}>
                {children}
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        height: '100%'
    },
    header: {
        backgroundColor: COLORS.black
    },
});
