import { useQuery } from "@tanstack/react-query";

import { getBookingsWithoutFilterSortPage } from "../../services/apiBookings";

export function useBookingsWithoutOptions() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsWithoutFilterSortPage(),
  });

  return { isLoading, error, bookings };
}
