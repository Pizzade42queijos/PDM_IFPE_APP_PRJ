import React, { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Button, Title, Paragraph, HelperText } from 'react-native-paper';
import AuthContext from '../../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useContext(AuthContext);

    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            await login(email, password);
            // A navegação será tratada pelo RootNavigator
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <SafeAreaView style={loginStyles.safeArea}>
            <View style={loginStyles.container}>
                <Title style={loginStyles.title}>Login</Title>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={loginStyles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    style={loginStyles.input}
                    secureTextEntry
                />
                <HelperText type="error" visible={!!error}>
                    {error}
                </HelperText>
                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={loginStyles.button}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Entrar
                </Button>
                <Button
                    onPress={() => navigation.goBack()}
                    style={loginStyles.button}
                    disabled={isLoading}
                >
                    Voltar
                </Button>
            </View>
        </SafeAreaView>
    );
};

const loginStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
    input: { marginBottom: 10 },
    button: { marginTop: 10 },
});

export default LoginScreen;