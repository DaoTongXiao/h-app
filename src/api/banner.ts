import { http } from '@/utils/http'
import type { BannerItem } from '@/types/api'

export const getBannerAPI = (data: string) => {
  return http<BannerItem[]>({
    url: '/banner?type=' + data,
    method: 'GET',
  })
}
