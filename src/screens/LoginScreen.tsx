import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import { LoginFormData, loginSchema } from '@/schemas/authSchemas';

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_data: LoginFormData) => {
    setIsLoading(true);

    // Petición simulada de inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-light-bg justify-center px-6">
      {/* Título Principal */}
      <Text className="text-3xl font-montserrat-bold text-light-title mb-8 text-center">
        Snout
      </Text>

      {/* Tarjeta de Formulario */}
      <View className="bg-light-surface w-full rounded-3xl p-6 border border-light-border shadow-sm">
        <Text className="text-2xl font-montserrat-bold text-light-title text-center mb-6">
          Bienvenido de nuevo
        </Text>

        {/* Input de Correo */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Correo Electronico"
              placeholder="correo@domino.com"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
        />

        {/* Input de Contraseña */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Contraseña"
              placeholder="••••••••"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isPassword={true}
              error={errors.password?.message}
            />
          )}
        />

        {/* Enlace ¿Olvidaste tu contraseña? */}
        <View className="mb-6 -mt-2">
          <Text className="text-xs font-sans text-light-body">
            ¿Olvidaste tu contraseña?{' '}
            <Text className="text-light-secondary font-montserrat-medium underline">
              Recupérala
            </Text>
          </Text>
        </View>

        {/* Botón Iniciar Sesión */}
        <Pressable
          className={`h-12 rounded-xl justify-center items-center mb-6 ${
            isLoading ? 'bg-light-secondary' : 'bg-light-primary'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-montserrat-bold text-base">
              Iniciar Sesión
            </Text>
          )}
        </Pressable>

        {/* Enlace Registrate */}
        <Text className="text-center text-xs text-light-body font-sans">
          ¿No tienes cuenta?{' '}
          <Text
            className="text-light-secondary font-montserrat-semibold underline"
            onPress={() => router.push('/(auth)/signup')}
          >
            Regístrate
          </Text>
        </Text>
      </View>
    </View>
  );
}
