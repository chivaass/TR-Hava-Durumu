# 🌦️ Türkiye Hava Durumu Dashboard

**Open-Meteo API kullanılarak geliştirilen, gerçek zamanlı veri senkronizasyonuna sahip, responsive ve modern arayüzlü web tabanlı hava durumu uygulaması.**

Bu proje, Türkiye'nin seçili illeri için anlık hava durumu verilerini, rüzgar detaylarını ve 24 saatlik tahmin çizelgesini şık bir kullanıcı deneyimiyle sunar.

## ✨ Özellikler

* **Anlık Veri:** Seçilen şehre ait sıcaklık, nem, rüzgar hızı ve rüzgar yönü bilgilerini anında çeker.
* **24 Saatlik Akış:** Günün başlangıcından (00:00) sonuna (23:00) kadar tüm saatlik sıcaklık tahminlerini yatay bir çizelgede listeler.
* **⏳ Real-time Güncelleme:** Sayfa yenilenmesine gerek kalmadan, verileri her 5 dakikada bir otomatik olarak arka planda tazeler.
* **Modern Arayüz:** Glassmorphism (cam efekti) tasarımı ve Inter fontu ile modern bir görünüm sağlar.
* **Tam Mobil Uyumluluk:** Responsive yapısı sayesinde bilgisayar, tablet ve telefonlardan kusursuz bir şekilde erişilebilir.

## 🛠️ Kullanılan Teknolojiler

* **HTML5 & CSS3:** Semantik yapı, Flexbox tasarımı ve özel scrollbar özelleştirmeleri.
* **JavaScript (ES6+):** * `fetch` API ile asenkron veri yönetimi.
    * `setInterval` ile gerçek zamanlı veri senkronizasyonu.
    * Dinamik DOM manipülasyonu ve döngülerle veri işleme.
* **Open-Meteo API:** Güvenilir ve hızlı hava durumu veri sağlayıcısı.

## 🚀 Kurulum ve Çalıştırma

1. Bu projeyi bilgisayarınıza indirin veya klonlayın.
2. Proje klasöründeki `index.html` dosyasını tarayıcınızda açın (veya VS Code **Live Server** eklentisi ile yerel ağda paylaşabilirsiniz).
3. Şehir listesinden bir il seçin ve canlı verilerin keyfini çıkarın!

## 📌 Yeni Şehir Ekleme Rehberi

Projeye yeni bir şehir eklemek isterseniz, `index.html` dosyasındaki `<select>` etiketinin içine şu formatta yeni bir `option` eklemeniz yeterlidir:

```html
<option value="PLAKA,ENLEM,BOYLAM">Şehir Adı</option>
```
Koordinatları bulmak için latlong.net sitesini kullanabilirsiniz.
