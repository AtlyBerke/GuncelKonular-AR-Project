import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av'; // expo-av paketiyle ses çalma

import HomeScreen from './screens/HomeScreen';
import InstructionScreen1 from './screens/InstructionScreen1';
import InstructionScreen2 from './screens/InstructionScreen2';
import InstructionScreen3 from './screens/InstructionScreen3';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import PaymentScreen from './screens/PaymentScreen'; // Ödeme ekranı

const Stack = createStackNavigator();

export default function App() {
  const [paymentMade, setPaymentMade] = useState(false); // Ödeme durumunu takip et
  const [timeLeft, setTimeLeft] = useState(0); // Kalan süre
  let sound; // Ses dosyası referansı

  useEffect(() => {
    const playMusic = async () => {
      try {
        sound = new Audio.Sound();
        await sound.loadAsync(require('./assets/audio/background-music.mp3')); // Müzik dosyası yolu
        await sound.playAsync();
        sound.setIsLoopingAsync(false); // Döngüyü kapat
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.playAsync(); // Bittiğinde tekrar başlat
          }
        });
      } catch (error) {
        console.error('Müzik oynatma hatası:', error);
      }
    };

    playMusic();

    // Temizlik: Uygulama kapanırken veya bileşen kaldırılırken müziği durdur ve belleği temizle
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

  // Ödeme yapıldığında 12 saatlik zamanlayıcıyı başlat
  const handlePayment = () => {
    setPaymentMade(true);
    setTimeLeft(12 * 60 * 60); // 12 saatlik zaman başlat
  };

  // Zamanlayıcıyı her saniye güncelle
  useEffect(() => {
    if (paymentMade && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Zaman dolduğunda oyunun bittiğini göster
      if (timeLeft === 0) {
        clearInterval(timer);
        // Game Over ekranına yönlendirilebilir
      }

      return () => clearInterval(timer); // Temizlik
    }
  }, [paymentMade, timeLeft]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionScreen1" component={InstructionScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionScreen2" component={InstructionScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="InstructionScreen3" component={InstructionScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GameOverScreen" component={GameOverScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="PaymentScreen" 
          component={PaymentScreen} 
          options={{ headerShown: false }} 
          initialParams={{ onPayment: handlePayment }} // Payment ekranına ödeme fonksiyonunu gönder
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
