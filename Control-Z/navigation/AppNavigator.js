// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Ícones

// Telas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import DeviceDetailsScreen from '../screens/DeviceDetailsScreen';
import StatsScreen from '../screens/StatsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Estilo para o modo escuro (baseado no seu figma)
const screenOptions = {
  headerStyle: { backgroundColor: '#121212' },
  headerTintColor: '#fff',
  headerTitleStyle: { color: '#fff' },
  headerShown: false, // Vamos esconder o header padrão
};

const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#3498db', // Azul do 'Z'
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#1E1E1E', // Fundo escuro para a tab bar
    borderTopColor: '#333',
  },
};

// Navegação principal (Tabs) após o login
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen} // Crie esse arquivo (pode ser vazio por enquanto)
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen} // Crie esse arquivo
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen} // Crie esse arquivo
        options={{
          tabBarLabel: 'Config',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal que agrupa tudo
export default function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isLoggedIn ? (
        // Se logado, mostra as telas do app
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="AddDevice" component={AddDeviceScreen} options={{ headerShown: true, title: 'Cadastre seu Novo Dispositivo' }} />
          <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} options={{ headerShown: true, title: 'Controle do Dispositivo' }} />
        </>
      ) : (
        // Se não logado, mostra as telas de autenticação
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, title: 'Registre-se' }} />
        </>
      )}
    </Stack.Navigator>
  );
}