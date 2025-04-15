# Blog Frontend Uygulaması

Bu proje, React ve Tailwind CSS kullanılarak geliştirilmiş, tamamen client-side çalışan interaktif bir blog uygulamasıdır. Kullanıcıların kayıt olabildiği, giriş yapabildiği, blog yazıları ekleyebildiği, düzenleyebildiği, silebileceği ve yorum yapabileceği tam fonksiyonel bir web uygulamasıdır.

## 🚀 Özellikler

- 🔐 **Kullanıcı Yönetimi**
  - Kayıt olma
  - Giriş yapma
  - Oturum yönetimi

- 📝 **Blog Yazı İşlemleri**
  - Yazı listeleme
  - Yazı detayı görüntüleme
  - Yazı oluşturma
  - Yazı düzenleme
  - Yazı silme

- 💬 **Yorum Sistemi**
  - Yorum yapma
  - Yorum düzenleme
  - Yorum silme

- 🎨 **Modern UI/UX**
  - Responsive tasarım
  - Dark/Light tema desteği
  - Kullanıcı dostu arayüz
  - Form doğrulama

## 🛠️ Teknolojiler

- **Frontend**
  - React
  - React Router DOM
  - Tailwind CSS
  - Context API
  - Custom Hooks

- **Veri Saklama**
  - LocalStorage

- **Geliştirme Araçları**
  - Vite
  - ESLint
  - Prettier

## 📋 Proje Yapısı

Proje, Atomic Design prensiplerine uygun olarak yapılandırılmıştır:

```
src/
├── components/
│   ├── auth/             # Giriş ve kayıt bileşenleri
│   ├── blog/             # Blog ile ilgili bileşenler
│   ├── common/           # Header, Footer, Layout gibi ortak bileşenler
│   └── ui/               # UI Kit bileşenleri (Atomic Design)
│       ├── atoms/        # Button, Input, Select, Checkbox, RadioButton
│       ├── molecules/    # Form, Card, Modal
│       └── organisms/    # PostCard, CommentSection
├── context/              # Context API ile state yönetimi
├── hooks/                # Custom hooks
├── pages/                # Sayfalar
├── services/             # LocalStorage API servisleri
├── styles/               # Global ve UI Kit stilleri
└── utils/                # Yardımcı fonksiyonlar
```

## 🚦 Başlangıç

Uygulamayı yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Repoyu klonlayın
git clone <repo-url>

# Proje dizinine gidin
cd blog-frontend-case

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## 🧩 UI Kit

Proje, özelleştirilebilir ve tekrar kullanılabilir bileşenlerden oluşan kapsamlı bir UI Kit içerir:

### Atoms
- **Button**: primary, secondary, outline, text varyantları
- **Input**: text, password, email, number varyantları
- **Select**: default, searchable varyantları
- **Checkbox**: default, toggle varyantları
- **RadioButton**: default, button varyantları
- **Icons**: SVG tabanlı, özelleştirilebilir ikonlar

### Molecules
- **Form**: default, inline varyantları
- **Card**: default, hover, clickable varyantları
- **Modal**: default, fullscreen varyantları

### Organisms
- **PostCard**: default, compact varyantları
- **CommentSection**: default, nested varyantları

## 📊 Veri Yapısı

Uygulama, veri depolama için LocalStorage kullanır ve verileri şu anahtarlarla saklar:

- `blog_app_users`: Kullanıcı bilgileri
- `blog_app_posts`: Blog yazıları
- `blog_app_comments`: Yorumlar

## 🔒 Authentication

Uygulama, Context API kullanarak kimlik doğrulama ve oturum yönetimi sağlar:

- Kullanıcı bilgileri LocalStorage'da saklanır
- Protected routes ile yetkilendirme kontrolleri yapılır
- Şifreler hash fonksiyonu ile güvenli hale getirilir

## 📱 Responsive Tasarım

Uygulama, tüm ekran boyutlarında optimum kullanıcı deneyimi sağlamak için responsive olarak tasarlanmıştır:

- Mobile-first yaklaşım
- Tailwind CSS breakpoint'leri (sm, md, lg, xl)
- Adapte edilebilir layout ve bileşenler

## 🌙 Dark/Light Tema

Kullanıcılar, tercihlerine göre dark veya light tema arasında geçiş yapabilirler:

- Tema tercihi LocalStorage'da saklanır
- Tailwind CSS dark mode desteği
- Tüm UI bileşenleri için tema uyumluluğu

## 🔍 Form Doğrulama

Tüm formlar, kullanıcı dostu doğrulama mekanizmaları ile geliştirilmiştir:

- Gerçek zamanlı doğrulama
- Hata mesajları
- Butonların uygun şekilde devre dışı bırakılması
- Veri bütünlüğü kontrolü

## 🚫 Hata Yönetimi

Uygulama, olası hataları ele almak için sağlam bir hata yönetim sistemi içerir:

- Try-catch blokları
- Kullanıcı dostu hata mesajları
- Form doğrulama hataları
- LocalStorage ile ilgili hatalar

## 📝 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

---

© 2025 Blog Frontend Case
