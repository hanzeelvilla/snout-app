import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCircle, ChevronDown, Search, X } from 'lucide-react-native';
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js';

export interface CountryOption {
  code: CountryCode;
  callingCode: string;
  flag: string;
}

export function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const COUNTRY_NAMES_SPANISH: Record<string, string> = {
  AF: 'Afganistán',
  AL: 'Albania',
  DE: 'Alemania',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguila',
  AG: 'Antigua y Barbuda',
  SA: 'Arabia Saudita',
  DZ: 'Argelia',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaiyán',
  BS: 'Bahamas',
  BD: 'Bangladés',
  BB: 'Barbados',
  BH: 'Baréin',
  BE: 'Bélgica',
  BZ: 'Belice',
  BJ: 'Benín',
  BM: 'Bermudas',
  BY: 'Bielorrusia',
  BO: 'Bolivia',
  BA: 'Bosnia y Herzegovina',
  BW: 'Botsuana',
  BR: 'Brasil',
  BN: 'Brunéi',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  BT: 'Bután',
  CV: 'Cabo Verde',
  KH: 'Camboya',
  CM: 'Camerún',
  CA: 'Canadá',
  QA: 'Catar',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CY: 'Chipre',
  CO: 'Colombia',
  KM: 'Comoras',
  CG: 'Congo',
  CD: 'R. D. del Congo',
  KP: 'Corea del Norte',
  KR: 'Corea del Sur',
  CI: 'Costa de Marfil',
  CR: 'Costa Rica',
  HR: 'Croacia',
  CU: 'Cuba',
  CW: 'Curazao',
  DK: 'Dinamarca',
  DM: 'Dominica',
  EC: 'Ecuador',
  EG: 'Egipto',
  SV: 'El Salvador',
  AE: 'Emiratos Árabes Unidos',
  ER: 'Eritrea',
  SK: 'Eslovaquia',
  SI: 'Eslovenia',
  ES: 'España',
  US: 'Estados Unidos',
  EE: 'Estonia',
  ET: 'Etiopía',
  PH: 'Filipinas',
  FI: 'Finlandia',
  FJ: 'Fiyi',
  FR: 'Francia',
  GA: 'Gabón',
  GM: 'Gambia',
  GE: 'Georgia',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GD: 'Granada',
  GR: 'Grecia',
  GL: 'Groenlandia',
  GP: 'Guadalupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GF: 'Guayana Francesa',
  GN: 'Guinea',
  GW: 'Guinea-Bisáu',
  GQ: 'Guinea Ecuatorial',
  GY: 'Guyana',
  HT: 'Haití',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungría',
  IN: 'India',
  ID: 'Indonesia',
  IQ: 'Iraq',
  IR: 'Irán',
  IE: 'Irlanda',
  IS: 'Islandia',
  IL: 'Israel',
  IT: 'Italia',
  JM: 'Jamaica',
  JP: 'Japón',
  JO: 'Jordania',
  KZ: 'Kazajistán',
  KE: 'Kenia',
  KG: 'Kirguistán',
  KI: 'Kiribati',
  KW: 'Kuwait',
  LA: 'Laos',
  LS: 'Lesoto',
  LV: 'Letonia',
  LB: 'Líbano',
  LR: 'Liberia',
  LY: 'Libia',
  LI: 'Liechtenstein',
  LT: 'Lituania',
  LU: 'Luxemburgo',
  MO: 'Macao',
  MK: 'Macedonia del Norte',
  MG: 'Madagascar',
  MY: 'Malasia',
  MW: 'Malaui',
  MV: 'Maldivas',
  ML: 'Mali',
  MT: 'Malta',
  MA: 'Marruecos',
  MQ: 'Martinica',
  MU: 'Mauricio',
  MR: 'Mauritania',
  MX: 'México',
  FM: 'Micronesia',
  MD: 'Moldavia',
  MC: 'Mónaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NI: 'Nicaragua',
  NE: 'Níger',
  NG: 'Nigeria',
  NO: 'Noruega',
  NC: 'Nueva Caledonia',
  NZ: 'Nueva Zelanda',
  OM: 'Omán',
  NL: 'Países Bajos',
  PK: 'Pakistán',
  PW: 'Palaos',
  PS: 'Palestina',
  PA: 'Panamá',
  PG: 'Papúa Nueva Guinea',
  PY: 'Paraguay',
  PE: 'Perú',
  PF: 'Polinesia Francesa',
  PL: 'Polonia',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  GB: 'Reino Unido',
  CF: 'República Centroafricana',
  CZ: 'República Checa',
  DO: 'República Dominicana',
  RE: 'Reunión',
  RW: 'Rumanía',
  RU: 'Rusia',
  WS: 'Samoa',
  KN: 'San Cristóbal y Nieves',
  SM: 'San Marino',
  VC: 'San Vicente y las Granadinas',
  LC: 'Santa Lucía',
  ST: 'Santo Tomé y Príncipe',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leona',
  SG: 'Singapur',
  SX: 'Sint Maarten',
  SY: 'Siria',
  SO: 'Somalia',
  LK: 'Sri Lanka',
  SZ: 'Esuatini',
  ZA: 'Sudáfrica',
  SD: 'Sudán',
  SS: 'Sudán del Sur',
  SE: 'Suecia',
  CH: 'Suiza',
  SR: 'Surinam',
  TH: 'Tailandia',
  TW: 'Taiwán',
  TZ: 'Tanzania',
  TJ: 'Tayikistán',
  TL: 'Timor Oriental',
  TG: 'Togo',
  TO: 'Tonga',
  TT: 'Trinidad y Tobago',
  TN: 'Túnez',
  TM: 'Turkmenistán',
  TR: 'Turquía',
  TV: 'Tuvalu',
  UA: 'Ucrania',
  UG: 'Uganda',
  UY: 'Uruguay',
  UZ: 'Uzbekistán',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Vietnam',
  YE: 'Yemen',
  DJ: 'Yibuti',
  ZM: 'Zambia',
  ZW: 'Zimbabue',
};

export const COUNTRIES: CountryOption[] = getCountries()
  .map((code) => {
    let callingCode = '';
    try {
      callingCode = `+${getCountryCallingCode(code)}`;
    } catch {
      callingCode = '';
    }
    const flag = getFlagEmoji(code);
    return {
      code,
      callingCode,
      flag,
    };
  })
  .filter((country) => Boolean(country.callingCode))
  .sort((a, b) => a.code.localeCompare(b.code, 'es'));

export const DEFAULT_COUNTRY =
  COUNTRIES.find((c) => c.code === 'MX') || COUNTRIES[0];

interface PhoneInputProps {
  value: string;
  label?: string;
  onChange?: (text: string) => void;
  onBlur?: TextInputProps['onBlur'];
  onFocus?: TextInputProps['onFocus'];
  error?: string | null;
  selectedCountry?: CountryOption;
  onCountryChange?: (country: CountryOption) => void;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  label = 'Celular',
  onChange,
  onBlur,
  onFocus,
  error,
  selectedCountry = DEFAULT_COUNTRY,
  onCountryChange,
  placeholder = '9 8765-4321',
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.callingCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectCountry = (country: CountryOption) => {
    if (onCountryChange) {
      onCountryChange(country);
    }
    setIsModalVisible(false);
    setSearchQuery('');
  };

  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View className="mb-4 w-full">
      {label ? (
        <Text className="text-sm mb-1.5 text-light-title font-montserrat-semibold">
          {label}
        </Text>
      ) : null}

      <View className="flex-row items-center gap-2">
        {/* Selector de país */}
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className={`h-12 px-3 flex-row items-center justify-between border-[1.5px] bg-white rounded-xl min-w-26.25 ${
            error
              ? 'border-red-500'
              : isModalVisible
                ? 'border-light-primary'
                : 'border-light-border'
          }`}
        >
          <Text className="text-lg mr-1">{selectedCountry.flag}</Text>
          <Text className="text-base text-light-title font-montserrat-medium mr-1">
            {selectedCountry.callingCode}
          </Text>
          <ChevronDown size={18} color="#9CA3AF" />
        </Pressable>

        {/* Input de número telefónico */}
        <View className="flex-1 relative justify-center">
          <TextInput
            style={{ includeFontPadding: false, paddingVertical: 0 }}
            className={`h-12 rounded-xl px-4 font-sans text-base border-[1.5px] bg-white text-light-title [textAlignVertical:center] ${
              error
                ? 'border-red-500'
                : isFocused
                  ? 'border-light-primary'
                  : 'border-light-border'
            }`}
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            numberOfLines={1}
          />
        </View>
      </View>

      {error ? (
        <View className="flex-row items-center mt-1.5">
          <AlertCircle size={16} color="#EF4444" />
          <Text className="text-red-500 text-xs font-sans ml-1.5">{error}</Text>
        </View>
      ) : null}

      {/* Modal de Selección de País */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-light-bg">
          <View style={{ flex: 1 }} className="p-4 flex-1">
            {/* Header del Modal */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-montserrat-bold text-light-title">
                Selecciona un país
              </Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                className="p-2 rounded-full bg-gray-100"
              >
                <X size={20} color="#374151" />
              </Pressable>
            </View>

            {/* Input de Búsqueda */}
            <View className="flex-row items-center bg-white border border-light-border rounded-xl px-3 h-11 mb-4">
              <Search size={18} color="#9CA3AF" className="mr-2" />
              <TextInput
                style={{ includeFontPadding: false, paddingVertical: 0 }}
                className="flex-1 font-sans text-base text-light-title"
                placeholder="Buscar país o código..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                numberOfLines={1}
              />
            </View>

            {/* Lista de Países */}
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectCountry(item)}
                  className={`flex-row items-center justify-between p-3.5 border-b border-gray-100 rounded-xl mb-1 ${
                    selectedCountry.code === item.code
                      ? 'bg-amber-50'
                      : 'bg-white'
                  }`}
                >
                  <View className="flex-row items-center flex-1 mr-2">
                    <Text className="text-2xl mr-3">{item.flag}</Text>
                    <Text className="font-sans">{item.code}</Text>
                  </View>
                  <Text className="text-sm font-montserrat-semibold text-light-secondary">
                    {item.callingCode}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
