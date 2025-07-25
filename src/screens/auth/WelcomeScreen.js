import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Title style={styles.title}>Bem-vindo(a)!</Title>
            <Paragraph style={styles.paragraph}>Conectando corações, transformando vidas.</Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Entrar
            </Button>
            <Paragraph style={styles.orText}>ou</Paragraph>
            <Title style={styles.subtitle}>Cadastre-se como:</Title>
            {/* ** NOVO: Navegação para as telas de registro ** */}
            <Button mode="outlined" onPress={() => navigation.navigate('RegisterVolunteer')} style={styles.button}>
                Voluntário(a)
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate('RegisterOrg')} style={styles.button}>
                Organização
            </Button>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
  buttonLabel: {
    paddingVertical: 5,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default WelcomeScreen;
