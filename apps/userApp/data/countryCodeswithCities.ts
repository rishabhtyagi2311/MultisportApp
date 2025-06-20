export interface CountryCodeWithCities {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  cities: string[];
}

export const countryCodes: CountryCodeWithCities[] = [
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco"],
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "🇬🇧",
    cities: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "🇨🇦",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "🇦🇺",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: "🇩🇪",
    cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "🇫🇷",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
  },
  {
    name: "Italy",
    code: "IT",
    dialCode: "+39",
    flag: "🇮🇹",
    cities: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  },
  {
    name: "Spain",
    code: "ES",
    dialCode: "+34",
    flag: "🇪🇸",
    cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
  },
  {
    name: "Netherlands",
    code: "NL",
    dialCode: "+31",
    flag: "🇳🇱",
    cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  },
  {
    name: "Belgium",
    code: "BE",
    dialCode: "+32",
    flag: "🇧🇪",
    cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
  },
  {
    name: "Switzerland",
    code: "CH",
    dialCode: "+41",
    flag: "🇨🇭",
    cities: ["Zurich", "Geneva", "Basel", "Lausanne", "Bern"],
  },
  {
    name: "Austria",
    code: "AT",
    dialCode: "+43",
    flag: "🇦🇹",
    cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
  },
  {
    name: "Sweden",
    code: "SE",
    dialCode: "+46",
    flag: "🇸🇪",
    cities: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Västerås"],
  },
  {
    name: "Norway",
    code: "NO",
    dialCode: "+47",
    flag: "🇳🇴",
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
  },
  {
    name: "Denmark",
    code: "DK",
    dialCode: "+45",
    flag: "🇩🇰",
    cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
  },
  {
    name: "Finland",
    code: "FI",
    dialCode: "+358",
    flag: "🇫🇮",
    cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
  },
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "🇮🇳",
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
  },
  {
    name: "China",
    code: "CN",
    dialCode: "+86",
    flag: "🇨🇳",
    cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "+81",
    flag: "🇯🇵",
    cities: ["Tokyo", "Osaka", "Nagoya", "Yokohama", "Sapporo"],
  },
  {
    name: "South Korea",
    code: "KR",
    dialCode: "+82",
    flag: "🇰🇷",
    cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
  },
  {
    name: "Singapore",
    code: "SG",
    dialCode: "+65",
    flag: "🇸🇬",
    cities: ["Singapore"],
  },
  {
    name: "Hong Kong",
    code: "HK",
    dialCode: "+852",
    flag: "🇭🇰",
    cities: ["Hong Kong"],
  },
  {
    name: "Malaysia",
    code: "MY",
    dialCode: "+60",
    flag: "🇲🇾",
    cities: ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Shah Alam"],
  },
  {
    name: "Thailand",
    code: "TH",
    dialCode: "+66",
    flag: "🇹🇭",
    cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hat Yai"],
  },
  {
    name: "Indonesia",
    code: "ID",
    dialCode: "+62",
    flag: "🇮🇩",
    cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"],
  },
  {
    name: "Philippines",
    code: "PH",
    dialCode: "+63",
    flag: "🇵🇭",
    cities: ["Manila", "Cebu", "Davao", "Quezon City", "Zamboanga"],
  },
  {
    name: "Vietnam",
    code: "VN",
    dialCode: "+84",
    flag: "🇻🇳",
    cities: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho"],
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "🇧🇷",
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
  },
  {
    name: "Mexico",
    code: "MX",
    dialCode: "+52",
    flag: "🇲🇽",
    cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
  },
  {
    name: "Argentina",
    code: "AR",
    dialCode: "+54",
    flag: "🇦🇷",
    cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
  },
  {
    name: "Chile",
    code: "CL",
    dialCode: "+56",
    flag: "🇨🇱",
    cities: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"],
  },
  {
    name: "Colombia",
    code: "CO",
    dialCode: "+57",
    flag: "🇨🇴",
    cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
  },
  {
    name: "Peru",
    code: "PE",
    dialCode: "+51",
    flag: "🇵🇪",
    cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco"],
  },
  {
    name: "South Africa",
    code: "ZA",
    dialCode: "+27",
    flag: "🇿🇦",
    cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  },
  {
    name: "Egypt",
    code: "EG",
    dialCode: "+20",
    flag: "🇪🇬",
    cities: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said"],
  },
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "🇳🇬",
    cities: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  },
  {
    name: "Kenya",
    code: "KE",
    dialCode: "+254",
    flag: "🇰🇪",
    cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  },
  {
    name: "Morocco",
    code: "MA",
    dialCode: "+212",
    flag: "🇲🇦",
    cities: ["Casablanca", "Rabat", "Fez", "Marrakesh", "Tangier"],
  },
  {
    name: "Israel",
    code: "IL",
    dialCode: "+972",
    flag: "🇮🇱",
    cities: ["Tel Aviv", "Jerusalem", "Haifa", "Rishon LeZion", "Petah Tikva"],
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: "🇦🇪",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman"],
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "🇸🇦",
    cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  },
  {
    name: "Turkey",
    code: "TR",
    dialCode: "+90",
    flag: "🇹🇷",
    cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  },
  {
    name: "Russia",
    code: "RU",
    dialCode: "+7",
    flag: "🇷🇺",
    cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod"],
  },
  {
    name: "Poland",
    code: "PL",
    dialCode: "+48",
    flag: "🇵🇱",
    cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań"],
  },
  {
    name: "Czech Republic",
    code: "CZ",
    dialCode: "+420",
    flag: "🇨🇿",
    cities: ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec"],
  },
  {
    name: "Hungary",
    code: "HU",
    dialCode: "+36",
    flag: "🇭🇺",
    cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs"],
  },
  {
    name: "Romania",
    code: "RO",
    dialCode: "+40",
    flag: "🇷🇴",
    cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța"],
  },
  {
    name: "Bulgaria",
    code: "BG",
    dialCode: "+359",
    flag: "🇧🇬",
    cities: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse"],
  },
  {
    name: "Croatia",
    code: "HR",
    dialCode: "+385",
    flag: "🇭🇷",
    cities: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar"],
  },
  {
    name: "Serbia",
    code: "RS",
    dialCode: "+381",
    flag: "🇷🇸",
    cities: ["Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica"],
  },
  {
    name: "Ukraine",
    code: "UA",
    dialCode: "+380",
    flag: "🇺🇦",
    cities: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
  },
  {
    name: "Greece",
    code: "GR",
    dialCode: "+30",
    flag: "🇬🇷",
    cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
  },
  {
    name: "Portugal",
    code: "PT",
    dialCode: "+351",
    flag: "🇵🇹",
    cities: ["Lisbon", "Porto", "Amadora", "Braga", "Coimbra"],
  },
  {
    name: "Ireland",
    code: "IE",
    dialCode: "+353",
    flag: "🇮🇪",
    cities: ["Dublin", "Cork", "Limerick", "Galway", "Waterford"],
  },
];
