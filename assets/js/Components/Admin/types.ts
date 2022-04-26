export interface userCountInterface {
  /* eslint-disable camelcase */
  last_seen: string
  pgcr_allocation: number
  pgcr_count: number
  unique_name: string
  /* eslint-enable camelcase */
}

export interface userCountResponse {
  errorStatus?: string
  message?: string
  pgcrCount?: number
  userCount?: number
  Response?: userCountInterface[]
}

export interface manifestResponseInterface {
  errorStatus?: string
  message?: string
  Response?: manifestDataInterface
}

export interface manifestDataInterface {
  manifestData: {
    categories: string[]
    categoriesCount: number
    items: number
  }
  manifestVersion: {
  /* eslint-disable camelcase */
    current_revision: number
    current_version: string
    update_date: string
    update_successful: boolean
    update_type: string
  /* eslint-enable camelcase */
  }
}
