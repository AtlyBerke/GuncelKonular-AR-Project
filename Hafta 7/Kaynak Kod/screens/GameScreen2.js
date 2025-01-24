import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';

export default function GameScreen2() {
  const [number, setNumber] = useState('');
  const [square, setSquare] = useState(null);
  const [cube, setCube] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [userAnswer, setUserAnswer] = useState('');
  const [remainingTries, setRemainingTries] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [squareAnim] = useState(new Animated.Value(0));  // Kare animasyonu
  const [cubeAnim] = useState(new Animated.Value(0));    // Küp animasyonu
  const [messageAnim] = useState(new Animated.Value(0));  // "Bravo, doğru bildiniz!" mesaj animasyonu
  const navigation = useNavigation();

  const animationValue = new Animated.Value(1);
  const triesAnimation = new Animated.Value(1);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setPaymentOption(true);
      navigation.navigate('PaymentScreen');
    }
  }, [timeLeft, navigation]);

  const resetAnimations = () => {
    squareAnim.setValue(0);
    cubeAnim.setValue(0);
    messageAnim.setValue(0); // Mesaj animasyonunu sıfırlama
  };

  const calculateSquareAndCube = () => {
    resetAnimations();  // Animasyonları sıfırla

    const num = parseFloat(number);
    if (!isNaN(num)) {
      setSquare(num ** 2);
      setCube(num ** 3);

      // Animasyonları başlat
      Animated.parallel([
        Animated.timing(squareAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(cubeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setSquare(null);
      setCube(null);
    }
  };

  const animateTries = () => {
    Animated.sequence([ 
      Animated.timing(triesAnimation, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(triesAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateFinalTry = () => {
    Animated.loop(
      Animated.sequence([ 
        Animated.timing(triesAnimation, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(triesAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

const checkAnswer = () => {
  if (userAnswer === '729') {
    setCorrectAnswer(true);
    // Doğru cevabı verdiyse, "Bravo, doğru bildiniz!" mesajını göster ve GameScreen2'ye git
    setTimeout(() => {
      navigation.replace('GameScreen3', { message: 'Bravo, doğru bildiniz!' });
    }, 5000);  // Mesajın animasyonu için 1 saniye bekle
    // Mesaj animasyonunu başlat
    Animated.timing(messageAnim, {
      toValue: 1,
      duration: 3000,  // Mesajın daha uzun süre görünmesi için animasyon süresi arttırıldı
      useNativeDriver: true,
    }).start();
  } else {
    if (remainingTries > 1) {
      setRemainingTries(remainingTries - 1);
      setUserAnswer('');
      animateTries();
    } else {
      setPaymentOption(true);
      animateFinalTry(); // Titreşim animasyonu başlat
      navigation.navigate('PaymentScreen');
    }
  }
};


  return (
    <View style={styles.container}>
      {/* Arka plan videosu */}
      <Video
        source={require('../assets/videos/thy-video.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />

      <View style={styles.timerContainer}>
        {/* Home Butonu PNG ile değiştirildi */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/images/home.png')} style={styles.homeImage} />
        </TouchableOpacity>
        <Text style={styles.timer}>Kalan Zaman: {timeLeft} saniye</Text>
        <View style={styles.challengeTextContainer}>
          <Text style={styles.challengeText}>
            2 ile 200 arasındaki bir sayının karesi diğer sayının da küpü olan o sayıyı bulun!
          </Text>
           <Text style={styles.hintText}>
            💡 İpucu: Bir sayının karesi demek, bir sayının kendisiyle çarpımıdır. Küpü ise, bir sayının üç kez çarpılmasıdır.
          </Text>
        </View>
      </View>

      <View style={styles.calculatorContainer}>
        <Text style={styles.title}>Kare ve Küp Hesaplayıcı</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Bir sayı girin"

          
          value={number}
          onChangeText={(text) => setNumber(text)}
        />
        <TouchableOpacity style={styles.button} onPress={calculateSquareAndCube}>
          <Text style={styles.buttonText}>Hesapla</Text>
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Animated.Text
            style={[styles.resultText, { opacity: squareAnim }]}>
            Kare: {square !== null ? square : 'Hesaplanmadı'}
          </Animated.Text>
          <Animated.Text
            style={[styles.resultText, { opacity: cubeAnim }]}>
            Küp: {cube !== null ? cube : 'Hesaplanmadı'}
          </Animated.Text>
        </View>
      </View>

      <View style={styles.answerContainer}>
        {correctAnswer ? (
          <Animated.Text
            style={[
              styles.resultText,
              {
                opacity: messageAnim,
                color: 'green',
                fontSize: 24,
                fontWeight: 'bold',
                transform: [{ scale: messageAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.1] }) }],
              },
            ]}>
            Bravo, doğru bildiniz!
          </Animated.Text>
        ) : (
          <>
            <TextInput
              style={styles.answerInput}
              placeholder="Cevabınızı girin"
              value={userAnswer}
              onChangeText={(text) => setUserAnswer(text)}
            />
            <TouchableOpacity style={styles.button2} onPress={checkAnswer}>
              <Text style={styles.buttonText}>Cevabı Kontrol Et</Text>
            </TouchableOpacity>
            <Animated.Text
              style={[styles.triesText, { transform: [{ scale: triesAnimation }] }]}>
              Kalan Cevap Hakkınız: {remainingTries}
            </Animated.Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 10,
    fontFamily: 'Comic Sans MS',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  challengeTextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 10,
  },
  challengeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Comic Sans MS',
  },
  homeButton: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
  },
  homeImage: {
    width: 40,
    height: 40,
  },
  calculatorContainer: {
    marginTop: 10,
    padding: 8,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FF6F61',
    fontFamily: 'Comic Sans MS',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 200,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  answerContainer: {
    marginTop: 10,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
  },
  answerInput: {
    borderWidth: 2,
    borderColor: '#FF6F61',
    padding: 15,
    width: 200,
    fontSize: 18,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: '#FF6F61',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
  },
  button2: {
  backgroundColor: '#FF6F61',
  padding: 10,
  marginTop: 2,
  borderRadius: 5,
  position: 'relative', // relative pozisyonu ekleyin
  top: -15, // Butonu yukarı taşımak için top değerini negatif bir sayıya ayarlayın
},
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  triesText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
});
