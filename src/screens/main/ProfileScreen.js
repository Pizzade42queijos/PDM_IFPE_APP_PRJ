import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar, Title, Button, Text, Card, Paragraph } from 'react-native-paper';
import AuthContext from '../../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => { // Adicionado 'navigation'
    const { logout, userInfo, userProfile } = useContext(AuthContext);
    const isVolunteer = userInfo?.user_type === 'volunteer';

    return (
        <SafeAreaView style={profileStyles.safeArea}>
            <View style={profileStyles.container}>
                <Avatar.Icon size={80} icon="account" style={profileStyles.avatar} />
                <Title style={profileStyles.title}>{isVolunteer ? userProfile?.full_name : userProfile?.org_name}</Title>
                <Paragraph>{userInfo?.email}</Paragraph>
                
                <Card style={profileStyles.card}>
                    <Card.Content>
                        <Title>Minhas Informações</Title>
                        {isVolunteer ? (
                            <Paragraph>Escolaridade: {userProfile?.education?.replace(/_/g, ' ')}</Paragraph>
                        ) : (
                            <Paragraph>Área: {userProfile?.area}</Paragraph>
                        )}
                         <Paragraph>Descrição: {userProfile?.description || 'Adicione uma descrição.'}</Paragraph>
                    </Card.Content>
                </Card>

                {/* ** NOVO: Botão de editar agora navega para a tela de edição ** */}
                <Button
                    mode="contained-tonal"
                    onPress={() => navigation.navigate('EditProfile')}
                    style={profileStyles.button}
                >
                    Editar Perfil
                </Button>
                <Button
                    mode="contained"
                    onPress={logout}
                    style={profileStyles.button}
                >
                    Sair (Logout)
                </Button>
            </View>
        </SafeAreaView>
    );
};

const profileStyles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
    avatar: { marginBottom: 10 },
    title: { fontSize: 24 },
    card: { width: '100%', marginTop: 30, marginBottom: 10},
    button: { width: '100%', marginTop: 10 }
});

export default ProfileScreen;