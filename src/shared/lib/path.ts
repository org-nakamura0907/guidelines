import { APP_BASE_PATH } from "../config";

/** `APP_BASE_PATH` を先頭に付与したパスを返す */
export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${APP_BASE_PATH}${normalizedPath}`;
}
