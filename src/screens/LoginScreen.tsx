import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/components/Input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;

    setIsLoading(true);

    // Petición simulada de inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const validatePassword = () => {
    if (!password) return 'Este campo es requerido';

    return null;
  };

  const validateEmail = () => {
    if (!email) return 'Este campo es requerido';

    return null;
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
        <Input
          label="Correo Electronico"
          placeholder="correo@domino.com"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          validatorFn={validateEmail}
        />

        {/* Input de Contraseña */}
        <Input
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          textStyleClasses="text-primary text-lg"
          secureText={true}
          validatorFn={validatePassword}
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
          onPress={handleLogin}
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
