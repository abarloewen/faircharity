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

  // ===== Inner-page translations (Kurban) =====
  Object.assign(I18N, {
    "Qurban · Udhiya": { tr: "Kurban · Udhiye", ar: "الأضحية", ms: "Korban · Udhiyah" },
    "Your Qurban — from €85": { tr: "Kurbanınız — 85 €'dan itibaren", ar: "أضحيتك — ابتداءً من ٨٥ €", ms: "Korban anda — dari €85" },
    "More than a sacrifice: a sign of obedience, trust and gratitude to Allah — carried out halal, transparently and traceably.": { tr: "Bir kurbandan fazlası: Allah'a itaatin, güvenin ve şükrün bir işareti — helal, şeffaf ve izlenebilir şekilde gerçekleştirilir.", ar: "أكثر من ذبيحة: علامة على الطاعة والتوكّل والشكر لله — تُنفَّذ بطريقة حلال وشفّافة وقابلة للتتبّع.", ms: "Lebih daripada sembelihan: tanda ketaatan, kepercayaan dan kesyukuran kepada Allah — dilaksanakan secara halal, telus dan boleh dijejaki." },
    "👉 Donate now": { tr: "👉 Şimdi bağış yap", ar: "👉 تبرّع الآن", ms: "👉 Derma sekarang" },
    "What Qurban means": { tr: "Kurban ne anlama gelir", ar: "ماذا تعني الأضحية", ms: "Apa makna Korban" },
    "Obedience that becomes help": { tr: "Yardıma dönüşen itaat", ar: "طاعةٌ تتحوّل إلى مساعدة", ms: "Ketaatan yang menjadi bantuan" },
    "Qurban (Udhiya) is one of the most significant acts in Islam during Eid ul-Adhā. It recalls the devotion of Prophet Ibrāhīm (a.s.), who was ready to sacrifice everything for Allah.": { tr: "Kurban (Udhiye), Kurban Bayramı'nda İslam'daki en anlamlı ibadetlerden biridir. Allah için her şeyini feda etmeye hazır olan Hz. İbrahim'in (a.s.) bağlılığını hatırlatır.", ar: "الأضحية من أعظم العبادات في الإسلام أيام عيد الأضحى. وهي تذكّر بتفاني النبي إبراهيم (عليه السلام) الذي كان مستعدًّا للتضحية بكل شيء في سبيل الله.", ms: "Korban (Udhiyah) ialah salah satu ibadah paling bermakna dalam Islam pada Hari Raya Aidiladha. Ia mengingatkan pengabdian Nabi Ibrahim (a.s.) yang sanggup mengorbankan segalanya kerana Allah." },
    "With your sacrifice you reach people for whom meat is a rare gift — and you connect your ʿibādah with real, documented help.": { tr: "Kurbanınızla, et yemenin nadir bir nimet olduğu insanlara ulaşır — ve ibadetinizi gerçek, belgelenmiş bir yardımla birleştirirsiniz.", ar: "بأضحيتك تصل إلى أناسٍ يُعدّ اللحم بالنسبة إليهم هديةً نادرة — وتربط عبادتك بمساعدة حقيقية موثّقة.", ms: "Dengan korban anda, anda menyantuni mereka yang jarang menikmati daging — dan menghubungkan ibadah anda dengan bantuan sebenar yang didokumentasikan." },
    "Personal proof": { tr: "Kişisel kanıt", ar: "إثبات شخصي", ms: "Bukti peribadi" },
    "You see with your own eyes": { tr: "Kendi gözlerinizle görürsünüz", ar: "ترى بأمّ عينك", ms: "Anda lihat dengan mata sendiri" },
    "For every Qurban you receive a personal photo and video proof with a date stamp. Your name is recorded on a visible name tag, so your sacrifice can be clearly assigned to you.": { tr: "Her kurban için tarih damgalı kişisel fotoğraf ve video kanıtı alırsınız. Adınız görünür bir etikete kaydedilir, böylece kurbanınız size açıkça atfedilebilir.", ar: "مقابل كل أضحية تتلقّى إثباتًا شخصيًا بالصور والفيديو مع ختم التاريخ. ويُسجَّل اسمك على بطاقة ظاهرة، حتى تُنسَب أضحيتك إليك بوضوح.", ms: "Bagi setiap korban anda menerima bukti foto dan video peribadi dengan cap tarikh. Nama anda dicatat pada label yang kelihatan, supaya korban anda jelas dikaitkan dengan anda." },
    "Really carried out": { tr: "Gerçekten gerçekleştirildi", ar: "نُفِّذت فعلًا", ms: "Benar-benar dilaksanakan" },
    "Clearly assigned to you": { tr: "Size açıkça atfedildi", ar: "منسوبة إليك بوضوح", ms: "Jelas dikaitkan dengan anda" },
    "Transparent & traceable": { tr: "Şeffaf ve izlenebilir", ar: "شفّافة وقابلة للتتبّع", ms: "Telus & boleh dijejaki" },
    "Because trust is not created by words, but by clear and honest insights.": { tr: "Çünkü güven sözlerle değil, açık ve dürüst bilgilerle oluşur.", ar: "لأنّ الثقة لا تُبنى بالكلام، بل برؤى واضحة وصادقة.", ms: "Kerana kepercayaan tidak terbina dengan kata-kata, tetapi dengan maklumat yang jelas dan jujur." },
    "Choose your country": { tr: "Ülkenizi seçin", ar: "اختر بلدك", ms: "Pilih negara anda" },
    "Availability changes during the season. Currently distributing in Indonesia.": { tr: "Uygunluk sezon boyunca değişir. Şu anda Endonezya'da dağıtım yapılıyor.", ar: "يتغيّر التوفّر خلال الموسم. نوزّع حاليًا في إندونيسيا.", ms: "Ketersediaan berubah sepanjang musim. Kini diagihkan di Indonesia." },
    "Indonesia": { tr: "Endonezya", ar: "إندونيسيا", ms: "Indonesia" },
    "per 🐐 goat": { tr: "🐐 keçi başına", ar: "لكل 🐐 ماعز", ms: "setiap 🐐 kambing" },
    "👉 Donate": { tr: "👉 Bağış yap", ar: "👉 تبرّع", ms: "👉 Derma" },
    "sold out": { tr: "tükendi", ar: "نفدت الكمية", ms: "habis dijual" },
    "How we carry out your Qurban": { tr: "Kurbanınızı nasıl gerçekleştiriyoruz", ar: "كيف نُنفّذ أضحيتك", ms: "Bagaimana kami laksanakan korban anda" },
    "Islamically correct, transparent, effective": { tr: "İslami açıdan doğru, şeffaf, etkili", ar: "صحيحة شرعًا، شفّافة، فعّالة", ms: "Sah dari segi Islam, telus, berkesan" },
    "Halal slaughter": { tr: "Helal kesim", ar: "ذبح حلال", ms: "Sembelihan halal" },
    "According to Islamic rulings.": { tr: "İslami hükümlere uygun.", ar: "وفقًا للأحكام الشرعية.", ms: "Menurut hukum Islam." },
    "Clear assignment of your donation.": { tr: "Bağışınızın açık şekilde atanması.", ar: "نسبة تبرّعك إليك بوضوح.", ms: "Penetapan derma anda yang jelas." },
    "Personal video & photo proof.": { tr: "Kişisel video ve fotoğraf kanıtı.", ar: "إثبات شخصي بالفيديو والصور.", ms: "Bukti video & foto peribadi." },
    "Direct help": { tr: "Doğrudan yardım", ar: "مساعدة مباشرة", ms: "Bantuan terus" },
    "Documented distribution on site.": { tr: "Yerinde belgelenmiş dağıtım.", ar: "توزيع موثّق في الموقع.", ms: "Pengagihan yang didokumentasikan di lokasi." },
    "💳 Manual bank transfer": { tr: "💳 Manuel banka havalesi", ar: "💳 تحويل بنكي يدوي", ms: "💳 Pindahan bank manual" },
    "Account holder:": { tr: "Hesap sahibi:", ar: "صاحب الحساب:", ms: "Pemegang akaun:" },
    "Important note:": { tr: "Önemli not:", ar: "ملاحظة مهمة:", ms: "Nota penting:" },
    "Please add a reference code so we can correctly assign your donation. For Indonesia use: “Ki – Your Name”.": { tr: "Bağışınızı doğru şekilde atayabilmemiz için lütfen bir açıklama kodu ekleyin. Endonezya için kullanın: „Ki – Adınız“.", ar: "يرجى إضافة رمز مرجعي حتى نتمكّن من نسبة تبرّعك بشكل صحيح. لإندونيسيا استخدم: «Ki – اسمك».", ms: "Sila tambah kod rujukan supaya kami dapat menetapkan derma anda dengan betul. Untuk Indonesia gunakan: „Ki – Nama Anda“." },
    "The impact of your Qurban": { tr: "Kurbanınızın etkisi", ar: "أثر أضحيتك", ms: "Kesan korban anda" },
    "One animal is sacrificed — many people are strengthened": { tr: "Bir hayvan kurban edilir — birçok insan güçlenir", ar: "يُذبَح حيوان واحد — ويتقوّى كثير من الناس", ms: "Seekor haiwan dikorbankan — ramai orang diperkukuh" },
    "You provide for families in need.": { tr: "İhtiyaç sahibi ailelerin geçimini sağlarsınız.", ar: "تُعيل أسرًا محتاجة.", ms: "Anda menyara keluarga yang memerlukan." },
    "You bring joy to orphanages and communities.": { tr: "Yetimhanelere ve topluluklara sevinç getirirsiniz.", ar: "تُدخل الفرح على دور الأيتام والمجتمعات.", ms: "Anda membawa kegembiraan kepada rumah anak yatim dan komuniti." },
    "You strengthen the cohesion of the Ummah.": { tr: "Ümmetin birliğini güçlendirirsiniz.", ar: "تُقوّي تماسك الأمّة.", ms: "Anda mengukuhkan perpaduan Ummah." },
    "You connect your ʿibādah with real help.": { tr: "İbadetinizi gerçek yardımla birleştirirsiniz.", ar: "تربط عبادتك بمساعدة حقيقية.", ms: "Anda menghubungkan ibadah anda dengan bantuan sebenar." },
    "Carry out your Qurban now": { tr: "Kurbanınızı şimdi gerçekleştirin", ar: "نفّذ أضحيتك الآن", ms: "Laksanakan korban anda sekarang" },
    "Fulfil your duty and support people in need — transparent, halal and traceable.": { tr: "Görevinizi yerine getirin ve ihtiyaç sahiplerine destek olun — şeffaf, helal ve izlenebilir.", ar: "أدِّ واجبك وادعم المحتاجين — بشفافية وحلال وقابلية للتتبّع.", ms: "Tunaikan kewajipan anda dan bantu mereka yang memerlukan — telus, halal dan boleh dijejaki." },
    "❤ Donate hope": { tr: "❤ Umut bağışla", ar: "❤ تبرّع بالأمل", ms: "❤ Dermakan harapan" }
  });
  // ===== Inner-page translations (Sponsorship / Water / Empowerment) =====
  Object.assign(I18N, {
    "Multifunction Sponsorship": { tr: "Çok Fonksiyonlu Sponsorluk", ar: "كفالة متعدّدة الوظائف", ms: "Penajaan Pelbagai Fungsi" },
    "Holistic help + sustainable impact = lasting reward. We don't just support one child — we strengthen the structures around the child.": { tr: "Bütüncül yardım + sürdürülebilir etki = kalıcı sevap. Yalnızca bir çocuğu desteklemiyoruz — çocuğun çevresindeki yapıları güçlendiriyoruz.", ar: "مساعدة شاملة + أثر مستدام = أجر دائم. نحن لا ندعم طفلًا واحدًا فحسب — بل نقوّي البُنى المحيطة به.", ms: "Bantuan menyeluruh + kesan lestari = ganjaran berkekalan. Kami bukan sekadar menyokong seorang anak — kami mengukuhkan struktur di sekeliling anak itu." },
    "👉 Become a sponsor": { tr: "👉 Sponsor ol", ar: "👉 كن كفيلًا", ms: "👉 Jadi penaja" },
    "One child cannot thrive in isolation": { tr: "Bir çocuk yalnız başına gelişemez", ar: "لا يمكن لطفلٍ أن ينمو منعزلًا", ms: "Seorang anak tidak boleh berkembang dalam keterasingan" },
    "Poverty, hunger and lack of prospects always affect a child's whole environment. If a child can go to school but goes hungry at home, is sick or has no safe access to water, real development fails to happen.": { tr: "Yoksulluk, açlık ve geleceksizlik her zaman bir çocuğun tüm çevresini etkiler. Bir çocuk okula gidebiliyor ama evde aç kalıyorsa, hastaysa ya da güvenli suya erişimi yoksa gerçek gelişim gerçekleşmez.", ar: "الفقر والجوع وانعدام الآفاق تؤثّر دائمًا في بيئة الطفل بأكملها. فإذا كان الطفل يذهب إلى المدرسة لكنه يجوع في البيت، أو مريضًا، أو لا يملك وصولًا آمنًا إلى الماء، فلن يتحقّق نموٌّ حقيقي.", ms: "Kemiskinan, kelaparan dan ketiadaan harapan sentiasa menjejaskan seluruh persekitaran seorang anak. Jika seorang anak dapat ke sekolah tetapi lapar di rumah, sakit atau tiada akses selamat kepada air, perkembangan sebenar tidak akan berlaku." },
    "Many of the children we support were left behind by their families or come from very poor backgrounds. We support facilities that give these children a home, education and a future.": { tr: "Desteklediğimiz çocukların çoğu aileleri tarafından geride bırakıldı ya da çok yoksul ailelerden geliyor. Bu çocuklara yuva, eğitim ve gelecek sağlayan kurumları destekliyoruz.", ar: "كثير من الأطفال الذين ندعمهم تركتهم أُسرهم أو ينحدرون من بيئات فقيرة جدًا. ندعم مؤسّسات تمنح هؤلاء الأطفال بيتًا وتعليمًا ومستقبلًا.", ms: "Ramai anak yang kami bantu ditinggalkan oleh keluarga mereka atau datang daripada latar belakang yang sangat miskin. Kami menyokong pusat yang memberi anak-anak ini rumah, pendidikan dan masa depan." },
    "Together we Fair-change the world.": { tr: "Birlikte dünyayı Fair-değiştiriyoruz.", ar: "معًا نُحدث تغييرًا عادلًا في العالم.", ms: "Bersama-sama kita Fair-ubah dunia." },
    "How your sponsorship works": { tr: "Sponsorluğunuz nasıl işler", ar: "كيف تعمل كفالتك", ms: "Cara penajaan anda berfungsi" },
    "Choose a sponsorship": { tr: "Bir sponsorluk seçin", ar: "اختر كفالة", ms: "Pilih satu penajaan" },
    "You decide how many children you want to support. We support orphanages and boarding schools in Gambia, Togo and Indonesia. Children are matched by need, so location selection isn't currently possible.": { tr: "Kaç çocuğu desteklemek istediğinize siz karar verirsiniz. Gambiya, Togo ve Endonezya'daki yetimhaneleri ve yatılı okulları destekliyoruz. Çocuklar ihtiyaca göre eşleştirilir, bu nedenle şu anda konum seçimi mümkün değildir.", ar: "أنت تقرّر عدد الأطفال الذين تريد دعمهم. ندعم دور الأيتام والمدارس الداخلية في غامبيا وتوغو وإندونيسيا. ويُختار الأطفال حسب الحاجة، لذا لا يتوفّر حاليًا اختيار الموقع.", ms: "Anda menentukan berapa ramai anak yang ingin anda bantu. Kami menyokong rumah anak yatim dan sekolah berasrama di Gambia, Togo dan Indonesia. Anak-anak dipadankan mengikut keperluan, jadi pemilihan lokasi belum tersedia buat masa ini." },
    "Support monthly": { tr: "Aylık destek olun", ar: "ادعم شهريًا", ms: "Sokong setiap bulan" },
    "Your regular donation enables education, nutrition, care and medical supply — and strengthens the facilities so children grow up safely.": { tr: "Düzenli bağışınız eğitim, beslenme, bakım ve tıbbi tedariki mümkün kılar — ve çocukların güvenle büyümesi için kurumları güçlendirir.", ar: "تبرّعك المنتظم يتيح التعليم والتغذية والرعاية والإمداد الطبي — ويقوّي المؤسّسات لينشأ الأطفال بأمان.", ms: "Derma tetap anda membolehkan pendidikan, pemakanan, penjagaan dan bekalan perubatan — serta mengukuhkan pusat-pusat itu supaya anak-anak membesar dengan selamat." },
    "Follow the impact": { tr: "Etkiyi takip edin", ar: "تابِع الأثر", ms: "Ikuti kesannya" },
    "You receive regular project updates, photos and reports. The first update arrives once your sponsorship contribution has reached us.": { tr: "Düzenli proje güncellemeleri, fotoğraflar ve raporlar alırsınız. İlk güncelleme, sponsorluk katkınız bize ulaştığında gelir.", ar: "تتلقّى تحديثات منتظمة للمشروع وصورًا وتقارير. ويصلك أول تحديث بمجرّد وصول مساهمتك في الكفالة إلينا.", ms: "Anda menerima kemas kini projek, foto dan laporan secara berkala. Kemas kini pertama tiba sebaik sahaja sumbangan penajaan anda sampai kepada kami." },
    "Impact on eight levels at once": { tr: "Aynı anda sekiz düzeyde etki", ar: "أثرٌ على ثمانية مستويات في آنٍ واحد", ms: "Kesan pada lapan peringkat serentak" },
    "These areas interlock. When a child can learn, is healthy and has prospects, lasting development emerges — a real Sadaqa Jariyah.": { tr: "Bu alanlar birbirine kenetlenir. Bir çocuk öğrenebildiğinde, sağlıklı olduğunda ve geleceği olduğunda kalıcı gelişim ortaya çıkar — gerçek bir Sadaka-i Câriye.", ar: "هذه المجالات متشابكة. فعندما يستطيع الطفل أن يتعلّم، ويكون معافى، وله آفاق، ينشأ تطوّرٌ دائم — صدقة جارية حقيقية.", ms: "Bidang-bidang ini saling berkait. Apabila seorang anak dapat belajar, sihat dan mempunyai harapan, perkembangan berkekalan terhasil — sebuah Sadaqah Jariah yang sebenar." },
    "Child & environment": { tr: "Çocuk ve çevre", ar: "الطفل والبيئة", ms: "Anak & persekitaran" },
    "Nutrition, clothing & care.": { tr: "Beslenme, giyim ve bakım.", ar: "التغذية والكساء والرعاية.", ms: "Pemakanan, pakaian & penjagaan." },
    "Education": { tr: "Eğitim", ar: "التعليم", ms: "Pendidikan" },
    "School fees, materials & teachers.": { tr: "Okul ücretleri, malzemeler ve öğretmenler.", ar: "الرسوم الدراسية والمواد والمعلّمون.", ms: "Yuran sekolah, bahan & guru." },
    "Health & water": { tr: "Sağlık ve su", ar: "الصحة والماء", ms: "Kesihatan & air" },
    "Medical care, hygiene & clean water.": { tr: "Tıbbi bakım, hijyen ve temiz su.", ar: "الرعاية الطبية والنظافة والماء النظيف.", ms: "Penjagaan perubatan, kebersihan & air bersih." },
    "Sustainability": { tr: "Sürdürülebilirlik", ar: "الاستدامة", ms: "Kelestarian" },
    "Agriculture & food security.": { tr: "Tarım ve gıda güvenliği.", ar: "الزراعة والأمن الغذائي.", ms: "Pertanian & sekuriti makanan." },
    "Training & prospects.": { tr: "Eğitim ve gelecek imkânları.", ar: "التدريب والآفاق.", ms: "Latihan & prospek." },
    "Infrastructure": { tr: "Altyapı", ar: "البنية التحتية", ms: "Infrastruktur" },
    "Stable facilities & supply.": { tr: "İstikrarlı tesisler ve tedarik.", ar: "مرافق وإمدادات مستقرّة.", ms: "Kemudahan & bekalan yang stabil." },
    "Values": { tr: "Değerler", ar: "القيم", ms: "Nilai" },
    "Character building & community.": { tr: "Karakter gelişimi ve topluluk.", ar: "بناء الشخصية والمجتمع.", ms: "Pembinaan sahsiah & komuniti." },
    "Documentation & development checks.": { tr: "Belgeleme ve gelişim kontrolleri.", ar: "التوثيق ومتابعة التطوّر.", ms: "Dokumentasi & pemeriksaan perkembangan." },
    "Not a simple donation — an investment in humanity": { tr: "Basit bir bağış değil — insanlığa yapılan bir yatırım", ar: "ليست مجرّد تبرّع — بل استثمار في الإنسانية", ms: "Bukan derma biasa — satu pelaburan dalam kemanusiaan" },
    "A multifunction sponsorship doesn't only help a single child. It strengthens families, builds structures and changes whole communities.": { tr: "Çok fonksiyonlu bir sponsorluk yalnızca tek bir çocuğa yardım etmez. Aileleri güçlendirir, yapılar kurar ve tüm toplulukları değiştirir.", ar: "الكفالة متعدّدة الوظائف لا تساعد طفلًا واحدًا فقط، بل تقوّي الأسر وتبني البُنى وتغيّر مجتمعات بأكملها.", ms: "Penajaan pelbagai fungsi bukan sahaja membantu seorang anak. Ia mengukuhkan keluarga, membina struktur dan mengubah seluruh komuniti." },
    "Sustainable water supply": { tr: "Sürdürülebilir su temini", ar: "إمدادات المياه المستدامة", ms: "Bekalan air lestari" },
    "Clean water is the foundation of health and development. We build supply systems for long-term use — not for short-term campaigns.": { tr: "Temiz su, sağlığın ve gelişimin temelidir. Kısa vadeli kampanyalar için değil — uzun vadeli kullanım için tedarik sistemleri kuruyoruz.", ar: "الماء النظيف أساس الصحة والتنمية. نبني أنظمة إمداد للاستخدام طويل الأمد — لا للحملات قصيرة الأمد.", ms: "Air bersih ialah asas kesihatan dan pembangunan. Kami membina sistem bekalan untuk kegunaan jangka panjang — bukan untuk kempen jangka pendek." },
    "👉 Support water": { tr: "👉 Suyu destekle", ar: "👉 ادعم الماء", ms: "👉 Sokong air" },
    "Built to last, not to be photographed": { tr: "Fotoğraflanmak için değil, kalıcı olmak için inşa edildi", ar: "بُنيت لتدوم، لا لتُصوَّر", ms: "Dibina untuk kekal, bukan untuk difoto" },
    "Too many water projects fail months after the photo is taken. Pumps break, no one is responsible, the well falls silent. We build differently.": { tr: "Pek çok su projesi, fotoğraf çekildikten aylar sonra başarısız olur. Pompalar bozulur, kimse sorumlu olmaz, kuyu susar. Biz farklı inşa ediyoruz.", ar: "كثير من مشاريع المياه تفشل بعد أشهر من التقاط الصورة. تتعطّل المضخّات، ولا أحد مسؤول، ويصمت البئر. نحن نبني بطريقة مختلفة.", ms: "Terlalu banyak projek air gagal beberapa bulan selepas foto diambil. Pam rosak, tiada siapa bertanggungjawab, telaga menjadi sunyi. Kami membina secara berbeza." },
    "Every system — well, water tower or pipeline — is planned with local partners, maintained on a schedule and documented. Function is guaranteed, not just promised.": { tr: "Her sistem — kuyu, su kulesi veya boru hattı — yerel ortaklarla planlanır, programlı olarak bakımı yapılır ve belgelenir. İşlevsellik yalnızca vaat edilmez, garanti edilir.", ar: "كل نظام — بئر أو خزّان مياه أو خطّ أنابيب — يُخطَّط له مع شركاء محليين، ويُصان وفق جدول، ويُوثَّق. الأداء مضمون لا مجرّد وعد.", ms: "Setiap sistem — telaga, menara air atau saluran paip — dirancang bersama rakan tempatan, diselenggara mengikut jadual dan didokumentasikan. Fungsinya dijamin, bukan sekadar dijanjikan." },
    "What makes our water systems different": { tr: "Su sistemlerimizi farklı kılan nedir", ar: "ما الذي يجعل أنظمة المياه لدينا مختلفة", ms: "Apa yang membezakan sistem air kami" },
    "Real infrastructure": { tr: "Gerçek altyapı", ar: "بنية تحتية حقيقية", ms: "Infrastruktur sebenar" },
    "Wells, water towers and pipes — engineered for daily use by whole communities.": { tr: "Kuyular, su kuleleri ve borular — tüm toplulukların günlük kullanımı için tasarlandı.", ar: "آبار وخزّانات مياه وأنابيب — مُهندَسة للاستخدام اليومي لمجتمعات بأكملها.", ms: "Telaga, menara air dan paip — direka untuk kegunaan harian seluruh komuniti." },
    "Maintenance guarantee": { tr: "Bakım garantisi", ar: "ضمان الصيانة", ms: "Jaminan penyelenggaraan" },
    "Each project includes a maintenance plan and local responsibility, so it keeps working.": { tr: "Her proje bir bakım planı ve yerel sorumluluk içerir, böylece çalışmaya devam eder.", ar: "كل مشروع يتضمّن خطة صيانة ومسؤولية محلية، حتى يستمرّ في العمل.", ms: "Setiap projek termasuk pelan penyelenggaraan dan tanggungjawab tempatan, supaya ia terus berfungsi." },
    "Documented & traceable": { tr: "Belgelenmiş ve izlenebilir", ar: "موثّق وقابل للتتبّع", ms: "Didokumentasikan & boleh dijejaki" },
    "Location, costs and condition are recorded — you can see where your donation went.": { tr: "Konum, maliyetler ve durum kaydedilir — bağışınızın nereye gittiğini görebilirsiniz.", ar: "يُسجَّل الموقع والتكاليف والحالة — يمكنك أن ترى أين ذهب تبرّعك.", ms: "Lokasi, kos dan keadaan direkodkan — anda boleh lihat ke mana derma anda pergi." },
    "“…and We made from water every living thing.”": { tr: "„…ve her canlı şeyi sudan yarattık.“", ar: "﴿وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ﴾", ms: "„…dan Kami jadikan daripada air segala sesuatu yang hidup.“" },
    "Give a community lasting access to clean water": { tr: "Bir topluluğa temiz suya kalıcı erişim sağlayın", ar: "امنح مجتمعًا وصولًا دائمًا إلى الماء النظيف", ms: "Beri komuniti akses berkekalan kepada air bersih" },
    "A donation that flows for years — Sadaqa Jariyah in its purest form.": { tr: "Yıllarca akan bir bağış — en saf hâliyle Sadaka-i Câriye.", ar: "تبرّعٌ يجري لسنوات — صدقة جارية في أنقى صورها.", ms: "Derma yang mengalir bertahun-tahun — Sadaqah Jariah dalam bentuk paling tulen." },
    "Help that makes itself unnecessary": { tr: "Kendini gereksiz kılan yardım", ar: "مساعدةٌ تجعل نفسها غير ضرورية", ms: "Bantuan yang menjadikan dirinya tidak diperlukan" },
    "We help people build their own sources of income. Through training, tools and start-up capital, small businesses emerge that make families independent for good.": { tr: "İnsanların kendi gelir kaynaklarını oluşturmasına yardım ediyoruz. Eğitim, ekipman ve başlangıç sermayesiyle, aileleri kalıcı olarak bağımsız kılan küçük işletmeler ortaya çıkar.", ar: "نساعد الناس على بناء مصادر دخلهم الخاصة. فمن خلال التدريب والأدوات ورأس المال الأوّلي تنشأ مشاريع صغيرة تجعل الأسر مستقلّة بشكل دائم.", ms: "Kami membantu orang membina sumber pendapatan mereka sendiri. Melalui latihan, peralatan dan modal permulaan, perniagaan kecil terbentuk yang menjadikan keluarga berdikari selamanya." },
    "👉 Support empowerment": { tr: "👉 Kendi kendine yardımı destekle", ar: "👉 ادعم التمكين", ms: "👉 Sokong pemerkasaan" },
    "Dignity instead of dependency": { tr: "Bağımlılık yerine onur", ar: "كرامة بدل التبعيّة", ms: "Maruah menggantikan pergantungan" },
    "A food parcel feeds a family for a day. A sewing machine, a toolkit or a delivery bike feeds them for years. We assess not only need, but ability.": { tr: "Bir gıda paketi bir aileyi bir gün doyurur. Bir dikiş makinesi, bir alet takımı ya da bir teslimat bisikleti onları yıllarca doyurur. Yalnızca ihtiyacı değil, yeteneği de değerlendiririz.", ar: "طردٌ غذائي يُطعِم أسرةً يومًا واحدًا. أمّا ماكينة خياطة أو حقيبة أدوات أو درّاجة توصيل فتُطعِمهم سنوات. نحن نقيّم الحاجة والقدرة معًا.", ms: "Sebungkus makanan memberi makan keluarga selama sehari. Mesin jahit, set alat atau basikal penghantaran memberi mereka makan selama bertahun-tahun. Kami menilai bukan sahaja keperluan, tetapi juga kebolehan." },
    "If someone is a trained craftsman, seamstress or driver, we finance the tools, machines or vehicles they need — handed over into their ownership, so they earn an income and become permanently independent.": { tr: "Birisi eğitimli bir zanaatkâr, terzi ya da sürücüyse, ihtiyaç duyduğu aletleri, makineleri ya da araçları finanse ederiz — mülkiyetine devredilir, böylece gelir elde eder ve kalıcı olarak bağımsız olur.", ar: "إن كان الشخص حرفيًّا مدرَّبًا أو خيّاطة أو سائقًا، نموّل ما يحتاجه من أدوات أو آلات أو مركبات — تُسلَّم إلى ملكيته، ليكسب دخلًا ويصبح مستقلًّا بشكل دائم.", ms: "Jika seseorang itu tukang mahir, tukang jahit atau pemandu, kami membiayai alat, mesin atau kenderaan yang mereka perlukan — diserahkan menjadi milik mereka, supaya mereka memperoleh pendapatan dan berdikari secara kekal." },
    "How empowerment works": { tr: "Kendi kendine yardım nasıl işler", ar: "كيف يعمل التمكين", ms: "Cara pemerkasaan berfungsi" },
    "Assess need & potential": { tr: "İhtiyaç ve potansiyeli değerlendir", ar: "تقييم الحاجة والإمكانات", ms: "Nilai keperluan & potensi" },
    "We examine the situation carefully — and the skills a person already has.": { tr: "Durumu dikkatle inceleriz — ve kişinin hâlihazırda sahip olduğu becerileri.", ar: "نفحص الوضع بعناية — والمهارات التي يمتلكها الشخص بالفعل.", ms: "Kami meneliti keadaan dengan teliti — dan kemahiran yang sedia ada pada seseorang." },
    "Provide tools & capital": { tr: "Araç ve sermaye sağla", ar: "توفير الأدوات ورأس المال", ms: "Sediakan alat & modal" },
    "Machines, tools or a vehicle are handed over into ownership — plus training where needed.": { tr: "Makineler, aletler ya da bir araç mülkiyete devredilir — gerektiğinde eğitimle birlikte.", ar: "تُسلَّم الآلات أو الأدوات أو المركبة إلى الملكية — مع التدريب عند الحاجة.", ms: "Mesin, alat atau kenderaan diserahkan menjadi milik — berserta latihan apabila perlu." },
    "Income & independence": { tr: "Gelir ve bağımsızlık", ar: "الدخل والاستقلال", ms: "Pendapatan & kebebasan" },
    "The person works, earns and supports their family — lifting themselves out of dependency.": { tr: "Kişi çalışır, kazanır ve ailesini geçindirir — kendini bağımlılıktan kurtarır.", ar: "يعمل الشخص ويكسب ويُعيل أسرته — مُخرِجًا نفسه من التبعيّة.", ms: "Orang itu bekerja, memperoleh pendapatan dan menyara keluarganya — membebaskan diri daripada pergantungan." },
    "From recipient to provider": { tr: "Alıcıdan sağlayıcıya", ar: "من متلقٍّ إلى مُعيل", ms: "Daripada penerima kepada penyara" },
    "This is how help becomes what it was meant to be: liberation, not dependency. One workshop can carry an entire family — and sometimes an entire neighbourhood.": { tr: "İşte yardım böylece olması gereken şeye dönüşür: bağımlılık değil, özgürleşme. Bir atölye tüm bir aileyi — bazen tüm bir mahalleyi — taşıyabilir.", ar: "هكذا تصبح المساعدة ما يُراد لها أن تكون: تحريرًا لا تبعيّة. ورشةٌ واحدة قد تُعيل أسرةً بأكملها — وأحيانًا حيًّا بأكمله.", ms: "Beginilah bantuan menjadi apa yang sepatutnya: pembebasan, bukan pergantungan. Satu bengkel boleh menyara seluruh keluarga — dan kadangkala seluruh kejiranan." },
    "❤ Fund a livelihood": { tr: "❤ Bir geçim kaynağını finanse et", ar: "❤ موّل سبيل رزق", ms: "❤ Biayai satu mata pencarian" }
  });
  // ===== Inner-page translations (Zakat) =====
  Object.assign(I18N, {
    "The forgotten pillar of justice": { tr: "Adaletin unutulmuş sütunu", ar: "ركن العدل المنسيّ", ms: "Tiang keadilan yang dilupakan" },
    "Zakat means purification, growth and balance. It is not a voluntary donation, but an obligation and a social system — and we want to revive it, not just administer it.": { tr: "Zekât; arınma, büyüme ve denge demektir. Gönüllü bir bağış değil, bir farz ve bir sosyal sistemdir — ve biz onu yalnızca yönetmek değil, yeniden canlandırmak istiyoruz.", ar: "الزكاة تعني التطهير والنماء والتوازن. وهي ليست تبرّعًا تطوّعيًا، بل فريضة ونظام اجتماعي — ونريد أن نُحييها لا أن نُديرها فحسب.", ms: "Zakat bermaksud penyucian, pertumbuhan dan keseimbangan. Ia bukan derma sukarela, tetapi satu kewajipan dan sistem sosial — dan kami mahu menghidupkannya semula, bukan sekadar menguruskannya." },
    "🧮 Zakat calculator": { tr: "🧮 Zekât hesaplayıcı", ar: "🧮 حاسبة الزكاة", ms: "🧮 Kalkulator Zakat" },
    "👉 Pay Zakat": { tr: "👉 Zekât öde", ar: "👉 أدِّ الزكاة", ms: "👉 Bayar Zakat" },
    "What Zakat truly is": { tr: "Zekât gerçekte nedir", ar: "ما هي الزكاة حقًّا", ms: "Apa sebenarnya Zakat" },
    "Wealth must circulate, not stagnate": { tr: "Servet durağanlaşmamalı, dolaşmalı", ar: "المال يجب أن يدور لا أن يُكنَز", ms: "Harta mesti beredar, bukan tersekat" },
    "Zakat protects wealth from excess and poverty from hopelessness. It is the third pillar of Islam — revealed as a divine economic system to end poverty permanently.": { tr: "Zekât, serveti aşırılıktan ve yoksulluğu umutsuzluktan korur. İslam'ın üçüncü şartıdır — yoksulluğu kalıcı olarak sona erdirmek için ilahi bir ekonomik sistem olarak indirilmiştir.", ar: "الزكاة تحمي المال من الإسراف وتحمي الفقير من اليأس. وهي ركن الإسلام الثالث — شُرِعت كنظام اقتصادي إلهي لإنهاء الفقر بشكل دائم.", ms: "Zakat melindungi harta daripada berlebihan dan kemiskinan daripada keputusasaan. Ia rukun Islam yang ketiga — disyariatkan sebagai sistem ekonomi ilahi untuk menamatkan kemiskinan secara kekal." },
    "“Take from their wealth a charity by which you purify them and cause them to grow…”": { tr: "„Onların mallarından, kendilerini temizleyeceğin ve arındıracağın bir sadaka al…“", ar: "﴿خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا﴾", ms: "„Ambillah zakat daripada harta mereka, dengannya kamu membersihkan dan menyucikan mereka…“" },
    "The hard reality": { tr: "Acı gerçek", ar: "الواقع المرير", ms: "Realiti yang pahit" },
    "What goes wrong today": { tr: "Bugün ne yanlış gidiyor", ar: "ما الخطأ الذي يقع اليوم", ms: "Apa yang tersilap hari ini" },
    "What was meant as a system of justice became a PR instrument of good conscience. Zakat is distributed, consumed, recorded — and forgotten.": { tr: "Bir adalet sistemi olarak amaçlanan şey, vicdan rahatlatan bir halkla ilişkiler aracına dönüştü. Zekât dağıtılır, tüketilir, kaydedilir — ve unutulur.", ar: "ما كان يُراد به نظام عدلٍ تحوّل إلى أداة علاقات عامة لراحة الضمير. تُوزَّع الزكاة وتُستهلَك وتُسجَّل — ثم تُنسى.", ms: "Apa yang dimaksudkan sebagai sistem keadilan menjadi alat publisiti untuk ketenangan hati. Zakat diagihkan, dihabiskan, direkodkan — dan dilupakan." },
    "Use": { tr: "Kullanım", ar: "الاستخدام", ms: "Penggunaan" },
    "Converted into one-off aid — short-term help, no liberation.": { tr: "Tek seferlik yardıma dönüştürülür — kısa vadeli yardım, özgürleşme yok.", ar: "تُحوَّل إلى مساعدة لمرّة واحدة — عونٌ مؤقّت بلا تحرير.", ms: "Ditukar menjadi bantuan sekali sahaja — bantuan jangka pendek, tiada pembebasan." },
    "Calculation": { tr: "Hesaplama", ar: "الحساب", ms: "Pengiraan" },
    "Many Muslims don't know nisab & rules — billions go unpaid or miscalculated.": { tr: "Birçok Müslüman nisabı ve kuralları bilmiyor — milyarlar ödenmeden kalıyor ya da yanlış hesaplanıyor.", ar: "كثير من المسلمين لا يعرفون النصاب والأحكام — فتبقى مليارات دون دفع أو تُحسَب خطأً.", ms: "Ramai umat Islam tidak tahu nisab & hukumnya — berbilion tidak dibayar atau tersalah kira." },
    "Distribution": { tr: "Dağıtım", ar: "التوزيع", ms: "Pengagihan" },
    "Distributed without review — dependency instead of independence.": { tr: "İnceleme yapılmadan dağıtılır — bağımsızlık yerine bağımlılık.", ar: "تُوزَّع دون مراجعة — تبعيّة بدل الاستقلال.", ms: "Diagihkan tanpa semakan — pergantungan menggantikan kebebasan." },
    "Administration": { tr: "Yönetim", ar: "الإدارة", ms: "Pentadbiran" },
    "NGOs finance operations & advertising from Zakat funds — highly questionable.": { tr: "STK'lar operasyonlarını ve reklamlarını zekât fonlarından finanse ediyor — son derece tartışmalı.", ar: "تموّل بعض المنظمات عملياتها وإعلاناتها من أموال الزكاة — وهذا أمرٌ مشكوك فيه للغاية.", ms: "NGO membiayai operasi & pengiklanan daripada dana Zakat — amat dipersoalkan." },
    "Our Zakat procedure": { tr: "Zekât yöntemimiz", ar: "آليّتنا في الزكاة", ms: "Tatacara Zakat kami" },
    "Zakat with structure and meaning": { tr: "Yapı ve anlam taşıyan zekât", ar: "زكاةٌ ذات بنية ومعنى", ms: "Zakat dengan struktur dan makna" },
    "Correct calculation & education": { tr: "Doğru hesaplama ve eğitim", ar: "حسابٌ صحيح وتوعية", ms: "Pengiraan betul & pendidikan" },
    "We develop training, digital calculators and workshops so Muslims understand, calculate and pay their Zakat correctly. Every miscalculation changes the fate of those meant to receive it.": { tr: "Müslümanların zekâtlarını doğru anlamaları, hesaplamaları ve ödemeleri için eğitimler, dijital hesaplayıcılar ve atölyeler geliştiriyoruz. Her yanlış hesaplama, onu almaya hak kazananların kaderini değiştirir.", ar: "نطوّر دورات تدريبية وحاسبات رقمية وورش عمل ليفهم المسلمون زكاتهم ويحسبوها ويؤدّوها بشكل صحيح. فكل خطأ في الحساب يغيّر مصير من يستحقّونها.", ms: "Kami membangunkan latihan, kalkulator digital dan bengkel supaya umat Islam memahami, mengira dan membayar Zakat mereka dengan betul. Setiap kesilapan pengiraan mengubah nasib mereka yang sepatutnya menerimanya." },
    "Asnāf-compliant separation": { tr: "Asnâf'a uygun ayrım", ar: "فصلٌ وفق الأصناف", ms: "Pengasingan menurut Asnaf" },
    "Zakat is Amānah — an entrusted good. It is never mixed with donations or admin costs. 100 % flows to eligible recipients (Asnāf): no advertising, no salaries, no detours.": { tr: "Zekât bir Emanettir — emanet edilmiş bir maldır. Asla bağışlarla ya da idari masraflarla karıştırılmaz. %100'ü hak sahiplerine (Asnâf) ulaşır: reklam yok, maaş yok, dolambaç yok.", ar: "الزكاة أمانة — مالٌ مُؤتَمَن عليه. لا تُخلَط أبدًا بالتبرّعات أو التكاليف الإدارية. 100% تصل إلى المستحقّين (الأصناف): لا إعلانات، ولا رواتب، ولا التفافات.", ms: "Zakat ialah Amanah — harta yang diamanahkan. Ia tidak pernah dicampur dengan derma atau kos pentadbiran. 100% sampai kepada golongan yang berhak (Asnaf): tiada iklan, tiada gaji, tiada putar belit." },
    "Sustainable enablement over one-off aid": { tr: "Tek seferlik yardımdan çok sürdürülebilir güçlendirme", ar: "تمكينٌ مستدام بدل المساعدة لمرّة واحدة", ms: "Pemerkasaan lestari mengatasi bantuan sekali sahaja" },
    "We assess need and ability. Where someone can work, we finance the tools that make them independent — so Zakat becomes what Allah intended: liberation, not dependency.": { tr: "İhtiyacı ve yeteneği değerlendiririz. Birisi çalışabiliyorsa, onu bağımsız kılacak araçları finanse ederiz — böylece zekât, Allah'ın murad ettiği şey olur: bağımlılık değil, özgürleşme.", ar: "نقيّم الحاجة والقدرة. وحيث يستطيع المرء العمل، نموّل الأدوات التي تجعله مستقلًّا — فتصبح الزكاة كما أرادها الله: تحريرًا لا تبعيّة.", ms: "Kami menilai keperluan dan kebolehan. Apabila seseorang mampu bekerja, kami membiayai alat yang menjadikan mereka berdikari — supaya Zakat menjadi apa yang Allah kehendaki: pembebasan, bukan pergantungan." },
    "Zakat for Waqf-like structures": { tr: "Vakıf benzeri yapılar için zekât", ar: "زكاةٌ لبُنى شبيهة بالوقف", ms: "Zakat untuk struktur seperti Wakaf" },
    "Together with scholars we examine how Zakat may create lasting, waqf-based systems that continuously support those in need — turning a one-off sum into a working system.": { tr: "Âlimlerle birlikte, zekâtın ihtiyaç sahiplerini sürekli destekleyen kalıcı, vakıf temelli sistemler nasıl oluşturabileceğini inceliyoruz — tek seferlik bir tutarı işleyen bir sisteme dönüştürerek.", ar: "بالتعاون مع العلماء ندرس كيف يمكن للزكاة أن تُنشئ أنظمةً دائمة قائمة على الوقف تدعم المحتاجين باستمرار — فنحوّل مبلغًا لمرّة واحدة إلى نظامٍ يعمل.", ms: "Bersama para ulama, kami mengkaji bagaimana Zakat boleh mewujudkan sistem berasaskan wakaf yang berkekalan dan menyokong golongan memerlukan secara berterusan — mengubah jumlah sekali sahaja menjadi sistem yang berfungsi." },
    "The 8 Asnāf — eligible recipients of Zakat": { tr: "8 Asnâf — zekâtın hak sahipleri", ar: "الأصناف الثمانية — مستحقّو الزكاة", ms: "8 Asnaf — golongan yang berhak menerima Zakat" },
    "The poor — people with little or no income.": { tr: "Fakirler — geliri az olan ya da hiç olmayan kişiler.", ar: "الفقراء — من لا دخل لهم أو دخلهم ضئيل.", ms: "Golongan fakir — mereka yang sedikit atau tiada pendapatan." },
    "The needy — they own something, but not enough to live.": { tr: "Yoksullar — bir şeyleri var ama geçinmeye yetmiyor.", ar: "المساكين — يملكون شيئًا لكنه لا يكفي للعيش.", ms: "Golongan miskin — mereka memiliki sesuatu, tetapi tidak cukup untuk hidup." },
    "Zakat administrators officially tasked with collection & distribution.": { tr: "Resmî olarak toplama ve dağıtımla görevlendirilmiş zekât görevlileri.", ar: "العاملون عليها المكلَّفون رسميًا بالجمع والتوزيع.", ms: "Amil zakat yang ditugaskan secara rasmi untuk memungut & mengagihkan." },
    "Those whose hearts are to be reconciled.": { tr: "Kalpleri İslam'a ısındırılacak olanlar.", ar: "المؤلَّفة قلوبهم.", ms: "Mereka yang hatinya hendak dijinakkan (muallaf)." },
    "For freeing captives or those in bondage.": { tr: "Esirleri ya da kölelik altındakileri özgürleştirmek için.", ar: "في الرِّقاب — لتحرير الأسرى والمستعبَدين.", ms: "Untuk membebaskan tawanan atau hamba." },
    "People with legitimate debts they cannot repay.": { tr: "Ödeyemedikleri meşru borçları olan kişiler.", ar: "الغارمون — أصحاب الديون المشروعة العاجزون عن سدادها.", ms: "Orang yang berhutang sah yang tidak mampu membayarnya." },
    "In the way of Allah — including charitable religious projects.": { tr: "Allah yolunda — hayır amaçlı dini projeler dâhil.", ar: "في سبيل الله — بما في ذلك المشاريع الدينية الخيرية.", ms: "Pada jalan Allah — termasuk projek keagamaan amal." },
    "Stranded travellers without means.": { tr: "İmkânsız kalmış yolcular.", ar: "ابن السبيل — المسافرون المنقطعون بلا مال.", ms: "Musafir yang terkandas tanpa bekalan." },
    "Zakat calculator": { tr: "Zekât hesaplayıcı", ar: "حاسبة الزكاة", ms: "Kalkulator Zakat" },
    "Calculate your Zakat in seconds": { tr: "Zekâtınızı saniyeler içinde hesaplayın", ar: "احسب زكاتك في ثوانٍ", ms: "Kira Zakat anda dalam beberapa saat" },
    "Zakat is 2.5% of net zakatable wealth that has been held for one lunar year and exceeds the nisab threshold. Enter your values — this is a guide, not a fatwa.": { tr: "Zekât, bir kameri yıl boyunca elde tutulan ve nisap eşiğini aşan net zekâta tabi malın %2,5'idir. Değerlerinizi girin — bu bir rehberdir, fetva değildir.", ar: "الزكاة 2.5% من صافي المال الزكوي الذي حال عليه الحول (سنة قمرية) وتجاوز النصاب. أدخل قيمك — هذا دليل استرشادي وليس فتوى.", ms: "Zakat ialah 2.5% daripada harta bersih yang layak dizakat, yang telah dipegang selama satu tahun qamari dan melebihi nisab. Masukkan nilai anda — ini panduan, bukan fatwa." },
    "For complex assets (business stock, pensions, agriculture) talk to us — we work with Fiqh experts.": { tr: "Karmaşık varlıklar (ticari stok, emeklilik, tarım) için bizimle konuşun — fıkıh uzmanlarıyla çalışıyoruz.", ar: "للأصول المعقّدة (بضائع تجارية، معاشات، زراعة) تواصل معنا — نعمل مع خبراء في الفقه.", ms: "Untuk aset kompleks (stok perniagaan, pencen, pertanian) hubungi kami — kami bekerjasama dengan pakar Fiqh." },
    "Cash & bank balances (€)": { tr: "Nakit ve banka bakiyeleri (€)", ar: "النقد وأرصدة البنك (€)", ms: "Tunai & baki bank (€)" },
    "Gold value (€)": { tr: "Altın değeri (€)", ar: "قيمة الذهب (€)", ms: "Nilai emas (€)" },
    "Silver value (€)": { tr: "Gümüş değeri (€)", ar: "قيمة الفضة (€)", ms: "Nilai perak (€)" },
    "Investments & receivables (€)": { tr: "Yatırımlar ve alacaklar (€)", ar: "الاستثمارات والمستحقّات (€)", ms: "Pelaburan & belum terima (€)" },
    "Short-term debts (€)": { tr: "Kısa vadeli borçlar (€)", ar: "الديون قصيرة الأجل (€)", ms: "Hutang jangka pendek (€)" },
    "Nisab threshold (€)": { tr: "Nisap eşiği (€)", ar: "حدّ النصاب (€)", ms: "Ambang nisab (€)" },
    "Net zakatable wealth": { tr: "Net zekâta tabi mal", ar: "صافي المال الزكوي", ms: "Harta bersih yang layak dizakat" },
    "Your Zakat (2.5%)": { tr: "Zekâtınız (%2,5)", ar: "زكاتك (2.5%)", ms: "Zakat anda (2.5%)" },
    "Zakat is 2.5% of net zakatable wealth held for one lunar year.": { tr: "Zekât, bir kameri yıl boyunca elde tutulan net zekâta tabi malın %2,5'idir.", ar: "الزكاة 2.5% من صافي المال الزكوي الذي حال عليه الحول.", ms: "Zakat ialah 2.5% daripada harta bersih yang layak dizakat yang dipegang selama satu tahun qamari." },
    "👉 Pay this Zakat": { tr: "👉 Bu zekâtı öde", ar: "👉 أدِّ هذه الزكاة", ms: "👉 Bayar Zakat ini" },
    "In short": { tr: "Kısacası", ar: "باختصار", ms: "Ringkasnya" },
    "From short-term aid to lasting liberation": { tr: "Kısa vadeli yardımdan kalıcı özgürleşmeye", ar: "من العون المؤقّت إلى التحرير الدائم", ms: "Daripada bantuan jangka pendek kepada pembebasan berkekalan" },
    "We don't distribute alms. We fulfil a divine duty — correctly, transparently and sustainably. From donation to system.": { tr: "Biz sadaka dağıtmıyoruz. İlahi bir görevi yerine getiriyoruz — doğru, şeffaf ve sürdürülebilir şekilde. Bağıştan sisteme.", ar: "نحن لا نوزّع صدقات. بل نؤدّي فريضةً إلهية — بشكل صحيح وشفّاف ومستدام. من التبرّع إلى النظام.", ms: "Kami tidak mengagihkan sedekah. Kami menunaikan kewajipan ilahi — dengan betul, telus dan lestari. Daripada derma kepada sistem." },
    "👉 Pay Zakat now": { tr: "👉 Şimdi zekât öde", ar: "👉 أدِّ الزكاة الآن", ms: "👉 Bayar Zakat sekarang" }
  });
  // ===== Inner-page translations (Fidya/Kaffara · Zakat al-Fitr · Eid) =====
  Object.assign(I18N, {
    "Make up what was missed — correctly": { tr: "Kaçırılanı telafi edin — doğru şekilde", ar: "اقضِ ما فاتك — بشكلٍ صحيح", ms: "Ganti apa yang tertinggal — dengan betul" },
    "When fasting cannot be made up, Fidya and Kaffara feed people in need. We calculate them correctly and carry them out transparently.": { tr: "Oruç tutulamadığında, Fidye ve Keffaret ihtiyaç sahiplerini doyurur. Bunları doğru hesaplar ve şeffaf şekilde yerine getiririz.", ar: "حين يتعذّر قضاء الصيام، تُطعِم الفدية والكفّارة المحتاجين. نحسبها بدقّة ونُنفّذها بشفافية.", ms: "Apabila puasa tidak dapat diganti, Fidyah dan Kaffarah memberi makan golongan memerlukan. Kami mengiranya dengan betul dan melaksanakannya secara telus." },
    "🧮 Calculate Fidya": { tr: "🧮 Fidye hesapla", ar: "🧮 احسب الفدية", ms: "🧮 Kira Fidyah" },
    "Fidya": { tr: "Fidye", ar: "الفدية", ms: "Fidyah" },
    "For every fasting day that cannot be made up (e.g. due to chronic illness or old age), one needy person is fed.": { tr: "Telafi edilemeyen her oruç günü için (ör. kronik hastalık veya ileri yaş nedeniyle) bir ihtiyaç sahibi doyurulur.", ar: "عن كل يوم صيام يتعذّر قضاؤه (مثلًا بسبب مرض مزمن أو كبر سنّ) يُطعَم مسكين واحد.", ms: "Bagi setiap hari puasa yang tidak dapat diganti (cth. kerana penyakit kronik atau usia tua), seorang yang memerlukan diberi makan." },
    "Kaffara": { tr: "Keffaret", ar: "الكفّارة", ms: "Kaffarah" },
    "Expiation for deliberately breaking a fast: 60 consecutive days of fasting — or, where not possible, feeding 60 people in need.": { tr: "Bir orucu kasten bozmanın keffareti: 60 gün aralıksız oruç — ya da mümkün olmadığında 60 ihtiyaç sahibini doyurmak.", ar: "كفّارة إفطار يومٍ عمدًا: صيام ستين يومًا متتابعة — أو إطعام ستين مسكينًا عند العجز.", ms: "Kaffarah kerana sengaja membatalkan puasa: berpuasa 60 hari berturut-turut — atau, jika tidak mampu, memberi makan 60 orang yang memerlukan." },
    "Transparent pricing": { tr: "Şeffaf fiyatlandırma", ar: "تسعير شفّاف", ms: "Penetapan harga telus" },
    "What your contribution covers": { tr: "Katkınız neyi karşılıyor", ar: "ماذا تُغطّي مساهمتك", ms: "Apa yang dilindungi oleh sumbangan anda" },
    "We base our prices on the real local cost of food. On top of the actual project price we add 20% organisation and implementation costs — used solely to deliver, monitor and document the help.": { tr: "Fiyatlarımızı yerel gıdanın gerçek maliyetine dayandırırız. Gerçek proje fiyatının üzerine %20 organizasyon ve uygulama maliyeti ekleriz — yalnızca yardımı ulaştırmak, izlemek ve belgelemek için kullanılır.", ar: "نحدّد أسعارنا بناءً على التكلفة المحلية الحقيقية للطعام. ونضيف فوق سعر المشروع الفعلي 20% تكاليف تنظيم وتنفيذ — تُستخدَم فقط لإيصال المساعدة ومتابعتها وتوثيقها.", ms: "Kami menetapkan harga berdasarkan kos sebenar makanan di tempatan. Di atas harga projek sebenar, kami menambah 20% kos organisasi dan pelaksanaan — digunakan semata-mata untuk menyampaikan, memantau dan mendokumentasikan bantuan." },
    "Meal on site": { tr: "Yerinde öğün", ar: "وجبة في الموقع", ms: "Hidangan di lokasi" },
    "Implementation (20%)": { tr: "Uygulama (%20)", ar: "التنفيذ (20%)", ms: "Pelaksanaan (20%)" },
    "Total per meal": { tr: "Öğün başına toplam", ar: "الإجمالي لكل وجبة", ms: "Jumlah setiap hidangan" },
    "This guarantees the full €6 reaches the person in need, while €1.20 makes reliable, transparent delivery possible.": { tr: "Bu, tam 6 €'nun ihtiyaç sahibine ulaşmasını garanti ederken, 1,20 € güvenilir ve şeffaf teslimatı mümkün kılar.", ar: "هذا يضمن وصول الـ6 € كاملة إلى المحتاج، بينما تجعل الـ1.20 € الإيصال موثوقًا وشفّافًا.", ms: "Ini menjamin €6 penuh sampai kepada yang memerlukan, manakala €1.20 membolehkan penyampaian yang boleh dipercayai dan telus." },
    "Fidya & Kaffara calculator": { tr: "Fidye & Keffaret hesaplayıcı", ar: "حاسبة الفدية والكفّارة", ms: "Kalkulator Fidyah & Kaffarah" },
    "Work out your contribution": { tr: "Katkınızı hesaplayın", ar: "احسب مساهمتك", ms: "Kira sumbangan anda" },
    "Enter the number of missed days (for Kaffara use 60) and how many people you want to feed per day. We'll calculate the total at €6 per meal plus 20% implementation.": { tr: "Kaçırılan gün sayısını (Keffaret için 60 girin) ve günde kaç kişiyi doyurmak istediğinizi girin. Toplamı öğün başına 6 € artı %20 uygulama olarak hesaplayacağız.", ar: "أدخل عدد الأيام الفائتة (للكفّارة استخدم 60) وكم شخصًا تريد إطعامه يوميًا. سنحسب الإجمالي بسعر 6 € للوجبة زائد 20% تنفيذ.", ms: "Masukkan bilangan hari yang tertinggal (untuk Kaffarah gunakan 60) dan berapa ramai orang ingin anda beri makan setiap hari. Kami akan mengira jumlah pada €6 setiap hidangan tambah 20% pelaksanaan." },
    "Number of days (Kaffara = 60)": { tr: "Gün sayısı (Keffaret = 60)", ar: "عدد الأيام (الكفّارة = 60)", ms: "Bilangan hari (Kaffarah = 60)" },
    "People fed per day": { tr: "Günde doyurulan kişi", ar: "عدد المُطعَمين يوميًا", ms: "Orang diberi makan setiap hari" },
    "Meals total": { tr: "Toplam öğün", ar: "إجمالي الوجبات", ms: "Jumlah hidangan" },
    "Your contribution (incl. 20%)": { tr: "Katkınız (%20 dâhil)", ar: "مساهمتك (شاملة 20%)", ms: "Sumbangan anda (termasuk 20%)" },
    "👉 Give this contribution": { tr: "👉 Bu katkıyı ver", ar: "👉 قدّم هذه المساهمة", ms: "👉 Beri sumbangan ini" },
    "Reliable, transparent, documented": { tr: "Güvenilir, şeffaf, belgelenmiş", ar: "موثوق وشفّاف وموثَّق", ms: "Boleh dipercayai, telus, didokumentasikan" },
    "Every distribution is recorded — so an obligation fulfilled also becomes real, traceable help.": { tr: "Her dağıtım kaydedilir — böylece yerine getirilen bir yükümlülük aynı zamanda gerçek, izlenebilir bir yardıma dönüşür.", ar: "كل توزيع يُسجَّل — فيصبح الواجب المُؤدّى أيضًا مساعدةً حقيقية قابلة للتتبّع.", ms: "Setiap pengagihan direkodkan — supaya kewajipan yang ditunaikan turut menjadi bantuan sebenar yang boleh dijejaki." },
    "Purify your fast before Eid": { tr: "Bayramdan önce orucunuzu arındırın", ar: "طهّر صيامك قبل العيد", ms: "Sucikan puasa anda sebelum Eid" },
    "Zakat al-Fitr is due for every member of the household and must reach those in need before the Eid prayer. We pass it on 100% — without deductions.": { tr: "Zekât-ül Fıtr, hanenin her bireyi için farzdır ve Bayram namazından önce ihtiyaç sahiplerine ulaşmalıdır. Onu %100 — kesintisiz — aktarırız.", ar: "زكاة الفطر واجبة عن كل فردٍ في البيت، ويجب أن تصل إلى المحتاجين قبل صلاة العيد. ونحن نُسلّمها 100% — دون اقتطاع.", ms: "Zakat Fitrah wajib bagi setiap ahli keluarga dan mesti sampai kepada golongan memerlukan sebelum solat Eid. Kami menyalurkannya 100% — tanpa potongan." },
    "👉 Give Zakat al-Fitr": { tr: "👉 Zekât-ül Fıtr ver", ar: "👉 أدِّ زكاة الفطر", ms: "👉 Beri Zakat Fitrah" },
    "For every person": { tr: "Her kişi için", ar: "عن كل شخص", ms: "Bagi setiap orang" },
    "Paid on behalf of every member of the household, including children — and even the unborn, if you wish.": { tr: "Hanenin her bireyi adına ödenir, çocuklar dâhil — ve isterseniz doğmamış çocuk için bile.", ar: "تُؤدّى عن كل فردٍ في البيت بمن فيهم الأطفال — وحتى الجنين إن شئت.", ms: "Dibayar bagi pihak setiap ahli keluarga, termasuk kanak-kanak — dan juga bayi dalam kandungan, jika anda mahu." },
    "Before the Eid prayer": { tr: "Bayram namazından önce", ar: "قبل صلاة العيد", ms: "Sebelum solat Eid" },
    "It must reach the needy in time. Give early so we can distribute it before Eid.": { tr: "İhtiyaç sahiplerine zamanında ulaşmalıdır. Bayramdan önce dağıtabilmemiz için erken verin.", ar: "يجب أن تصل إلى المحتاجين في وقتها. أدِّها مبكّرًا حتى نوزّعها قبل العيد.", ms: "Ia mesti sampai kepada yang memerlukan tepat pada masanya. Berikan awal supaya kami dapat mengagihkannya sebelum Eid." },
    "A measure of staple food": { tr: "Bir ölçek temel gıda", ar: "صاعٌ من القوت الأساسي", ms: "Secupak makanan asasi" },
    "Equivalent to one ṣāʿ of staple food per person — delivered as food where it is needed most.": { tr: "Kişi başına bir sâʿ temel gıdaya eşdeğer — en çok ihtiyaç duyulan yere gıda olarak ulaştırılır.", ar: "ما يعادل صاعًا واحدًا من القوت الأساسي لكل شخص — يُسلَّم طعامًا حيث تشتدّ الحاجة.", ms: "Bersamaan satu sa' makanan asasi bagi setiap orang — disampaikan sebagai makanan di tempat yang paling memerlukan." },
    "🌙 100% Donation Policy": { tr: "🌙 %100 Bağış Politikası", ar: "🌙 سياسة التبرّع 100%", ms: "🌙 Polisi Derma 100%" },
    "Your Zakat al-Fitr is passed on completely and without deductions to eligible recipients. To make this possible, you can cover the optional support contribution in the donation form — it funds organisation, coordination and documentation.": { tr: "Zekât-ül Fıtr'ınız hak sahiplerine eksiksiz ve kesintisiz aktarılır. Bunu mümkün kılmak için bağış formundaki isteğe bağlı destek katkısını üstlenebilirsiniz — organizasyon, koordinasyon ve belgelemeyi finanse eder.", ar: "تُسلَّم زكاة فطرك كاملةً ودون اقتطاع إلى المستحقّين. ولتيسير ذلك يمكنك تغطية مساهمة الدعم الاختيارية في نموذج التبرّع — وهي تموّل التنظيم والتنسيق والتوثيق.", ms: "Zakat Fitrah anda disalurkan sepenuhnya dan tanpa potongan kepada golongan yang berhak. Untuk memungkinkannya, anda boleh menanggung sumbangan sokongan pilihan dalam borang derma — ia membiayai organisasi, penyelarasan dan dokumentasi." },
    "Complete your Ramadan with justice": { tr: "Ramazanınızı adaletle tamamlayın", ar: "أكمِل رمضانك بالعدل", ms: "Lengkapkan Ramadan anda dengan keadilan" },
    "A small obligation with a great effect — joy on the day of Eid for those who have little.": { tr: "Küçük bir yükümlülük, büyük bir etki — az şeyi olanlar için Bayram gününde sevinç.", ar: "واجبٌ صغير ذو أثرٍ عظيم — فرحةٌ يوم العيد لمن لا يملكون إلا القليل.", ms: "Kewajipan kecil dengan kesan besar — kegembiraan pada Hari Raya bagi mereka yang serba kekurangan." },
    "❤ Give now": { tr: "❤ Şimdi ver", ar: "❤ أعطِ الآن", ms: "❤ Beri sekarang" },
    "Eid Gift 2026": { tr: "Bayram Hediyesi 2026", ar: "هدية العيد 2026", ms: "Hadiah Eid 2026" },
    "Let no child celebrate Eid empty-handed": { tr: "Hiçbir çocuk Bayramı eli boş geçirmesin", ar: "لا تدع طفلًا يحتفل بالعيد خالي اليدين", ms: "Jangan biarkan seorang anak menyambut Eid dengan tangan kosong" },
    "For many orphans and children in need, Eid passes like any other day. Your gift turns it into a celebration — new clothes, a present and a warm festive meal.": { tr: "Birçok yetim ve ihtiyaç sahibi çocuk için Bayram, sıradan bir gün gibi geçer. Hediyeniz onu bir kutlamaya dönüştürür — yeni kıyafetler, bir hediye ve sıcak bir bayram yemeği.", ar: "بالنسبة لكثير من الأيتام والأطفال المحتاجين، يمرّ العيد كأي يوم آخر. هديتك تحوّله إلى احتفال — ثياب جديدة وهدية ووجبة عيد دافئة.", ms: "Bagi ramai anak yatim dan anak yang memerlukan, Eid berlalu seperti hari biasa. Hadiah anda mengubahnya menjadi perayaan — pakaian baharu, sebuah hadiah dan hidangan raya yang hangat." },
    "👉 Give an Eid gift": { tr: "👉 Bayram hediyesi ver", ar: "👉 قدّم هدية العيد", ms: "👉 Beri hadiah Eid" },
    "New Eid clothes": { tr: "Yeni bayramlık kıyafetler", ar: "ثياب عيد جديدة", ms: "Pakaian Eid baharu" },
    "A new outfit so children can celebrate Eid with dignity and joy.": { tr: "Çocukların Bayramı onur ve sevinçle kutlayabilmesi için yeni bir kıyafet.", ar: "بدلةٌ جديدة ليحتفل الأطفال بالعيد بكرامةٍ وفرح.", ms: "Sepasang pakaian baharu supaya anak-anak dapat menyambut Eid dengan bermaruah dan gembira." },
    "A real gift": { tr: "Gerçek bir hediye", ar: "هديةٌ حقيقية", ms: "Hadiah yang sebenar" },
    "A small present chosen for the child — the joy every child deserves on Eid.": { tr: "Çocuk için seçilmiş küçük bir hediye — her çocuğun Bayramda hak ettiği sevinç.", ar: "هديةٌ صغيرة مختارة للطفل — الفرحة التي يستحقّها كل طفل في العيد.", ms: "Sebuah hadiah kecil yang dipilih untuk anak itu — kegembiraan yang setiap anak layak terima pada Eid." },
    "A festive meal": { tr: "Bir bayram yemeği", ar: "وجبة عيد", ms: "Hidangan raya" },
    "A warm, nourishing meal shared in community on the day of celebration.": { tr: "Kutlama gününde toplulukça paylaşılan sıcak, besleyici bir öğün.", ar: "وجبةٌ دافئة مغذّية تُتقاسَم جماعةً يوم الاحتفال.", ms: "Hidangan yang hangat dan berkhasiat dikongsi bersama komuniti pada hari perayaan." },
    "“The best of you are those who bring most benefit to others.”": { tr: "„İnsanların en hayırlısı, insanlara en çok faydası dokunandır.“", ar: "«خيرُكم أنفعُكم للناس»", ms: "„Sebaik-baik kamu ialah yang paling banyak memberi manfaat kepada orang lain.“" },
    "Be the reason a child smiles on Eid": { tr: "Bir çocuğun Bayramda gülümsemesinin sebebi olun", ar: "كُن سببًا في ابتسامة طفلٍ يوم العيد", ms: "Jadilah sebab seorang anak tersenyum pada Eid" },
    "Documented and delivered with care — your gift reaches a child who is waiting for it.": { tr: "Özenle belgelenir ve teslim edilir — hediyeniz onu bekleyen bir çocuğa ulaşır.", ar: "موثّقة ومُسلَّمة بعناية — هديتك تصل إلى طفلٍ ينتظرها.", ms: "Didokumentasikan dan disampaikan dengan teliti — hadiah anda sampai kepada anak yang menantikannya." },
    "❤ Give joy": { tr: "❤ Sevinç ver", ar: "❤ أهدِ الفرح", ms: "❤ Beri kegembiraan" }
  });
  // ===== Inner-page translations (Transparency · Contact) =====
  Object.assign(I18N, {
    "Through disclosure — not just a seal": { tr: "Sadece bir mühürle değil — açıklıkla", ar: "بالإفصاح — لا بمجرّد ختم", ms: "Melalui pendedahan — bukan sekadar cap" },
    "Faircharity e.V. is non-profit and not profit-oriented. Donations are used responsibly, transparently and for their stated purpose.": { tr: "Faircharity e.V. kâr amacı gütmeyen ve kâr odaklı olmayan bir kurumdur. Bağışlar sorumlu, şeffaf ve amacına uygun şekilde kullanılır.", ar: "Faircharity e.V. منظمة غير ربحية ولا تهدف إلى الربح. وتُستخدَم التبرّعات بمسؤولية وشفافية وللغرض المحدّد لها.", ms: "Faircharity e.V. ialah badan bukan untung dan tidak berorientasikan keuntungan. Derma digunakan secara bertanggungjawab, telus dan untuk tujuan yang dinyatakan." },
    "Many organisations use seals, certifications or external ratings to create trust. Such systems can help verify minimum standards and formal criteria — but they mostly assess structure and administration. They cannot always show how transparently projects are carried out in detail, or how help actually works on the ground.": { tr: "Birçok kuruluş güven oluşturmak için mühürler, sertifikalar ya da dış değerlendirmeler kullanır. Bu tür sistemler asgari standartları ve biçimsel ölçütleri doğrulamaya yardımcı olabilir — ancak çoğunlukla yapıyı ve yönetimi değerlendirir. Projelerin ayrıntıda ne kadar şeffaf yürütüldüğünü ya da yardımın sahada gerçekte nasıl işlediğini her zaman gösteremezler.", ar: "تستخدم كثير من المنظمات الأختام أو الشهادات أو التقييمات الخارجية لبناء الثقة. وهذه الأنظمة قد تساعد في التحقّق من الحدّ الأدنى من المعايير والمتطلّبات الشكلية — لكنها تقيّم غالبًا البنية والإدارة. وهي لا تستطيع دائمًا أن تُظهر مدى شفافية تنفيذ المشاريع تفصيلًا، أو كيف تعمل المساعدة فعليًا على الأرض.", ms: "Banyak organisasi menggunakan cap, pensijilan atau penarafan luar untuk membina kepercayaan. Sistem sedemikian boleh membantu mengesahkan standard minimum dan kriteria formal — tetapi kebanyakannya menilai struktur dan pentadbiran. Ia tidak selalu dapat menunjukkan betapa telusnya projek dilaksanakan secara terperinci, atau bagaimana bantuan benar-benar berfungsi di lapangan." },
    "That is why, for us, transparency must come not from a symbol or a logo, but from traceable information and open communication.": { tr: "İşte bu yüzden bizim için şeffaflık bir sembolden ya da logodan değil, izlenebilir bilgilerden ve açık iletişimden gelmelidir.", ar: "لذلك فإنّ الشفافية بالنسبة إلينا يجب ألّا تأتي من رمزٍ أو شعار، بل من معلوماتٍ قابلة للتتبّع وتواصلٍ مفتوح.", ms: "Itulah sebabnya bagi kami, ketelusan mesti datang bukan daripada simbol atau logo, tetapi daripada maklumat yang boleh dijejaki dan komunikasi terbuka." },
    "Clear and understandable cost structures.": { tr: "Açık ve anlaşılır maliyet yapıları.", ar: "هياكل تكاليف واضحة ومفهومة.", ms: "Struktur kos yang jelas dan mudah difahami." },
    "Traceable information on projects and distributions.": { tr: "Projeler ve dağıtımlar hakkında izlenebilir bilgiler.", ar: "معلومات قابلة للتتبّع عن المشاريع والتوزيعات.", ms: "Maklumat yang boleh dijejaki tentang projek dan pengagihan." },
    "Regular documentation of work on the ground.": { tr: "Sahadaki çalışmanın düzenli belgelenmesi.", ar: "توثيق منتظم للعمل على الأرض.", ms: "Dokumentasi berkala kerja di lapangan." },
    "Open communication about challenges and developments.": { tr: "Zorluklar ve gelişmeler hakkında açık iletişim.", ar: "تواصل مفتوح حول التحدّيات والمستجدّات.", ms: "Komunikasi terbuka tentang cabaran dan perkembangan." },
    "Our cost structure": { tr: "Maliyet yapımız", ar: "هيكل تكاليفنا", ms: "Struktur kos kami" },
    "Transparency also means talking openly about costs": { tr: "Şeffaflık aynı zamanda maliyetler hakkında açıkça konuşmak demektir", ar: "الشفافية تعني أيضًا التحدّث بصراحة عن التكاليف", ms: "Ketelusan juga bermaksud bercakap secara terbuka tentang kos" },
    "Zakat & Zakat al-Fitr": { tr: "Zekât & Zekât-ül Fıtr", ar: "الزكاة وزكاة الفطر", ms: "Zakat & Zakat Fitrah" },
    "A 100% Donation Policy: these are passed on completely and without deductions to eligible recipients. An optional support contribution in the form covers our work.": { tr: "%100 Bağış Politikası: bunlar hak sahiplerine eksiksiz ve kesintisiz aktarılır. Formdaki isteğe bağlı destek katkısı çalışmamızı karşılar.", ar: "سياسة التبرّع 100%: تُسلَّم كاملةً ودون اقتطاع إلى المستحقّين. وتغطّي مساهمة الدعم الاختيارية في النموذج عملنا.", ms: "Polisi Derma 100%: ini disalurkan sepenuhnya dan tanpa potongan kepada golongan yang berhak. Sumbangan sokongan pilihan dalam borang menampung kerja kami." },
    "Religious obligations": { tr: "Dini yükümlülükler", ar: "الفرائض الدينية", ms: "Kewajipan agama" },
    "Fidya, Kaffara, Aqiqa, Ramadan parcels & Eid gifts: real local price plus 20% organisation and implementation — so the full amount reaches the recipient.": { tr: "Fidye, Keffaret, Akika, Ramazan paketleri ve Bayram hediyeleri: gerçek yerel fiyat artı %20 organizasyon ve uygulama — böylece tam tutar alıcıya ulaşır.", ar: "الفدية والكفّارة والعقيقة وطرود رمضان وهدايا العيد: السعر المحلي الحقيقي زائد 20% تنظيم وتنفيذ — ليصل المبلغ كاملًا إلى المستحقّ.", ms: "Fidyah, Kaffarah, Akikah, bungkusan Ramadan & hadiah Eid: harga tempatan sebenar tambah 20% organisasi dan pelaksanaan — supaya jumlah penuh sampai kepada penerima." },
    "General donations": { tr: "Genel bağışlar", ar: "التبرّعات العامة", ms: "Derma umum" },
    "Administration and organisation costs of up to 25%, depending on project, infrastructure and effort.": { tr: "Projeye, altyapıya ve emeğe bağlı olarak %25'e kadar idari ve organizasyon maliyetleri.", ar: "تكاليف إدارة وتنظيم تصل إلى 25%، بحسب المشروع والبنية التحتية والجهد.", ms: "Kos pentadbiran dan organisasi sehingga 25%, bergantung pada projek, infrastruktur dan usaha." },
    "Example: Fidya": { tr: "Örnek: Fidye", ar: "مثال: الفدية", ms: "Contoh: Fidyah" },
    "Feeding one person on site:": { tr: "Yerinde bir kişinin doyurulması:", ar: "إطعام شخص واحد في الموقع:", ms: "Memberi makan seorang di lokasi:" },
    "Organisation & implementation (20%):": { tr: "Organizasyon ve uygulama (%20):", ar: "التنظيم والتنفيذ (20%):", ms: "Organisasi & pelaksanaan (20%):" },
    "Total per meal:": { tr: "Öğün başına toplam:", ar: "الإجمالي لكل وجبة:", ms: "Jumlah setiap hidangan:" },
    "📉 Our long-term goal": { tr: "📉 Uzun vadeli hedefimiz", ar: "📉 هدفنا بعيد المدى", ms: "📉 Matlamat jangka panjang kami" },
    "To reduce these costs step by step and sustainably to under 10% — without compromising transparency, control or the quality of the help. Sustainable aid needs working structures, reliable control and professional organisation.": { tr: "Bu maliyetleri adım adım ve sürdürülebilir şekilde %10'un altına indirmek — şeffaflıktan, denetimden ya da yardımın kalitesinden ödün vermeden. Sürdürülebilir yardım; işleyen yapılar, güvenilir denetim ve profesyonel organizasyon gerektirir.", ar: "خفض هذه التكاليف تدريجيًا وباستدامة إلى أقل من 10% — دون المساس بالشفافية أو الرقابة أو جودة المساعدة. فالمساعدة المستدامة تحتاج إلى بُنى فاعلة ورقابة موثوقة وتنظيم احترافي.", ms: "Mengurangkan kos ini langkah demi langkah dan secara lestari ke bawah 10% — tanpa menjejaskan ketelusan, kawalan atau kualiti bantuan. Bantuan lestari memerlukan struktur yang berfungsi, kawalan yang boleh dipercayai dan organisasi yang profesional." },
    "Real transparency exists when you do the right thing — even when no one is watching. We don't buy seals. We create trust through disclosure.": { tr: "Gerçek şeffaflık, kimse izlemese bile doğru olanı yaptığınızda vardır. Mühür satın almıyoruz. Güveni açıklıkla oluşturuyoruz.", ar: "الشفافية الحقيقية تكون حين تفعل الصواب — حتى وإن لم يراقبك أحد. نحن لا نشتري الأختام، بل نصنع الثقة بالإفصاح.", ms: "Ketelusan sebenar wujud apabila anda melakukan perkara yang betul — walaupun tiada siapa memerhati. Kami tidak membeli cap. Kami membina kepercayaan melalui pendedahan." },
    "Faircharity e.V. — honesty over labels": { tr: "Faircharity e.V. — etiket yerine dürüstlük", ar: "Faircharity e.V. — الصدق فوق الشعارات", ms: "Faircharity e.V. — kejujuran mengatasi label" },
    "No bought credibility, but responsibility before Allah and people.": { tr: "Satın alınmış güvenilirlik değil, Allah'a ve insanlara karşı sorumluluk.", ar: "لا مصداقية مشتراة، بل مسؤولية أمام الله والناس.", ms: "Bukan kredibiliti yang dibeli, tetapi tanggungjawab di hadapan Allah dan manusia." },
    "Let's talk": { tr: "Konuşalım", ar: "لنتحدّث", ms: "Mari berbual" },
    "Questions about donations, Zakat, sponsorships or membership? We answer personally — because trust starts with a conversation.": { tr: "Bağışlar, zekât, sponsorluklar ya da üyelik hakkında sorularınız mı var? Kişisel olarak yanıtlıyoruz — çünkü güven bir sohbetle başlar.", ar: "أسئلة حول التبرّعات أو الزكاة أو الكفالات أو العضوية؟ نُجيب شخصيًا — لأنّ الثقة تبدأ بحوار.", ms: "Soalan tentang derma, Zakat, penajaan atau keahlian? Kami menjawab secara peribadi — kerana kepercayaan bermula dengan perbualan." },
    "Reach us directly": { tr: "Bize doğrudan ulaşın", ar: "تواصل معنا مباشرةً", ms: "Hubungi kami secara terus" },
    "Email": { tr: "E-posta", ar: "البريد الإلكتروني", ms: "E-mel" },
    "Donation account": { tr: "Bağış hesabı", ar: "حساب التبرّعات", ms: "Akaun derma" },
    "See how we use every donation.": { tr: "Her bağışı nasıl kullandığımızı görün.", ar: "اطّلع على كيفية استخدامنا لكل تبرّع.", ms: "Lihat bagaimana kami menggunakan setiap derma." },
    "Name": { tr: "Ad", ar: "الاسم", ms: "Nama" },
    "Subject": { tr: "Konu", ar: "الموضوع", ms: "Subjek" },
    "General enquiry": { tr: "Genel sorgu", ar: "استفسار عام", ms: "Pertanyaan umum" },
    "Donation / receipt": { tr: "Bağış / makbuz", ar: "تبرّع / إيصال", ms: "Derma / resit" },
    "Membership (Fa(ir)mily)": { tr: "Üyelik (Fa(ir)mily)", ar: "العضوية (Fa(ir)mily)", ms: "Keahlian (Fa(ir)mily)" },
    "Message": { tr: "Mesaj", ar: "الرسالة", ms: "Mesej" },
    "How can we help you?": { tr: "Size nasıl yardımcı olabiliriz?", ar: "كيف يمكننا مساعدتك؟", ms: "Bagaimana kami boleh membantu anda?" },
    "Send message": { tr: "Mesaj gönder", ar: "أرسل الرسالة", ms: "Hantar mesej" },
    "This demo form does not send data. Connect it to your email service or a form provider before going live.": { tr: "Bu demo form veri göndermez. Yayına almadan önce e-posta hizmetinize ya da bir form sağlayıcıya bağlayın.", ar: "هذا النموذج التجريبي لا يُرسل بيانات. اربطه بخدمة بريدك الإلكتروني أو بمزوّد نماذج قبل النشر.", ms: "Borang demo ini tidak menghantar data. Sambungkannya ke perkhidmatan e-mel anda atau penyedia borang sebelum disiarkan." },
    "Thank you! 🌙": { tr: "Teşekkürler! 🌙", ar: "شكرًا لك! 🌙", ms: "Terima kasih! 🌙" },
    "Your message has been recorded (demo). We'll get back to you as soon as possible.": { tr: "Mesajınız kaydedildi (demo). En kısa sürede size geri döneceğiz.", ar: "تم تسجيل رسالتك (نسخة تجريبية). سنردّ عليك في أقرب وقت ممكن.", ms: "Mesej anda telah direkodkan (demo). Kami akan menghubungi anda secepat mungkin." }
  });
  // ===== Inner-page translations (Imprint · Privacy · Donate) =====
  Object.assign(I18N, {
    "Imprint": { tr: "Künye", ar: "بيانات النشر", ms: "Maklumat Penerbit" },
    "Information pursuant to § 5 DDG (German Digital Services Act).": { tr: "§ 5 DDG (Alman Dijital Hizmetler Yasası) uyarınca bilgiler.", ar: "بيانات وفقًا للمادة 5 من قانون الخدمات الرقمية الألماني (DDG).", ms: "Maklumat menurut § 5 DDG (Akta Perkhidmatan Digital Jerman)." },
    "Note for the site owner:": { tr: "Site sahibine not:", ar: "ملاحظة لمالك الموقع:", ms: "Nota untuk pemilik laman:" },
    "Please replace the placeholders below ([ … ]) with your registered association details before going live.": { tr: "Lütfen yayına almadan önce aşağıdaki yer tutucuları ([ … ]) tescilli dernek bilgilerinizle değiştirin.", ar: "يرجى استبدال العناصر النائبة أدناه ([ … ]) ببيانات جمعيتك المسجّلة قبل النشر.", ms: "Sila gantikan ruang letak di bawah ([ … ]) dengan butiran persatuan berdaftar anda sebelum disiarkan." },
    "Provider": { tr: "Hizmet sağlayıcı", ar: "مزوّد الخدمة", ms: "Penyedia" },
    "Represented by": { tr: "Temsil eden", ar: "يمثّلها", ms: "Diwakili oleh" },
    "Board (§ 26 BGB): [ First & last names of the board ]": { tr: "Yönetim Kurulu (§ 26 BGB): [ Yönetim kurulunun ad ve soyadları ]", ar: "المجلس (§ 26 BGB): [ الأسماء الأولى والعائلية لأعضاء المجلس ]", ms: "Lembaga (§ 26 BGB): [ Nama penuh ahli lembaga ]" },
    "Register entry": { tr: "Sicil kaydı", ar: "قيد السجلّ", ms: "Catatan pendaftaran" },
    "Entry in the register of associations. Register court: [ Amtsgericht ] · Register number: [ VR … ]": { tr: "Dernekler siciline kayıt. Sicil mahkemesi: [ Amtsgericht ] · Sicil numarası: [ VR … ]", ar: "قيد في سجلّ الجمعيات. محكمة السجلّ: [ Amtsgericht ] · رقم السجلّ: [ VR … ]", ms: "Catatan dalam daftar persatuan. Mahkamah pendaftaran: [ Amtsgericht ] · Nombor pendaftaran: [ VR … ]" },
    "Non-profit status": { tr: "Kamu yararına statüsü", ar: "صفة المنفعة العامة", ms: "Status bukan untung" },
    "Recognised as non-profit by the tax office [ Finanzamt ], tax number [ … ]. Donation receipts can be issued.": { tr: "[ Finanzamt ] vergi dairesi tarafından kamu yararına olarak tanınmıştır, vergi numarası [ … ]. Bağış makbuzları düzenlenebilir.", ar: "معترَفٌ بها كمنظمة منفعة عامة من مكتب الضرائب [ Finanzamt ]، الرقم الضريبي [ … ]. ويمكن إصدار إيصالات التبرّع.", ms: "Diiktiraf sebagai badan bukan untung oleh pejabat cukai [ Finanzamt ], nombor cukai [ … ]. Resit derma boleh dikeluarkan." },
    "Responsible for content (§ 18 MStV)": { tr: "İçerikten sorumlu (§ 18 MStV)", ar: "المسؤول عن المحتوى (§ 18 MStV)", ms: "Bertanggungjawab ke atas kandungan (§ 18 MStV)" },
    "EU dispute resolution": { tr: "AB uyuşmazlık çözümü", ar: "تسوية النزاعات في الاتحاد الأوروبي", ms: "Penyelesaian pertikaian EU" },
    "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. We are not obliged and not willing to take part in dispute resolution proceedings before a consumer arbitration board.": { tr: "Avrupa Komisyonu, çevrim içi uyuşmazlık çözümü (ODR) için bir platform sunar: https://ec.europa.eu/consumers/odr/. Bir tüketici tahkim kurulu önünde uyuşmazlık çözüm sürecine katılmak zorunda değiliz ve katılmaya istekli de değiliz.", ar: "توفّر المفوضية الأوروبية منصّة لتسوية النزاعات عبر الإنترنت (ODR): https://ec.europa.eu/consumers/odr/. ولسنا ملزَمين ولا راغبين في المشاركة في إجراءات تسوية النزاعات أمام هيئة تحكيم للمستهلكين.", ms: "Suruhanjaya Eropah menyediakan platform penyelesaian pertikaian dalam talian (ODR): https://ec.europa.eu/consumers/odr/. Kami tidak diwajibkan dan tidak bersedia untuk menyertai prosiding penyelesaian pertikaian di hadapan lembaga timbang tara pengguna." },
    "Liability for content": { tr: "İçerik sorumluluğu", ar: "المسؤولية عن المحتوى", ms: "Liabiliti kandungan" },
    "As a service provider we are responsible for our own content on these pages according to general laws. We are not obliged to monitor transmitted or stored third-party information.": { tr: "Hizmet sağlayıcı olarak bu sayfalardaki kendi içeriğimizden genel yasalara göre sorumluyuz. İletilen ya da saklanan üçüncü taraf bilgilerini denetlemekle yükümlü değiliz.", ar: "بصفتنا مزوّد خدمة، نحن مسؤولون عن محتوانا الخاص على هذه الصفحات وفقًا للقوانين العامة. ولسنا ملزَمين بمراقبة معلومات الغير المنقولة أو المخزَّنة.", ms: "Sebagai penyedia perkhidmatan, kami bertanggungjawab ke atas kandungan kami sendiri di halaman ini menurut undang-undang am. Kami tidak diwajibkan memantau maklumat pihak ketiga yang dihantar atau disimpan." },
    "Privacy Policy": { tr: "Gizlilik Politikası", ar: "سياسة الخصوصية", ms: "Dasar Privasi" },
    "How we handle your data in accordance with the GDPR.": { tr: "Verilerinizi GDPR'ye uygun olarak nasıl ele aldığımız.", ar: "كيف نتعامل مع بياناتك وفقًا للائحة العامة لحماية البيانات (GDPR).", ms: "Cara kami mengendalikan data anda menurut GDPR." },
    "This is a clear baseline template. Have it reviewed and completed (hosting provider, form/email processor, analytics) by a data-protection professional before going live.": { tr: "Bu, anlaşılır bir temel şablondur. Yayına almadan önce bir veri koruma uzmanına gözden geçirtin ve tamamlatın (barındırma sağlayıcısı, form/e-posta işleyici, analiz).", ar: "هذا قالب أساسي واضح. اعرضه على مختصّ في حماية البيانات لمراجعته وإكماله (مزوّد الاستضافة، معالج النماذج/البريد، التحليلات) قبل النشر.", ms: "Ini ialah templat asas yang jelas. Minta ia disemak dan dilengkapkan (penyedia pengehosan, pemproses borang/e-mel, analitis) oleh profesional perlindungan data sebelum disiarkan." },
    "1. Responsible party": { tr: "1. Sorumlu taraf", ar: "1. الجهة المسؤولة", ms: "1. Pihak bertanggungjawab" },
    "See also our": { tr: "Ayrıca bkz.", ar: "انظر أيضًا", ms: "Lihat juga" },
    "2. Data on visiting the website": { tr: "2. Web sitesini ziyaret sırasında veriler", ar: "2. البيانات عند زيارة الموقع", ms: "2. Data semasa melawat laman web" },
    "When you access our pages, the hosting provider's server automatically stores access data (e.g. IP address, date and time, browser) in server log files. This is necessary for secure operation and is based on our legitimate interest (Art. 6(1)(f) GDPR).": { tr: "Sayfalarımıza eriştiğinizde, barındırma sağlayıcısının sunucusu erişim verilerini (ör. IP adresi, tarih ve saat, tarayıcı) otomatik olarak sunucu günlük dosyalarında saklar. Bu, güvenli çalışma için gereklidir ve meşru menfaatimize dayanır (GDPR Md. 6(1)(f)).", ar: "عند الوصول إلى صفحاتنا، يخزّن خادم مزوّد الاستضافة تلقائيًا بيانات الوصول (مثل عنوان IP والتاريخ والوقت والمتصفّح) في ملفّات سجلّ الخادم. وهذا ضروري للتشغيل الآمن ويستند إلى مصلحتنا المشروعة (المادة 6(1)(و) من GDPR).", ms: "Apabila anda mengakses halaman kami, pelayan penyedia pengehosan secara automatik menyimpan data akses (cth. alamat IP, tarikh dan masa, pelayar) dalam fail log pelayan. Ini perlu untuk operasi yang selamat dan berdasarkan kepentingan sah kami (Perkara 6(1)(f) GDPR)." },
    "3. Contact form": { tr: "3. İletişim formu", ar: "3. نموذج الاتصال", ms: "3. Borang hubungi" },
    "If you contact us, we process the data you provide (name, email, message) solely to handle your request (Art. 6(1)(b) and (f) GDPR). The demo form on this site does not transmit data until connected to an email or form service.": { tr: "Bizimle iletişime geçerseniz, sağladığınız verileri (ad, e-posta, mesaj) yalnızca talebinizi işleme almak için işleriz (GDPR Md. 6(1)(b) ve (f)). Bu sitedeki demo form, bir e-posta ya da form hizmetine bağlanana kadar veri iletmez.", ar: "إذا تواصلت معنا، فإننا نعالج البيانات التي تقدّمها (الاسم، البريد الإلكتروني، الرسالة) لمعالجة طلبك فقط (المادة 6(1)(ب) و(و) من GDPR). والنموذج التجريبي على هذا الموقع لا ينقل بيانات حتى يُربَط بخدمة بريد أو نماذج.", ms: "Jika anda menghubungi kami, kami memproses data yang anda berikan (nama, e-mel, mesej) semata-mata untuk mengendalikan permintaan anda (Perkara 6(1)(b) dan (f) GDPR). Borang demo di laman ini tidak menghantar data sehingga disambungkan ke perkhidmatan e-mel atau borang." },
    "4. Donations": { tr: "4. Bağışlar", ar: "4. التبرّعات", ms: "4. Derma" },
    "For donations and donation receipts we process the data required for processing and for tax/legal documentation. Payment is handled by your bank or the linked donation provider (e.g. Twingle) under their own privacy terms.": { tr: "Bağışlar ve bağış makbuzları için, işleme ve vergi/hukuki belgeleme için gereken verileri işleriz. Ödeme, bankanız ya da bağlı bağış sağlayıcısı (ör. Twingle) tarafından kendi gizlilik koşulları kapsamında gerçekleştirilir.", ar: "بالنسبة للتبرّعات وإيصالاتها، نعالج البيانات اللازمة للمعالجة وللتوثيق الضريبي/القانوني. وتتمّ المدفوعات عبر بنكك أو مزوّد التبرّع المرتبط (مثل Twingle) وفق شروط الخصوصية الخاصة بهم.", ms: "Untuk derma dan resit derma, kami memproses data yang diperlukan untuk pemprosesan dan dokumentasi cukai/undang-undang. Pembayaran dikendalikan oleh bank anda atau penyedia derma yang dipaut (cth. Twingle) di bawah terma privasi mereka sendiri." },
    "5. Local storage (language setting)": { tr: "5. Yerel depolama (dil ayarı)", ar: "5. التخزين المحلي (إعداد اللغة)", ms: "5. Storan setempat (tetapan bahasa)" },
    "This website stores your chosen language (DE/EN) in your browser's local storage. This information stays on your device and is not transmitted to us.": { tr: "Bu web sitesi, seçtiğiniz dili tarayıcınızın yerel deposunda saklar. Bu bilgi cihazınızda kalır ve bize iletilmez.", ar: "يخزّن هذا الموقع لغتك المختارة في التخزين المحلي لمتصفّحك. وتبقى هذه المعلومة على جهازك ولا تُنقَل إلينا.", ms: "Laman web ini menyimpan bahasa pilihan anda dalam storan setempat pelayar anda. Maklumat ini kekal pada peranti anda dan tidak dihantar kepada kami." },
    "6. Fonts": { tr: "6. Yazı tipleri", ar: "6. الخطوط", ms: "6. Fon" },
    "This template loads web fonts from Google Fonts. For maximum data protection, host the fonts locally before going live to avoid contacting Google servers.": { tr: "Bu şablon, web yazı tiplerini Google Fonts'tan yükler. Maksimum veri koruması için, Google sunucularıyla bağlantıyı önlemek amacıyla yayına almadan önce yazı tiplerini yerel olarak barındırın.", ar: "يحمّل هذا القالب خطوط الويب من Google Fonts. ولأقصى حماية للبيانات، استضِف الخطوط محليًا قبل النشر لتجنّب الاتصال بخوادم Google.", ms: "Templat ini memuatkan fon web daripada Google Fonts. Untuk perlindungan data maksimum, hoskan fon secara setempat sebelum disiarkan bagi mengelakkan hubungan dengan pelayan Google." },
    "7. Your rights": { tr: "7. Haklarınız", ar: "7. حقوقك", ms: "7. Hak anda" },
    "You have the right to information, correction, deletion, restriction of processing, data portability and objection, and the right to lodge a complaint with a supervisory authority. To exercise them, contact us at the address above.": { tr: "Bilgi alma, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve itiraz hakkına ve bir denetim makamına şikâyette bulunma hakkına sahipsiniz. Bunları kullanmak için yukarıdaki adresten bize ulaşın.", ar: "لك الحق في الاطّلاع والتصحيح والحذف وتقييد المعالجة ونقل البيانات والاعتراض، والحق في تقديم شكوى إلى جهة رقابية. ولممارسة هذه الحقوق تواصل معنا على العنوان أعلاه.", ms: "Anda berhak mendapat maklumat, pembetulan, pemadaman, sekatan pemprosesan, kemudahalihan data dan bantahan, serta hak untuk membuat aduan kepada pihak berkuasa penyeliaan. Untuk melaksanakannya, hubungi kami di alamat di atas." },
    "The giving hand is better than the receiving one": { tr: "Veren el alan elden üstündür", ar: "اليد العليا خيرٌ من اليد السفلى", ms: "Tangan yang memberi lebih baik daripada tangan yang menerima" },
    "With your donation you support sustainable projects in education, water, supply and social care. Every gift helps us reach people in need and build lasting structures.": { tr: "Bağışınızla eğitim, su, gıda ve sosyal destek alanlarındaki sürdürülebilir projeleri desteklersiniz. Her bağış, ihtiyaç sahiplerine ulaşmamıza ve kalıcı yapılar kurmamıza yardımcı olur.", ar: "بتبرّعك تدعم مشاريع مستدامة في التعليم والماء والإمداد والرعاية الاجتماعية. وكل عطاء يساعدنا على الوصول إلى المحتاجين وبناء بُنى دائمة.", ms: "Dengan derma anda, anda menyokong projek lestari dalam pendidikan, air, bekalan dan penjagaan sosial. Setiap pemberian membantu kami menyantuni golongan memerlukan dan membina struktur yang berkekalan." },
    "Open a project below to donate online by SEPA direct debit, PayPal or credit card — or use a bank transfer with the matching reference code so we can assign your donation correctly.": { tr: "Çevrim içi olarak SEPA otomatik ödeme, PayPal ya da kredi kartıyla bağış yapmak için aşağıdan bir proje açın — ya da bağışınızı doğru atayabilmemiz için uygun açıklama koduyla havale yapın.", ar: "افتح مشروعًا أدناه للتبرّع عبر الإنترنت بالخصم المباشر SEPA أو PayPal أو بطاقة الائتمان — أو استخدم تحويلًا بنكيًا مع رمز الغرض المطابق حتى نتمكّن من نسبة تبرّعك بشكل صحيح.", ms: "Buka satu projek di bawah untuk menderma dalam talian melalui debit terus SEPA, PayPal atau kad kredit — atau guna pindahan bank dengan kod rujukan yang sepadan supaya kami dapat menetapkan derma anda dengan betul." },
    "May Allah accept every contribution and reward it manyfold. 🌙": { tr: "Allah her katkıyı kabul etsin ve kat kat mükâfatlandırsın. 🌙", ar: "تقبّل الله كل مساهمة وأجزل بها الأجر. 🌙", ms: "Semoga Allah menerima setiap sumbangan dan memberi ganjaran berlipat ganda. 🌙" },
    "🏦 Bank details (all projects)": { tr: "🏦 Banka bilgileri (tüm projeler)", ar: "🏦 بيانات الحساب البنكي (لجميع المشاريع)", ms: "🏦 Butiran bank (semua projek)" },
    "Please always add the reference code shown for each project.": { tr: "Lütfen her proje için gösterilen açıklama kodunu daima ekleyin.", ar: "يرجى دائمًا إضافة رمز الغرض الموضّح لكل مشروع.", ms: "Sila sentiasa tambah kod rujukan yang ditunjukkan bagi setiap projek." },
    "For Fidya & Kaffara, please donate by bank transfer using the reference “F&K”. You can also calculate your exact amount on the Fidya & Kaffara page.": { tr: "Fidye & Keffaret için lütfen „F&K“ açıklamasıyla havale yaparak bağış yapın. Tam tutarınızı Fidye & Keffaret sayfasında da hesaplayabilirsiniz.", ar: "للفدية والكفّارة، يرجى التبرّع عبر تحويل بنكي باستخدام الغرض «F&K». ويمكنك أيضًا حساب مبلغك الدقيق في صفحة الفدية والكفّارة.", ms: "Untuk Fidyah & Kaffarah, sila derma melalui pindahan bank menggunakan rujukan „F&K“. Anda juga boleh mengira jumlah tepat anda di halaman Fidyah & Kaffarah." },
    "Online donations are processed securely by Twingle. Faircharity e.V. is non-profit; donation receipts are available on request.": { tr: "Çevrim içi bağışlar Twingle tarafından güvenli şekilde işlenir. Faircharity e.V. kâr amacı gütmez; bağış makbuzları talep üzerine sunulur.", ar: "تُعالَج التبرّعات عبر الإنترنت بأمان من خلال Twingle. وFaircharity e.V. منظمة غير ربحية؛ وإيصالات التبرّع متاحة عند الطلب.", ms: "Derma dalam talian diproses dengan selamat oleh Twingle. Faircharity e.V. ialah badan bukan untung; resit derma tersedia atas permintaan." }
  });
  // PT-END

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
