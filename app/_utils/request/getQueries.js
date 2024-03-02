export default function getQueries(request) {
  const query_entries = request.nextUrl.searchParams.entries();
  const output = {};
  for (const [key, val] of query_entries) {
    output[key] = val;
  }
  return output;
}
