import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateScreen, ListScreen, DetailScreen } from '../screens/bankingServicesScreens';
import { RootStackParamList } from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack: React.FC = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false,
                }}
                initialRouteName='ListScreen'
            >
                <Stack.Screen name="ListScreen" component={ListScreen} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
                <Stack.Screen name="CreateScreen" component={CreateScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#281034',
    },
});

export default AppStack;