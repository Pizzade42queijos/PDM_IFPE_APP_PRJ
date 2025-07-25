import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, HelperText, RadioButton, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import client from '../../api/client';

const educationLevels = [
    { label: 'Sem escolaridade', value: 'sem' },
    { label: 'Ensino Médio Cursando', value: 'ensino_medio_cursando' },
    { label: 'Ensino Médio Completo', value: 'ensino_medio_completo' },
    { label: 'Superior Cursando', value: 'superior_cursando' },
    { label: 'Superior Completo', value: 'superior_completo' },
];

const RegisterVolunteerScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [education, setEducation] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de localização negada. É necessária para o cadastro.');
                return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    const handleRegister = async () => {
        setError('');
        if (!email || !password || !fullName || !education) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        if (!location) {
            setError('Aguardando obtenção da localização...');
            return;
        }

        setIsLoading(true);
        try {
            const user_in = { email, password };
            const profile_in = {
                full_name: fullName,
                education: education,
                latitude: location.latitude,
                longitude: location.longitude,
            };

            await client.post('/users/register/volunteer', { user_in, profile_in });
            
            Alert.alert('Sucesso!', 'Cadastro realizado. Por favor, faça o login.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);

        } catch (e) {
            setError(e.response?.data?.detail || 'Ocorreu um erro no cadastro.');
            console.error(e.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={registerStyles.safeArea}>
            <ScrollView contentContainerStyle={registerStyles.container}>
                <Title style={registerStyles.title}>Cadastro de Voluntário(a)</Title>
                <TextInput label="Nome Completo" value={fullName} onChangeText={setFullName} style={registerStyles.input} />
                <TextInput label="Email" value={email} onChangeText={setEmail} style={registerStyles.input} keyboardType="email-address" autoCapitalize="none" />
                <TextInput label="Senha" value={password} onChangeText={setPassword} style={registerStyles.input} secureTextEntry />
                
                <Text style={registerStyles.radioLabel}>Escolaridade</Text>
                <RadioButton.Group onValueChange={newValue => setEducation(newValue)} value={education}>
                    {educationLevels.map(level => (
                        <View key={level.value} style={registerStyles.radioItem}>
                            <RadioButton value={level.value} />
                            <Text>{level.label}</Text>
                        </View>
                    ))}
                </RadioButton.Group>

                <HelperText type="error" visible={!!error}>{error}</HelperText>

                <Button mode="contained" onPress={handleRegister} style={registerStyles.button} disabled={isLoading || !location} loading={isLoading}>
                    Cadastrar
                </Button>
                <Button onPress={() => navigation.goBack()} style={registerStyles.button} disabled={isLoading}>
                    Voltar
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const registerStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
    input: { marginBottom: 10 },
    button: { marginTop: 10 },
    radioLabel: { marginTop: 15, marginBottom: 5, fontSize: 16, color: 'gray'},
    radioItem: { flexDirection: 'row', alignItems: 'center' }
});

export default RegisterVolunteerScreen;