import { z } from "zod";

export default z
  .object({
    objectType: z
      .enum(["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"])
      .describe("Types of objects addressable through API."),
    operation: z
      .enum(["GET", "POST", "PUT", "DELETE"])
      .describe("the operation on on object that triggered the notification."),
    targets: z
      .array(
        z
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
          )
      )
      .describe("A list of valuesMap objects.")
      .default(null)
      .nullable()
      .describe("A list of valuesMap objects.")
      .default(null),
    object: z
      .record(z.any())
      .and(
        z.any().superRefine((x, ctx) => {
          const schemas = [
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("PROGRAM")
                  .describe("Used as discriminator, e.g. notification.object")
                  .optional(),
                programName: z
                  .string()
                  .min(1)
                  .max(128)
                  .describe("Short name to uniquely identify program."),
                programLongName: z
                  .string()
                  .describe("Long name of program for human readability.")
                  .default(null)
                  .nullable()
                  .describe("Long name of program for human readability.")
                  .default(null),
                retailerName: z
                  .string()
                  .describe(
                    "Short name of energy retailer providing the program."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "Short name of energy retailer providing the program."
                  )
                  .default(null),
                retailerLongName: z
                  .string()
                  .describe(
                    "Long name of energy retailer for human readability."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "Long name of energy retailer for human readability."
                  )
                  .default(null),
                programType: z
                  .string()
                  .describe("A program defined categorization.")
                  .default(null)
                  .nullable()
                  .describe("A program defined categorization.")
                  .default(null),
                country: z
                  .string()
                  .describe("Alpha-2 code per ISO 3166-1.")
                  .default(null)
                  .nullable()
                  .describe("Alpha-2 code per ISO 3166-1.")
                  .default(null),
                principalSubdivision: z
                  .string()
                  .describe("Coding per ISO 3166-2. E.g. state in US.")
                  .default(null)
                  .nullable()
                  .describe("Coding per ISO 3166-2. E.g. state in US.")
                  .default(null),
                timeZoneOffset: z
                  .string()
                  .regex(
                    new RegExp(
                      "/^(-?)P(?=\\d|T\\d)(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)([DW]))?(?:T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$/"
                    )
                  )
                  .describe("duration in ISO 8601 format")
                  .default("PT0S"),
                intervalPeriod: z
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
                  )
                  .optional(),
                programDescriptions: z
                  .array(z.any())
                  .describe("A list of programDescriptions")
                  .default(null)
                  .nullable()
                  .describe("A list of programDescriptions")
                  .default(null),
                bindingEvents: z
                  .boolean()
                  .describe("True if events are fixed once transmitted.")
                  .default(false),
                localPrice: z
                  .boolean()
                  .describe(
                    "True if events have been adapted from a grid event."
                  )
                  .default(false),
                payloadDescriptors: z
                  .array(
                    z.union([
                      z
                        .object({
                          objectType: z
                            .string()
                            .describe(
                              "Used as discriminator, e.g. program.payloadDescriptors"
                            )
                            .default("EVENT_PAYLOAD_DESCRIPTOR"),
                          payloadType: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe(
                              "Enumerated or private string signifying the nature of values."
                            ),
                          units: z
                            .string()
                            .describe("Units of measure.")
                            .default(null)
                            .nullable()
                            .describe("Units of measure.")
                            .default(null),
                          currency: z
                            .string()
                            .describe("Currency of price payload.")
                            .default("USD")
                            .nullable()
                            .describe("Currency of price payload.")
                            .default("USD"),
                        })
                        .describe(
                          "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                        ),
                      z
                        .object({
                          objectType: z
                            .string()
                            .describe(
                              "Used as discriminator, e.g. program.payloadDescriptors"
                            )
                            .default("REPORT_PAYLOAD_DESCRIPTOR"),
                          payloadType: z
                            .string()
                            .min(1)
                            .max(128)
                            .describe(
                              "Enumerated or private string signifying the nature of values."
                            ),
                          readingType: z
                            .string()
                            .describe(
                              "Enumerated or private string signifying the type of reading."
                            )
                            .default("DIRECT_READ")
                            .nullable()
                            .describe(
                              "Enumerated or private string signifying the type of reading."
                            )
                            .default("DIRECT_READ"),
                          units: z
                            .string()
                            .describe("Units of measure.")
                            .default("KWH")
                            .nullable()
                            .describe("Units of measure.")
                            .default("KWH"),
                          accuracy: z
                            .number()
                            .describe(
                              "A quantification of the accuracy of a set of payload values."
                            )
                            .default(0)
                            .nullable()
                            .describe(
                              "A quantification of the accuracy of a set of payload values."
                            )
                            .default(0),
                          confidence: z
                            .number()
                            .int()
                            .gte(0)
                            .lte(100)
                            .describe(
                              "A quantification of the confidence in a set of payload values."
                            )
                            .default(100),
                        })
                        .describe(
                          "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                        ),
                    ])
                  )
                  .describe("A list of payloadDescriptors.")
                  .default(null)
                  .nullable()
                  .describe("A list of payloadDescriptors.")
                  .default(null),
                targets: z
                  .array(
                    z
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
                      )
                  )
                  .describe("A list of valuesMap objects.")
                  .default(null)
                  .nullable()
                  .describe("A list of valuesMap objects.")
                  .default(null),
              })
              .describe("Provides program specific metadata from VTN to VEN."),
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("REPORT")
                  .describe("Used as discriminator, e.g. notification.object")
                  .optional(),
                programID: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID."),
                eventID: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID."),
                clientName: z
                  .string()
                  .min(1)
                  .max(128)
                  .describe(
                    "User generated identifier; may be VEN ID provisioned during program enrollment."
                  ),
                reportName: z
                  .string()
                  .describe(
                    "User defined string for use in debugging or User Interface."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "User defined string for use in debugging or User Interface."
                  )
                  .default(null),
                payloadDescriptors: z
                  .array(
                    z
                      .object({
                        objectType: z
                          .string()
                          .describe(
                            "Used as discriminator, e.g. program.payloadDescriptors"
                          )
                          .default("REPORT_PAYLOAD_DESCRIPTOR"),
                        payloadType: z
                          .string()
                          .min(1)
                          .max(128)
                          .describe(
                            "Enumerated or private string signifying the nature of values."
                          ),
                        readingType: z
                          .string()
                          .describe(
                            "Enumerated or private string signifying the type of reading."
                          )
                          .default("DIRECT_READ")
                          .nullable()
                          .describe(
                            "Enumerated or private string signifying the type of reading."
                          )
                          .default("DIRECT_READ"),
                        units: z
                          .string()
                          .describe("Units of measure.")
                          .default("KWH")
                          .nullable()
                          .describe("Units of measure.")
                          .default("KWH"),
                        accuracy: z
                          .number()
                          .describe(
                            "A quantification of the accuracy of a set of payload values."
                          )
                          .default(0)
                          .nullable()
                          .describe(
                            "A quantification of the accuracy of a set of payload values."
                          )
                          .default(0),
                        confidence: z
                          .number()
                          .int()
                          .gte(0)
                          .lte(100)
                          .describe(
                            "A quantification of the confidence in a set of payload values."
                          )
                          .default(100),
                      })
                      .describe(
                        "Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n"
                      )
                  )
                  .describe("A list of reportPayloadDescriptors.")
                  .default(null)
                  .nullable()
                  .describe("A list of reportPayloadDescriptors.")
                  .default(null),
                resources: z
                  .array(
                    z
                      .object({
                        resourceName: z
                          .string()
                          .min(1)
                          .max(128)
                          .describe(
                            "User generated identifier. A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data"
                          ),
                        intervalPeriod: z
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
                          )
                          .optional(),
                        intervals: z
                          .array(
                            z
                              .object({
                                id: z
                                  .number()
                                  .int()
                                  .describe(
                                    "A client generated number assigned an interval object. Not a sequence number."
                                  ),
                                intervalPeriod: z
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
                                  )
                                  .optional(),
                                payloads: z
                                  .array(
                                    z
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
                                                    .describe(
                                                      "A value on an x axis."
                                                    )
                                                    .default(null)
                                                    .nullable()
                                                    .describe(
                                                      "A value on an x axis."
                                                    )
                                                    .default(null),
                                                  y: z
                                                    .number()
                                                    .describe(
                                                      "A value on a y axis."
                                                    )
                                                    .default(null)
                                                    .nullable()
                                                    .describe(
                                                      "A value on a y axis."
                                                    )
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
                                      )
                                  )
                                  .describe("A list of valuesMap objects."),
                              })
                              .describe(
                                "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                              )
                          )
                          .describe("A list of interval objects."),
                      })
                      .describe("Report data associated with a resource.")
                  )
                  .describe(
                    "A list of objects containing report data for a set of resources."
                  ),
              })
              .describe("report object."),
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("EVENT")
                  .describe("Used as discriminator, e.g. notification.object")
                  .optional(),
                programID: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID."),
                eventName: z
                  .string()
                  .describe(
                    "User defined string for use in debugging or User Interface."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "User defined string for use in debugging or User Interface."
                  )
                  .default(null),
                priority: z
                  .number()
                  .int()
                  .gte(0)
                  .describe(
                    "Relative priority of event. A lower number is a higher priority."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "Relative priority of event. A lower number is a higher priority."
                  )
                  .default(null),
                targets: z
                  .array(
                    z
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
                      )
                  )
                  .describe("A list of valuesMap objects.")
                  .default(null)
                  .nullable()
                  .describe("A list of valuesMap objects.")
                  .default(null),
                reportDescriptors: z
                  .array(
                    z
                      .object({
                        payloadType: z
                          .string()
                          .min(1)
                          .max(128)
                          .describe(
                            "Enumerated or private string signifying the nature of values."
                          ),
                        readingType: z
                          .string()
                          .describe(
                            "Enumerated or private string signifying the type of reading."
                          )
                          .default(null)
                          .nullable()
                          .describe(
                            "Enumerated or private string signifying the type of reading."
                          )
                          .default(null),
                        units: z
                          .string()
                          .describe("Units of measure.")
                          .default(null)
                          .nullable()
                          .describe("Units of measure.")
                          .default(null),
                        targets: z
                          .array(
                            z
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
                              )
                          )
                          .describe("A list of valuesMap objects.")
                          .default(null)
                          .nullable()
                          .describe("A list of valuesMap objects.")
                          .default(null),
                        aggregate: z
                          .boolean()
                          .describe(
                            "True if report should aggregate results from all targeted resources.\nFalse if report includes results for each resource.\n"
                          )
                          .default(false),
                        startInterval: z
                          .number()
                          .int()
                          .describe(
                            "The interval on which to generate a report.\n-1 indicates generate report at end of last interval.\n"
                          )
                          .default(-1),
                        numIntervals: z
                          .number()
                          .int()
                          .describe(
                            "The number of intervals to include in a report.\n-1 indicates that all intervals are to be included.\n"
                          )
                          .default(-1),
                        historical: z
                          .boolean()
                          .describe(
                            "True indicates report on intervals preceding startInterval.\nFalse indicates report on intervals following startInterval (e.g. forecast).\n"
                          )
                          .default(true),
                        frequency: z
                          .number()
                          .int()
                          .describe(
                            "Number of intervals that elapse between reports.\n-1 indicates same as numIntervals.\n"
                          )
                          .default(-1),
                        repeat: z
                          .number()
                          .int()
                          .describe(
                            "Number of times to repeat report.\n1 indicates generate one report.\n-1 indicates repeat indefinitely.\n"
                          )
                          .default(1),
                      })
                      .describe(
                        "An object that may be used to request a report from a VEN.\nSee OpenADR REST User Guide for detailed description of how configure a report request.\n"
                      )
                  )
                  .describe(
                    "A list of reportDescriptor objects. Used to request reports from VEN."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "A list of reportDescriptor objects. Used to request reports from VEN."
                  )
                  .default(null),
                payloadDescriptors: z
                  .array(
                    z
                      .object({
                        objectType: z
                          .string()
                          .describe(
                            "Used as discriminator, e.g. program.payloadDescriptors"
                          )
                          .default("EVENT_PAYLOAD_DESCRIPTOR"),
                        payloadType: z
                          .string()
                          .min(1)
                          .max(128)
                          .describe(
                            "Enumerated or private string signifying the nature of values."
                          ),
                        units: z
                          .string()
                          .describe("Units of measure.")
                          .default(null)
                          .nullable()
                          .describe("Units of measure.")
                          .default(null),
                        currency: z
                          .string()
                          .describe("Currency of price payload.")
                          .default("USD")
                          .nullable()
                          .describe("Currency of price payload.")
                          .default("USD"),
                      })
                      .describe(
                        "Contextual information used to interpret event valuesMap values.\nE.g. a PRICE payload simply contains a price value, an\nassociated descriptor provides necessary context such as units and currency.\n"
                      )
                  )
                  .describe("A list of payloadDescriptor objects.")
                  .default(null)
                  .nullable()
                  .describe("A list of payloadDescriptor objects.")
                  .default(null),
                intervalPeriod: z
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
                  )
                  .optional(),
                intervals: z
                  .array(
                    z
                      .object({
                        id: z
                          .number()
                          .int()
                          .describe(
                            "A client generated number assigned an interval object. Not a sequence number."
                          ),
                        intervalPeriod: z
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
                          )
                          .optional(),
                        payloads: z
                          .array(
                            z
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
                              )
                          )
                          .describe("A list of valuesMap objects."),
                      })
                      .describe(
                        "An object defining a temporal window and a list of valuesMaps.\nif intervalPeriod present may set temporal aspects of interval or override event.intervalPeriod.\n"
                      )
                  )
                  .describe("A list of interval objects."),
              })
              .describe(
                "Event object to communicate a Demand Response request to VEN.\nIf intervalPeriod is present, sets start time and duration of intervals.\n"
              ),
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("SUBSCRIPTION")
                  .describe("Used as discriminator, e.g. notification.object")
                  .optional(),
                clientName: z
                  .string()
                  .min(1)
                  .max(128)
                  .describe(
                    "User generated identifier, may be VEN identifier provisioned during program enrollment."
                  ),
                programID: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID."),
                objectOperations: z
                  .array(
                    z
                      .object({
                        objects: z
                          .array(
                            z
                              .enum([
                                "PROGRAM",
                                "EVENT",
                                "REPORT",
                                "SUBSCRIPTION",
                                "VEN",
                                "RESOURCE",
                              ])
                              .describe(
                                "Types of objects addressable through API."
                              )
                          )
                          .describe("list of objects to subscribe to."),
                        operations: z
                          .array(
                            z
                              .enum(["GET", "POST", "PUT", "DELETE"])
                              .describe("object operation to subscribe to.")
                          )
                          .describe("list of operations to subscribe to."),
                        callbackUrl: z
                          .string()
                          .url()
                          .describe("User provided webhook URL."),
                        bearerToken: z
                          .string()
                          .describe(
                            "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
                          )
                          .default(null)
                          .nullable()
                          .describe(
                            "User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n"
                          )
                          .default(null),
                      })
                      .describe("object type, operations, and callbackUrl.")
                  )
                  .describe("list of objects and operations to subscribe to."),
                targets: z
                  .array(
                    z
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
                      )
                  )
                  .describe(
                    "A list of valuesMap objects. Used by server to filter callbacks."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "A list of valuesMap objects. Used by server to filter callbacks."
                  )
                  .default(null),
              })
              .describe(
                "An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n"
              ),
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("VEN")
                  .describe("Used as discriminator, e.g. notification.object.")
                  .optional(),
                venName: z
                  .string()
                  .min(1)
                  .max(128)
                  .describe(
                    "User generated identifier, may be VEN identifier provisioned during program enrollment."
                  ),
                attributes: z
                  .array(
                    z
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
                      )
                  )
                  .describe(
                    "A list of valuesMap objects describing attributes."
                  )
                  .optional(),
                targets: z
                  .array(
                    z
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
                      )
                  )
                  .describe(
                    "A list of valuesMap objects describing target criteria."
                  )
                  .optional(),
                resources: z
                  .array(
                    z
                      .object({
                        id: z
                          .string()
                          .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                          .min(1)
                          .max(128)
                          .describe("URL safe VTN assigned object ID.")
                          .optional(),
                        createdDateTime: z
                          .string()
                          .datetime()
                          .describe("datetime in ISO 8601 format")
                          .default("0000-00-00"),
                        modificationDateTime: z
                          .string()
                          .datetime()
                          .describe("datetime in ISO 8601 format")
                          .default("0000-00-00"),
                        objectType: z
                          .literal("RESOURCE")
                          .describe(
                            "Used as discriminator, e.g. notification.object"
                          )
                          .optional(),
                        resourceName: z
                          .string()
                          .min(1)
                          .max(128)
                          .describe(
                            "User generated identifier, resource may be configured with identifier out-of-band."
                          ),
                        venID: z
                          .string()
                          .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                          .min(1)
                          .max(128)
                          .describe("URL safe VTN assigned object ID.")
                          .optional(),
                        attributes: z
                          .array(
                            z
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
                              )
                          )
                          .describe(
                            "A list of valuesMap objects describing attributes."
                          )
                          .optional(),
                        targets: z
                          .array(
                            z
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
                              )
                          )
                          .describe(
                            "A list of valuesMap objects describing target criteria."
                          )
                          .optional(),
                      })
                      .describe(
                        "A resource is an energy device or system subject to control by a VEN.\n"
                      )
                  )
                  .describe(
                    "A list of resource objects representing end-devices or systems."
                  )
                  .default(null)
                  .nullable()
                  .describe(
                    "A list of resource objects representing end-devices or systems."
                  )
                  .default(null),
              })
              .describe("Ven represents a client with the ven role."),
            z
              .object({
                id: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                createdDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                modificationDateTime: z
                  .string()
                  .datetime()
                  .describe("datetime in ISO 8601 format")
                  .default("0000-00-00"),
                objectType: z
                  .literal("RESOURCE")
                  .describe("Used as discriminator, e.g. notification.object")
                  .optional(),
                resourceName: z
                  .string()
                  .min(1)
                  .max(128)
                  .describe(
                    "User generated identifier, resource may be configured with identifier out-of-band."
                  ),
                venID: z
                  .string()
                  .regex(new RegExp("^[a-zA-Z0-9_-]*$"))
                  .min(1)
                  .max(128)
                  .describe("URL safe VTN assigned object ID.")
                  .optional(),
                attributes: z
                  .array(
                    z
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
                      )
                  )
                  .describe(
                    "A list of valuesMap objects describing attributes."
                  )
                  .optional(),
                targets: z
                  .array(
                    z
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
                      )
                  )
                  .describe(
                    "A list of valuesMap objects describing target criteria."
                  )
                  .optional(),
              })
              .describe(
                "A resource is an energy device or system subject to control by a VEN.\n"
              ),
          ];
          const errors = schemas.reduce(
            (errors: z.ZodError[], schema) =>
              ((result) =>
                "error" in result ? [...errors, result.error] : errors)(
                schema.safeParse(x)
              ),
            []
          );
          if (schemas.length - errors.length !== 1) {
            ctx.addIssue({
              path: ctx.path,
              code: "invalid_union",
              unionErrors: errors,
              message: "Invalid input: Should pass single schema",
            });
          }
        })
      )
      .describe("the object that is the subject of the notification."),
  })
  .describe(
    "VTN generated object included in request to subscription callbackUrl.\n"
  );