import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [fadeIn] = useState(new Animated.Value(0)); // Başlangıçta başlık görünmüyor
  const [scale, setScale] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const handleBackPress = () => {
      BackHandler.exitApp(); // Uygulamayı kapat
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground source={require('../assets/images/turkish_airlines_logo.png')} style={styles.container}>
      {/* Başlık kısmı */}
      <Animated.View style={[styles.titleWrapper, { opacity: fadeIn }]}>
        <Text style={styles.title}>KareKüp Oyunu 2</Text>
      </Animated.View>

      {/* OYNA Butonu */}
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('GameScreen');
          startAnimation();
        }}>
          <Text style={styles.buttonText}>OYNA</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Nasıl Oynanır? Butonu */}
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }, { marginTop: 25 }]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('InstructionScreen1');
          startAnimation();
        }}>
          <Text style={styles.buttonText}>Nasıl Oynanır?</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Çıkış Butonu */}
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }, { marginTop: 25 }]}>
        <TouchableOpacity onPress={() => {
          BackHandler.exitApp();
          startAnimation();
        }}>
          <Text style={styles.buttonText}>Çıkış</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Daha yumuşak bir arka plan rengi
  },
  titleWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hafif koyulaştırılmış arka plan
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700', // Altın rengi kenarlık
  },
  title: {
    fontSize: 65,
    fontWeight: '900',
    color: '#FF6347', // Kırmızımsı turuncu
    textAlign: 'center',
    fontFamily: 'Cochin',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 18,
    backgroundColor: 'transparent',
    transform: [{ rotate: '-6deg' }],
  },
  buttonWrapper: {
    width: 240,
    height: 60,
    backgroundColor: '#32CD32', // Canlı yeşil renk
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
