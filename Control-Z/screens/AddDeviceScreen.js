// screens/AddDeviceScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDevices } from '../contexts/DeviceContext';
import { Ionicons } from '@expo/vector-icons';

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  primary: '#3498db',
};

// Tipos de dispositivos que você especificou
const DEVICE_TYPES = [
  { name: 'Câmera', icon: 'videocam' },
  { name: 'Lâmpada', icon: 'lightbulb' },
  { name: 'Ar Condicionado', icon: 'ac-unit' },
  { name: 'Cafeteira', icon: 'coffee' },
  { name: 'Banheira', icon: 'bathtub' },
  { name: 'Tomada', icon: 'power' },
  { name: 'Interruptor', icon: 'toggle-on' },
  { name: 'Smart TV', icon: 'tv' },
];

export default function AddDeviceScreen({ navigation }) {
  const { addDevice } = useDevices();

  const handleAddDevice = (type) => {
    // Adiciona o dispositivo ao nosso "contexto" (banco de dados falso)
    addDevice(type, `Meu ${type}`);
    
    // Volta para a Home, onde o dispositivo agora aparecerá
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DEVICE_TYPES}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleAddDevice(item.name)}>
            <Ionicons name={item.icon} size={24} color={darkTheme.primary} />
            <Text style={styles.itemText}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#888" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  item: {
    backgroundColor: darkTheme.card,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: darkTheme.text,
    fontSize: 18,
    flex: 1,
    marginLeft: 15,
  },
});