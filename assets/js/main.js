/* =========================================================================
   FairCharity e.V. — shared site script
   Header/footer injection · DE/EN i18n · mobile menu · reveal · calculators
   ========================================================================= */
(function () {
  "use strict";

  // ---- Path helper (works from any folder depth) ----
  var ROOT = ""; // all pages live at root

  // ---------------------------------------------------------------------
  // Languages: DE (base markup) · EN (data-en) · TR · AR (RTL) · MS (Bahasa)
  // ---------------------------------------------------------------------
  var LANGS = ["de", "en", "tr", "ar", "ms"];
  var LANG_LABEL = { de: "Deutsch", en: "English", tr: "Türkçe", ar: "العربية", ms: "Bahasa Melayu" };
  var LANG_CODE  = { de: "DE", en: "EN", tr: "TR", ar: "AR", ms: "BM" };
  var RTL_LANGS  = { ar: 1 };
  var CUR = "de";

  // Translation dictionary keyed by the English (data-en) value.
  // Each row: { tr, ar, ms }. Missing rows fall back to English.
  var I18N = {
    // ----- shared chrome: nav -----
    "Home": { tr: "Ana Sayfa", ar: "الرئيسية", ms: "Laman Utama" },
    "🌙 Ashura": { tr: "🌙 Aşure", ar: "🌙 عاشوراء", ms: "🌙 Asyura" },
    "Projects": { tr: "Projeler", ar: "المشاريع", ms: "Projek" },
    "Empowerment": { tr: "Kendi Kendine Yardım", ar: "التمكين", ms: "Pemerkasaan" },
    "Sponsorship": { tr: "Sponsorluk", ar: "الكفالة", ms: "Penajaan" },
    "Water Supply": { tr: "Su Temini", ar: "إمدادات المياه", ms: "Bekalan Air" },
    "Religious Giving": { tr: "Dini Bağışlar", ar: "التبرّعات الدينية", ms: "Sumbangan Agama" },
    "🐑 Qurban": { tr: "🐑 Kurban", ar: "🐑 الأضحية", ms: "🐑 Korban" },
    "Zakat al-Mal": { tr: "Zekât-ül Mal", ar: "زكاة المال", ms: "Zakat Harta" },
    "Zakat al-Fitr": { tr: "Zekât-ül Fıtr", ar: "زكاة الفطر", ms: "Zakat Fitrah" },
    "Eid Gift": { tr: "Bayram Hediyesi", ar: "هدية العيد", ms: "Hadiah Eid" },
    "About": { tr: "Hakkımızda", ar: "من نحن", ms: "Tentang Kami" },
    "Transparency": { tr: "Şeffaflık", ar: "الشفافية", ms: "Ketelusan" },
    "Contact": { tr: "İletişim", ar: "اتصل بنا", ms: "Hubungi" },
    // ----- shared chrome: footer + donate + CTAs -----
    "We are changing how help works — transparent, accountable and built to last.": { tr: "Yardımın işleyişini değiştiriyoruz — şeffaf, hesap verebilir ve kalıcı.", ar: "نغيّر طريقة عمل المساعدة — بشفافية ومساءلة وديمومة.", ms: "Kami mengubah cara bantuan berfungsi — telus, bertanggungjawab dan tahan lama." },
    "Organisation": { tr: "Kurum", ar: "المنظمة", ms: "Organisasi" },
    "Privacy": { tr: "Gizlilik", ar: "الخصوصية", ms: "Privasi" },
    "Qurban": { tr: "Kurban", ar: "الأضحية", ms: "Korban" },
    "Donate": { tr: "Bağış", ar: "تبرّع", ms: "Derma" },
    "All rights reserved.": { tr: "Tüm hakları saklıdır.", ar: "جميع الحقوق محفوظة.", ms: "Hak cipta terpelihara." },
    "Help with system, responsibility and impact.": { tr: "Sistemli, sorumlu ve etkili yardım.", ar: "مساعدة بنظام ومسؤولية وأثر.", ms: "Bantuan bersistem, bertanggungjawab dan berkesan." },
    "Donate online": { tr: "Online bağış", ar: "تبرّع عبر الإنترنت", ms: "Derma dalam talian" },
    "Support a project directly": { tr: "Bir projeyi doğrudan destekleyin", ar: "ادعم مشروعًا مباشرةً", ms: "Sokong sesuatu projek secara terus" },
    "Pick a cause and give securely by SEPA, PayPal or card — or by bank transfer with the reference shown. Tap a project to open its form.": { tr: "Bir amaç seçin ve SEPA, PayPal veya kartla güvenle bağış yapın — ya da gösterilen açıklamayla havale edin. Formu açmak için bir projeye dokunun.", ar: "اختر مشروعًا وتبرّع بأمان عبر SEPA أو PayPal أو البطاقة — أو عبر تحويل بنكي مع ذكر الغرض الموضّح. انقر على مشروع لفتح نموذجه.", ms: "Pilih satu tujuan dan derma dengan selamat melalui SEPA, PayPal atau kad — atau melalui pindahan bank dengan rujukan yang ditunjukkan. Ketik sesuatu projek untuk membuka borangnya." },
    "See all donation options →": { tr: "Tüm bağış seçeneklerini gör →", ar: "اطّلع على جميع خيارات التبرّع →", ms: "Lihat semua pilihan derma →" },
    "Bank-transfer reference:": { tr: "Havale açıklaması:", ar: "خانة الغرض عند التحويل:", ms: "Rujukan pindahan bank:" },
    "💳 Donate online": { tr: "💳 Online bağış", ar: "💳 تبرّع عبر الإنترنت", ms: "💳 Derma dalam talian" },
    "Credit card": { tr: "Kredi kartı", ar: "بطاقة ائتمان", ms: "Kad kredit" },
    "Open form in new tab ↗": { tr: "Formu yeni sekmede aç ↗", ar: "افتح النموذج في علامة تبويب جديدة ↗", ms: "Buka borang dalam tab baharu ↗" },
    "❤ Donate": { tr: "❤ Bağış Yap", ar: "❤ تبرّع", ms: "❤ Derma" },
    "Zakat al-Fitr 2026": { tr: "Zekât-ül Fıtr 2026", ar: "زكاة الفطر 2026", ms: "Zakat Fitrah 2026" },
    "Fidya & Kaffara": { tr: "Fidye & Keffaret", ar: "الفدية والكفّارة", ms: "Fidyah & Kaffarah" },
    "Eid Gift Ramadan 26": { tr: "Bayram Hediyesi Ramazan 26", ar: "هدية العيد رمضان ٢٦", ms: "Hadiah Eid Ramadan 26" },
    "Sponsorships": { tr: "Sponsorluklar", ar: "الكفالات", ms: "Penajaan" },
    "Water supply": { tr: "Su temini", ar: "إمدادات المياه", ms: "Bekalan air" },
    "Help to self-help": { tr: "Kendi kendine yardım", ar: "مساعدة لتحقيق الاكتفاء الذاتي", ms: "Bantuan untuk berdikari" },
    "Please donate by bank transfer with reference “F&K” — or calculate your exact amount.": { tr: "Lütfen „F&K“ açıklamasıyla havale ederek bağış yapın — ya da tam tutarınızı hesaplayın.", ar: "يرجى التبرّع عبر تحويل بنكي مع ذكر الغرض «F&K» — أو احسب مبلغك بدقّة.", ms: "Sila derma melalui pindahan bank dengan rujukan „F&K“ — atau kira jumlah tepat anda." },
    "🧮 Calculate Fidya / Kaffara": { tr: "🧮 Fidye / Keffaret hesapla", ar: "🧮 احسب الفدية / الكفّارة", ms: "🧮 Kira Fidyah / Kaffarah" },
    // ----- home page -----
    "Help with system · responsibility · impact": { tr: "Sistemli · sorumlu · etkili yardım", ar: "مساعدة بنظام · مسؤولية · أثر", ms: "Bantuan bersistem · bertanggungjawab · berkesan" },
    "We are changing <span class='accent'>how help works.</span>": { tr: "Yardımın işleyişini <span class='accent'>değiştiriyoruz.</span>", ar: "<span class='accent'>نُغيّر</span> طريقة عمل المساعدة.", ms: "Kami mengubah <span class='accent'>cara bantuan berfungsi.</span>" },
    "The humanitarian sector needs reform": { tr: "İnsani yardım sektörü reforma muhtaç", ar: "القطاع الإنساني بحاجة إلى إصلاح", ms: "Sektor kemanusiaan memerlukan reformasi" },
    "We help so that people become stronger and independent.": { tr: "İnsanlar daha güçlü ve bağımsız olsun diye yardım ediyoruz.", ar: "نساعد ليصبح الناس أقوى وأكثر استقلالًا.", ms: "Kami membantu supaya manusia menjadi lebih kuat dan berdikari." },
    "❤ Donate now": { tr: "❤ Şimdi bağış yap", ar: "❤ تبرّع الآن", ms: "❤ Derma sekarang" },
    "How we work →": { tr: "Nasıl çalışıyoruz →", ar: "كيف نعمل →", ms: "Cara kami bekerja →" },
    "Continents of field experience": { tr: "Saha tecrübesi olan kıtalar", ar: "قارات من الخبرة الميدانية", ms: "Benua pengalaman lapangan" },
    "Zakat passed on, no deductions": { tr: "Zekât kesintisiz aktarılır", ar: "الزكاة تُسلَّم دون اقتطاع", ms: "Zakat disalurkan tanpa potongan" },
    "Long-term admin-cost goal": { tr: "Uzun vadeli idari maliyet hedefi", ar: "هدف التكاليف الإدارية على المدى الطويل", ms: "Matlamat kos pentadbiran jangka panjang" },
    "Why Faircharity?": { tr: "Neden Faircharity?", ar: "لماذا Faircharity؟", ms: "Mengapa Faircharity?" },
    "People want to know where their donations go, how they are used, and what lasting impact they have. Faircharity e.V. was founded for exactly this: independent, transparent, professional and human.": { tr: "İnsanlar bağışlarının nereye gittiğini, nasıl kullanıldığını ve kalıcı etkisinin ne olduğunu bilmek ister. Faircharity e.V. tam da bunun için kuruldu: bağımsız, şeffaf, profesyonel ve insani.", ar: "يريد الناس أن يعرفوا أين تذهب تبرّعاتهم وكيف تُستخدم وما أثرها الدائم. وقد تأسّست Faircharity e.V. لهذا تحديدًا: مستقلة وشفّافة ومهنية وإنسانية.", ms: "Orang ramai mahu tahu ke mana derma mereka pergi, bagaimana ia digunakan, dan apa kesan kekalnya. Faircharity e.V. ditubuhkan tepat untuk ini: bebas, telus, profesional dan berperikemanusiaan." },
    "What sets us apart": { tr: "Bizi farklı kılan", ar: "ما يميّزنا", ms: "Apa yang membezakan kami" },
    "Principles, not slogans": { tr: "Sloganlar değil, ilkeler", ar: "مبادئ لا شعارات", ms: "Prinsip, bukan slogan" },
    "Quality over quantity": { tr: "Nicelikten önce nitelik", ar: "الجودة قبل الكمية", ms: "Kualiti mengatasi kuantiti" },
    "Structures over slogans": { tr: "Sloganlardan önce yapılar", ar: "البُنى قبل الشعارات", ms: "Struktur mengatasi slogan" },
    "Honesty over PR": { tr: "Reklamdan önce dürüstlük", ar: "الصدق قبل الدعاية", ms: "Kejujuran mengatasi publisiti" },
    "Respect over self-display": { tr: "Gösterişten önce saygı", ar: "الاحترام قبل التباهي", ms: "Hormat mengatasi tunjuk-tunjuk" },
    "Sustainability over emergency aid": { tr: "Acil yardımdan önce sürdürülebilirlik", ar: "الاستدامة قبل الإغاثة الطارئة", ms: "Kelestarian mengatasi bantuan kecemasan" },
    "Control over promises": { tr: "Vaatlerden çok denetim", ar: "الرقابة قبل الوعود", ms: "Kawalan mengatasi janji" },
    "We don't want to be the biggest organisation — but the most credible.": { tr: "En büyük kurum değil — en güvenilir kurum olmak istiyoruz.", ar: "لا نريد أن نكون أكبر منظمة — بل أكثرها مصداقية.", ms: "Kami tidak mahu menjadi organisasi terbesar — tetapi paling dipercayai." },
    "Where would you like to make an impact?": { tr: "Nerede etki yaratmak istersiniz?", ar: "أين تودّ أن تُحدث أثرًا؟", ms: "Di mana anda ingin memberi kesan?" },
    "Choose your project": { tr: "Projeni seç", ar: "اختر مشروعك", ms: "Pilih projek anda" },
    "👨‍👩‍👧 Multifunction Sponsorship": { tr: "👨‍👩‍👧 Çok Fonksiyonlu Sponsorluk", ar: "👨‍👩‍👧 كفالة متعدّدة الوظائف", ms: "👨‍👩‍👧 Penajaan Pelbagai Fungsi" },
    "Holistic support for children and their community — education, food, health and real prospects.": { tr: "Çocuklar ve toplulukları için bütüncül destek — eğitim, gıda, sağlık ve gerçek umutlar.", ar: "دعم شامل للأطفال ومجتمعهم — التعليم والغذاء والصحة وآفاق حقيقية.", ms: "Sokongan menyeluruh untuk kanak-kanak dan komuniti mereka — pendidikan, makanan, kesihatan dan harapan sebenar." },
    "To sponsorship →": { tr: "Sponsorluğa →", ar: "إلى الكفالة →", ms: "Ke penajaan →" },
    "💧 Sustainable Water Supply": { tr: "💧 Sürdürülebilir Su Temini", ar: "💧 إمدادات مياه مستدامة", ms: "💧 Bekalan Air Lestari" },
    "Wells, water towers and pipes — built for long-term use, not short-term campaigns.": { tr: "Kuyular, su kuleleri ve borular — kısa vadeli kampanyalar için değil, uzun vadeli kullanım için.", ar: "آبار وخزّانات مياه وأنابيب — مبنية للاستخدام طويل الأمد لا للحملات العابرة.", ms: "Telaga, menara air dan paip — dibina untuk kegunaan jangka panjang, bukan kempen jangka pendek." },
    "To water system →": { tr: "Su sistemine →", ar: "إلى نظام المياه →", ms: "Ke sistem air →" },
    "🌱 Help to Self-Help": { tr: "🌱 Kendi Kendine Yardım", ar: "🌱 مساعدة لتحقيق الاكتفاء", ms: "🌱 Bantuan untuk Berdikari" },
    "Training, tools and start-up capital create small businesses that make families independent.": { tr: "Eğitim, ekipman ve başlangıç sermayesi, aileleri bağımsız kılan küçük işletmeler oluşturur.", ar: "التدريب والأدوات ورأس المال الأوّلي تُنشئ مشاريع صغيرة تجعل الأسر مستقلّة.", ms: "Latihan, peralatan dan modal permulaan mewujudkan perniagaan kecil yang menjadikan keluarga berdikari." },
    "To empowerment →": { tr: "Kendi kendine yardıma →", ar: "إلى التمكين →", ms: "Ke pemerkasaan →" },
    "Our claim": { tr: "İddiamız", ar: "وعدنا", ms: "Pendirian kami" },
    "We want to set the highest international standards — not to shine, but to redefine responsibility.": { tr: "En yüksek uluslararası standartları belirlemek istiyoruz — parlamak için değil, sorumluluğu yeniden tanımlamak için.", ar: "نريد أن نضع أعلى المعايير الدولية — لا للتباهي، بل لإعادة تعريف المسؤولية.", ms: "Kami mahu menetapkan piawaian antarabangsa tertinggi — bukan untuk menonjol, tetapi untuk mentakrif semula tanggungjawab." },
    "Dignity over charity": { tr: "Sadakadan önce onur", ar: "الكرامة قبل الصدقة", ms: "Maruah mengatasi sedekah" },
    "Dignity instead of charity — people become independent.": { tr: "Sadaka değil onur — insanlar bağımsız olur.", ar: "كرامة لا صدقة — ليصبح الناس مستقلّين.", ms: "Maruah bukan sedekah — manusia menjadi berdikari." },
    "We build structures, not short-term campaigns.": { tr: "Kısa vadeli kampanyalar değil, yapılar inşa ediyoruz.", ar: "نبني بُنى لا حملاتٍ قصيرة الأمد.", ms: "Kami membina struktur, bukan kempen jangka pendek." },
    "Transparency through disclosure — not just a seal.": { tr: "Sadece bir mühürle değil — açıklıkla şeffaflık.", ar: "الشفافية بالإفصاح — لا بمجرّد ختم.", ms: "Ketelusan melalui pendedahan — bukan sekadar cap." },
    "We disclose what others keep silent.": { tr: "Başkalarının sustuğunu biz açıklıyoruz.", ar: "نُفصح عمّا يسكت عنه الآخرون.", ms: "Kami mendedahkan apa yang orang lain diamkan." },
    "Sustainable structures instead of short-term campaigns.": { tr: "Kısa vadeli kampanyalar yerine sürdürülebilir yapılar.", ar: "بُنى مستدامة بدل الحملات قصيرة الأمد.", ms: "Struktur lestari menggantikan kempen jangka pendek." },
    "Systems instead of symbolic projects": { tr: "Sembolik projeler yerine sistemler", ar: "أنظمة بدل المشاريع الرمزية", ms: "Sistem menggantikan projek simbolik" },
    "Our wells, schools and projects are maintained, documented and guaranteed.": { tr: "Kuyularımız, okullarımız ve projelerimiz bakımı yapılır, belgelenir ve güvence altına alınır.", ar: "آبارنا ومدارسنا ومشاريعنا تُصان وتُوثَّق وتُضمَن.", ms: "Telaga, sekolah dan projek kami diselenggara, didokumentasikan dan dijamin." },
    "Discover our Zakat model": { tr: "Zekât modelimizi keşfedin", ar: "اكتشف نموذج الزكاة لدينا", ms: "Terokai model Zakat kami" },
    "Experience & competence": { tr: "Tecrübe & yetkinlik", ar: "الخبرة والكفاءة", ms: "Pengalaman & kecekapan" },
    "Faircharity is carried by an international team with years of experience in project management, development work and infrastructure. Our team has planned, accompanied and evaluated aid projects across Africa, Asia and Europe.": { tr: "Faircharity, proje yönetimi, kalkınma çalışmaları ve altyapı alanında yılların tecrübesine sahip uluslararası bir ekip tarafından yürütülür. Ekibimiz Afrika, Asya ve Avrupa'da yardım projelerini planladı, takip etti ve değerlendirdi.", ar: "تدير Faircharity فريقٌ دولي يتمتّع بسنوات من الخبرة في إدارة المشاريع والعمل التنموي والبنية التحتية. خطّط فريقنا مشاريع إغاثية في إفريقيا وآسيا وأوروبا وتابعها وقيّمها.", ms: "Faircharity digerakkan oleh pasukan antarabangsa dengan pengalaman bertahun-tahun dalam pengurusan projek, kerja pembangunan dan infrastruktur. Pasukan kami telah merancang, mengiringi dan menilai projek bantuan di Afrika, Asia dan Eropah." },
    "From this experience we know: real help is not created by images, but by systems that work in the long term — and this knowledge flows into every decision, every project and every partnership.": { tr: "Bu tecrübeyle biliyoruz: gerçek yardım görüntülerle değil, uzun vadede işleyen sistemlerle oluşur — ve bu bilgi her kararımıza, her projeye ve her ortaklığa yansır.", ar: "من هذه الخبرة نعلم: المساعدة الحقيقية لا تصنعها الصور، بل الأنظمة التي تعمل على المدى الطويل — وهذه المعرفة تنعكس في كل قرار ومشروع وشراكة.", ms: "Daripada pengalaman ini kami tahu: bantuan sebenar tidak terhasil daripada gambar, tetapi daripada sistem yang berfungsi jangka panjang — dan pengetahuan ini menjiwai setiap keputusan, projek dan perkongsian." },
    "Faircharity e.V. stands for a new kind of help: honest, professional, human.": { tr: "Faircharity e.V. yeni bir yardım anlayışını temsil eder: dürüst, profesyonel, insani.", ar: "تمثّل Faircharity e.V. نوعًا جديدًا من المساعدة: صادقة ومهنية وإنسانية.", ms: "Faircharity e.V. mewakili bentuk bantuan baharu: jujur, profesional, berperikemanusiaan." },
    "Help is an Amānah — an entrusted good.": { tr: "Yardım bir Emanettir — size verilen bir emanet.", ar: "المساعدة أمانة — وديعة في عنقك.", ms: "Bantuan ialah Amanah — satu titipan." },
    "In Islam, responsibility (Amānah) is one of the greatest obligations. Whoever works with people's means — especially with donations — carries a special duty of honesty, care and sincerity.": { tr: "İslam'da sorumluluk (Emanet) en büyük yükümlülüklerden biridir. İnsanların malıyla — özellikle bağışlarla — çalışan kişi, dürüstlük, özen ve samimiyet konusunda özel bir sorumluluk taşır.", ar: "في الإسلام، المسؤولية (الأمانة) من أعظم الواجبات. ومن يتعامل بأموال الناس — وخاصة التبرّعات — يحمل واجبًا خاصًا من الصدق والعناية والإخلاص.", ms: "Dalam Islam, tanggungjawab (Amanah) ialah salah satu kewajipan terbesar. Sesiapa yang menguruskan harta orang — terutama derma — memikul tanggungjawab khusus untuk jujur, berhati-hati dan ikhlas." },
    "Responsibility as an Amānah — a trust before God and people.": { tr: "Bir Emanet olarak sorumluluk — Allah'a ve insanlara karşı bir emanet.", ar: "المسؤولية أمانة — عهدٌ أمام الله والناس.", ms: "Tanggungjawab sebagai Amanah — amanah di hadapan Allah dan manusia." },
    "“And Allah loves those who act justly.”": { tr: "„Allah adaletli davrananları sever.“", ar: "﴿وَاللَّهُ يُحِبُّ الْمُقْسِطِينَ﴾", ms: "„Dan Allah mengasihi orang yang berlaku adil.“" },
    "Carry responsibility together": { tr: "Sorumluluğu birlikte taşıyın", ar: "لنحمل المسؤولية معًا", ms: "Pikul tanggungjawab bersama" },
    "So that our work stays independent, we need people who carry it regularly. Membership funds administration, audit systems and digital transparency.": { tr: "Çalışmamızın bağımsız kalması için onu düzenli olarak destekleyen insanlara ihtiyacımız var. Üyelik; idareyi, denetim sistemlerini ve dijital şeffaflığı finanse eder.", ar: "لكي يبقى عملنا مستقلًّا، نحتاج إلى أشخاص يدعمونه بانتظام. تموّل العضوية الإدارة وأنظمة التدقيق والشفافية الرقمية.", ms: "Agar kerja kami kekal bebas, kami memerlukan orang yang menyokongnya secara tetap. Keahlian membiayai pentadbiran, sistem audit dan ketelusan digital." },
    "Supporter": { tr: "Destekçi", ar: "الداعم", ms: "Penyokong" },
    "per month": { tr: "aylık", ar: "شهريًا", ms: "sebulan" },
    "Secures administration & basic structure.": { tr: "İdareyi ve temel yapıyı güvence altına alır.", ar: "يؤمّن الإدارة والبنية الأساسية.", ms: "Menjamin pentadbiran & struktur asas." },
    "Sustainer": { tr: "Sürdüren", ar: "الراعي", ms: "Pelestari" },
    "Funds reports & transparency systems.": { tr: "Raporları ve şeffaflık sistemlerini finanse eder.", ar: "يموّل التقارير وأنظمة الشفافية.", ms: "Membiayai laporan & sistem ketelusan." },
    "Guardian": { tr: "Koruyucu", ar: "الحارس", ms: "Penjaga" },
    "popular": { tr: "popüler", ar: "الأكثر شيوعًا", ms: "popular" },
    "Helps build long-term systems.": { tr: "Uzun vadeli sistemler kurmaya yardımcı olur.", ar: "يساعد على بناء أنظمة طويلة الأمد.", ms: "Membantu membina sistem jangka panjang." },
    "Builder": { tr: "İnşa Eden", ar: "الباني", ms: "Pembina" },
    "Enables project construction & sustainability.": { tr: "Proje inşasını ve sürdürülebilirliği sağlar.", ar: "يتيح بناء المشاريع واستدامتها.", ms: "Membolehkan pembinaan projek & kelestarian." },
    "👉 Become Fa(ir)mily": { tr: "👉 Fa(ir)mily Üyesi Ol", ar: "👉 انضمّ إلى Fa(ir)mily", ms: "👉 Sertai Fa(ir)mily" },
    "Become Fa(ir)mily": { tr: "Fa(ir)mily Üyesi Ol", ar: "انضمّ إلى Fa(ir)mily", ms: "Sertai Fa(ir)mily" },
    "Fairness": { tr: "Adalet", ar: "العدل", ms: "Keadilan" },
    "Responsibility": { tr: "Sorumluluk", ar: "المسؤولية", ms: "Tanggungjawab" },
    "Donations are used responsibly and justly.": { tr: "Bağışlar sorumlu ve adil şekilde kullanılır.", ar: "تُستخدم التبرّعات بمسؤولية وعدل.", ms: "Derma digunakan secara bertanggungjawab dan adil." },
    "Every project is carefully planned, accompanied and documented — so help arrives where it is needed.": { tr: "Her proje özenle planlanır, takip edilir ve belgelenir — böylece yardım ihtiyaç olan yere ulaşır.", ar: "كل مشروع يُخطَّط له بعناية ويُتابَع ويُوثَّق — لتصل المساعدة إلى حيث الحاجة.", ms: "Setiap projek dirancang, diiringi dan didokumentasikan dengan teliti — supaya bantuan sampai ke tempat yang memerlukan." },
    "Contact us": { tr: "Bize ulaşın", ar: "اتصل بنا", ms: "Hubungi kami" },
    "See our transparency": { tr: "Şeffaflığımızı görün", ar: "اطّلع على شفافيتنا", ms: "Lihat ketelusan kami" },
    "how help works.": { tr: "yardımın işleyişini.", ar: "طريقة عمل المساعدة.", ms: "cara bantuan berfungsi." }
  };

  function tx(enVal, lang) {
    var row = I18N[enVal];
    return (row && row[lang]) ? row[lang] : enVal; // fallback to English
  }

  // ---------------------------------------------------------------------
  // Navigation model
  // ---------------------------------------------------------------------
  var NAV = [
    { de: "Home", en: "Home", href: "index.html" },
    { de: "🌙 Aschura", en: "🌙 Ashura", href: "ashura/index.html", campaign: true },
    {
      de: "Projekte", en: "Projects",
      children: [
        { de: "Hilfe zur Selbsthilfe", en: "Empowerment", href: "empowerment.html" },
        { de: "Patenschaft", en: "Sponsorship", href: "patenschaft.html" },
        { de: "Wasserversorgung", en: "Water Supply", href: "wasserversorgung.html" }
      ]
    },
    {
      de: "Religiöse Spenden", en: "Religious Giving",
      children: [
        { de: "🐑 Kurban", en: "🐑 Qurban", href: "kurban.html" },
        { de: "Zakat al-Māl", en: "Zakat al-Mal", href: "zakat.html" },
        { de: "Fidya & Kaffara", en: "Fidya & Kaffara", href: "fidyakaffara.html" },
        { de: "Zakat al-Fitr", en: "Zakat al-Fitr", href: "fitr26.html" },
        { de: "Eid Geschenk", en: "Eid Gift", href: "eid26.html" }
      ]
    },
    {
      de: "Über uns", en: "About",
      children: [
        { de: "Transparenz", en: "Transparency", href: "transparenz.html" },
        { de: "Kontakt", en: "Contact", href: "kontakt.html" }
      ]
    }
  ];

  // ---------------------------------------------------------------------
  // Build header
  // ---------------------------------------------------------------------
  function buildHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;

    var items = NAV.map(function (n) {
      if (n.children) {
        var subs = n.children.map(function (c) {
          return '<a href="' + ROOT + c.href + '" data-en="' + c.en + '">' + c.de + "</a>";
        }).join("");
        return '<li class="nav-item has-sub"><span class="nav-link" tabindex="0" data-en="' + n.en + '">' + n.de + '</span><div class="dropdown">' + subs + "</div></li>";
      }
      if (n.campaign) {
        return '<li class="nav-item"><a class="nav-link campaign" href="' + ROOT + n.href + '"><span class="live-dot"></span><span data-en="' + n.en + '">' + n.de + "</span></a></li>";
      }
      return '<li class="nav-item"><a class="nav-link" href="' + ROOT + n.href + '" data-en="' + n.en + '">' + n.de + "</a></li>";
    }).join("");

    mount.className = "site-header";
    mount.innerHTML =
      '<div class="container nav">' +
        '<a class="logo" href="' + ROOT + 'index.html" aria-label="FairCharity"><img src="' + ROOT + 'assets/img/logo.svg" alt="FairCharity e.V."></a>' +
        '<ul class="nav-menu" role="menubar">' + items + "</ul>" +
        '<div class="lang-switch" aria-label="Sprache / Language">' +
          '<button class="lang-toggle" aria-haspopup="true" aria-expanded="false">🌐 <span class="lang-cur">DE</span> <span class="caret">▾</span></button>' +
          '<div class="lang-menu" role="menu">' +
            LANGS.map(function (l) { return '<button data-lang="' + l + '" role="menuitem">' + LANG_LABEL[l] + "</button>"; }).join("") +
          "</div>" +
        "</div>" +
        '<a class="btn btn-primary btn-sm nav-cta" href="' + ROOT + 'spenden.html" data-en="❤ Donate">❤ Jetzt Spenden</a>' +
        '<button class="hamburger" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>";

    // Mobile drawer
    var drawerItems = NAV.map(function (n) {
      if (n.children) {
        var head = '<div class="m-group" data-en="' + n.en + '">' + n.de + "</div>";
        var subs = n.children.map(function (c) {
          return '<a href="' + ROOT + c.href + '" data-en="' + c.en + '">' + c.de + "</a>";
        }).join("");
        return head + subs;
      }
      if (n.campaign) {
        return '<a class="campaign" href="' + ROOT + n.href + '"><span class="live-dot"></span><span data-en="' + n.en + '">' + n.de + "</span></a>";
      }
      return '<a href="' + ROOT + n.href + '" data-en="' + n.en + '">' + n.de + "</a>";
    }).join("");

    var drawer = document.createElement("div");
    drawer.className = "mobile-drawer";
    drawer.innerHTML =
      '<div class="scrim"></div>' +
      '<div class="mobile-panel">' +
        '<button class="m-close" aria-label="Schließen">×</button>' +
        '<a href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/img/logo.svg" alt="FairCharity" style="height:40px"></a>' +
        drawerItems +
        '<a class="btn btn-primary" style="margin-top:18px" href="' + ROOT + 'spenden.html" data-en="❤ Donate">❤ Jetzt Spenden</a>' +
      "</div>";
    document.body.appendChild(drawer);

    var burger = mount.querySelector(".hamburger");
    burger.addEventListener("click", function () { drawer.classList.add("open"); });
    drawer.querySelector(".m-close").addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelector(".scrim").addEventListener("click", function () { drawer.classList.remove("open"); });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { drawer.classList.remove("open"); });
    });

    // language dropdown
    var ls = mount.querySelector(".lang-switch");
    var lt = ls.querySelector(".lang-toggle");
    lt.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = ls.classList.toggle("open");
      lt.setAttribute("aria-expanded", open ? "true" : "false");
    });
    ls.querySelectorAll(".lang-menu button").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        setLang(b.getAttribute("data-lang"));
        ls.classList.remove("open");
        lt.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function () {
      ls.classList.remove("open");
      lt.setAttribute("aria-expanded", "false");
    });
  }

  // ---------------------------------------------------------------------
  // Build footer
  // ---------------------------------------------------------------------
  function buildFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.className = "site-footer";
    mount.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<img class="flogo" src="' + ROOT + 'assets/img/logo-light.svg" alt="FairCharity e.V.">' +
            '<p class="footer-note" data-en="We are changing how help works — transparent, accountable and built to last.">Wir verändern, wie Hilfe funktioniert — transparent, verantwortungsvoll und nachhaltig.</p>' +
            '<div class="footer-iban">IBAN: DE50 4306 0967 1351 3075 00<br>BIC: GENODEM1GLS · GLS Bank</div>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Projects">Projekte</h4>' +
            '<a href="' + ROOT + 'empowerment.html" data-en="Empowerment">Hilfe zur Selbsthilfe</a>' +
            '<a href="' + ROOT + 'patenschaft.html" data-en="Sponsorship">Patenschaft</a>' +
            '<a href="' + ROOT + 'wasserversorgung.html" data-en="Water Supply">Wasserversorgung</a>' +
            '<a href="' + ROOT + 'kurban.html" data-en="Qurban">Kurban</a>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Religious Giving">Religiöse Spenden</h4>' +
            '<a href="' + ROOT + 'zakat.html" data-en="Zakat al-Mal">Zakat al-Māl</a>' +
            '<a href="' + ROOT + 'fidyakaffara.html">Fidya &amp; Kaffara</a>' +
            '<a href="' + ROOT + 'fitr26.html" data-en="Zakat al-Fitr">Zakat al-Fitr</a>' +
            '<a href="' + ROOT + 'eid26.html" data-en="Eid Gift">Eid Geschenk</a>' +
          "</div>" +
          '<div>' +
            '<h4 data-en="Organisation">Organisation</h4>' +
            '<a href="' + ROOT + 'transparenz.html" data-en="Transparency">Transparenz</a>' +
            '<a href="' + ROOT + 'kontakt.html" data-en="Contact">Kontakt</a>' +
            '<a href="' + ROOT + 'spenden.html" data-en="Donate">Jetzt Spenden</a>' +
            '<a href="' + ROOT + 'impressum.html">Impressum</a>' +
            '<a href="' + ROOT + 'datenschutz.html" data-en="Privacy">Datenschutz</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Faircharity e.V. — <span data-en="All rights reserved.">Alle Rechte vorbehalten.</span></span>' +
          '<span data-en="Help with system, responsibility and impact.">Hilfe mit System, Verantwortung und Wirkung.</span>' +
        "</div>" +
      "</div>";
  }

  // ---------------------------------------------------------------------
  // Shared donate section (collapsed accordions, lazy-loaded widgets)
  // ---------------------------------------------------------------------
  var DONATE = [
    { de: "Zakat al-Māl", en: "Zakat al-Mal", flag: "🪙", vz: "ZM", url: "https://spenden.twingle.de/faircharity-e-v/zakat-ul-maal/tw69b1d51a7dcbb/widget" },
    { de: "Zakat al-Fitr 2026", en: "Zakat al-Fitr 2026", flag: "🌙", vz: "Fitr 26", url: "https://spenden.twingle.de/faircharity-e-v/zakat-ul-fitr-26/tw699f696f71e32/widget" },
    { de: "Fidya & Kaffara", en: "Fidya & Kaffara", flag: "⚖️", vz: "F&amp;K", url: null,
      noteDe: "Bitte per Überweisung mit dem Verwendungszweck „F&amp;K“ spenden — oder den genauen Betrag berechnen.",
      noteEn: "Please donate by bank transfer with reference “F&amp;K” — or calculate your exact amount.",
      ctaDe: "🧮 Fidya / Kaffara berechnen", ctaEn: "🧮 Calculate Fidya / Kaffara", ctaHref: "fidyakaffara.html" },
    { de: "Eid Geschenk Ramadan 26", en: "Eid Gift Ramadan 26", flag: "💝", vz: "Eid-R 26", url: "https://spenden.twingle.de/faircharity-e-v/eid-ul-fitr-26/tw69ba054494997/widget" },
    { de: "Patenschaften", en: "Sponsorships", flag: "🤲", vz: "Patenkind", url: "https://spenden.twingle.de/faircharity-e-v/patenschaften/tw69afbb7e27715/widget" },
    { de: "Wasserversorgung", en: "Water supply", flag: "💧", vz: "Wasser", url: "https://spenden.twingle.de/faircharity-e-v/wassertower-fuer-ganze-gemeinden/tw699dcb54b8ea1/widget" },
    { de: "Hilfe zur Selbsthilfe", en: "Help to self-help", flag: "🌱", vz: "HSH", url: "https://spenden.twingle.de/faircharity-e-v/hilfe-zur-selbsthilfe-empowerment/tw69b14626aa520/widget" }
  ];

  function buildDonateSection() {
    var mount = document.getElementById("donate-embed");
    if (!mount) return;

    var items = DONATE.map(function (d) {
      var title = d.de === d.en ? d.de : '<span data-en="' + d.en + '">' + d.de + "</span>";
      var head = '<summary><span class="flag">' + d.flag + "</span>" + title + "</summary>";
      var body;
      if (d.url) {
        body =
          '<div class="acc-body">' +
            '<div class="info-box warn"><span data-en="Bank-transfer reference:">Verwendungszweck bei Überweisung:</span> <span class="vz">' + d.vz + "</span></div>" +
            '<div class="tw-wrap">' +
              '<h3 data-en="💳 Donate online">💳 Online spenden</h3>' +
              '<p class="tw-sub">⬇️ SEPA-Lastschrift · PayPal · <span data-en="Credit card">Kreditkarte</span> ⬇️</p>' +
              '<iframe data-src="' + d.url + '" loading="lazy" title="' + d.de + ' — Spendenformular"></iframe>' +
              '<a class="btn btn-ghost btn-sm tw-fallback" href="' + d.url + '" target="_blank" rel="noopener" data-en="Open form in new tab ↗">Formular im neuen Tab öffnen ↗</a>' +
            "</div>" +
          "</div>";
      } else {
        body =
          '<div class="acc-body">' +
            '<div class="info-box warn"><span data-en="Bank-transfer reference:">Verwendungszweck bei Überweisung:</span> <span class="vz">' + d.vz + "</span></div>" +
            '<p style="margin-top:12px" data-en="' + d.noteEn + '">' + d.noteDe + "</p>" +
            '<a class="btn btn-ghost btn-sm" href="' + d.ctaHref + '" data-en="' + d.ctaEn + '">' + d.ctaDe + "</a>" +
          "</div>";
      }
      return '<details class="acc reveal">' + head + body + "</details>";
    }).join("");

    var sec = document.createElement("section");
    sec.className = "section cream-2 donate-section";
    sec.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal">' +
          '<span class="eyebrow">💝 <span data-en="Donate online">Online spenden</span></span>' +
          '<h2 data-en="Support a project directly">Unterstütze direkt ein Projekt</h2>' +
          '<p data-en="Pick a cause and give securely by SEPA, PayPal or card — or by bank transfer with the reference shown. Tap a project to open its form.">Wähle ein Anliegen und spende sicher per SEPA, PayPal oder Karte — oder per Überweisung mit dem angegebenen Verwendungszweck. Tippe ein Projekt an, um das Formular zu öffnen.</p>' +
        "</div>" +
        '<div class="donate-list">' + items + "</div>" +
        '<div class="center" style="margin-top:22px"><a class="btn btn-green" href="spenden.html" data-en="See all donation options →">Alle Spendenoptionen ansehen →</a></div>' +
      "</div>";

    mount.parentNode.replaceChild(sec, mount);

    // lazy-load each Twingle widget only when its panel is first opened
    sec.querySelectorAll("details.acc").forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) {
          var f = det.querySelector("iframe[data-src]");
          if (f) { f.src = f.getAttribute("data-src"); f.removeAttribute("data-src"); }
        }
      });
    });
  }

  // ---------------------------------------------------------------------
  // i18n engine: [data-en] holds English; DE is the original markup
  // ---------------------------------------------------------------------
  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "de";
    CUR = lang;

    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!el.hasAttribute("data-de-store")) el.setAttribute("data-de-store", el.innerHTML);
      var enVal = el.getAttribute("data-en");
      var out;
      if (lang === "de") out = el.getAttribute("data-de-store");
      else if (lang === "en") out = enVal;
      else out = tx(enVal, lang);
      el.innerHTML = out;
    });
    // attribute-level translations: data-en-ph for placeholders
    document.querySelectorAll("[data-en-ph]").forEach(function (el) {
      if (!el.hasAttribute("data-de-ph")) el.setAttribute("data-de-ph", el.getAttribute("placeholder") || "");
      var enPh = el.getAttribute("data-en-ph");
      var out;
      if (lang === "de") out = el.getAttribute("data-de-ph");
      else if (lang === "en") out = enPh;
      else out = tx(enPh, lang);
      el.setAttribute("placeholder", out);
    });

    var rtl = !!RTL_LANGS[lang];
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", rtl ? "rtl" : "ltr");
    root.classList.toggle("lang-en", lang === "en");
    root.classList.toggle("rtl", rtl);

    // update switcher (globe dropdown)
    var cur = document.querySelector(".lang-cur");
    if (cur) cur.textContent = LANG_CODE[lang];
    document.querySelectorAll(".lang-menu button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("fc_lang", lang); } catch (e) {}
  }

  // ---------------------------------------------------------------------
  // Reveal on scroll
  // ---------------------------------------------------------------------
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // ---------------------------------------------------------------------
  // Calculators
  // ---------------------------------------------------------------------
  function fmt(n) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
  }

  function initZakatCalc() {
    var root = document.getElementById("zakat-calc");
    if (!root) return;
    var ids = ["z-cash", "z-gold", "z-silver", "z-invest", "z-debt"];
    function calc() {
      var v = {};
      ids.forEach(function (id) { v[id] = parseFloat(document.getElementById(id).value) || 0; });
      var net = v["z-cash"] + v["z-gold"] + v["z-silver"] + v["z-invest"] - v["z-debt"];
      if (net < 0) net = 0;
      // Nisab reference (silver-based, conservative) ~ editable
      var nisab = parseFloat(document.getElementById("z-nisab").value) || 0;
      var zak = net >= nisab ? net * 0.025 : 0;
      document.getElementById("z-net").textContent = fmt(net);
      var out = document.getElementById("z-out");
      out.textContent = fmt(zak);
      var note = document.getElementById("z-note");
      if (net < nisab && net > 0) {
        note.setAttribute("data-de-store", "Dein Vermögen liegt unter dem Nisab — aktuell keine Zakat fällig.");
        note.innerHTML = document.documentElement.classList.contains("lang-en")
          ? "Your wealth is below the nisab — no Zakat is currently due."
          : "Dein Vermögen liegt unter dem Nisab — aktuell keine Zakat fällig.";
      } else {
        note.innerHTML = document.documentElement.classList.contains("lang-en")
          ? "Zakat is 2.5% of net zakatable wealth held for one lunar year."
          : "Zakat beträgt 2,5 % des zakatpflichtigen Nettovermögens über ein Mondjahr.";
      }
    }
    root.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
    calc();
  }

  function initFidyaCalc() {
    var root = document.getElementById("fidya-calc");
    if (!root) return;
    var BASE = 6, FEE = 0.20; // €6 per meal + 20% delivery
    function calc() {
      var days = parseInt(document.getElementById("f-days").value, 10) || 0;
      var people = parseInt(document.getElementById("f-people").value, 10) || 1;
      var meals = days * people;
      var base = meals * BASE;
      var total = base * (1 + FEE);
      document.getElementById("f-meals").textContent = meals;
      document.getElementById("f-out").textContent = fmt(total);
    }
    root.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
    calc();
  }

  function initContactForm() {
    var f = document.getElementById("contact-form");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.getElementById("form-ok");
      f.style.display = "none";
      ok.style.display = "block";
    });
  }

  // ---------------------------------------------------------------------
  // Scroll progress bar
  // ---------------------------------------------------------------------
  function initProgressBar() {
    var bar = document.createElement("div");
    bar.id = "fc-progress";
    document.body.appendChild(bar);
    function upd() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      bar.style.width = (p * 100) + "%";
    }
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  }

  // ---------------------------------------------------------------------
  // Hero stat count-up
  // ---------------------------------------------------------------------
  function initCounters() {
    var nums = document.querySelectorAll(".hero-stats .num");
    if (!nums.length) return;
    nums.forEach(function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
      if (!m) return;
      var prefix = m[1], target = parseFloat(m[2].replace(",", ".")), suffix = m[3];
      var dur = 1100, start = null;
      function step(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = Math.round(target * eased);
        el.textContent = prefix + val + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = prefix + (Number.isInteger(target) ? target : target) + suffix;
      }
      el.textContent = prefix + "0" + suffix;
      requestAnimationFrame(step);
    });
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    buildDonateSection();
    var saved = "de";
    try { saved = localStorage.getItem("fc_lang") || "de"; } catch (e) {}
    setLang(saved);
    initReveal();
    initZakatCalc();
    initFidyaCalc();
    initContactForm();
    initProgressBar();
    initCounters();
  });
})();
