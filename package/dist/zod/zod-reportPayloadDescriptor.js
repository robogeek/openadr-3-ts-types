import { z } from "zod";
export default z.object({ "objectType": z.string().describe("Used as discriminator, e.g. program.payloadDescriptors").default("REPORT_PAYLOAD_DESCRIPTOR"), "payloadType": z.string().min(1).max(128).describe("Enumerated or private string signifying the nature of values."), "readingType": z.string().nullable().describe("Enumerated or private string signifying the type of reading.").default(null), "units": z.string().nullable().describe("Units of measure.").default(null), "accuracy": z.number().nullable().describe("A quantification of the accuracy of a set of payload values.").default(null), "confidence": z.number().int().gte(0).lte(100).describe("A quantification of the confidence in a set of payload values.").default(100) }).describe("Contextual information used to interpret report payload values.\nE.g. a USAGE payload simply contains a usage value, an\nassociated descriptor provides necessary context such as units and data quality.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXJlcG9ydFBheWxvYWREZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3pvZC96b2QtcmVwb3J0UGF5bG9hZERlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUV4QixlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsK0RBQStELENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGdFQUFnRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsNk1BQTZNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHoub2JqZWN0KHsgXCJvYmplY3RUeXBlXCI6IHouc3RyaW5nKCkuZGVzY3JpYmUoXCJVc2VkIGFzIGRpc2NyaW1pbmF0b3IsIGUuZy4gcHJvZ3JhbS5wYXlsb2FkRGVzY3JpcHRvcnNcIikuZGVmYXVsdChcIlJFUE9SVF9QQVlMT0FEX0RFU0NSSVBUT1JcIiksIFwicGF5bG9hZFR5cGVcIjogei5zdHJpbmcoKS5taW4oMSkubWF4KDEyOCkuZGVzY3JpYmUoXCJFbnVtZXJhdGVkIG9yIHByaXZhdGUgc3RyaW5nIHNpZ25pZnlpbmcgdGhlIG5hdHVyZSBvZiB2YWx1ZXMuXCIpLCBcInJlYWRpbmdUeXBlXCI6IHouc3RyaW5nKCkubnVsbGFibGUoKS5kZXNjcmliZShcIkVudW1lcmF0ZWQgb3IgcHJpdmF0ZSBzdHJpbmcgc2lnbmlmeWluZyB0aGUgdHlwZSBvZiByZWFkaW5nLlwiKS5kZWZhdWx0KG51bGwpLCBcInVuaXRzXCI6IHouc3RyaW5nKCkubnVsbGFibGUoKS5kZXNjcmliZShcIlVuaXRzIG9mIG1lYXN1cmUuXCIpLmRlZmF1bHQobnVsbCksIFwiYWNjdXJhY3lcIjogei5udW1iZXIoKS5udWxsYWJsZSgpLmRlc2NyaWJlKFwiQSBxdWFudGlmaWNhdGlvbiBvZiB0aGUgYWNjdXJhY3kgb2YgYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCIpLmRlZmF1bHQobnVsbCksIFwiY29uZmlkZW5jZVwiOiB6Lm51bWJlcigpLmludCgpLmd0ZSgwKS5sdGUoMTAwKS5kZXNjcmliZShcIkEgcXVhbnRpZmljYXRpb24gb2YgdGhlIGNvbmZpZGVuY2UgaW4gYSBzZXQgb2YgcGF5bG9hZCB2YWx1ZXMuXCIpLmRlZmF1bHQoMTAwKSB9KS5kZXNjcmliZShcIkNvbnRleHR1YWwgaW5mb3JtYXRpb24gdXNlZCB0byBpbnRlcnByZXQgcmVwb3J0IHBheWxvYWQgdmFsdWVzLlxcbkUuZy4gYSBVU0FHRSBwYXlsb2FkIHNpbXBseSBjb250YWlucyBhIHVzYWdlIHZhbHVlLCBhblxcbmFzc29jaWF0ZWQgZGVzY3JpcHRvciBwcm92aWRlcyBuZWNlc3NhcnkgY29udGV4dCBzdWNoIGFzIHVuaXRzIGFuZCBkYXRhIHF1YWxpdHkuXFxuXCIpO1xuIl19