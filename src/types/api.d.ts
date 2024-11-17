interface Status {
  code: number
  message: string
}

interface ApiResponse<T> {
  data: T
  status: Status
}
