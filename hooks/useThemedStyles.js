import { useTheme } from "../contexts/ThemeContext";

export function useThemedStyles(stylesCreator) {
  const { theme } = useTheme();
  return stylesCreator(theme);
}
