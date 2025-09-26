import { useAuth } from "../contexts/AuthContext";
import remindersService from "../services/reminders";
import { useQuery } from "@tanstack/react-query";

function useReminders() {
  const { userToken } = useAuth();

  return useQuery({
    queryKey: ["reminders", userToken],
    queryFn: () => remindersService.getReminders(userToken),
    enabled: !!userToken,
    staleTime: Infinity,
  });
}

export default useReminders;
