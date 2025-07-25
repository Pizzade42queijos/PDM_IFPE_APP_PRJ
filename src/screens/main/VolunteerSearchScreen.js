import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Card, Title, Text, ActivityIndicator, Paragraph } from 'react-native-paper';
import * as Location from 'expo-location';
import client from '../../api/client';

const VolunteerSearchScreen = ({ navigation }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchVolunteers = async () => {
        setError('');
        setIsLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de localização negada.');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const response = await client.get('/search/volunteers', {
                params: { lat: latitude, lon: longitude, radius_km: 50 }
            });
            setVolunteers(response.data);
        } catch (e) {
            setError('Não foi possível buscar voluntários.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchVolunteers().then(() => setRefreshing(false));
    }, []);

    if (isLoading) {
        return <ActivityIndicator animating={true} size="large" style={{ flex: 1 }} />;
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail', { profile: item, type: 'volunteer' })}>
            <Card style={searchStyles.card}>
                <Card.Content>
                    <Title>{item.full_name}</Title>
                    <Paragraph>Escolaridade: {item.education.replace(/_/g, ' ')}</Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={volunteers}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={<Title style={searchStyles.title}>Voluntários Próximos</Title>}
            ListEmptyComponent={<Paragraph style={searchStyles.emptyText}>Nenhum voluntário encontrado.</Paragraph>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={searchStyles.container}
        />
    );
};

// Reutilizando os estilos da outra tela de busca
// const searchStyles = StyleSheet.create({...});

export default VolunteerSearchScreen;