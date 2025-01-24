# Snack Uygulamasından APK Oluşturma Rehberi
Bu rehber, Snack'ten indirdiğiniz projeyi Expo CLI kullanarak APK formatında bir Android uygulamasına dönüştürme adımlarını içerir.

Başlamadan Önce
APK oluşturmak için aşağıdaki araçlara ihtiyacınız olacak:

Node.js ve npm: Node.js indirme bağlantısı
*Expo CLI:
# npm install -g expo-cli

*EAS CLI:
# npm install -g eas-cli

-Adım 1: Snack Projenizi İndirin
Snack projenizde sağ üst köşede bulunan Download butonuna tıklayın.
Proje dosyalarını bilgisayarınıza indirin ve bir klasöre çıkarın.
-Adım 2: Proje Dizini Hazırlayın
Terminali açın ve indirdiğiniz projenin bulunduğu dizine gidin:
# cd projenizin-adi
Gerekli bağımlılıkları yüklemek için şu komutu çalıştırın:
# npm install
-Adım 3: EAS CLI İle APK Hazırlığı
EAS CLI'yi Başlatın:
# eas login
Bu komutla Expo hesabınıza giriş yapın. Henüz bir hesabınız yoksa Expo Web Sitesi üzerinden ücretsiz bir hesap oluşturabilirsiniz.

Projenizi EAS'e Bağlayın:
# eas build:configure

Komut çalıştıktan sonra yönlendirmeleri takip edin ve projeniz için eas.json dosyasını oluşturun.

eas.json Yapılandırması: APK oluşturmak için aşağıdaki yapılandırmayı eas.json dosyasına ekleyin:

{
  "cli": {
    "version": ">= 14.5.0"
  },
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}

-Adım 4: APK Oluşturma
Aşağıdaki komutu çalıştırarak APK oluşturma işlemini başlatın:
# eas build --platform android --profile production
Bu işlem, Expo sunucularında uygulamanızın APK olarak derlenmesini sağlar. İşlem tamamlandığında size bir bağlantı verilecektir.

APK dosyanızı indirmek için bağlantıyı kullanabilirsiniz.

-Adım 5: APK'yı Test Etme
APK dosyasını Android cihazınıza yükleyin.
Yüklemek için cihazınızda "Bilinmeyen Kaynaklardan Yükleme" iznini etkinleştirin.
Uygulamanızı test edin!

EAS CLI'yi yüklerken hata alıyorsanız, npm sürümünüzü güncelleyin:
# npm install -g npm