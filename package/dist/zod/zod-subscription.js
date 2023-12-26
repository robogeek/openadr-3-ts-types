import { z } from "zod";
export default z.object({ "id": z.string().regex(new RegExp("^[a-zA-Z0-9_-]*$")).min(1).max(128).describe("URL safe VTN assigned object ID.").optional(), "createdDateTime": z.string().datetime().describe("datetime in ISO 8601 format").optional(), "modificationDateTime": z.string().datetime().describe("datetime in ISO 8601 format").optional(), "objectType": z.literal("SUBSCRIPTION").describe("Used as discriminator, e.g. notification.object").optional(), "clientName": z.string().min(1).max(128).describe("User generated identifier, may be VEN identifier provisioned during program enrollment."), "programID": z.string().regex(new RegExp("^[a-zA-Z0-9_-]*$")).min(1).max(128).describe("URL safe VTN assigned object ID."), "objectOperations": z.array(z.object({ "objects": z.array(z.enum(["PROGRAM", "EVENT", "REPORT", "SUBSCRIPTION", "VEN", "RESOURCE"]).describe("Types of objects addressable through API.")).describe("list of objects to subscribe to."), "operations": z.array(z.enum(["GET", "POST", "PUT", "DELETE"]).describe("object operation to subscribe to.")).describe("list of operations to subscribe to."), "callbackUrl": z.string().url().describe("User provided webhook URL."), "bearerToken": z.string().nullable().describe("User provided token.\nTo avoid custom integrations, callback endpoints\nshould accept the provided bearer token to authenticate VTN requests.\n").default(null) }).describe("object type, operations, and callbackUrl.")).describe("list of objects and operations to subscribe to."), "targets": z.array(z.object({ "type": z.string().min(1).max(128).describe("Enumerated or private string signifying the nature of values.\nE.G. \"PRICE\" indicates value is to be interpreted as a currency.\n"), "values": z.array(z.union([z.number(), z.number().int(), z.string(), z.boolean(), z.object({ "x": z.number().nullable().describe("A value on an x axis.").default(null), "y": z.number().nullable().describe("A value on a y axis.").default(null) }).describe("A pair of floats typically used as a point on a 2 dimensional grid.")])).describe("A list of data points. Most often a singular value such as a price.") }).describe("Represents one or more values associated with a type.\nE.g. a type of PRICE contains a single float value.\n")).nullable().describe("A list of valuesMap objects. Used by server to filter callbacks.").default(null) }).describe("An object created by a client to receive notification of operations on objects.\nClients may subscribe to be notified when a type of object is created,\nupdated, or deleted.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXN1YnNjcmlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy96b2Qvem9kLXN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXhCLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLGlEQUFpRCxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx5RkFBeUYsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUpBQWlKLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGlEQUFpRCxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMscUlBQXFJLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFFQUFxRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyw4R0FBOEcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLGtFQUFrRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsaUxBQWlMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHoub2JqZWN0KHsgXCJpZFwiOiB6LnN0cmluZygpLnJlZ2V4KG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOV8tXSokXCIpKS5taW4oMSkubWF4KDEyOCkuZGVzY3JpYmUoXCJVUkwgc2FmZSBWVE4gYXNzaWduZWQgb2JqZWN0IElELlwiKS5vcHRpb25hbCgpLCBcImNyZWF0ZWREYXRlVGltZVwiOiB6LnN0cmluZygpLmRhdGV0aW1lKCkuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikub3B0aW9uYWwoKSwgXCJtb2RpZmljYXRpb25EYXRlVGltZVwiOiB6LnN0cmluZygpLmRhdGV0aW1lKCkuZGVzY3JpYmUoXCJkYXRldGltZSBpbiBJU08gODYwMSBmb3JtYXRcIikub3B0aW9uYWwoKSwgXCJvYmplY3RUeXBlXCI6IHoubGl0ZXJhbChcIlNVQlNDUklQVElPTlwiKS5kZXNjcmliZShcIlVzZWQgYXMgZGlzY3JpbWluYXRvciwgZS5nLiBub3RpZmljYXRpb24ub2JqZWN0XCIpLm9wdGlvbmFsKCksIFwiY2xpZW50TmFtZVwiOiB6LnN0cmluZygpLm1pbigxKS5tYXgoMTI4KS5kZXNjcmliZShcIlVzZXIgZ2VuZXJhdGVkIGlkZW50aWZpZXIsIG1heSBiZSBWRU4gaWRlbnRpZmllciBwcm92aXNpb25lZCBkdXJpbmcgcHJvZ3JhbSBlbnJvbGxtZW50LlwiKSwgXCJwcm9ncmFtSURcIjogei5zdHJpbmcoKS5yZWdleChuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlfLV0qJFwiKSkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiVVJMIHNhZmUgVlROIGFzc2lnbmVkIG9iamVjdCBJRC5cIiksIFwib2JqZWN0T3BlcmF0aW9uc1wiOiB6LmFycmF5KHoub2JqZWN0KHsgXCJvYmplY3RzXCI6IHouYXJyYXkoei5lbnVtKFtcIlBST0dSQU1cIixcIkVWRU5UXCIsXCJSRVBPUlRcIixcIlNVQlNDUklQVElPTlwiLFwiVkVOXCIsXCJSRVNPVVJDRVwiXSkuZGVzY3JpYmUoXCJUeXBlcyBvZiBvYmplY3RzIGFkZHJlc3NhYmxlIHRocm91Z2ggQVBJLlwiKSkuZGVzY3JpYmUoXCJsaXN0IG9mIG9iamVjdHMgdG8gc3Vic2NyaWJlIHRvLlwiKSwgXCJvcGVyYXRpb25zXCI6IHouYXJyYXkoei5lbnVtKFtcIkdFVFwiLFwiUE9TVFwiLFwiUFVUXCIsXCJERUxFVEVcIl0pLmRlc2NyaWJlKFwib2JqZWN0IG9wZXJhdGlvbiB0byBzdWJzY3JpYmUgdG8uXCIpKS5kZXNjcmliZShcImxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBzdWJzY3JpYmUgdG8uXCIpLCBcImNhbGxiYWNrVXJsXCI6IHouc3RyaW5nKCkudXJsKCkuZGVzY3JpYmUoXCJVc2VyIHByb3ZpZGVkIHdlYmhvb2sgVVJMLlwiKSwgXCJiZWFyZXJUb2tlblwiOiB6LnN0cmluZygpLm51bGxhYmxlKCkuZGVzY3JpYmUoXCJVc2VyIHByb3ZpZGVkIHRva2VuLlxcblRvIGF2b2lkIGN1c3RvbSBpbnRlZ3JhdGlvbnMsIGNhbGxiYWNrIGVuZHBvaW50c1xcbnNob3VsZCBhY2NlcHQgdGhlIHByb3ZpZGVkIGJlYXJlciB0b2tlbiB0byBhdXRoZW50aWNhdGUgVlROIHJlcXVlc3RzLlxcblwiKS5kZWZhdWx0KG51bGwpIH0pLmRlc2NyaWJlKFwib2JqZWN0IHR5cGUsIG9wZXJhdGlvbnMsIGFuZCBjYWxsYmFja1VybC5cIikpLmRlc2NyaWJlKFwibGlzdCBvZiBvYmplY3RzIGFuZCBvcGVyYXRpb25zIHRvIHN1YnNjcmliZSB0by5cIiksIFwidGFyZ2V0c1wiOiB6LmFycmF5KHoub2JqZWN0KHsgXCJ0eXBlXCI6IHouc3RyaW5nKCkubWluKDEpLm1heCgxMjgpLmRlc2NyaWJlKFwiRW51bWVyYXRlZCBvciBwcml2YXRlIHN0cmluZyBzaWduaWZ5aW5nIHRoZSBuYXR1cmUgb2YgdmFsdWVzLlxcbkUuRy4gXFxcIlBSSUNFXFxcIiBpbmRpY2F0ZXMgdmFsdWUgaXMgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBjdXJyZW5jeS5cXG5cIiksIFwidmFsdWVzXCI6IHouYXJyYXkoei51bmlvbihbei5udW1iZXIoKSwgei5udW1iZXIoKS5pbnQoKSwgei5zdHJpbmcoKSwgei5ib29sZWFuKCksIHoub2JqZWN0KHsgXCJ4XCI6IHoubnVtYmVyKCkubnVsbGFibGUoKS5kZXNjcmliZShcIkEgdmFsdWUgb24gYW4geCBheGlzLlwiKS5kZWZhdWx0KG51bGwpLCBcInlcIjogei5udW1iZXIoKS5udWxsYWJsZSgpLmRlc2NyaWJlKFwiQSB2YWx1ZSBvbiBhIHkgYXhpcy5cIikuZGVmYXVsdChudWxsKSB9KS5kZXNjcmliZShcIkEgcGFpciBvZiBmbG9hdHMgdHlwaWNhbGx5IHVzZWQgYXMgYSBwb2ludCBvbiBhIDIgZGltZW5zaW9uYWwgZ3JpZC5cIildKSkuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgZGF0YSBwb2ludHMuIE1vc3Qgb2Z0ZW4gYSBzaW5ndWxhciB2YWx1ZSBzdWNoIGFzIGEgcHJpY2UuXCIpIH0pLmRlc2NyaWJlKFwiUmVwcmVzZW50cyBvbmUgb3IgbW9yZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEgdHlwZS5cXG5FLmcuIGEgdHlwZSBvZiBQUklDRSBjb250YWlucyBhIHNpbmdsZSBmbG9hdCB2YWx1ZS5cXG5cIikpLm51bGxhYmxlKCkuZGVzY3JpYmUoXCJBIGxpc3Qgb2YgdmFsdWVzTWFwIG9iamVjdHMuIFVzZWQgYnkgc2VydmVyIHRvIGZpbHRlciBjYWxsYmFja3MuXCIpLmRlZmF1bHQobnVsbCkgfSkuZGVzY3JpYmUoXCJBbiBvYmplY3QgY3JlYXRlZCBieSBhIGNsaWVudCB0byByZWNlaXZlIG5vdGlmaWNhdGlvbiBvZiBvcGVyYXRpb25zIG9uIG9iamVjdHMuXFxuQ2xpZW50cyBtYXkgc3Vic2NyaWJlIHRvIGJlIG5vdGlmaWVkIHdoZW4gYSB0eXBlIG9mIG9iamVjdCBpcyBjcmVhdGVkLFxcbnVwZGF0ZWQsIG9yIGRlbGV0ZWQuXFxuXCIpO1xuIl19