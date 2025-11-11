// screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// Usei cores placeholder. Substitua pelas cores exatas do seu figma.
const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#3498db', // Azul do logo
  input: '#2E2E2E',
};

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // Pega a função de login do nosso contexto

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Control Z</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Usuário/E-mail"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonSecondaryText}>Registre-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Estilos (Adapte ao seu figma)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginBottom: 60,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: darkTheme.input,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: darkTheme.text,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: darkTheme.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: darkTheme.input,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonSecondaryText: {
    color: darkTheme.text,
    fontSize: 16,
  },
});