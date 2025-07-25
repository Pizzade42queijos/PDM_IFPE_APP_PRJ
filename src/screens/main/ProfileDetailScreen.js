import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Linking } from 'react-native';
import { Title, Paragraph, Button, Card, Text } from 'react-native-paper';
import AuthContext from '../../contexts/AuthContext';

const ProfileDetailScreen = ({ route }) => {
    const { profile, type } = route.params;
    const { userInfo } = useContext(AuthContext);

    const isVolunteer = type === 'volunteer';

    const handleContact = (contactType) => {
        if (contactType === 'whatsapp' && profile.contact_whatsapp) {
            Linking.openURL(`whatsapp://send?phone=${profile.contact_whatsapp}`);
        } else if (contactType === 'email' && userInfo.email) {
            Linking.openURL(`mailto:${userInfo.email}`);
        }
    };

    return (
        <SafeAreaView style={detailStyles.safeArea}>
            <ScrollView contentContainerStyle={detailStyles.container}>
                <Card style={detailStyles.card}>
                    <Card.Content>
                        <Title style={detailStyles.title}>{isVolunteer ? profile.full_name : profile.org_name}</Title>
                        
                        {isVolunteer ? (
                            <>
                                <Paragraph style={detailStyles.paragraph}>Escolaridade: {profile.education.replace(/_/g, ' ')}</Paragraph>
                                <Paragraph style={detailStyles.paragraph}>Descrição: {profile.description || 'Nenhuma descrição fornecida.'}</Paragraph>
                            </>
                        ) : (
                            <>
                                <Paragraph style={detailStyles.paragraph}>Área de Atuação: {profile.area}</Paragraph>
                                <Paragraph style={detailStyles.paragraph}>Descrição: {profile.description || 'Nenhuma descrição fornecida.'}</Paragraph>
                                <Paragraph style={detailStyles.paragraph}>Vagas: {profile.vacancies || 'Não informado'}</Paragraph>
                                <Paragraph style={detailStyles.paragraph}>Dias: {profile.volunteer_days || 'Não informado'}</Paragraph>
                                <Paragraph style={detailStyles.paragraph}>Horários: {profile.volunteer_hours || 'Não informado'}</Paragraph>
                            </>
                        )}
                    </Card.Content>
                </Card>

                <Card style={detailStyles.card}>
                    <Card.Title title="Contato" />
                    <Card.Content>
                        {profile.contact_whatsapp && (
                            <Button icon="whatsapp" mode="contained" onPress={() => handleContact('whatsapp')} style={{marginBottom: 10}}>
                                WhatsApp
                            </Button>
                        )}
                        {userInfo.email && (
                             <Button icon="email" mode="contained-tonal" onPress={() => handleContact('email')}>
                                Email
                            </Button>
                        )}
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

const detailStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
    container: { padding: 15 },
    card: { marginBottom: 15 },
    title: { fontSize: 26, marginBottom: 10 },
    paragraph: { fontSize: 16, marginBottom: 8, lineHeight: 22 },
});

export default ProfileDetailScreen;