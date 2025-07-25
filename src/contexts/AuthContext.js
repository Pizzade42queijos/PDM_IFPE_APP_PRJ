import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const res = await client.post('/login/access-token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (res.data.access_token) {
        const token = res.data.access_token;
        await AsyncStorage.setItem('token', token);
        setUserToken(token);
        await fetchUserData();
      }
    } catch (e) {
      console.error('Erro no login:', e.response?.data || e.message);
      throw new Error('Email ou senha inválidos.');
    } finally {
        setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
     try {
      const userRes = await client.get('/users/me');
      setUserInfo(userRes.data);
      const profileRes = await client.get('/users/me/profile');
      setUserProfile(profileRes.data);
    } catch (e) {
      console.error('Erro ao buscar dados do usuário:', e);
      logout();
    }
  }

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserProfile(null);
    await AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
        await fetchUserData();
      }
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, userProfile, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;