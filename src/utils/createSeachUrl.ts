function createURL(params: { [key: string]: string | null }) {
  let encodedParams = "?";
  for (const [key, value] of Object.entries(params)) {
    if (value === null) continue;
    encodedParams += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  }
  if (encodedParams === "?") return null;
  encodedParams = encodedParams.slice(0, -1);

  return `/${encodedParams}`;
}
export { createURL };
