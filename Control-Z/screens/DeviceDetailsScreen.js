// screens/DeviceDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useDevices } from '../contexts/DeviceContext';
import { Ionicons } from '@expo/vector-icons';
// Usaremos um Slider para a temperatura
import Slider from '@react-native-community/slider'; 

// --- Nossos Estilos ---
const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#3498db',
  card: '#1E1E1E',
  inactive: '#888',
};

// --- Componentes de Controle Específicos ---

// Controles para LÂMPADA
const LampControls = ({ device, onUpdate }) => {
  const settings = device.settings;
  return (
    <>
      <Text style={styles.controlLabel}>Intensidade</Text>
      <View style={styles.optionRow}>
        {['baixa', 'media', 'alta'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.optionButton, settings.brightness === level && styles.optionButtonActive]}
            onPress={() => onUpdate({ brightness: level })}
          >
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.controlLabel}>Cor</Text>
      <View style={styles.optionRow}>
        {['#FFFFFF', '#FFD700', '#FF4500'].map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }, settings.color === color && styles.colorButtonActive]}
            onPress={() => onUpdate({ color: color })}
          />
        ))}
      </View>
      
      <Text style={styles.controlLabel}>Modo</Text>
       <View style={styles.optionRow}>
        <TouchableOpacity
          style={[styles.optionButton, settings.mode === 'normal' && styles.optionButtonActive]}
          onPress={() => onUpdate({ mode: 'normal' })}
        >
          <Text style={styles.optionText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, settings.mode === 'economia' && styles.optionButtonActive]}
          onPress={() => onUpdate({ mode: 'economia' })}
        >
          <Text style={styles.optionText}>Economia</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// Controles para AR CONDICIONADO
const AcControls = ({ device, onUpdate }) => {
  const settings = device.settings;
  return (
    <>
      <Text style={styles.controlLabel}>Temperatura</Text>
      <Text style={styles.tempText}>{settings.temperature}°C</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={16}
        maximumValue={30}
        step={1}
        value={settings.temperature}
        minimumTrackTintColor={darkTheme.primary}
        maximumTrackTintColor="#888"
        thumbTintColor={darkTheme.primary}
        onSlidingComplete={(value) => onUpdate({ temperature: value })}
      />
    </>
  );
};

// Controles para CAFETEIRA
const CoffeeControls = ({ device, onUpdate }) => {
  const settings = device.settings;
  const beverages = ['café', 'pingado', 'capuccino', 'chá'];
  return (
    <>
      <Text style={styles.controlLabel}>Tipo de Bebida</Text>
      <View style={styles.optionGrid}>
        {beverages.map((bev) => (
          <TouchableOpacity
            key={bev}
            style={[styles.optionButton, styles.optionButtonGrid, settings.beverage === bev && styles.optionButtonActive]}
            onPress={() => onUpdate({ beverage: bev })}
          >
            <Text style={styles.optionText}>{bev}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

// Controles para BANHEIRA (ou outros simples de ligar/desligar)
const SimpleControls = ({ device }) => {
  return (
     <Text style={styles.controlLabel}>
        {device.active ? "Dispositivo Ligado" : "Dispositivo Desligado"}
     </Text>
     // O switch principal na parte superior já controla isso
  );
};


// --- A TELA PRINCIPAL ---
export default function DeviceDetailsScreen({ route, navigation }) {
  const { deviceId } = route.params; // 1. Pega o ID enviado pela HomeScreen
  const { devices, toggleDevice, updateDeviceSettings } = useDevices();

  // 2. Encontra o dispositivo exato no nosso "banco de dados" (Context)
  const device = devices.find((d) => d.id === deviceId);

  // Se o dispositivo não for encontrado (embora não deva acontecer)
  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Dispositivo não encontrado.</Text>
      </SafeAreaView>
    );
  }
  
  // 3. Função para salvar as mudanças de (Luz, Ar, etc.) no Context
  const handleUpdate = (newSettings) => {
    updateDeviceSettings(deviceId, newSettings);
  };

  // 4. Função mágica que decide quais controles mostrar
  const renderDeviceControls = () => {
    switch (device.type) {
      case 'Lâmpada':
        return <LampControls device={device} onUpdate={handleUpdate} />;
      case 'Ar Condicionado':
        return <AcControls device={device} onUpdate={handleUpdate} />;
      case 'Cafeteira':
        return <CoffeeControls device={device} onUpdate={handleUpdate} />;
      case 'Banheira':
      case 'Portão':
      case 'Câmera':
      case 'Tomada':
      case 'Interruptor':
      case 'Smart TV':
        return <SimpleControls device={device} />;
      default:
        return <Text style={styles.controlLabel}>Controles não disponíveis.</Text>;
    }
  };

  // 5. Atualiza o título da tela para ser o nome do dispositivo
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: device.name });
  }, [navigation, device.name]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.headerIcon, { backgroundColor: device.active ? darkTheme.primary : darkTheme.card }]}>
          <Ionicons name={device.icon} size={60} color={darkTheme.text} />
        </View>

        <Text style={styles.title}>{device.name}</Text>
        <Text style={styles.subtitle}>{device.type}</Text>

        <View style={styles.mainControl}>
          <Text style={styles.mainControlText}>{device.active ? 'Ligado' : 'Desligado'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={device.active ? darkTheme.primary : '#f4f3f4'}
            onValueChange={() => toggleDevice(deviceId)}
            value={device.active}
          />
        </View>

        {/* Aqui é onde os controles dinâmicos aparecem */}
        <View style={styles.controlsContainer}>
          {renderDeviceControls()}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkTheme.text,
  },
  subtitle: {
    fontSize: 18,
    color: darkTheme.inactive,
    marginBottom: 30,
  },
  mainControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme.card,
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
  },
  mainControlText: {
    color: darkTheme.text,
    fontSize: 20,
    fontWeight: '500',
  },
  controlsContainer: {
    width: '100%',
  },
  controlLabel: {
    color: darkTheme.inactive,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: darkTheme.card,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: darkTheme.primary,
    borderColor: darkTheme.primary,
  },
  optionText: {
    color: darkTheme.text,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  colorButtonActive: {
    borderWidth: 3,
    borderColor: darkTheme.primary,
  },
  tempText: {
    color: darkTheme.text,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButtonGrid: {
     width: '48%', // Para 2 colunas
     marginBottom: 10,
  }
});