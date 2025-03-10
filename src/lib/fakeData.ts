// Array of common usernames for simulation (including Kenyan-inspired usernames)
const usernames = [
  // Original usernames
  "alex_23",
  "emma.smith",
  "jayden_98",
  "sophia.j",
  "ethan_wilson",
  "olivia.brown",
  "noah_22",
  "ava.jones",
  "liam_miller",
  "mia.davis",

  // Kenyan-inspired usernames
  "kamau_254",
  "wanjiku.ke",
  "kipchoge_runner",
  "nairobi_finest",
  "mombasa_vibes",
  "safari_lover",
  "kenyan_pride",
  "simba_heart",
  "maasai_warrior",
  "kilimanjaro_climber",
  "kenya_254",
  "jambo_kenya",
  "hakuna_matata",
  "swahili_speaker",
  "kenyan_chef",
  "nairobi_hustler",
  "mkenya_halisi",
  "tuko_pamoja",
  "kenyan_beauty",
  "afro_kenyan",
  "kikuyu_prince",
  "luo_princess",
  "kalenjin_runner",
  "coastal_vibes",
  "samburu_style",
  "turkana_gem",
  "kisumu_lakeside",
  "eldoret_champion",
  "nakuru_flamingo",
  "masai_mara_guide",

  // General usernames
  "fashion_lover22",
  "travel_addict",
  "fitness_guru",
  "food_enthusiast",
  "photo_pro",
  "music_fan",
  "art_creator",
  "nature_explorer",
  "tech_geek",
  "book_worm",
];

// Array of common comments for simulation (including Swahili comments and Kenyan references)
const comments = [
  // Original comments
  "🔥🔥🔥",
  "You look amazing!",
  "Love your content!",
  "Keep it up! 👏",
  "First time catching you live!",
  "You're so inspiring",
  "Can you do a tutorial on this?",
  "Love your energy",
  "This is awesome",
  "What camera do you use?",
  "Your vibe is everything ✨",
  "Goals! 🙌",
  "I've been following you forever!",
  "This made my day",
  "So talented!",
  "Can't believe I caught you live",
  "Love the setup",
  "You're the best!",

  // Kenyan locations and flag
  "Hello from Nairobi! 🇰🇪",
  "Greetings from Mombasa 🇰🇪",
  "Watching from Kisumu 🇰🇪",
  "Eldoret is proud of you 🇰🇪",
  "Nakuru loves you! 🇰🇪",
  "Sending love from Kenya ❤️🇰🇪",
  "Representing from Thika 🇰🇪",
  "Machakos tupo! 🇰🇪",
  "Kakamega watching! 🇰🇪",
  "Nyeri squad here 🇰🇪",

  // Swahili comments
  "Unarock sana! 🔥",
  "Umependeza leo!",
  "Hongera kwa kazi nzuri!",
  "Nakupenda sana!",
  "Umetuletea sifa Kenya! 🇰🇪",
  "Endelea hivyo!",
  "Mrembo wa Kenya! 🇰🇪",
  "Tunakupenda sana!",
  "Mzuri sana!",
  "Asante kwa content nzuri!",
  "Unatosha!",
  "Sisi wote tuko nyuma yako!",
  "Moto moto! 🔥",
  "Vipi mkuu?",
  "Mambo vipi?",
  "Safi sana!",
  "Nimekumiss sana!",
  "Niko hapa kukusupport! 🇰🇪",
  "Usisahau sisi mashabiki wako!",
  "Tuko pamoja!",

  // General comments
  "This is exactly what I needed today",
  "I'm taking notes 📝",
  "Obsessed with this!",
  "Wow! 😍",
  "This is so cool",
  "You always have the best content",
  "Can we collab sometime?",
  "Your style is everything",
  "This is why you're my favorite",
  "Needed this today",
  "Absolutely loving this",
  "You make it look so easy",
  "My favorite creator!",
  "This is gold",
  "Never miss your lives",
  "Such good vibes",
];

// Generate a random username
export const generateFakeUsername = (): string => {
  return usernames[Math.floor(Math.random() * usernames.length)];
};

// Generate a random comment
export const generateFakeComment = (): string => {
  return comments[Math.floor(Math.random() * comments.length)];
};
