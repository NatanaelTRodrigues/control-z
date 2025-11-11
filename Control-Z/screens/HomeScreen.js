// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useDevices } from '../contexts/DeviceContext';
import { Ionicons } from '@expo/vector-icons';

// Cores
const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#3498db',
  card: '#1E1E1E',
};

export default function HomeScreen({ navigation }) {
  const { devices, toggleDevice } = useDevices();

  // Filtra por câmeras e outros dispositivos
  const cameras = devices.filter(d => d.type === 'Câmera');
  const otherDevices = devices.filter(d => d.type !== 'Câmera');

  // Componente para renderizar cada item de dispositivo
  const DeviceItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.deviceCard} 
      // Ao clicar, navega para os detalhes do dispositivo
      onPress={() => navigation.navigate('DeviceDetails', { deviceId: item.id })}
    >
      <Ionicons name={item.icon} size={24} color={item.active ? darkTheme.primary : darkTheme.text} />
      <Text style={styles.deviceName}>{item.name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={item.active ? darkTheme.primary : '#f4f3f4'}
        onValueChange={() => toggleDevice(item.id)}
        value={item.active}
        // Impede que o clique no switch ative o 'onPress' do card
        onStartShouldSetResponder={() => true} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá, Hugo</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDevice')}>
          <Text style={styles.addButtonText}>Novo Dispositivo +</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.kwhSummary}>
         <Text style={styles.kwhValue}>115.2 <Text style={styles.kwhUnit}>kWh</Text></Text>
         <Text style={styles.kwhLabel}>Consumo do Mês</Text>
      </View>

      <Text style={styles.sectionTitle}>Câmeras</Text>
      <FlatList
        data={cameras}
        renderItem={DeviceItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
      
      <Text style={styles.sectionTitle}>Outros Dispositivos</Text>
      <FlatList
        data={otherDevices}
        renderItem={DeviceItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

// Estilos (Adapte ao seu figma)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background, paddingHorizontal: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  headerTitle: { color: darkTheme.text, fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: darkTheme.primary, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
  addButtonText: { color: darkTheme.text, fontWeight: 'bold' },
  kwhSummary: { backgroundColor: darkTheme.card, padding: 20, borderRadius: 15, marginBottom: 20, alignItems: 'center' },
  kwhValue: { color: darkTheme.primary, fontSize: 32, fontWeight: 'bold' },
  kwhUnit: { fontSize: 16, color: darkTheme.primary },
  kwhLabel: { color: '#888', fontSize: 14, marginTop: 5 },
  sectionTitle: { color: darkTheme.text, fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  deviceCard: {
    flex: 1,
    backgroundColor: darkTheme.card,
    borderRadius: 15,
    padding: 20,
    margin: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 120,
  },
  deviceName: { color: darkTheme.text, fontSize: 16, fontWeight: '500', marginTop: 10 },
});