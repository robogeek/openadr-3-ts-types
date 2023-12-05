import { z } from "zod";

export default z
  .object({
    start: z
      .string()
      .datetime()
      .describe("datetime in ISO 8601 format")
      .default("0000-00-00"),
    duration: z
      .string()
      .regex(
        new RegExp(
          "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
        )
      )
      .describe("duration in ISO 8601 format")
      .default("PT0S"),
    randomizeStart: z
      .string()
      .regex(
        new RegExp(
          "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
        )
      )
      .describe("duration in ISO 8601 format")
      .default("PT0S"),
  })
  .describe(
    "Defines temporal aspects of intervals.\nA duration of default null indicates infinity.\nA randomizeStart of default null indicates no randomization.\n"
  );