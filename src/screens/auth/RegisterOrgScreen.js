import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, HelperText, RadioButton, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import client from '../../api/client';

const areas = [
    { label: 'T.I.', value: 'T.I.' },
    { label: 'Saúde', value: 'Saúde' },
    { label: 'Direito', value: 'Direito' },
    { label: 'Obras e Serviços Gerais', value: 'Obras e Serviços Gerais' },
    { label: 'Meio Ambiente', value: 'Meio Ambiente' },
    { label: 'Saúde Animal', value: 'Saúde Animal' },
    { label: 'Ativismo Social', value: 'Ativismo Social' },
];

const RegisterOrgScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [area, setArea] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de localização negada.'); return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    const handleRegister = async () => {
        setError('');
        if (!email || !password || !orgName || !area) {
            setError('Por favor, preencha todos os campos obrigatórios.'); return;
        }
        if (!location) {
            setError('Aguardando obtenção da localização...'); return;
        }
        setIsLoading(true);
        try {
            const payload = {
                user_in: { email, password },
                profile_in: {
                    org_name: orgName,
                    area: area,
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            };
            await client.post('/users/register/organization', payload);
            Alert.alert('Sucesso!', 'Cadastro realizado. Por favor, faça o login.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (e) {
            setError(e.response?.data?.detail || 'Ocorreu um erro no cadastro.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={registerStyles.safeArea}>
            <ScrollView contentContainerStyle={registerStyles.container}>
                <Title style={registerStyles.title}>Cadastro de Organização</Title>
                <TextInput label="Nome da Organização" value={orgName} onChangeText={setOrgName} style={registerStyles.input} />
                <TextInput label="Email de Contato" value={email} onChangeText={setEmail} style={registerStyles.input} keyboardType="email-address" autoCapitalize="none" />
                <TextInput label="Senha" value={password} onChangeText={setPassword} style={registerStyles.input} secureTextEntry />
                <Text style={registerStyles.radioLabel}>Área de Atuação</Text>
                <RadioButton.Group onValueChange={newValue => setArea(newValue)} value={area}>
                    {areas.map(item => (
                        <View key={item.value} style={registerStyles.radioItem}><RadioButton value={item.value} /><Text>{item.label}</Text></View>
                    ))}
                </RadioButton.Group>
                <HelperText type="error" visible={!!error}>{error}</HelperText>
                <Button mode="contained" onPress={handleRegister} style={registerStyles.button} disabled={isLoading || !location} loading={isLoading}>Cadastrar</Button>
                <Button onPress={() => navigation.goBack()} style={registerStyles.button} disabled={isLoading}>Voltar</Button>
            </ScrollView>
        </SafeAreaView>
    );
};

// Reutilizando os estilos da outra tela de registro
// const registerStyles = StyleSheet.create({...});

export default RegisterOrgScreen;