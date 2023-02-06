import { useAppSelector } from "../app/hooks";
import { selectParams } from "../features/paramsSlice";

function createURL() {
  const { params } = useAppSelector(selectParams);
  let encodedParams = "";
  for (const [key, value] of Object.entries(params)) {
    if (value === null) continue;
    encodedParams += `?${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}&`;
  }
  encodedParams = encodedParams.slice(0, -1);
  return encodedParams.length > 0 ? `/result/${encodedParams}` : null;
}
export { createURL };
