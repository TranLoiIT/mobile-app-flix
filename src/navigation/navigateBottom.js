import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/Home';
import {DetailsScreen} from '../screens/Details';
import { ProfileScreen } from '../screens/Profile';
import VideoScreen from '../screens/Video';
import { IMAGES } from '../constants/image';
export const COLORS = {
  black: '#000000',
  inactive: '#A7A7CC',
  active: '#7878FA',
};

const Tab = createBottomTabNavigator();

export function MainBottom() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarActiveTintColor: COLORS.active,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={IMAGES.HOME} style={[styles.image, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={IMAGES.SEARCH} style={[styles.image, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={IMAGES.FILM} style={[styles.image, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image source={IMAGES.PROFILE} style={[styles.image, { tintColor: color }]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.black,
    borderTopWidth: 0,
  },
  image: {
    width: 24,
    height: 24
  },
});

export default MainBottom;
