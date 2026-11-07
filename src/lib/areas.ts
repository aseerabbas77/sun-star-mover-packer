import type { Locale } from "@/i18n/config";

export type Area = {
  slug: string;
  name: Record<Locale, string>;
  city: Record<Locale, string>;
  note: Record<Locale, string>;
  nearby: string[];
};

export const areas: Area[] = [
  // Dubai Areas
  {
    slug: "dubai-marina",
    name: { en: "Dubai Marina", ar: "دبي مارينا" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "High-rise luxury tower relocation in Dubai Marina requires move-in permits, elevator reservations, and precision wrapping. Our team handles every detail seamlessly.",
      ar: "يتطلب نقل الأثاث في أبراج دبي مارينا الفاخرة تصاريح دخول وحجز مصاعد وتغليفاً فائق الدقة. يتولى فريقنا كل التفاصيل بكفاءة واحترافية.",
    },
    nearby: ["jbr", "jlt", "palm-jumeirah", "business-bay"],
  },
  {
    slug: "downtown-dubai",
    name: { en: "Downtown Dubai", ar: "داون تاون دبي" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Premium residential and corporate moving in Downtown Dubai near Burj Khalifa, executed with utmost care and zero disruption.",
      ar: "نقل سكني وتجاري فاخر في داون تاون دبي بالقرب من برج خليفة، يتم بعناية فائقة وبأعلى معايير الأمان ودون أي إزعاج.",
    },
    nearby: ["business-bay", "difc", "dubai-marina", "al-barsha"],
  },
  {
    slug: "business-bay",
    name: { en: "Business Bay", ar: "الخليج التجاري دبي" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Fast-paced apartment moves and office relocations in Business Bay, completed with dedicated fleet and master carpenters.",
      ar: "نقل سريع لشقق ومكاتب الخليج التجاري في دبي، يتم بأسطول شاحنات مجهز ونجارين محترفين لفك وتركيب كافة أنواع الأثاث.",
    },
    nearby: ["downtown-dubai", "difc", "dubai-marina", "jumeirah"],
  },
  {
    slug: "jumeirah",
    name: { en: "Jumeirah", ar: "جميرا دبي" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Luxury villa packing and moving across Jumeirah 1, 2, 3 and Jumeirah Islands with specialized furniture protection blankets and bubble rolls.",
      ar: "نقل وتغليف فلل فاخرة في جميرا 1، 2، 3 وجزر جميرا بأفضل بطانيات حماية الأثاث ولفائف الفقاعات المقاومة للصدمات.",
    },
    nearby: ["umm-suqeim", "downtown-dubai", "dubai-marina", "al-barsha"],
  },
  {
    slug: "palm-jumeirah",
    name: { en: "Palm Jumeirah", ar: "نخلة جميرا" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Exclusive beachfront villa and penthouse relocation on Palm Jumeirah with white-glove packing, antique care, and curtain installation.",
      ar: "خدمات نقل فلل وشقق البنتهاوس الراقية في نخلة جميرا بتغليف فاخر وعناية خاصة بالتحف وتركيب الستائر والشاشات.",
    },
    nearby: ["dubai-marina", "jbr", "al-barsha", "jumeirah"],
  },
  {
    slug: "al-barsha",
    name: { en: "Al Barsha", ar: "البرشاء دبي" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Family apartment and villa moving in Al Barsha 1, 2, 3 and Barsha South with same-day delivery and full unpacking services.",
      ar: "نقل فلل وشقق عائلية في البرشاء 1 و2 و3 والبرشاء جنوب مع تسليم في نفس اليوم وخدمات تفريغ وترتيب كاملة.",
    },
    nearby: ["jvc", "dubai-marina", "jumeirah", "business-bay"],
  },
  {
    slug: "jvc-jumeirah-village-circle",
    name: { en: "JVC (Jumeirah Village Circle)", ar: "قرية جميرا الدائرية (JVC)" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Affordable and fast shifting for modern townhouses and apartments in JVC and JVT with skilled carpentry and elevator coordination.",
      ar: "نقل اقتصادي وسريع لشقق وتاون هاوس قرية جميرا الدائرية ومثلث قرية جميرا مع نجارين مهرة وتنسيق المصاعد.",
    },
    nearby: ["al-barsha", "motor-city", "dubai-sports-city", "dubai-marina"],
  },
  {
    slug: "deira-bur-dubai",
    name: { en: "Deira & Bur Dubai", ar: "ديرة وبر دبي" },
    city: { en: "Dubai", ar: "دبي" },
    note: {
      en: "Reliable moving services in historic central Dubai, navigating busy avenues with enclosed, permit-ready moving vehicles.",
      ar: "خدمات نقل موثوقة في وسط دبي القديمة والتاريخية، مع سيارات نقل مغلقة ومجهزة تناسب كافة الشوارع والمباني.",
    },
    nearby: ["al-nahda-sharjah", "downtown-dubai", "business-bay", "ras-al-khor"],
  },

  // Sharjah Areas
  {
    slug: "muwaileh-sharjah",
    name: { en: "Muwaileh Sharjah", ar: "مويلح الشارقة" },
    city: { en: "Sharjah", ar: "الشارقة" },
    note: {
      en: "Immediate response moving services in Muwaileh Commercial, University City, and surrounding neighborhoods with zero delays.",
      ar: "خدمات نقل فورية وسريعة في مويلح التجارية والمدينة الجامعية والمناطق المجاورة بأعلى كفاءة وسرعة استجابة.",
    },
    nearby: ["al-nahda-sharjah", "al-majaz-sharjah", "al-taawun-sharjah", "al-bustan-ajman"],
  },
  {
    slug: "al-nahda-sharjah",
    name: { en: "Al Nahda Sharjah", ar: "النهدة الشارقة" },
    city: { en: "Sharjah", ar: "الشارقة" },
    note: {
      en: "Seamless inter-emirate relocation between Al Nahda Sharjah and Dubai with fast gate-pass support and professional furniture assembly.",
      ar: "نقل سلس بين النهدة الشارقة ودبي، مع دعم تصاريح الدخول وفك وتركيب غرف النوم والأثاث باحتراف.",
    },
    nearby: ["al-taawun-sharjah", "muwaileh-sharjah", "al-majaz-sharjah", "deira-bur-dubai"],
  },
  {
    slug: "al-majaz-sharjah",
    name: { en: "Al Majaz Sharjah", ar: "المجاز الشارقة" },
    city: { en: "Sharjah", ar: "الشارقة" },
    note: {
      en: "Expert waterfront apartment moving along Buhaira Corniche and Al Majaz 1, 2, 3 with heavy-duty cartons and mattress protection.",
      ar: "نقل شقق متميز على كورنيش البحيرة والمجاز 1 و2 و3 بكراتين متينة وتغليف خاص للمراتب والأثاث الحساس.",
    },
    nearby: ["al-taawun-sharjah", "al-qasimia-sharjah", "muwaileh-sharjah", "al-nahda-sharjah"],
  },
  {
    slug: "al-taawun-sharjah",
    name: { en: "Al Taawun Sharjah", ar: "التعاون الشارقة" },
    city: { en: "Sharjah", ar: "الشارقة" },
    note: {
      en: "Fast and stress-free residential shifting in Al Taawun tower buildings, complete with expert drill technicians for curtains and wall TVs.",
      ar: "نقل سكني مريح وسريع في أبراج منطقة التعاون، مع فنيين لتركيب الستائر والشاشات الجدارية واللوحات بدقة.",
    },
    nearby: ["al-nahda-sharjah", "al-majaz-sharjah", "muwaileh-sharjah", "deira-bur-dubai"],
  },

  // Ajman Areas
  {
    slug: "al-bustan-ajman",
    name: { en: "Al Bustan Ajman", ar: "البستان عجمان" },
    city: { en: "Ajman", ar: "عجمان" },
    note: {
      en: "Economical and prompt furniture moving in Al Bustan and central Ajman with experienced packers and enclosed trucks.",
      ar: "نقل أثاث اقتصادي وسريع في منطقة البستان ووسط عجمان بفريق متمرس وشاحنات نقل مغلقة ونظيفة.",
    },
    nearby: ["al-rashidiya-ajman", "al-nuaimiya-ajman", "muwaileh-sharjah", "ajman-corniche"],
  },
  {
    slug: "al-nuaimiya-ajman",
    name: { en: "Al Nuaimiya Ajman", ar: "النعيمية عجمان" },
    city: { en: "Ajman", ar: "عجمان" },
    note: {
      en: "Trusted home and villa relocation across Al Nuaimiya 1, 2, 3 with complete dismantling, wrapping, and prompt delivery.",
      ar: "نقل منازل وفلل موثوق في النعيمية 1 و2 و3 مع فك وتغليف احترافي ونقل سريع في نفس اليوم.",
    },
    nearby: ["al-rashidiya-ajman", "al-bustan-ajman", "al-nahda-sharjah", "muwaileh-sharjah"],
  },

  // Abu Dhabi & Al Ain Areas
  {
    slug: "khalifa-city-abu-dhabi",
    name: { en: "Khalifa City Abu Dhabi", ar: "مدينة خليفة أبوظبي" },
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    note: {
      en: "Spacious family villa relocation in Khalifa City A and Shakhbout City with dedicated heavy lifting and furniture assembly.",
      ar: "نقل فلل عائلية واسعة في مدينة خليفة أ ومدينة شخبوط مع عمالة مدربة على رفع الأثاث الثقيل وتركيبه باحتراف.",
    },
    nearby: ["al-reem-island-abu-dhabi", "yas-island-abu-dhabi", "al-shahama-abu-dhabi", "al-ain"],
  },
  {
    slug: "al-reem-island-abu-dhabi",
    name: { en: "Al Reem Island Abu Dhabi", ar: "جزيرة الريم أبوظبي" },
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    note: {
      en: "Tower apartment moves in Shams Abu Dhabi and Marina Square with elevator lining, security clearance, and bubble protection.",
      ar: "نقل شقق الأبراج في شمس أبوظبي ومارينا سكوير مع تبطين المصاعد وتنسيق الأمن وتغليف الفقاعات المقاوم للصدمات.",
    },
    nearby: ["yas-island-abu-dhabi", "khalifa-city-abu-dhabi", "al-bateen-abu-dhabi", "downtown-dubai"],
  },
  {
    slug: "yas-island-abu-dhabi",
    name: { en: "Yas Island Abu Dhabi", ar: "جزيرة ياس أبوظبي" },
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    note: {
      en: "High-end villa and townhouse moving in Yas Acres, West Yas, and Water's Edge with master carpentry for luxury furnishings.",
      ar: "نقل فلل ومنازل تاون هاوس راقية في ياس ايكرز ووست ياس وووترز ايدج مع نجارين خبراء بالأثاث الإيطالي والأوروبي.",
    },
    nearby: ["al-reem-island-abu-dhabi", "khalifa-city-abu-dhabi", "al-shahama-abu-dhabi", "dubai-marina"],
  },
  {
    slug: "al-ain",
    name: { en: "Al Ain (The Garden City)", ar: "مدينة العين" },
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    note: {
      en: "Comprehensive long-distance moving between Al Ain, Dubai, Sharjah, and Abu Dhabi with padded trucks and furniture tracking.",
      ar: "نقل مسافات طويلة بين العين ودبي والشارقة وأبوظبي بشاحنات مغلقة ومبطنة تضمن وصول كل قطعة بأمان تام.",
    },
    nearby: ["khalifa-city-abu-dhabi", "muwaileh-sharjah", "dubai-marina", "al-shahama-abu-dhabi"],
  },

  // Northern Emirates (RAK, Fujairah, UAQ)
  {
    slug: "ras-al-khaimah",
    name: { en: "Ras Al Khaimah (RAK)", ar: "رأس الخيمة" },
    city: { en: "Ras Al Khaimah", ar: "رأس الخيمة" },
    note: {
      en: "Full villa, apartment, and hotel relocation across Al Hamra Village, Mina Al Arab, and central RAK with complete packing.",
      ar: "خدمات نقل شاملة للفلل والشقق والفنادق في قرية الحمراء وميناء العرب ووسط رأس الخيمة مع تغليف متكامل.",
    },
    nearby: ["umm-al-quwain", "al-bustan-ajman", "muwaileh-sharjah", "fujairah"],
  },
  {
    slug: "fujairah-umm-al-quwain",
    name: { en: "Fujairah & Umm Al Quwain", ar: "الفجيرة وأم القيوين" },
    city: { en: "Northern Emirates", ar: "الإمارات الشمالية" },
    note: {
      en: "Dependable cross-emirate moving covering East Coast Fujairah, Khorfakkan, and Umm Al Quwain with fixed all-inclusive rates.",
      ar: "نقل موثوق يغطي الساحل الشرقي بالفجيرة وخورفكان وأم القيوين بأسعار ثابتة شاملة الفك والتغليف والتركيب.",
    },
    nearby: ["ras-al-khaimah", "muwaileh-sharjah", "al-bustan-ajman", "dubai-marina"],
  },
];

export const getArea = (slug: string): Area | undefined =>
  areas.find((a) => a.slug === slug);

export const areaSlugs = areas.map((a) => a.slug);

