import { z } from "zod";

export default z
  .object({
    type: z
      .string()
      .min(1)
      .max(128)
      .describe(
        'Enumerated or private string signifying the nature of values.\nE.G. "PRICE" indicates value is to be interpreted as a currency.\n'
      ),
    values: z
      .array(
        z.union([
          z.number(),
          z.number().int(),
          z.string(),
          z.boolean(),
          z
            .object({
              x: z
                .number()
                .describe("A value on an x axis.")
                .default(null)
                .nullable()
                .describe("A value on an x axis.")
                .default(null),
              y: z
                .number()
                .describe("A value on a y axis.")
                .default(null)
                .nullable()
                .describe("A value on a y axis.")
                .default(null),
            })
            .describe(
              "A pair of floats typically used as a point on a 2 dimensional grid."
            ),
        ])
      )
      .describe(
        "A list of data points. Most often a singular value such as a price."
      ),
  })
  .describe(
    "Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n"
  );