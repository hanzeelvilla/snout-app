import { decode } from "base-64";

export const decodeToken = (token) => {
  try {
    const parts = token.split(".");
    const payload = parts[1];
    const decodedPayload = decode(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (e) {
    console.error("Error al decodificar el token:", e);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  const expirationDate = new Date(payload.exp * 1000);
  const currentDate = new Date();

  return expirationDate < currentDate;
};
