export interface Expert {
  id: number
  name: string
  avatar: string // 头像路径
  specialty: string // 擅长领域
}

export interface OrganizationDetails {
  name: string
  memberCount: number
  address: string
  personInCharge: string
  phone: string
  establishmentDate: string
  description: string
}
