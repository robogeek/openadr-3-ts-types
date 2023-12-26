import { z } from "zod";
export default z.object({ "type": z.string().url().describe("An absolute URI that identifies the problem type.\nWhen dereferenced, it SHOULD provide human-readable documentation for the problem type\n(e.g., using HTML).\n").default("about:blank"), "title": z.string().describe("A short, summary of the problem type. Written in english and readable\nfor engineers (usually not suited for non technical stakeholders and\nnot localized); example: Service Unavailable.\n").optional(), "status": z.number().int().gte(100).lt(600).describe("The HTTP status code generated by the origin server for this occurrence\nof the problem.\n").optional(), "detail": z.string().describe("A human readable explanation specific to this occurrence of the\nproblem.\n").optional(), "instance": z.string().url().describe("An absolute URI that identifies the specific occurrence of the problem.\nIt may or may not yield further information if dereferenced.\n").optional() }).describe("reusable error response. From https://opensource.zalando.com/problem/schema.yaml.\n");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9kLXByb2JsZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvem9kL3pvZC1wcm9ibGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFeEIsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsa0tBQWtLLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsOExBQThMLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLDRGQUE0RixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkVBQTZFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5SUFBeUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMscUZBQXFGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHoub2JqZWN0KHsgXCJ0eXBlXCI6IHouc3RyaW5nKCkudXJsKCkuZGVzY3JpYmUoXCJBbiBhYnNvbHV0ZSBVUkkgdGhhdCBpZGVudGlmaWVzIHRoZSBwcm9ibGVtIHR5cGUuXFxuV2hlbiBkZXJlZmVyZW5jZWQsIGl0IFNIT1VMRCBwcm92aWRlIGh1bWFuLXJlYWRhYmxlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBwcm9ibGVtIHR5cGVcXG4oZS5nLiwgdXNpbmcgSFRNTCkuXFxuXCIpLmRlZmF1bHQoXCJhYm91dDpibGFua1wiKSwgXCJ0aXRsZVwiOiB6LnN0cmluZygpLmRlc2NyaWJlKFwiQSBzaG9ydCwgc3VtbWFyeSBvZiB0aGUgcHJvYmxlbSB0eXBlLiBXcml0dGVuIGluIGVuZ2xpc2ggYW5kIHJlYWRhYmxlXFxuZm9yIGVuZ2luZWVycyAodXN1YWxseSBub3Qgc3VpdGVkIGZvciBub24gdGVjaG5pY2FsIHN0YWtlaG9sZGVycyBhbmRcXG5ub3QgbG9jYWxpemVkKTsgZXhhbXBsZTogU2VydmljZSBVbmF2YWlsYWJsZS5cXG5cIikub3B0aW9uYWwoKSwgXCJzdGF0dXNcIjogei5udW1iZXIoKS5pbnQoKS5ndGUoMTAwKS5sdCg2MDApLmRlc2NyaWJlKFwiVGhlIEhUVFAgc3RhdHVzIGNvZGUgZ2VuZXJhdGVkIGJ5IHRoZSBvcmlnaW4gc2VydmVyIGZvciB0aGlzIG9jY3VycmVuY2VcXG5vZiB0aGUgcHJvYmxlbS5cXG5cIikub3B0aW9uYWwoKSwgXCJkZXRhaWxcIjogei5zdHJpbmcoKS5kZXNjcmliZShcIkEgaHVtYW4gcmVhZGFibGUgZXhwbGFuYXRpb24gc3BlY2lmaWMgdG8gdGhpcyBvY2N1cnJlbmNlIG9mIHRoZVxcbnByb2JsZW0uXFxuXCIpLm9wdGlvbmFsKCksIFwiaW5zdGFuY2VcIjogei5zdHJpbmcoKS51cmwoKS5kZXNjcmliZShcIkFuIGFic29sdXRlIFVSSSB0aGF0IGlkZW50aWZpZXMgdGhlIHNwZWNpZmljIG9jY3VycmVuY2Ugb2YgdGhlIHByb2JsZW0uXFxuSXQgbWF5IG9yIG1heSBub3QgeWllbGQgZnVydGhlciBpbmZvcm1hdGlvbiBpZiBkZXJlZmVyZW5jZWQuXFxuXCIpLm9wdGlvbmFsKCkgfSkuZGVzY3JpYmUoXCJyZXVzYWJsZSBlcnJvciByZXNwb25zZS4gRnJvbSBodHRwczovL29wZW5zb3VyY2UuemFsYW5kby5jb20vcHJvYmxlbS9zY2hlbWEueWFtbC5cXG5cIik7XG4iXX0=