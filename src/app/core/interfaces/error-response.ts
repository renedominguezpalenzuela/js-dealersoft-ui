export interface ErrorResponse {
  status: number,
  name: string,
  message: string,
  details?: { errors: { path: [string], message: string, name: string }[] }
}
