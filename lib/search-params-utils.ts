
export function getSearchParam(searchParams: URLSearchParams | null, key: string): string | null {
  return searchParams?.get(key) ?? null
}

export function getSearchParamAsBoolean(searchParams: URLSearchParams | null, key: string): boolean {
  return searchParams?.get(key) === 'true'
}
