// LocalStorage işlemleri için yardımcı fonksiyonlar
const STORAGE_KEYS = {
  USERS: "blog_app_users",
  POSTS: "blog_app_posts",
};

// LocalStorage'dan veri okuma
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("LocalStorage okuma hatası:", error);
    return null;
  }
};

// LocalStorage'a veri yazma
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("LocalStorage yazma hatası:", error);
    return false;
  }
};
const samplePosts = [
  {
    id: "1",
    title: "Galatasaray'ın Şampiyonluk Yolculuğu: Taktiksel Bir Devrim",
    content: `Galatasaray, son sezonunda Süper Lig'de sahaya attığı her maçta sadece fiziksel performansını değil, aynı zamanda taktiksel esnekliğini de kanıtladı. Teknik direktör Okan Buruk'un öncülüğünde, takım 4-2-3-1 formasyonuyla oyun kurarken, orta sahada rakibe rakipsiz pres uygulayarak topun hızlı dönüşümü ve pas trafiğini yüksek bir tempoda yönetiyor. Icardi'nin pozisyon alma zekası ve Kerem Aktürkoğlu'nun kreatif pasları, rakip savunmaları sürekli olarak dengesiz bırakıyor. Antrenmanlarda uygulanan veri odaklı analizler ve oyuncu performans istatistikleri, maç içinde yapılan taktiksel değişikliklerin neden sonuç ilişkisini gözler önüne seriyor. Bu yaklaşım, Galatasaray'ın saha içi sinerjisini ve bireysel performanslarını üst düzeye çıkarırken, zaman zaman agresif savunma politikaları ile rakibin atak planlarını kökten bozuyor.  
      
Teknik analiz çalışmalarında, oyuncuların saha içindeki konumlandırmaları, top kazanım oranları ve yapılan pasların isabetlilik yüzdeleri detaylıca incelendi. Özellikle genç oyuncuların adaptasyonu, takımın modern futbola uyum sürecinde kritik bir rol oynuyor. Bu entegre yaklaşım, sadece bir lig şampiyonluğu hedefiyle sınırlı kalmayıp, uluslararası arenada da rekabet gücünü artırmaya yönelik uzun vadeli stratejilerin de habercisidir.`,
    authorId: "admin",
    authorName: "Admin",
    createdAt: "2025-03-15T10:00:00Z",
    updatedAt: "2025-03-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Real Madrid'ın Avrupa Hakimiyeti: Taktik ve Stratejik Analiz",
    content: `Real Madrid, UEFA Avrupa Ligi gibi zorlu turnuvalarda sergilediği üstün performansla teknik direktörlerinin öngörü ve stratejik yaklaşımlarını ortaya koyuyor. Takımın tercih ettiği 4-3-3 formasyonu, orta sahada top kontrolünü elden bırakmama ve hızlı geçişlere olanak tanıyan bir düzenleme sunuyor. Benzema'nın pozisyon bilgisi ve vinç gibi hızlı kanat oyuncuların etkili koşuları, takımın kontra ataklarını zihinlerde belirgin hale getiriyor.  
      
Maç içi veri analizleri, takımın rakip alanlarda yaptıkları pres ve top kazanım oranlarının, maçın sonucunu belirleyici unsurlar arasında yer aldığını gösteriyor. Özellikle high-press (yüksek pres) taktikleri, rakip savunmaların hatalı pas seçimlerine zemin hazırlarken, antrenmanlarda geliştirilen bireysel yaratıcılık, takımın ofansif organizasyonuna güç katıyor. Teknik analizler, oyuncu performanslarını gerçek zamanlı olarak takip eden sistemler aracılığıyla, maçın her anında stratejik ayarlamalara gidilmesini sağlıyor. Bu sayede Real Madrid, sadece saha içi uyumunu değil, aynı zamanda her rakibe karşı adaptasyon yeteneğini de kanıtlıyor.`,
    authorId: "admin",
    authorName: "Admin",
    createdAt: "2025-03-14T15:30:00Z",
    updatedAt: "2025-03-14T15:30:00Z",
  },
  {
    id: "3",
    title:
      "Manchester United'ın Yeniden Yapılanma Süreci: Taktiksel Değişimler ve Performans Analizi",
    content: `Manchester United, geçtiğimiz sezonlardaki istikrarsız performansının ardından, teknik direktörün önderliğinde köklü taktiksel değişimlere imza attı. Yeni sezonda 4-3-3 formasyonunun benimsendiği takım, orta sahada yüksek tempo, sıkı pres ve hızlı top dönüşü stratejileriyle maçları domine etmeye başladı. Özellikle, transfer edilen oyun kurucular ve genç yeteneklerin sistemle uyumu, takımın uzun vadeli yeniden yapılanma sürecinde önemli bir kilometre taşı olarak ön plana çıkıyor.  
      
Detaylı istatistiksel analizler, takımın topa sahip olma yüzdesi, pas isabet oranı, kontra ataklarda elde ettiği hız ve top dönüşüm sürelerinin, oyuncu performansını nasıl etkilediğini ortaya koyuyor. Analitik veriler doğrultusunda yapılan performans değerlendirmeleri, takımın hem savunmada hem de hücumda dikkat çekici bir denge sağladığını gösteriyor. Özellikle, Bruno Fernandes ve diğer orta saha oyuncularının oyunu okuma becerileri, rakip savunmaların dengesini bozarak takımın hücum organizasyonunu güçlendiriyor. Bu stratejik yaklaşım, Manchester United'ın modern futbola adaptasyon sürecinde inovatif ve yenilikçi adımlar attığını ortaya koyuyor.`,
    authorId: "admin",
    authorName: "Admin",
    createdAt: "2025-03-13T09:15:00Z",
    updatedAt: "2025-03-13T09:15:00Z",
  },
  {
    id: "4",
    title:
      "Borussia Dortmund: Genç Yeteneklerle Geleceğe Yatırım ve Taktiksel Dinamizm",
    content: `Borussia Dortmund, genç yeteneklerinin gelişimine verdiği büyük önem ve dinamik oyun anlayışı ile Avrupa futbolunun geleceğini şekillendiriyor. Takım, 4-2-3-1 ve zaman zaman 4-3-3 formasyonları arasında yaptığı taktiksel varyasyonlarla, rakiplerine karşı üstünlük kurmayı hedefliyor. Altyapıdan yetişen oyuncuların, saha içindeki uyumları ve pres stratejilerine verdikleri katkılar, modern futbolun hızla değişen dinamiklerine cevap veriyor.  
      
Antrenmanlarda uygulanan ileri teknoloji veri analizleri ve video çalışma seansları sayesinde, oyuncuların saha içindeki hareketleri, koşu mesafeleri ve topa müdahale süreleri titizlikle takip ediliyor. Bu bilimsel yaklaşım, takımın maç içi performansını maksimize ederken, hata payını minimize etmeye yönelik inovatif çözümler sunuyor. Takımın taktik esnekliği, sadece hücum hattında değil, savunmada da aktif bir pres uygulayarak rakibin atak organizasyonlarını bozmayı amaçlıyor. Bu strateji, Borussia Dortmund'un genç oyuncuların yanında deneyimli isimler ile harmanladığı dengeli futbol anlayışını pekiştiriyor.`,
    authorId: "admin",
    authorName: "Admin",
    createdAt: "2025-03-12T14:45:00Z",
    updatedAt: "2025-03-12T14:45:00Z",
  },
  {
    id: "5",
    title:
      "Atlético Madrid'ın Savunma Disiplini: Organizasyon, Taktik ve İstatistiksel Analiz",
    content: `Atlético Madrid, savunmadaki disiplinli duruşu ve taktiksel organizasyonu ile modern futbolun en dikkat çekici savunma anlayışlarından birini sergiliyor. Teknik direktör Diego Simeone'nin önderliğinde, takım düşük blok savunma stratejisini benimseyerek, rakibin oyun kurma sürecini kökten engelleyen yüksek yoğunluklu pres uygulaması gerçekleştiriyor. Savunma oyuncularının pozisyon alım disiplinleri ve alan daraltma politikaları, rakip atakları keskin ve hızlı müdahalelerle bozuyor.  
      
Performans verileri, takımın gol yeme oranlarını minimize eden ve rakiplerin son dakikalarda zor durumda kaldığı savunma istatistiklerini ortaya koyuyor. İleri veri analizleri, oyuncuların bireysel müdahale oranları, top kapma süreleri ve defansif koordinasyonunu ölçerken, maç içi aksiyonların video analizleri sayesinde stratejik ayarlamalar sürekli güncelleniyor. Bu kapsamlı yaklaşım, Atlético Madrid'in hem bireysel hem de kolektif performansını optimize ederken, disiplinli savunma anlayışını adeta bir sanat formuna dönüştürüyor. Bu teknik altyapı, takımın uzun vadeli başarısının temel yapıtaşlarını oluşturuyor.`,
    authorId: "admin",
    authorName: "Admin",
    createdAt: "2025-03-11T11:20:00Z",
    updatedAt: "2025-03-11T11:20:00Z",
  },
];

// İlk kez çalıştırıldığında örnek blog yazılarını ekle
const initializeStorage = () => {
  // Kontrol: Eğer hiç post yoksa örnek postları ekle
  const existingPosts = getFromStorage(STORAGE_KEYS.POSTS);
  if (!existingPosts || existingPosts.length === 0) {
    console.log('Örnek blog postları yükleniyor...');
    saveToStorage(STORAGE_KEYS.POSTS, samplePosts);
  }
  
  // Admin kullanıcısını ekle (eğer yoksa)
  const existingUsers = getFromStorage(STORAGE_KEYS.USERS);
  if (!existingUsers || existingUsers.length === 0) {
    const adminUser = {
      id: "admin",
      username: "Admin",
      email: "admin@example.com",
      password: "YWRtaW4xMjM=", // admin123 (base64 encoded)
      createdAt: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.USERS, [adminUser]);
  }
};

// Uygulama başlatıldığında storage'ı initialize et
initializeStorage();

// Blog yazılarını getir
export const getPosts = () => {
  const posts = getFromStorage(STORAGE_KEYS.POSTS);
  // Eğer posts null ise (undefined değil), initializeStorage'ı tekrar çağır ve yeniden dene
  if (posts === null) {
    initializeStorage();
    return getFromStorage(STORAGE_KEYS.POSTS) || [];
  }
  return posts;
};

// Yeni blog yazısı ekle
export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  saveToStorage(STORAGE_KEYS.POSTS, posts);
  return newPost;
};

// Blog yazısını güncelle
export const updatePost = (postId, updatedPost, currentUserId) => {
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) return null;

  // Sadece yazının sahibi düzenleyebilir
  if (posts[postIndex].authorId !== currentUserId) {
    throw new Error("Bu yazıyı düzenleme yetkiniz yok");
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...updatedPost,
    updatedAt: new Date().toISOString(),
  };

  saveToStorage(STORAGE_KEYS.POSTS, posts);
  return posts[postIndex];
};

// Blog yazısını sil
export const deletePost = (postId, currentUserId) => {
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) return false;

  // Sadece yazının sahibi silebilir
  if (posts[postIndex].authorId !== currentUserId) {
    throw new Error("Bu yazıyı silme yetkiniz yok");
  }

  posts.splice(postIndex, 1);
  saveToStorage(STORAGE_KEYS.POSTS, posts);
  return true;
};
