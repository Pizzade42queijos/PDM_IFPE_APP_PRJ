import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
// ** NOVO: Importação das telas de registro **
import RegisterVolunteerScreen from '../screens/auth/RegisterVolunteerScreen';
import RegisterOrgScreen from '../screens/auth/RegisterOrgScreen';

const Stack = createNativeStackNavigator();

// Define as telas acessíveis antes do login
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* ** NOVO: Telas de registro adicionadas à navegação ** */}
      <Stack.Screen name="RegisterVolunteer" component={RegisterVolunteerScreen} />
      <Stack.Screen name="RegisterOrg" component={RegisterOrgScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
