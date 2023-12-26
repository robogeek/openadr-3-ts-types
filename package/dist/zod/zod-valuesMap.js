import { z } from "zod";
export default z.object({ "type": z.string().min(1).max(128).describe("Enumerated or private string signifying the nature of values.\nE.G. \"PRICE\" indicates value is to be interpreted as a currency.\n"), "values": z.array(z.union([z.number(), z.number().int(), z.string(), z.boolean(), z.object({ "x": z.number().nullable().describe("A value on an x axis.").default(null), "y": z.number().nullable().describe("A value on a y axis.").default(null) }).describe("A pair of floats typically used as a point on a 2 dimensional grid.")])).describe("A list of data points. Most often a singular value such as a price.") }).describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXZhbHVlc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXZhbHVlc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMscUlBQXFJLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyw4R0FBOEcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgei5vYmplY3QoeyBcInR5cGVcIjogei5zdHJpbmcoKS5taW4oMSkubWF4KDEyOCkuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXFxuRS5HLiBcXFwiUFJJQ0VcXFwiIGluZGljYXRlcyB2YWx1ZSBpcyB0byBiZSBpbnRlcnByZXRlZCBhcyBhIGN1cnJlbmN5LlxcblwiKSwgXCJ2YWx1ZXNcIjogei5hcnJheSh6LnVuaW9uKFt6Lm51bWJlcigpLCB6Lm51bWJlcigpLmludCgpLCB6LnN0cmluZygpLCB6LmJvb2xlYW4oKSwgei5vYmplY3QoeyBcInhcIjogei5udW1iZXIoKS5udWxsYWJsZSgpLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhbiB4IGF4aXMuXCIpLmRlZmF1bHQobnVsbCksIFwieVwiOiB6Lm51bWJlcigpLm51bGxhYmxlKCkuZGVzY3JpYmUoXCJBIHZhbHVlIG9uIGEgeSBheGlzLlwiKS5kZWZhdWx0KG51bGwpIH0pLmRlc2NyaWJlKFwiQSBwYWlyIG9mIGZsb2F0cyB0eXBpY2FsbHkgdXNlZCBhcyBhIHBvaW50IG9uIGEgMiBkaW1lbnNpb25hbCBncmlkLlwiKV0pKS5kZXNjcmliZShcIkEgbGlzdCBvZiBkYXRhIHBvaW50cy4gTW9zdCBvZnRlbiBhIHNpbmd1bGFyIHZhbHVlIHN1Y2ggYXMgYSBwcmljZS5cIikgfSkuZGVzY3JpYmUoXCJSZXByZXNlbnRzIG9uZSBvciBtb3JlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSB0eXBlLlxcbkUuZy4gYSB0eXBlIG9mIFBSSUNFIGNvbnRhaW5zIGEgc2luZ2xlIGZsb2F0IHZhbHVlLlxcblwiKTtcbiJdfQ==