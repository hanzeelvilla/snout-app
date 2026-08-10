import { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  value: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  validatorFn?: (value: string) => string | null;
  onChange?: (text: string) => void;
  textStyleClasses?: string;
  secureText?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  editable?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  labelClassName?: string;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
  error?: string | null;
}

export default function Input({
  value,
  label,
  keyboardType = 'default',
  validatorFn,
  onChange,
  textStyleClasses,
  secureText = false,
  isPassword = false,
  placeholder,
  editable = true,
  numberOfLines = 1,
  multiline = false,
  labelClassName = 'text-light-title font-montserrat-semibold',
  onFocus,
  onBlur,
  error: externalError,
}: InputProps) {
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const error = externalError || internalError;

  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setIsFocused(false);
    const validationResult = validatorFn ? validatorFn(value) : null;
    setInternalError(validationResult);
    if (onBlur) onBlur(e);
  };

  const handleChangeText = (text: string) => {
    if (internalError) setInternalError(null);
    if (onChange) onChange(text);
  };

  const isPasswordInput = isPassword || secureText;
  const isSecureEntry = isPasswordInput ? !showPassword : false;

  return (
    <View className="mb-4 w-full">
      <Text className={`text-sm mb-1.5 ${labelClassName}`}>{label}</Text>
      <View className="relative w-full justify-center">
        <TextInput
          style={{ includeFontPadding: false }}
          className={`rounded-xl px-4 pl-3 font-sans border-[1.5px] bg-white ${
            isPasswordInput ? 'pr-12' : ''
          } ${
            isSecureEntry && value ? 'tracking-[2px]' : 'text-base'
          } ${textStyleClasses || 'text-light-title'} ${
            error
              ? 'border-red-500'
              : isFocused
                ? 'border-light-primary'
                : 'border-light-border'
          } ${
            multiline
              ? 'h-22.5 py-3 [textAlignVertical:top]'
              : 'h-12 py-0 [textAlignVertical:center]'
          }`}
          keyboardType={keyboardType}
          secureTextEntry={isSecureEntry}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={value}
          placeholder={placeholder || ''}
          placeholderTextColor="#9CA3AF"
          editable={editable}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
        {isPasswordInput && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 h-full justify-center items-center px-1"
          >
            {showPassword ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </Pressable>
        )}
      </View>
      {error ? (
        <View className="flex-row items-center mt-1.5">
          <AlertCircle size={16} color="#EF4444" />
          <Text className="text-red-500 text-xs font-sans ml-1.5">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
