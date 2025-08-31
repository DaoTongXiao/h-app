// 机构列表项
export interface Organization {
  id: number
  name: string
  phone: string
  memberCount: number
  address: string
}

// 专家列表项
export interface Expert {
  id: number
  name: string
  avatar: string
  casesMediated: number // 已调解案件数
  organization: string // 所属机构
  specialty: string // 擅长领域
}
