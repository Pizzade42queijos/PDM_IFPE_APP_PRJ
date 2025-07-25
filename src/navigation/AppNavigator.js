import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import AuthContext from '../contexts/AuthContext';

import OrganizationSearchScreen from '../screens/main/OrganizationSearchScreen';
import VolunteerSearchScreen from '../screens/main/VolunteerSearchScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ProfileDetailScreen from '../screens/main/ProfileDetailScreen';

import EditProfileScreen from '../screens/main/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ir da lista para os detalhes.
const SearchStack = () => {
    const { userInfo } = useContext(AuthContext);
    const isVolunteer = userInfo?.user_type === 'volunteer';

    const SearchScreenComponent = isVolunteer ? OrganizationSearchScreen : VolunteerSearchScreen;
    const initialRouteName = isVolunteer ? "Buscar Organizações" : "Buscar Voluntários";

    return (
        <Stack.Navigator>
            <Stack.Screen name={initialRouteName} component={SearchScreenComponent} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ title: 'Detalhes do Perfil' }} />
        </Stack.Navigator>
    );
};

// **  "pilha" de navegação para o perfil**
const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyProfile" component={ProfileScreen} options={{ title: 'Meu Perfil' }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Editar Perfil' }} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Busca') {
                        iconName = 'magnify';
                    } else if (route.name === 'Perfil') {
                        iconName = 'account-circle';
                    }
                    return <IconButton icon={iconName} size={size} iconColor={color} />;
                },
            })}
        >
            <Tab.Screen name="Busca" component={SearchStack} />
            {/* aba Perfil agora aponta para a pilha de navegação do perfil. */}
            <Tab.Screen name="Perfil" component={ProfileStack} />
        </Tab.Navigator>
    );
};

export default AppNavigator;

