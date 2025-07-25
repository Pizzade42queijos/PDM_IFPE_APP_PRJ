import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Card, Title, Text, ActivityIndicator, Paragraph } from 'react-native-paper';
import * as Location from 'expo-location';
import client from '../../api/client';

const OrganizationSearchScreen = ({ navigation }) => {
    const [organizations, setOrganizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrganizations = async () => {
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

            const response = await client.get('/search/organizations', {
                params: { lat: latitude, lon: longitude, radius_km: 50 } // Raio de 50km
            });
            setOrganizations(response.data);
        } catch (e) {
            setError('Não foi possível buscar as organizações.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOrganizations().then(() => setRefreshing(false));
    }, []);

    if (isLoading) {
        return <ActivityIndicator animating={true} size="large" style={{ flex: 1 }} />;
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail', { profile: item, type: 'organization' })}>
            <Card style={searchStyles.card}>
                <Card.Content>
                    <Title>{item.org_name}</Title>
                    <Paragraph>Área: {item.area}</Paragraph>
                    <Text numberOfLines={2}>{item.description}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={organizations}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={<Title style={searchStyles.title}>Organizações Próximas</Title>}
            ListEmptyComponent={<Paragraph style={searchStyles.emptyText}>Nenhuma organização encontrada.</Paragraph>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={searchStyles.container}
        />
    );
};

const searchStyles = StyleSheet.create({
    container: { flexGrow: 1, padding: 10 },
    title: { paddingHorizontal: 10, paddingTop: 10, fontSize: 24},
    card: { marginVertical: 8, marginHorizontal: 10 },
    emptyText: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' }
});

export default OrganizationSearchScreen;
