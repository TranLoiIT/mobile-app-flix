import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';

export const ViewContainer = ({ children, style }) => {

    return (
        <View style={[styles.container, style]}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
            <SafeAreaView style={{ flex: 1, }}>
                {children}
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        // paddingHorizontal: 24,
        paddingBottom: 24
    }
});
