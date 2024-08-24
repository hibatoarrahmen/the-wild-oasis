import ChatInput from "../features/ai/ChatInput";
import { useState } from "react";

import ChatMessages from "../features/ai/ChatMessages";
import { useCabins } from "../features/cabins/useCabins";

import { useBookingsWithoutOptions } from "../features/bookings/useBookingsWithoutOptions";
import Spinner from "../ui/Spinner";

function formatBookingInfo(bookingArray) {
  return bookingArray
    .map((booking) => {
      return (
        `                                                                                           the information about booking  in our world wide owasis is listed here                                                                                                              :  ` +
        `Booking ID: ${booking.id}\n` +
        `  - Created At: ${booking.created_at}\n` +
        `  - Start Date: ${booking.startDate}\n` +
        `  - End Date: ${booking.endDate}\n` +
        `  - Number of Nights: ${booking.numNights}\n` +
        `  - Number of Guests: ${booking.numGuests}\n` +
        `  - Status: ${booking.status}\n` +
        `  - Total Price: $${booking.totalPrice}\n` +
        `  - Cabin Name: ${booking.cabins.name}\n` +
        `  - Guest Email: ${booking.guests.email}\n` +
        `  - Guest Full Name: ${booking.guests.fullName}\n`
      );
    })
    .join("\n # ");
}
function formatCabinInfo(cabinArray) {
  return cabinArray
    .map((cabin) => {
      return (
        `- Cabin ${cabin.name}` +
        `  - ID: ${cabin.id}` +
        `  - Created At: ${cabin.created_at}` +
        `  - Name: ${cabin.name}` +
        `  - Max Capacity: ${cabin.maxCapacity}` +
        `  - Regular Price: ${cabin.regularPrice}` +
        `  - Discount: ${cabin.discount}` +
        `  - Description: ${cabin.description}` +
        `  - Image: ${cabin.image}`
      );
    })
    .join("#");
}

function Assistant() {
  const [chatInput, setChatInput] = useState("");

  const { cabins } = useCabins();
  const { bookings, isLoading } = useBookingsWithoutOptions();
  if (isLoading) return <Spinner />;

  const cabinsStr = formatCabinInfo(cabins);
  const bookinngsStr = formatBookingInfo(bookings.data);

  return (
    <>
      <ChatInput setChatInput={setChatInput} />
      {chatInput && (
        <ChatMessages
          chatInput={chatInput}
          cabins={cabinsStr}
          bookings={bookinngsStr}
        />
      )}
    </>
  );
}

export default Assistant;
