import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import LeadDetails from '../screens/LeadDetails';
import OCRCapture from '../screens/ocrAddUser';
import OcrAddUser from '../screens/OcrAddUser';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="leadDetails"
        component={LeadDetails}
        options={{ headerShown: true, title: 'Lead Details' }}
      />
      <Stack.Screen
        name="ocrAddUser"
        component={OcrAddUser}
        options={{ headerShown: true, title: 'OCR Capture' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
