import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}