import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

// Este componente é o "porteiro" do app.
// Ele decide qual conjunto de telas mostrar com base no estado de login.
const RootNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  // Mostra um indicador de carregamento enquanto verifica o token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;