import { useAuth } from "../contexts/AuthContext";
import mascotaService from "../services/mascotas";
import { useQuery } from "@tanstack/react-query";

function useMascotas() {
  const { userToken } = useAuth();

  return useQuery({
    queryKey: ["mascotas", userToken],
    queryFn: () => mascotaService.obtenerMascotas(userToken),
    enabled: !!userToken,
    staleTime: Infinity,
  });
}

export default useMascotas;
