export const initialOrders = [
  {
    id: 'OD20260515001',
    guest: '张晨',
    roomType: '单人舱',
    store: '西宁高原夜宿体验店',
    slot: '场次A',
    status: '待入住',
    accessCode: 'A8D2K3',
    rating: null,
    ai: '未生成',
    createdAt: '19:42',
  },
  {
    id: 'OD20260515002',
    guest: '王琳',
    roomType: '双人舱',
    store: '西宁高原夜宿体验店',
    slot: '场次B',
    status: '入住中',
    accessCode: 'B7C9L5',
    rating: 58,
    ai: '档2：中低强度富氧',
    createdAt: '20:05',
  },
  {
    id: 'OD20260515003',
    guest: '李哲',
    roomType: 'VIP舱',
    store: '格尔木试点门店',
    slot: '场次A',
    status: '已反馈',
    accessCode: 'C568H2',
    rating: 72,
    ai: '档1：低强度富氧',
    createdAt: '08:16',
  },
  {
    id: 'OD20260515004',
    guest: '赵宁',
    roomType: '单人舱',
    store: '西宁高原夜宿体验店',
    slot: '场次C',
    status: '已取消',
    accessCode: 'D3F7R1',
    rating: null,
    ai: '未生成',
    createdAt: '09:12',
  },
]

export const initialPods = [
  { id: 'Pod 01', zone: 'A区', online: true, oxygen: 24.1, pressure: 1.02, temp: 22.8, humidity: 44, state: 'Normal' },
  { id: 'Pod 02', zone: 'A区', online: true, oxygen: 23.7, pressure: 1.01, temp: 22.1, humidity: 46, state: 'Normal' },
  { id: 'Pod 05', zone: 'B区', online: false, oxygen: 0, pressure: 0, temp: 0, humidity: 0, state: 'Zone Alert' },
  { id: 'Pod 08', zone: 'C区', online: true, oxygen: 24.4, pressure: 1.03, temp: 21.9, humidity: 43, state: 'Normal' },
]

export const initialFeedbacks = [
  {
    id: 'FB001',
    orderId: 'OD20260515002',
    rating: 3,
    tags: ['稍闷', '清醒较多'],
    suggestion: '建议提高新风与夜间维持强度',
    reply: '',
  },
  {
    id: 'FB002',
    orderId: 'OD20260515003',
    rating: 5,
    tags: ['体验好', '放松'],
    suggestion: '继续保持当前服务策略',
    reply: '',
  },
  {
    id: 'FB003',
    orderId: 'OD20260515001',
    rating: 4,
    tags: ['舒适', '安静'],
    suggestion: '建议入睡前继续开启低档供氧',
    reply: '',
  },
]

export const occupancySeed = [
  { label: 'Today', value: 70 },
  { label: '65%', value: 80 },
  { label: '70%', value: 65 },
  { label: 'This Month', value: 70 },
  { label: 'Whole Year', value: 80 },
]

export const utilizationSeed = [
  { label: '75%', value: 75 },
  { label: '80%', value: 80 },
  { label: '85%', value: 85 },
  { label: '88%', value: 88 },
  { label: '90%', value: 90 },
]