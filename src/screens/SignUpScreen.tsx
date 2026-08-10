import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  MoveLeft,
} from 'lucide-react-native';
import Input from '@/components/Input';

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'];

// --- Funciones Validadoras ---

const validateFirstName = (val: string): string | null => {
  if (!val.trim()) return 'El nombre es obligatorio.';
  return null;
};

const validateLastNamePaternal = (val: string): string | null => {
  if (!val.trim()) return 'El apellido paterno es obligatorio.';
  return null;
};

const validateGender = (val: string): string | null => {
  if (!val) return 'Debes seleccionar una opción.';
  return null;
};

const validateBirthDate = (val: string): string | null => {
  if (!val.trim()) return 'La fecha de nacimiento es obligatoria.';

  const regex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
  const match = val.trim().match(regex);

  if (!match) {
    return 'Ingresa la fecha en formato DD/MM/AAAA.';
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const birth = new Date(year, month, day);
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month ||
    birth.getDate() !== day
  ) {
    return 'Ingresa una fecha válida.';
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (birth > today) {
    return 'La fecha de nacimiento no puede ser futura.';
  }

  // Verificar edad mínima de 18 años
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 18) {
    return 'Debes tener al menos 18 años para registrarte.';
  }

  return null;
};

const validatePhone = (val: string): string | null => {
  if (!val.trim()) return 'El celular es obligatorio.';
  const digitsOnly = val.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'El teléfono debe tener al menos 10 dígitos.';
  }
  return null;
};

const validateEmail = (val: string): string | null => {
  if (!val.trim()) return 'El correo electrónico es obligatorio.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val.trim())) {
    return 'El correo debe estar en un formato válido.';
  }
  return null;
};

const validatePassword = (val: string): string | null => {
  if (!val) return 'La contraseña es obligatoria.';
  if (val.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (!/[A-Z]/.test(val)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }
  if (!/[a-z]/.test(val)) {
    return 'La contraseña debe incluir al menos una letra minúscula.';
  }
  if (!/[0-9]/.test(val)) {
    return 'La contraseña debe incluir al menos un número.';
  }
  if (!/[^A-Za-z0-9]/.test(val)) {
    return 'La contraseña debe incluir al menos un símbolo (!@#$%^&*).';
  }
  return null;
};

const validateConfirmPassword = (
  val: string,
  passVal: string,
): string | null => {
  if (!val) return 'Por favor confirma tu contraseña.';
  if (val !== passVal) {
    return 'Las contraseñas no coinciden.';
  }
  return null;
};

export default function SignUpScreen() {
  const router = useRouter();

  // Estados del Formulario
  const [firstName, setFirstName] = useState('');
  const [lastNamePaternal, setLastNamePaternal] = useState('');
  const [lastNameMaternal, setLastNameMaternal] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Estados de Errores
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Estados UI
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = () => {
    setErrorMessage(null);

    // Ejecutar todas las validaciones
    const newErrors: Record<string, string | null> = {
      firstName: validateFirstName(firstName),
      lastNamePaternal: validateLastNamePaternal(lastNamePaternal),
      gender: validateGender(gender),
      birthDate: validateBirthDate(birthDate),
      phone: validatePhone(phone),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
      terms: acceptedTerms
        ? null
        : 'Debes aceptar los Términos y Condiciones para continuar.',
    };

    setErrors(newErrors);

    // Comprobar si hay algún error existente
    const hasErrors = Object.values(newErrors).some((err) => err !== null);

    if (hasErrors) {
      setErrorMessage(
        'Corrige los errores señalados en el formulario antes de continuar.',
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Navegación post-registro
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      className="bg-light-bg"
      behavior={'padding'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView
        style={{ flex: 1 }}
        className="flex-1 bg-light-bg"
        edges={['top', 'left', 'right', 'bottom']}
      >
        <ScrollView
          style={{ flex: 1 }}
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 16,
            paddingBottom: 60,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6">
            {/* Tarjeta de Formulario */}
            <View className="bg-light-surface w-full rounded-3xl p-6 border border-light-border shadow-sm">
              {/* Botón Volver */}
              <Pressable
                onPress={() => router.back()}
                className="flex-row items-center self-start mb-4"
              >
                <MoveLeft color="#C8803C" size={24} />
                <Text className="text-light-primary font-montserrat-medium ml-2">
                  Volver
                </Text>
              </Pressable>

              <Text className="text-2xl font-montserrat-bold text-light-title text-center mb-6">
                Regístrate
              </Text>

              {errorMessage && (
                <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center">
                  <AlertCircle size={16} color="#EF4444" />
                  <Text className="text-red-600 text-xs font-montserrat-medium flex-1 ml-1">
                    {errorMessage}
                  </Text>
                </View>
              )}

              {/* 1. Nombre(s) */}
              <Input
                label="Nombre(s) *"
                placeholder="Ej. Luis Jesús"
                value={firstName}
                onChange={(val) => {
                  setFirstName(val);
                  setErrors((prev) => ({ ...prev, firstName: null }));
                }}
                validatorFn={validateFirstName}
                error={errors.firstName}
              />

              {/* 2. Apellido Paterno */}
              <Input
                label="Apellido Paterno *"
                placeholder="Ej. Corona"
                value={lastNamePaternal}
                onChange={(val) => {
                  setLastNamePaternal(val);
                  setErrors((prev) => ({ ...prev, lastNamePaternal: null }));
                }}
                validatorFn={validateLastNamePaternal}
                error={errors.lastNamePaternal}
              />

              {/* 3. Apellido Materno (Opcional) */}
              <Input
                label="Apellido Materno"
                placeholder="Ej. Villaseñor (Opcional)"
                value={lastNameMaternal}
                onChange={setLastNameMaternal}
              />

              {/* 4. Sexo (Dropdown / Selector desplegable) */}
              <View className="mb-4 w-full">
                <Text className="text-sm mb-1.5 text-light-title font-montserrat-semibold">
                  Sexo *
                </Text>
                <Pressable
                  onPress={() => setIsGenderOpen(!isGenderOpen)}
                  className={`h-12 px-4 flex-row items-center justify-between border-[1.5px] bg-white ${
                    errors.gender
                      ? 'border-red-500 rounded-xl'
                      : isGenderOpen
                        ? 'border-light-primary rounded-t-xl'
                        : 'border-light-border rounded-xl'
                  }`}
                >
                  <Text
                    className={`font-sans text-base ${
                      gender ? 'text-light-title' : 'text-gray-400'
                    }`}
                  >
                    {gender || 'Selecciona una opción'}
                  </Text>
                  {isGenderOpen ? (
                    <ChevronUp size={20} color="#C8803C" />
                  ) : (
                    <ChevronDown size={20} color="#9CA3AF" />
                  )}
                </Pressable>

                {isGenderOpen && (
                  <View className="border-x-[1.5px] border-b-[1.5px] border-light-primary bg-white rounded-b-xl overflow-hidden mt-[-1.5px] z-10 shadow-sm">
                    {GENDER_OPTIONS.map((option, index) => (
                      <Pressable
                        key={option}
                        onPress={() => {
                          setGender(option);
                          setIsGenderOpen(false);
                          setErrors((prev) => ({ ...prev, gender: null }));
                        }}
                        className={`py-3 px-4 flex-row items-center justify-between ${
                          index > 0 ? 'border-t border-gray-100' : ''
                        } ${gender === option ? 'bg-amber-50' : 'bg-white'}`}
                      >
                        <Text
                          className={`font-sans text-base ${
                            gender === option
                              ? 'text-light-primary font-montserrat-semibold'
                              : 'text-light-title'
                          }`}
                        >
                          {option}
                        </Text>
                        {gender === option && (
                          <Check size={18} color="#C8803C" />
                        )}
                      </Pressable>
                    ))}
                  </View>
                )}

                {errors.gender ? (
                  <View className="flex-row items-center mt-1.5">
                    <AlertCircle size={16} color="#EF4444" />
                    <Text className="text-red-500 text-xs font-sans ml-1.5">
                      {errors.gender}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* 5. Fecha de Nacimiento */}
              <Input
                label="Fecha de Nacimiento *"
                placeholder="DD/MM/AAAA"
                value={birthDate}
                onChange={(val) => {
                  // Auto-formatear con diagonales (DD/MM/AAAA)
                  let cleaned = val.replace(/\D/g, '');
                  if (cleaned.length > 8) cleaned = cleaned.substring(0, 8);

                  let formatted = cleaned;
                  if (cleaned.length > 4) {
                    formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}/${cleaned.substring(4)}`;
                  } else if (cleaned.length > 2) {
                    formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
                  }
                  setBirthDate(formatted);
                  setErrors((prev) => ({ ...prev, birthDate: null }));
                }}
                keyboardType="number-pad"
                validatorFn={validateBirthDate}
                error={errors.birthDate}
              />

              {/* 6. Celular */}
              <Input
                label="Celular *"
                placeholder="Ej. 5512345678"
                value={phone}
                onChange={(val) => {
                  setPhone(val);
                  setErrors((prev) => ({ ...prev, phone: null }));
                }}
                keyboardType="phone-pad"
                validatorFn={validatePhone}
                error={errors.phone}
              />

              {/* 7. Correo Electrónico */}
              <Input
                label="Correo Electrónico *"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(val) => {
                  setEmail(val);
                  setErrors((prev) => ({ ...prev, email: null }));
                }}
                keyboardType="email-address"
                validatorFn={validateEmail}
                error={errors.email}
              />

              {/* 8. Contraseña */}
              <Input
                label="Contraseña *"
                placeholder="••••••••"
                value={password}
                onChange={(val) => {
                  setPassword(val);
                  setErrors((prev) => ({ ...prev, password: null }));
                }}
                isPassword={true}
                validatorFn={validatePassword}
                error={errors.password}
              />

              {/* 9. Confirmar Contraseña */}
              <Input
                label="Confirmar Contraseña *"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(val) => {
                  setConfirmPassword(val);
                  setErrors((prev) => ({ ...prev, confirmPassword: null }));
                }}
                isPassword={true}
                validatorFn={(val) => validateConfirmPassword(val, password)}
                error={errors.confirmPassword}
              />

              {/* 10. Aceptar Términos y Condiciones */}
              <View className="my-3">
                <Pressable
                  onPress={() => {
                    setAcceptedTerms(!acceptedTerms);
                    setErrors((prev) => ({ ...prev, terms: null }));
                  }}
                  className="flex-row items-center"
                >
                  <View
                    className={`h-5 w-5 rounded border items-center justify-center mr-3 ${
                      acceptedTerms
                        ? 'bg-light-primary border-light-primary'
                        : errors.terms
                          ? 'bg-white border-red-500'
                          : 'bg-white border-light-border'
                    }`}
                  >
                    {acceptedTerms && <Check size={14} color="#ffffff" />}
                  </View>
                  <Text className="text-xs text-light-body font-sans flex-1">
                    Acepto los{' '}
                    <Text className="text-light-primary font-montserrat-semibold underline">
                      Términos y Condiciones
                    </Text>{' '}
                    y la Política de Privacidad *
                  </Text>
                </Pressable>

                {errors.terms ? (
                  <View className="flex-row items-center mt-1.5">
                    <AlertCircle size={16} color="#EF4444" />
                    <Text className="text-red-500 text-xs font-sans ml-1.5">
                      {errors.terms}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Botón Registrarse */}
              <Pressable
                className={`h-12 rounded-xl justify-center items-center mt-4 mb-6 ${
                  isLoading ? 'bg-light-secondary' : 'bg-light-primary'
                }`}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white font-montserrat-bold text-base">
                    Registrarse
                  </Text>
                )}
              </Pressable>

              {/* Enlace Iniciar Sesión */}
              <Text className="text-center text-xs text-light-body font-sans">
                ¿Ya tienes una cuenta?{' '}
                <Text
                  className="text-light-secondary font-montserrat-semibold underline"
                  onPress={() => router.push('/(auth)/login')}
                >
                  Inicia Sesión
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
