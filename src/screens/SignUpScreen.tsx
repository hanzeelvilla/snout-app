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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  MoveLeft,
} from 'lucide-react-native';
import Input from '@/components/Input';
import { SignUpFormData, signUpSchema } from '@/schemas/authSchemas';

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'];

export default function SignUpScreen() {
  const router = useRouter();

  // Estados UI
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastNamePaternal: '',
      lastNameMaternal: '',
      gender: '',
      birthDate: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  });

  const onSubmit = (_data: SignUpFormData) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Navegación post-registro
    }, 2000);
  };

  const hasErrors = Object.keys(errors).length > 0;

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

              {hasErrors && (
                <View className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex-row items-center">
                  <AlertCircle size={16} color="#EF4444" />
                  <Text className="text-red-600 text-xs font-montserrat-medium flex-1 ml-1">
                    Corrige los errores señalados en el formulario antes de
                    continuar.
                  </Text>
                </View>
              )}

              {/* 1. Nombre(s) */}
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Nombre(s) *"
                    placeholder="Ej. Luis Jesús"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.firstName?.message}
                  />
                )}
              />

              {/* 2. Apellido Paterno */}
              <Controller
                control={control}
                name="lastNamePaternal"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Apellido Paterno *"
                    placeholder="Ej. Corona"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.lastNamePaternal?.message}
                  />
                )}
              />

              {/* 3. Apellido Materno (Opcional) */}
              <Controller
                control={control}
                name="lastNameMaternal"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Apellido Materno"
                    placeholder="Ej. Villaseñor (Opcional)"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.lastNameMaternal?.message}
                  />
                )}
              />

              {/* 4. Sexo (Dropdown / Selector desplegable) */}
              <Controller
                control={control}
                name="gender"
                render={({ field: { value } }) => (
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
                          value ? 'text-light-title' : 'text-gray-400'
                        }`}
                      >
                        {value || 'Selecciona una opción'}
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
                              setValue('gender', option, {
                                shouldValidate: true,
                              });
                              setIsGenderOpen(false);
                            }}
                            className={`py-3 px-4 flex-row items-center justify-between ${
                              index > 0 ? 'border-t border-gray-100' : ''
                            } ${value === option ? 'bg-amber-50' : 'bg-white'}`}
                          >
                            <Text
                              className={`font-sans text-base ${
                                value === option
                                  ? 'text-light-primary font-montserrat-semibold'
                                  : 'text-light-title'
                              }`}
                            >
                              {option}
                            </Text>
                            {value === option && (
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
                          {errors.gender.message}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}
              />

              {/* 5. Fecha de Nacimiento */}
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Fecha de Nacimiento *"
                    placeholder="DD/MM/AAAA"
                    value={value}
                    onChange={(val) => {
                      let cleaned = val.replace(/\D/g, '');
                      if (cleaned.length > 8) cleaned = cleaned.substring(0, 8);

                      let formatted = cleaned;
                      if (cleaned.length > 4) {
                        formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}/${cleaned.substring(4)}`;
                      } else if (cleaned.length > 2) {
                        formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
                      }
                      onChange(formatted);
                    }}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    error={errors.birthDate?.message}
                  />
                )}
              />

              {/* 6. Celular */}
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Celular *"
                    placeholder="Ej. 5512345678"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    error={errors.phone?.message}
                  />
                )}
              />

              {/* 7. Correo Electrónico */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Correo Electrónico *"
                    placeholder="correo@ejemplo.com"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    error={errors.email?.message}
                  />
                )}
              />

              {/* 8. Contraseña */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Contraseña *"
                    placeholder="••••••••"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isPassword={true}
                    error={errors.password?.message}
                  />
                )}
              />

              {/* 9. Confirmar Contraseña */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Confirmar Contraseña *"
                    placeholder="••••••••"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    isPassword={true}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />

              {/* 10. Aceptar Términos y Condiciones */}
              <Controller
                control={control}
                name="acceptedTerms"
                render={({ field: { onChange, value } }) => (
                  <View className="my-3">
                    <Pressable
                      onPress={() => onChange(!value)}
                      className="flex-row items-center"
                    >
                      <View
                        className={`h-5 w-5 rounded border items-center justify-center mr-3 ${
                          value
                            ? 'bg-light-primary border-light-primary'
                            : errors.acceptedTerms
                              ? 'bg-white border-red-500'
                              : 'bg-white border-light-border'
                        }`}
                      >
                        {value && <Check size={14} color="#ffffff" />}
                      </View>
                      <Text className="text-xs text-light-body font-sans flex-1">
                        Acepto los{' '}
                        <Text className="text-light-primary font-montserrat-semibold underline">
                          Términos y Condiciones
                        </Text>{' '}
                        y la Política de Privacidad *
                      </Text>
                    </Pressable>

                    {errors.acceptedTerms ? (
                      <View className="flex-row items-center mt-1.5">
                        <AlertCircle size={16} color="#EF4444" />
                        <Text className="text-red-500 text-xs font-sans ml-1.5">
                          {errors.acceptedTerms.message}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                )}
              />

              {/* Botón Registrarse */}
              <Pressable
                className={`h-12 rounded-xl justify-center items-center mt-4 mb-6 ${
                  isLoading ? 'bg-light-secondary' : 'bg-light-primary'
                }`}
                onPress={handleSubmit(onSubmit)}
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
