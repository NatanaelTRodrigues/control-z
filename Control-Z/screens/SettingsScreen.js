// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Importamos o hook de autenticação

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#3498db',
  card: '#1E1E1E',
};

export default function SettingsScreen() {
  const { logout } = useAuth(); // Pegamos a função de logout

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair (Logout)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginBottom: 50,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: darkTheme.card,
    borderColor: '#E74C3C',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#E74C3C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});