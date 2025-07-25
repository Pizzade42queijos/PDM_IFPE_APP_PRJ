import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import AuthContext from '../../contexts/AuthContext';
import client from '../../api/client';

const EditProfileScreen = ({ navigation }) => {
    const { userInfo, userProfile, fetchUserData } = useContext(AuthContext);
    const isVolunteer = userInfo?.user_type === 'volunteer';

    // Inicializa o estado do formulário com os dados atuais do perfil
    const [formData, setFormData] = useState({
        full_name: userProfile?.full_name || '',
        org_name: userProfile?.org_name || '',
        description: userProfile?.description || '',
        contact_whatsapp: userProfile?.contact_whatsapp || '',
        volunteer_days: userProfile?.volunteer_days || '',
        volunteer_hours: userProfile?.volunteer_hours || '',
        vacancies: userProfile?.vacancies?.toString() || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Prepara o payload removendo campos vazios que não devem ser enviados
            const payload = {};
            for (const key in formData) {
                if (formData[key]) { // Envia apenas campos preenchidos
                    payload[key] = formData[key];
                }
            }
             // Converte vagas para número
            if (payload.vacancies) {
                payload.vacancies = parseInt(payload.vacancies, 10);
            }

            await client.put('/users/me/profile', payload);
            
            // Atualiza os dados no contexto para refletir na UI
            await fetchUserData();

            Alert.alert('Sucesso', 'Perfil atualizado!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (e) {
            setError(e.response?.data?.detail || 'Não foi possível salvar as alterações.');
            console.error(e.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={editStyles.safeArea}>
            <ScrollView contentContainerStyle={editStyles.container}>
                <Title>Editar {isVolunteer ? 'Perfil de Voluntário' : 'Perfil da Organização'}</Title>
                
                {isVolunteer ? (
                    <TextInput
                        label="Nome Completo"
                        value={formData.full_name}
                        onChangeText={(val) => handleInputChange('full_name', val)}
                        style={editStyles.input}
                    />
                ) : (
                    <TextInput
                        label="Nome da Organização"
                        value={formData.org_name}
                        onChangeText={(val) => handleInputChange('org_name', val)}
                        style={editStyles.input}
                    />
                )}

                <TextInput
                    label="Descrição"
                    value={formData.description}
                    onChangeText={(val) => handleInputChange('description', val)}
                    style={editStyles.input}
                    multiline
                    numberOfLines={4}
                />
                <TextInput
                    label="WhatsApp (ex: 5511987654321)"
                    value={formData.contact_whatsapp}
                    onChangeText={(val) => handleInputChange('contact_whatsapp', val)}
                    style={editStyles.input}
                    keyboardType="phone-pad"
                />

                {!isVolunteer && (
                    <>
                        <TextInput
                            label="Dias para Voluntariado (ex: Seg, Qua)"
                            value={formData.volunteer_days}
                            onChangeText={(val) => handleInputChange('volunteer_days', val)}
                            style={editStyles.input}
                        />
                        <TextInput
                            label="Horários (ex: 14:00 - 18:00)"
                            value={formData.volunteer_hours}
                            onChangeText={(val) => handleInputChange('volunteer_hours', val)}
                            style={editStyles.input}
                        />
                        <TextInput
                            label="Número de Vagas"
                            value={formData.vacancies}
                            onChangeText={(val) => handleInputChange('vacancies', val)}
                            style={editStyles.input}
                            keyboardType="numeric"
                        />
                    </>
                )}

                <HelperText type="error" visible={!!error}>{error}</HelperText>

                <Button mode="contained" onPress={handleSave} style={editStyles.button} loading={isLoading} disabled={isLoading}>
                    Salvar Alterações
                </Button>
                 <Button onPress={() => navigation.goBack()} style={editStyles.button} disabled={isLoading}>
                    Cancelar
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const editStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { padding: 20 },
    input: { marginBottom: 15 },
    button: { marginTop: 10 },
});

export default EditProfileScreen;