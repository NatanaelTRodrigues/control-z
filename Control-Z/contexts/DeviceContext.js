// contexts/DeviceContext.js
import React, { createContext, useState, useContext } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([
    // Alguns dados iniciais para teste
    { id: 1, type: 'Câmera', name: 'Câmera da Sala', icon: 'videocam', active: true },
    { id: 2, type: 'Lâmpada', name: 'Luz Quarto', icon: 'lightbulb', active: false },
  ]);

  const addDevice = (deviceType, deviceName) => {
    const newDevice = {
      id: Math.random(), // ID simples para o protótipo
      type: deviceType,
      name: deviceName || `Novo ${deviceType}`,
      icon: getDeviceIcon(deviceType), // Função auxiliar
      active: false,
      // Propriedades específicas
      settings: getInitialSettings(deviceType),
    };
    setDevices([...devices, newDevice]);
  };

  // Função para ligar/desligar
  const toggleDevice = (id) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, active: !device.active } : device
      )
    );
  };
  
  // Função para atualizar configurações (luz, ar, etc.)
  const updateDeviceSettings = (id, newSettings) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, settings: { ...device.settings, ...newSettings } } : device
      )
    );
  };


  // --- Funções Auxiliares ---
  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Câmera': return 'videocam';
      case 'Lâmpada': return 'lightbulb';
      case 'Ar Condicionado': return 'ac-unit';
      case 'Cafeteira': return 'coffee';
      case 'Banheira': return 'bathtub';
      case 'Tomada': return 'power';
      case 'Interruptor': return 'toggle-on';
      case 'Smart TV': return 'tv';
      default: return 'devices-other';
    }
  };
  
  const getInitialSettings = (type) => {
     switch (type) {
      case 'Lâmpada':
        return { brightness: 'media', color: '#FFFFFF', mode: 'normal' };
      case 'Ar Condicionado':
        return { temperature: 22 };
      case 'Cafeteira':
        return { beverage: 'café' };
      default:
        return {};
    }
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice, toggleDevice, updateDeviceSettings }}>
      {children}
    </DeviceContext.Provider>
  );
};

// Hook
export const useDevices = () => {
  return useContext(DeviceContext);
};