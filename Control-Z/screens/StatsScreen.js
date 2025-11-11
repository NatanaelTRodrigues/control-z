// screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
};

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>
      <Text style={styles.subtitle}>Em breve...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.text,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
  }
});