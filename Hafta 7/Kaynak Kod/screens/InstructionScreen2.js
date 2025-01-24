import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';

export default function InstructionScreen2({ navigation }) {
  // Animasyonlar için state tanımlamaları
  const [fadeInTitle] = useState(new Animated.Value(0)); // Başlık için opaklık
  const [fadeInStep] = useState(new Animated.Value(0)); // Adım 2 için opaklık
  const [slideIn] = useState(new Animated.Value(-50)); // Adım 2 için kayma animasyonu

  useEffect(() => {
    // Animasyonları sırasıyla çalıştır
    Animated.sequence([
      Animated.timing(fadeInTitle, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInStep, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground source={require('../assets/images/turkish_airlines_logo.png')} style={styles.container}>
      {/* Nasıl Oynanır Başlığı */}
      <Animated.View style={[styles.titleWrapper, { opacity: fadeInTitle }]}>
        <Text style={styles.title}>Nasıl Oynanır?</Text>
      </Animated.View>

      {/* Adım 2 Metni */}
      <Animated.Text style={[styles.stepText, { opacity: fadeInStep, transform: [{ translateY: slideIn }] }]}>
        <Text style={styles.redText}>Adım 2: </Text>
        <Text style={styles.normalText}>2 sayı arasında, </Text>
        <Text style={styles.redText}>bir sayının KARESİ başka bir sayının da KÜPÜ olan sadece BİR sayı var! </Text>
        <Text style={styles.normalText}>Bunu bulmak için sayıların küplerini ve karelerini bilmelisin.</Text>
      </Animated.Text>

      {/* İleri Butonu */}
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: 1.1 }] }]}>
        <TouchableOpacity onPress={() => navigation.navigate('InstructionScreen3')}>
          <Text style={styles.buttonText}>İleri</Text>
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
    backgroundColor: 'transparent',
  },
  titleWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Başlık arka planına daha hafif şeffaf siyah renk ekledik
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 50, // Başlık ile metin arasına mesafe
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    borderWidth: 2, // Hafif sınır ekledik
    borderColor: '#FFF', // Hafif beyaz kenar
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E30613', // Türk Hava Yolları kırmızı rengi
    textAlign: 'center',
    fontFamily: 'Cochin', // Estetik bir font
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 15,
    backgroundColor: 'transparent',
    fontStyle: 'italic', // Eğik yazı stili ekledik
    transform: [{ rotate: '-10deg' }], // Eğik yazıyı sağa doğru eğdik
  },
  stepText: {
    fontSize: 28, // Daha büyük font boyutu
    color: '#333', // Genel yazı rengi (Koyu gri)
    textAlign: 'center',
    fontFamily: 'Poppins', // Estetik bir font
    lineHeight: 36, // Satır yüksekliği
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Başlık arka planına daha hafif şeffaf siyah renk ekledik
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6F61', // Turkish Airlines rengi
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Gölgeleme efekti
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },

  normalText: {
    color: '#fff', // Normal metin rengi (Koyu gri)
  },

  redText: {
    color: '#FF6F61', // Kırmızı renk (Turkish Airlines rengi)
    fontWeight: 'bold', // Kırmızı metinleri belirgin yapmak için
  },
  buttonWrapper: {
    width: 240,
    height: 60,
    backgroundColor: '#FF6347', // Buton rengi kırmızımsı turuncu
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase', // Buton metnini büyük harfe çevirme
  },
});