import { z } from "zod";
import { tool } from "@langchain/core/tools";

import { useCabins } from "../cabins/useCabins";
const cabinSchema = z.object({
  id: z.number(),
});

const cabinTool = tool(
  async function (input) {
    const id = input.id;
    const { cabins } = useCabins();
    const matchingCabin = cabins.find((cabin) => cabin.id === id);
    if (matchingCabin) {
      const infoString = `
      Name: ${matchingCabin.name}
      Max Capacity: ${matchingCabin.maxCapacity}
      Regular Price: $${matchingCabin.regularPrice}
      Discount: ${matchingCabin.discount}%
      Description: ${matchingCabin.description}
      Image: ${matchingCabin.image}
    `;
      return infoString.trim();
    } else {
      return "";
    }
  },
  {
    name: "cabin",
    description: "get information about cabin from its id",
    schema: cabinSchema,
  }
);

export default cabinTool;
