import type { ICredentials } from '@/types/api.types'

export function buildUrl(
  credentials: ICredentials,
  method: string,
  ...params: (string | number)[]
) {
  const { apiUrl, idInstance, apiTokenInstance } = credentials
  const base = apiUrl.replace(/\/+$/, '')
  const tail = params.length ? '/' + params.join('/') : ''

  return `${base}/waInstance${idInstance}/${method}/${apiTokenInstance}${tail}`
}
