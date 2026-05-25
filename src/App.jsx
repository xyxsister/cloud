import './App.css'
import React, { useEffect, useMemo, useState } from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquareText,
  Activity,
  BarChart3,
  Search,
  Bell,
  User,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Store,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  MessageCircleReply,
  Sparkles,
  TrendingUp,
  Wallet,
  Building2,
  BedDouble,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const stores = [
  '全部门店',
  '西宁高原夜宿体验店',
  '格尔木试点门店',
  '青海湖测试门店',
  '德令哈星空供氧店',
  '玉树高原康养店',
  '香格里拉轻氧民宿店',
  '拉萨夜宿氧舱体验店',
  '那曲高原舒眠服务店',
]

const actualStores = stores.slice(1)

const initialOrders = [
  { id: 'OD20260515001', guest: '张晨', roomType: '单人舱', store: '西宁高原夜宿体验店', slot: '场次A', status: '待入住', accessCode: 'A8D2K3', rating: null, ai: '未生成', oxygenPlan: '-', checkinTime: '-', createdAt: '19:42', unitPrice: 199, quantity: 1, paidAmount: 0, paymentStatus: '待支付', cost: 62, refundAmount: 0 },
  { id: 'OD20260515002', guest: '王琳', roomType: '双人舱', store: '西宁高原夜宿体验店', slot: '场次B', status: '入住中', accessCode: 'B7C9L5', rating: 58, ai: '档2：中低强度富氧', oxygenPlan: '夜间维持模式', checkinTime: '20:05', createdAt: '20:05', unitPrice: 299, quantity: 1, paidAmount: 299, paymentStatus: '已支付', cost: 108, refundAmount: 0 },
  { id: 'OD20260515003', guest: '李哲', roomType: 'VIP舱', store: '格尔木试点门店', slot: '场次A', status: '已反馈', accessCode: 'C568H2', rating: 72, ai: '档1：低强度富氧', oxygenPlan: '舒适维持模式', checkinTime: '20:13', createdAt: '08:16', unitPrice: 399, quantity: 1, paidAmount: 399, paymentStatus: '已支付', cost: 155, refundAmount: 0 },
  { id: 'OD20260515004', guest: '赵宁', roomType: '单人舱', store: '西宁高原夜宿体验店', slot: '场次C', status: '已取消', accessCode: 'D3F7R1', rating: null, ai: '未生成', oxygenPlan: '-', checkinTime: '-', createdAt: '09:12', unitPrice: 199, quantity: 1, paidAmount: 0, paymentStatus: '已关闭', cost: 12, refundAmount: 0 },
  { id: 'OD20260515005', guest: '刘悦', roomType: '家庭舱', store: '青海湖测试门店', slot: '场次A', status: '待入住', accessCode: 'E1M5Q8', rating: null, ai: '未生成', oxygenPlan: '-', checkinTime: '-', createdAt: '11:07', unitPrice: 499, quantity: 1, paidAmount: 499, paymentStatus: '已支付', cost: 198, refundAmount: 0 },
  { id: 'OD20260515006', guest: '许杰', roomType: '单人舱', store: '格尔木试点门店', slot: '场次B', status: '已反馈', accessCode: 'F6L2W4', rating: 83, ai: '档1：舒适维持', oxygenPlan: '低档持续', checkinTime: '21:26', createdAt: '07:45', unitPrice: 199, quantity: 1, paidAmount: 199, paymentStatus: '已支付', cost: 64, refundAmount: 0 },
  { id: 'OD20260515007', guest: '宋敏', roomType: '双人舱', store: '西宁高原夜宿体验店', slot: '场次A', status: '入住中', accessCode: 'G4N8P6', rating: 64, ai: '档2：中低强度富氧', oxygenPlan: '入睡前提升', checkinTime: '20:31', createdAt: '20:31', unitPrice: 299, quantity: 1, paidAmount: 299, paymentStatus: '已支付', cost: 112, refundAmount: 0 },
  { id: 'OD20260515008', guest: '陈凯', roomType: 'VIP舱', store: '青海湖测试门店', slot: '场次C', status: '待入住', accessCode: 'H2R9K1', rating: null, ai: '未生成', oxygenPlan: '-', checkinTime: '-', createdAt: '14:56', unitPrice: 399, quantity: 1, paidAmount: 0, paymentStatus: '待支付', cost: 150, refundAmount: 0 },
]

const initialPods = [
  { id: 'Pod 01', zone: 'A区', store: '西宁高原夜宿体验店', online: true, oxygen: 24.1, pressure: 1.02, temp: 22.8, humidity: 44, state: 'Normal' },
  { id: 'Pod 02', zone: 'A区', store: '西宁高原夜宿体验店', online: true, oxygen: 23.7, pressure: 1.01, temp: 22.1, humidity: 46, state: 'Normal' },
  { id: 'Pod 05', zone: 'B区', store: '格尔木试点门店', online: false, oxygen: 0, pressure: 0, temp: 0, humidity: 0, state: 'Zone Alert' },
  { id: 'Pod 08', zone: 'C区', store: '青海湖测试门店', online: true, oxygen: 24.4, pressure: 1.03, temp: 21.9, humidity: 43, state: 'Normal' },
  { id: 'Pod 09', zone: 'C区', store: '青海湖测试门店', online: true, oxygen: 23.9, pressure: 1.02, temp: 22.4, humidity: 45, state: 'Normal' },
  { id: 'Pod 10', zone: 'D区', store: '格尔木试点门店', online: true, oxygen: 24.0, pressure: 1.01, temp: 22.2, humidity: 42, state: 'Normal' },
  { id: 'Pod 11', zone: 'A区', store: '德令哈星空供氧店', online: true, oxygen: 24.3, pressure: 1.02, temp: 21.8, humidity: 41, state: 'Normal' },
  { id: 'Pod 12', zone: 'B区', store: '玉树高原康养店', online: true, oxygen: 23.8, pressure: 1.01, temp: 22.0, humidity: 43, state: 'Normal' },
  { id: 'Pod 13', zone: 'C区', store: '香格里拉轻氧民宿店', online: true, oxygen: 24.2, pressure: 1.03, temp: 22.5, humidity: 46, state: 'Normal' },
  { id: 'Pod 14', zone: 'A区', store: '拉萨夜宿氧舱体验店', online: true, oxygen: 23.9, pressure: 1.01, temp: 22.2, humidity: 44, state: 'Normal' },
  { id: 'Pod 15', zone: 'D区', store: '那曲高原舒眠服务店', online: false, oxygen: 0, pressure: 0, temp: 0, humidity: 0, state: 'Zone Alert' },
]

const initialFeedbacks = [
  { id: 'FB001', orderId: 'OD20260515002', guest: '王琳', rating: 3, tags: ['稍闷', '清醒较多'], suggestion: '建议提高新风与夜间维持强度', reply: '', time: '08:20' },
  { id: 'FB002', orderId: 'OD20260515003', guest: '李哲', rating: 5, tags: ['体验好', '放松'], suggestion: '继续保持当前服务策略', reply: '', time: '08:28' },
  { id: 'FB003', orderId: 'OD20260515001', guest: '张晨', rating: 4, tags: ['舒适', '安静'], suggestion: '建议入睡前继续开启低档供氧', reply: '', time: '09:02' },
  { id: 'FB004', orderId: 'OD20260515006', guest: '许杰', rating: 2, tags: ['头痛', '夜醒'], suggestion: '建议切换重点优化策略并复核舱位参数', reply: '', time: '09:25' },
]

const guestPool = ['韩涛', '孙悦', '周琳', '吴楠', '赵可', '林晨', '何倩', '蒋峰', '杜雨', '彭涛']
const roomPriceMap = {
  单人舱: 199,
  双人舱: 299,
  VIP舱: 399,
  家庭舱: 499,
}
const roomCostMap = {
  单人舱: 62,
  双人舱: 108,
  VIP舱: 155,
  家庭舱: 198,
}
const roomTypes = Object.keys(roomPriceMap)
const slots = ['场次A', '场次B', '场次C']
const feedbackTemplates = [
  { rating: 5, tags: ['体验好', '安静'], suggestion: '保持当前策略' },
  { rating: 4, tags: ['舒适', '睡得更稳'], suggestion: '建议维持当前低档供氧' },
  { rating: 3, tags: ['稍闷', '夜醒'], suggestion: '建议提高新风频率' },
  { rating: 2, tags: ['头痛', '不适'], suggestion: '建议重点优化供氧参数并人工复核' },
]
const occupancySeed = [
  { label: 'Today', value: 70 },
  { label: '65%', value: 80 },
  { label: '70%', value: 65 },
  { label: 'This Month', value: 70 },
  { label: 'Whole Year', value: 80 },
]
const utilizationSeed = [
  { label: '75%', value: 75 },
  { label: '80%', value: 80 },
  { label: '85%', value: 85 },
  { label: '88%', value: 88 },
  { label: '90%', value: 90 },
]

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeOrderId() {
  return `OD${Date.now()}${Math.floor(Math.random() * 90 + 10)}`
}

function makeAccessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function randomPickStore(selectedStore) {
  return selectedStore === '全部门店' ? randomPick(actualStores) : selectedStore
}

function makeNewOrder(store) {
  const roomType = randomPick(roomTypes)
  const paid = Math.random() > 0.35
  return {
    id: makeOrderId(),
    guest: randomPick(guestPool),
    roomType,
    store,
    slot: randomPick(slots),
    status: '待入住',
    accessCode: makeAccessCode(),
    rating: null,
    ai: '未生成',
    oxygenPlan: '-',
    checkinTime: '-',
    createdAt: toClock(),
    unitPrice: roomPriceMap[roomType],
    quantity: 1,
    paidAmount: paid ? roomPriceMap[roomType] : 0,
    paymentStatus: paid ? '已支付' : '待支付',
    cost: roomCostMap[roomType],
    refundAmount: 0,
  }
}

function seededMonthDataForStore(storeName) {
  const offset = actualStores.indexOf(storeName) + 1
  const days = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1
    const weekdayBoost = i % 7 === 5 || i % 7 === 6 ? 1.18 : 1
    const seasonal = 0.88 + ((i % 9) * 0.025)
    const orderCount = Math.round((10 + offset * 1.5 + (i % 6) * 1.2) * weekdayBoost * seasonal)
    const revenue = Math.round(orderCount * (238 + offset * 8 + ((i % 5) * 6)))
    const profit = Math.round(revenue * (0.34 + offset * 0.008))
    return {
      day: `${day}日`,
      revenue,
      profit,
      orders: orderCount,
    }
  })
  return days
}

const monthlyBaseByStore = Object.fromEntries(actualStores.map((s) => [s, seededMonthDataForStore(s)]))

function cn(...xs) {
  return xs.filter(Boolean).join(' ')
}

function statusTone(status) {
  if (status === '已完成' || status === '已反馈') return 'badge badge-green'
  if (status === '入住中') return 'badge badge-blue'
  if (status === '待入住') return 'badge badge-yellow'
  if (status === '已取消') return 'badge badge-red'
  return 'badge badge-default'
}

function podTone(pod) {
  return pod.online ? 'status-online' : 'status-offline'
}

function fakeNextValue(current, min, max, step = 0.3) {
  const delta = (Math.random() * 2 - 1) * step
  const next = Number((current + delta).toFixed(1))
  return Math.max(min, Math.min(max, next))
}

function toClock() {
  return new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">{title}</div>
          <button className="icon-circle" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [orders, setOrders] = useState(initialOrders)
  const [pods, setPods] = useState(initialPods)
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [keyword, setKeyword] = useState('')
  const [selectedStore, setSelectedStore] = useState('全部门店')
  const [selectedOrder, setSelectedOrder] = useState(initialOrders[1])
  const [selectedPod, setSelectedPod] = useState(initialPods[0])
  const [orderPage, setOrderPage] = useState(1)
  const [feedbackPage, setFeedbackPage] = useState(1)
  const [timeline, setTimeline] = useState([
    { time: '19:42', text: '订单 OD20260515001 已完成预约' },
    { time: '20:05', text: '2号舱开始入住，状态切换为入住中' },
    { time: '08:16', text: '订单 OD20260515002 已提交睡眠反馈' },
    { time: '08:17', text: 'AI建议已生成，评分 58' },
  ])
  const [occupancy, setOccupancy] = useState(occupancySeed)
  const [utilization, setUtilization] = useState(utilizationSeed)
  const [oxygenTrend, setOxygenTrend] = useState([
    { time: '16:00', value: 21.0 },
    { time: '17:00', value: 21.2 },
    { time: '18:00', value: 21.5 },
    { time: '19:00', value: 21.7 },
    { time: '20:00', value: 21.4 },
    { time: '21:00', value: 21.8 },
  ])
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [podModalOpen, setPodModalOpen] = useState(false)
  const [replyDraft, setReplyDraft] = useState('')
  const [selectedFeedback, setSelectedFeedback] = useState(null)
const selectedFeedbackOrder = useMemo(() => {
  if (!selectedFeedback) return null
  return orders.find((o) => o.id === selectedFeedback.orderId) || null
}, [selectedFeedback, orders])
  const [revenueSeries, setRevenueSeries] = useState([
    { name: '09:00', revenue: 398, profit: 145 },
    { name: '10:00', revenue: 597, profit: 220 },
    { name: '11:00', revenue: 896, profit: 360 },
    { name: '12:00', revenue: 1095, profit: 455 },
    { name: '13:00', revenue: 1394, profit: 620 },
    { name: '14:00', revenue: 1695, profit: 834 },
  ])
  const [serviceMetrics, setServiceMetrics] = useState([
    { name: '满意度', value: 86 },
    { name: '异常率', value: 8 },
    { name: '工单率', value: 12 },
    { name: '参数命中率', value: 91 },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setPods((prev) =>
        prev.map((pod) => {
          if (!pod.online) return pod
          return {
            ...pod,
            oxygen: fakeNextValue(pod.oxygen, 22.8, 24.8, 0.2),
            pressure: fakeNextValue(pod.pressure, 0.98, 1.05, 0.01),
            temp: fakeNextValue(pod.temp, 21.0, 23.5, 0.15),
            humidity: fakeNextValue(pod.humidity, 40, 50, 0.8),
          }
        })
      )
      setOccupancy((prev) =>
        prev.map((x) => ({
          ...x,
          value: Math.max(55, Math.min(90, Math.round(x.value + (Math.random() * 8 - 4)))),
        }))
      )
      setUtilization((prev) =>
        prev.map((x) => ({
          ...x,
          value: Math.max(70, Math.min(95, Math.round(x.value + (Math.random() * 4 - 2)))),
        }))
      )
      setOxygenTrend((prev) => {
        const last = prev[prev.length - 1]
        const hour = String((Number(last.time.slice(0, 2)) + 1) % 24).padStart(2, '0') + ':00'
        const next = { time: hour, value: fakeNextValue(last.value, 20.6, 22.2, 0.25) }
        return [...prev.slice(-7), next]
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  function pushTimeline(text) {
    setTimeline((prev) => [{ time: toClock(), text }, ...prev].slice(0, 12))
  }

  useEffect(() => {
    const businessTimer = setInterval(() => {
      setOrders((prev) => {
        let next = [...prev]

        if (Math.random() < 0.45) {
          const store = randomPickStore(selectedStore)
          const newOrder = makeNewOrder(store)
          next = [newOrder, ...next].slice(0, 24)
          pushTimeline(`新增订单 ${newOrder.id}，${newOrder.roomType}，金额 ¥${newOrder.unitPrice}`)
        }

        next = next.map((o) => {
          if (o.paymentStatus === '待支付' && Math.random() < 0.32) {
            pushTimeline(`订单 ${o.id} 已完成支付`)
            return { ...o, paymentStatus: '已支付', paidAmount: o.unitPrice * o.quantity }
          }
          return o
        })

        next = next.map((o) => {
          if (o.status === '待入住' && o.paymentStatus === '已支付' && Math.random() < 0.28) {
            pushTimeline(`订单 ${o.id} 已开始入住`)
            return { ...o, status: '入住中', checkinTime: toClock() }
          }
          return o
        })

        next = next.map((o) => {
          if (o.status === '入住中' && Math.random() < 0.22) {
            pushTimeline(`订单 ${o.id} 已完成服务`)
            return { ...o, status: '已完成' }
          }
          return o
        })

        next = next.map((o) => {
          if (o.status === '已完成' && o.rating == null && Math.random() < 0.4) {
            const fb = randomPick(feedbackTemplates)
            setFeedbacks((prevFb) =>
              [
                {
                  id: `FB${Date.now()}${Math.floor(Math.random() * 10)}`,
                  orderId: o.id,
                  guest: o.guest,
                  rating: fb.rating,
                  tags: fb.tags,
                  suggestion: fb.suggestion,
                  reply: '',
                  time: toClock(),
                },
                ...prevFb,
              ].slice(0, 20)
            )
            pushTimeline(`订单 ${o.id} 已生成用户反馈`)
            return {
              ...o,
              status: '已反馈',
              rating: fb.rating * 20,
              ai: fb.suggestion,
              oxygenPlan: fb.rating >= 4 ? '舒适维持' : '重点优化',
            }
          }
          return o
        })

        next = next.map((o) => {
          if (o.paymentStatus === '已支付' && o.status === '待入住' && Math.random() < 0.04) {
            pushTimeline(`订单 ${o.id} 已退款`)
            return {
              ...o,
              paymentStatus: '已退款',
              refundAmount: o.paidAmount,
              paidAmount: 0,
              status: '已取消',
            }
          }
          return o
        })

        return next
      })

      setPods((prev) =>
        prev.map((pod) => {
          if (!pod.online && Math.random() < 0.16) {
            pushTimeline(`${pod.id} 已恢复在线`)
            return {
              ...pod,
              online: true,
              oxygen: 23.6,
              pressure: 1.01,
              temp: 22.3,
              humidity: 44,
              state: 'Normal',
            }
          }

          if (pod.online && Math.random() < 0.06) {
            pushTimeline(`${pod.id} 出现异常告警`)
            return {
              ...pod,
              online: false,
              oxygen: 0,
              pressure: 0,
              temp: 0,
              humidity: 0,
              state: 'Zone Alert',
            }
          }

          return pod
        })
      )

      setRevenueSeries((prev) => {
        const last = prev[prev.length - 1]
        const nextHour = String((parseInt(last.name.split(':')[0], 10) + 1) % 24).padStart(2, '0') + ':00'
        const latestRevenue = orders.reduce((sum, o) => sum + o.paidAmount, 0)
        const latestProfit = orders.reduce((sum, o) => sum + o.paidAmount - o.refundAmount - o.cost, 0)
        const nextPoint = {
          name: nextHour,
          revenue: Math.max(0, latestRevenue + Math.round(Math.random() * 120 - 30)),
          profit: Math.max(0, latestProfit + Math.round(Math.random() * 80 - 20)),
        }
        return [...prev.slice(-5), nextPoint]
      })

      setServiceMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value:
            m.name === '异常率'
              ? Math.max(3, Math.min(18, Math.round(m.value + (Math.random() * 4 - 2))))
              : Math.max(70, Math.min(98, Math.round(m.value + (Math.random() * 6 - 3)))),
        }))
      )
    }, 6000)

    return () => clearInterval(businessTimer)
  }, [selectedStore, orders])

  const orderFiltered = useMemo(() => {
    return orders.filter((o) => {
      const byStore = selectedStore === '全部门店' || o.store === selectedStore
      const byKeyword =
        !keyword.trim() ||
        [o.id, o.guest, o.roomType, o.store, o.status, o.paymentStatus].join(' ').includes(keyword.trim())
      return byStore && byKeyword
    })
  }, [orders, selectedStore, keyword])

  const feedbackFiltered = useMemo(() => {
    return feedbacks.filter((f) => {
      const order = orders.find((o) => o.id === f.orderId)
      return selectedStore === '全部门店' || order?.store === selectedStore
    })
  }, [feedbacks, orders, selectedStore])
  useEffect(() => {
  if (!selectedFeedback && feedbackFiltered.length > 0) {
    setSelectedFeedback(feedbackFiltered[0])
    return
  }

  if (
    selectedFeedback &&
    feedbackFiltered.length > 0 &&
    !feedbackFiltered.some((f) => f.id === selectedFeedback.id)
  ) {
    setSelectedFeedback(feedbackFiltered[0])
  }
}, [feedbackFiltered, selectedFeedback])

  const podFiltered = useMemo(() => {
    return pods.filter((p) => selectedStore === '全部门店' || p.store === selectedStore)
  }, [pods, selectedStore])

  const monthDailySeries = useMemo(() => {
    if (selectedStore === '全部门店') {
      return Array.from({ length: 30 }, (_, i) => {
        const aggregated = actualStores.reduce(
          (acc, store) => {
            const cur = monthlyBaseByStore[store][i]
            acc.revenue += cur.revenue
            acc.profit += cur.profit
            acc.orders += cur.orders
            return acc
          },
          { day: `${i + 1}日`, revenue: 0, profit: 0, orders: 0 }
        )
        return aggregated
      })
    }
    return monthlyBaseByStore[selectedStore]
  }, [selectedStore])

  const monthSummary = useMemo(() => {
    const revenue = monthDailySeries.reduce((sum, x) => sum + x.revenue, 0)
    const profit = monthDailySeries.reduce((sum, x) => sum + x.profit, 0)
    const orders = monthDailySeries.reduce((sum, x) => sum + x.orders, 0)
    const avgRevenue = Math.round(revenue / monthDailySeries.length)
    return { revenue, profit, orders, avgRevenue }
  }, [monthDailySeries])

  const storeMonthlyRanking = useMemo(() => {
    const ranking = actualStores.map((store) => {
      const base = monthlyBaseByStore[store]
      return {
        store,
        revenue: base.reduce((sum, x) => sum + x.revenue, 0),
        profit: base.reduce((sum, x) => sum + x.profit, 0),
      }
    })
    ranking.sort((a, b) => b.revenue - a.revenue)
    return selectedStore === '全部门店' ? ranking : ranking.filter((x) => x.store === selectedStore)
  }, [selectedStore])

  const roomMonthlySalesRanking = useMemo(() => {
    const base = { 单人舱: 0, 双人舱: 0, VIP舱: 0, 家庭舱: 0 }
    const sourceOrders = selectedStore === '全部门店' ? orders : orders.filter((o) => o.store === selectedStore)
    sourceOrders.forEach((o) => {
      base[o.roomType] += 1
    })
    return Object.entries(base).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [orders, selectedStore])

  const currentMonthProfit = monthSummary.profit
  const estimatedSingleStoreInvestment = 30000
  const paybackProgress = Math.max(0, Math.min(100, Math.round((currentMonthProfit / estimatedSingleStoreInvestment) * 100)))

  const orderPageSize = 5
  const feedbackPageSize = 3
  const orderTotalPages = Math.max(1, Math.ceil(orderFiltered.length / orderPageSize))
  const feedbackTotalPages = Math.max(1, Math.ceil(feedbackFiltered.length / feedbackPageSize))
  const orderRows = orderFiltered.slice((orderPage - 1) * orderPageSize, orderPage * orderPageSize)
  const feedbackRows = feedbackFiltered.slice((feedbackPage - 1) * feedbackPageSize, feedbackPage * feedbackPageSize)

  useEffect(() => {
    setOrderPage(1)
    setFeedbackPage(1)
  }, [keyword, selectedStore])

  const dashboardStats = useMemo(() => {
    const onlinePods = podFiltered.filter((p) => p.online).length
    const todayOrders = orderFiltered.length
    const pendingFeedbacks = feedbackFiltered.filter((f) => f.rating <= 3 && !f.reply).length
    const alerts = podFiltered.filter((p) => !p.online || p.state !== 'Normal').length
    return { onlinePods, todayOrders, pendingFeedbacks, alerts }
  }, [podFiltered, orderFiltered, feedbackFiltered])

  const financeStats = useMemo(() => {
    const receivable = orderFiltered.reduce((sum, o) => sum + o.unitPrice * o.quantity, 0)
    const revenue = orderFiltered.reduce((sum, o) => sum + o.paidAmount, 0)
    const refund = orderFiltered.reduce((sum, o) => sum + o.refundAmount, 0)
    const cost = orderFiltered.reduce((sum, o) => sum + o.cost, 0)
    const profit = revenue - refund - cost
    const paidOrders = orderFiltered.filter((o) => o.paymentStatus === '已支付').length
    const unpaidOrders = orderFiltered.filter((o) => o.paymentStatus === '待支付').length
    return { receivable, revenue, refund, cost, profit, paidOrders, unpaidOrders }
  }, [orderFiltered])

  const roomDistribution = useMemo(() => {
    const groups = {}
    orderFiltered.forEach((o) => {
      groups[o.roomType] = (groups[o.roomType] || 0) + 1
    })
    const colors = ['#60a5fa', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
    return Object.entries(groups).map(([name, value], i) => ({ name, value, color: colors[i % colors.length] }))
  }, [orderFiltered])
  

  const feedbackDistribution = useMemo(() => {
    const base = [1, 2, 3, 4, 5].map((n) => ({ name: `${n}星`, value: 0 }))
    feedbackFiltered.forEach((f) => {
      const target = base.find((x) => x.name === `${f.rating}星`)
      if (target) target.value += 1
    })
    return base
  }, [feedbackFiltered])
  
  const feedbackStats = useMemo(() => {
  const total = feedbackFiltered.length
  const replied = feedbackFiltered.filter((f) => f.reply && f.reply.trim()).length
  const pending = total - replied
  const lowScore = feedbackFiltered.filter((f) => f.rating <= 3).length
  const avg =
    total > 0
      ? (feedbackFiltered.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
      : '0.0'

  const tagMap = {}
  feedbackFiltered.forEach((f) => {
    f.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })

  const hotTags = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  return {
    total,
    replied,
    pending,
    lowScore,
    avg,
    hotTags,
  }
}, [feedbackFiltered])

  function regenerateAI(id) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              rating: Math.max(45, Math.min(95, Math.round((o.rating || 60) + (Math.random() * 16 - 8)))),
              ai: ['档1：舒适维持', '档2：中低强度富氧', '档3：重点优化', '档4：风险提示'][Math.floor(Math.random() * 4)],
              oxygenPlan: ['低档持续', '夜间维持模式', '入睡前提升', '分段供氧'][Math.floor(Math.random() * 4)],
            }
          : o
      )
    )
    pushTimeline(`订单 ${id} 已重新生成 AI 建议`)
  }

  function replyFeedback(id) {
    const text = replyDraft.trim() || '已回复：感谢反馈，后续将优化供氧与新风策略。'
    setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, reply: text } : f)))
    setReplyDraft('')
    pushTimeline(`反馈 ${id} 已完成客服回复`)
  }

  function confirmPayment(id) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, paymentStatus: '已支付', paidAmount: o.unitPrice * o.quantity } : o
      )
    )
    pushTimeline(`订单 ${id} 已完成支付`)
  }

  function refundOrder(id) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              paymentStatus: '已退款',
              refundAmount: o.paidAmount,
              paidAmount: 0,
              status: '已取消',
            }
          : o
      )
    )
    pushTimeline(`订单 ${id} 已完成退款`)
  }

  function completeOrder(id) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: '已完成' } : o)))
    pushTimeline(`订单 ${id} 已完成服务闭环`)
  }

  const navItems = [
    { key: 'dashboard', label: '数据总览', icon: LayoutDashboard },
    { key: 'orders', label: '订单管理', icon: ClipboardList },
    { key: 'feedback', label: '用户反馈', icon: MessageSquareText },
    { key: 'devices', label: '舱位管理', icon: Activity },
    { key: 'reports', label: '数据报表', icon: BarChart3 },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Sparkles size={20} /></div>
          <div>
            <div className="brand-title">Cloud Oxygen Chamber</div>
            <div className="brand-sub">智能运维后台</div>
          </div>
        </div>

        <div className="store-switcher">
          <div className="switcher-label"><Store size={14} /> 门店切换</div>
          <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
            {stores.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.key} className={cn('menu-item', page === item.key && 'active')} onClick={() => setPage(item.key)}>
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <div className="page-title">{navItems.find((x) => x.key === page)?.label}</div>
            <div className="page-subtitle">支持订单流转、舱位监测、AI建议与反馈闭环联动</div>
          </div>

          <div className="topbar-right">
            <div className="search-wrap">
              <Search size={15} />
              <input className="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜索订单号 / 用户 / 门店" />
            </div>
            <button className="icon-btn"><RefreshCw size={16} /></button>
            <button className="icon-btn"><Bell size={16} /></button>
            <button className="icon-btn"><User size={16} /></button>
          </div>
        </div>

        {page === 'dashboard' && (
          <>
            <div className="stat-grid revenue-grid">
              {[
                { label: '在线舱位', value: dashboardStats.onlinePods, icon: CheckCircle2 },
                { label: '今日订单', value: dashboardStats.todayOrders, icon: ClipboardList },
                { label: '今日实收', value: `¥${financeStats.revenue}`, icon: Wallet },
                { label: '预计利润', value: `¥${financeStats.profit}`, icon: TrendingUp },
                { label: '待支付单', value: financeStats.unpaidOrders, icon: MessageCircleReply },
                { label: '退款金额', value: `¥${financeStats.refund}`, icon: AlertTriangle },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div className="stat-card" key={item.label}>
                    <div className="stat-row">
                      <div className="stat-label">{item.label}</div>
                      <div className="stat-icon"><Icon size={18} /></div>
                    </div>
                    <div className="stat-value">{item.value}</div>
                  </div>
                )
              })}
            </div>

            <div className="grid-2">
              <section className="card">
                <div className="card-head">
                  <div className="card-title">订单管理</div>
                  <div className="toolbar-row">
                    <button className="plain-btn" onClick={() => setOrderPage((p) => Math.max(1, p - 1))}><ChevronLeft size={14} /></button>
                    <span className="page-indicator">{orderPage} / {orderTotalPages}</span>
                    <button className="plain-btn" onClick={() => setOrderPage((p) => Math.min(orderTotalPages, p + 1))}><ChevronRight size={14} /></button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>订单号</th>
                      <th>用户</th>
                      <th>门店</th>
                      <th>舱型</th>
                      <th>状态</th>
                      <th>支付状态</th>
                      <th>单价</th>
                      <th>实收</th>
                      <th>成本</th>
                      <th>利润</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderRows.map((row) => (
                      <tr key={row.id} className="clickable-row" onClick={() => { setSelectedOrder(row); setOrderModalOpen(true) }}>
                        <td>{row.id}</td>
                        <td>{row.guest}</td>
                        <td>{row.store}</td>
                        <td>{row.roomType}</td>
                        <td><span className={statusTone(row.status)}>{row.status}</span></td>
                        <td>{row.paymentStatus}</td>
                        <td>¥{row.unitPrice}</td>
                        <td>¥{row.paidAmount}</td>
                        <td>¥{row.cost}</td>
                        <td>¥{row.paidAmount - row.refundAmount - row.cost}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="action-row">
                            <button className="mini-btn blue" onClick={() => confirmPayment(row.id)}>支付</button>
                            <button className="mini-btn green" onClick={() => completeOrder(row.id)}>完成</button>
                            <button className="mini-btn dark" onClick={() => regenerateAI(row.id)}>AI</button>
                            <button className="mini-btn refund-btn" onClick={() => refundOrder(row.id)}>退款</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="card">
                <div className="card-title">用户界面预览</div>
                <div className="phone-box">
                  <div className="phone-card">
                    <div className="muted">订单详情</div>
                    <div className="phone-lines">
                      <div>订单号：{selectedOrder.id}</div>
                      <div>用户：{selectedOrder.guest}</div>
                      <div>入住码：{selectedOrder.accessCode}</div>
                      <div>状态：{selectedOrder.status}</div>
                      <div>支付状态：{selectedOrder.paymentStatus}</div>
                      <div>舱型：{selectedOrder.roomType}</div>
                      <div>订单金额：¥{selectedOrder.unitPrice}</div>
                    </div>
                    <div className="ai-box">
                      <div className="muted light">AI睡眠建议</div>
                      <div>睡眠评分：{selectedOrder.rating ?? '-'}</div>
                      <div>建议策略：{selectedOrder.ai}</div>
                      <div>供氧策略：{selectedOrder.oxygenPlan}</div>
                      <div>成本：¥{selectedOrder.cost}</div>
                      <div>利润：¥{selectedOrder.paidAmount - selectedOrder.refundAmount - selectedOrder.cost}</div>
                    </div>
                    <button className="full-btn" onClick={() => regenerateAI(selectedOrder.id)}>重新生成建议</button>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {page === 'feedback' && (
  <div className="feedback-page">
    <div className="feedback-top-stats">
      <div className="mini-stat-card">
        <div className="mini-stat-label">反馈总数</div>
        <div className="mini-stat-value">{feedbackStats.total}</div>
      </div>
      <div className="mini-stat-card">
        <div className="mini-stat-label">待回复</div>
        <div className="mini-stat-value">{feedbackStats.pending}</div>
      </div>
      <div className="mini-stat-card">
        <div className="mini-stat-label">已回复</div>
        <div className="mini-stat-value">{feedbackStats.replied}</div>
      </div>
      <div className="mini-stat-card">
        <div className="mini-stat-label">低分反馈</div>
        <div className="mini-stat-value">{feedbackStats.lowScore}</div>
      </div>
      <div className="mini-stat-card">
        <div className="mini-stat-label">平均评分</div>
        <div className="mini-stat-value">{feedbackStats.avg}</div>
      </div>
    </div>

    <div className="feedback-layout">
      <section className="feedback-main">
        <div className="card">
          <div className="card-head">
            <div className="card-title">用户反馈中心</div>
            <div className="toolbar-row">
              <button
                className="plain-btn"
                onClick={() => setFeedbackPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
              </button>
              <span className="page-indicator">
                {feedbackPage} / {feedbackTotalPages}
              </span>
              <button
                className="plain-btn"
                onClick={() => setFeedbackPage((p) => Math.min(feedbackTotalPages, p + 1))}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>评分</th>
                <th>反馈标签</th>
                <th>AI建议</th>
                <th>处理</th>
              </tr>
            </thead>
            <tbody>
              {feedbackRows.map((row) => (
                <tr
                  key={row.id}
                  className={cn('clickable-row', selectedFeedback?.id === row.id && 'selected-row')}
                  onClick={() => setSelectedFeedback(row)}
                >
                  <td>{row.orderId}</td>
                  <td>{row.rating} 星</td>
                  <td>{row.tags.join('、')}</td>
                  <td>{row.suggestion}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="mini-btn blue"
                      onClick={() => {
                        setSelectedFeedback(row)
                        replyFeedback(row.id)
                      }}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="feedback-bottom-row">
          <div className="card feedback-reply-card">
            <div className="card-title">客服回复输入区</div>
            <div className="reply-compose large">
              <textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder="输入客服回复内容，可用于统一处理低分反馈、舒适度问题、新风供氧问题等"
              />
            </div>
            <div className="reply-helper">
              常见回复方向：供氧策略调整、夜间新风优化、入住前提示、人工复核异常舱位
            </div>
          </div>

          <div className="card hot-tags-card">
            <div className="card-title">高频反馈标签</div>
            <div className="hot-tags-wrap">
              {feedbackStats.hotTags.length > 0 ? (
                feedbackStats.hotTags.map(([tag, count]) => (
                  <span key={tag} className="tag-pill">
                    {tag} · {count}
                  </span>
                ))
              ) : (
                <div className="empty-tip">暂无标签数据</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <aside className="feedback-side">
        <div className="card">
          <div className="card-title">评分统计</div>
          <div className="chart-240">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedbackDistribution}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-title">AI反馈详情</div>
          {selectedFeedback && selectedFeedbackOrder ? (
            <div className="feedback-detail-panel">
              <div className="feedback-detail-top">
                <div><strong>订单号：</strong>{selectedFeedback.orderId}</div>
                <div><strong>用户：</strong>{selectedFeedback.guest}</div>
                <div><strong>评分：</strong>{selectedFeedback.rating} 星</div>
                <div><strong>标签：</strong>{selectedFeedback.tags.join('、')}</div>
              </div>

              <div className="feedback-ai-box">
                <div className="feedback-ai-title">AI建议详情</div>
                <div><strong>建议内容：</strong>{selectedFeedback.suggestion}</div>
                <div><strong>对应舱型：</strong>{selectedFeedbackOrder.roomType}</div>
                <div><strong>当前状态：</strong>{selectedFeedbackOrder.status}</div>
                <div><strong>支付状态：</strong>{selectedFeedbackOrder.paymentStatus}</div>
                <div><strong>订单金额：</strong>¥{selectedFeedbackOrder.unitPrice}</div>
                <div><strong>成本：</strong>¥{selectedFeedbackOrder.cost}</div>
                <div>
                  <strong>利润：</strong>
                  ¥{selectedFeedbackOrder.paidAmount - selectedFeedbackOrder.refundAmount - selectedFeedbackOrder.cost}
                </div>
                <div><strong>供氧策略：</strong>{selectedFeedbackOrder.oxygenPlan}</div>
                <div><strong>睡眠评分：</strong>{selectedFeedbackOrder.rating ?? '-'}</div>
                <div><strong>AI策略：</strong>{selectedFeedbackOrder.ai}</div>
              </div>

              <div className="feedback-reply-box">
                <div className="feedback-ai-title">客服回复状态</div>
                <div>{selectedFeedback.reply || '尚未回复'}</div>
              </div>
            </div>
          ) : (
            <div className="empty-tip">请选择一条反馈查看详情</div>
          )}
        </div>

        <div className="card">
          <div className="card-title">低分预警</div>
          <div className="warning-list">
            {feedbackFiltered.filter((f) => f.rating <= 3).length > 0 ? (
              feedbackFiltered
                .filter((f) => f.rating <= 3)
                .slice(0, 6)
                .map((f) => (
                  <div
                    key={f.id}
                    className={cn('warning-item', selectedFeedback?.id === f.id && 'selected-feedback-card')}
                    onClick={() => setSelectedFeedback(f)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="warning-title">
                      {f.orderId} · {f.guest}
                    </div>
                    <div className="warning-text">
                      {f.rating}星 · {f.tags.join('、')}
                    </div>
                  </div>
                ))
            ) : (
              <div className="empty-tip">当前没有低分预警</div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-title">客服回复记录</div>
          <div className="reply-list compact">
            {feedbackFiltered.map((f) => (
              <div
                key={f.id}
                className={cn('reply-item', selectedFeedback?.id === f.id && 'selected-feedback-card')}
                onClick={() => setSelectedFeedback(f)}
                style={{ cursor: 'pointer' }}
              >
                <div className="reply-title">
                  {f.orderId} · {f.guest}
                </div>
                <div className="reply-text">{f.reply || '尚未回复'}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
)}

        {page === 'devices' && (
          <div className="grid-orders">
            <section className="card">
              <div className="card-head">
                <div className="card-title">舱位实时监测</div>
                <button className="plain-btn" onClick={() => pushTimeline('执行了一次舱位参数批量刷新')}>
                  <RefreshCw size={14} /> 刷新参数
                </button>
              </div>
              <div className="device-live-grid">
                {podFiltered.map((pod) => (
                  <div className="device-live-box clickable-row" key={pod.id} onClick={() => { setSelectedPod(pod); setPodModalOpen(true) }}>
                    <div className="device-name">{pod.id} <span className={podTone(pod)}>{pod.online ? 'Online' : 'Offline'}</span></div>
                    <div>门店：{pod.store}</div>
                    <div>区域：{pod.zone}</div>
                    <div>氧浓度：{pod.online ? `${pod.oxygen}%` : '--'}</div>
                    <div>气压：{pod.online ? `${pod.pressure} atm` : '--'}</div>
                    <div>温度：{pod.online ? `${pod.temp}℃` : '--'}</div>
                    <div>湿度：{pod.online ? `${pod.humidity}%` : '--'}</div>
                    <div className={cn('device-state', !pod.online && 'alert')}>状态：{pod.state}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="stack-col">
              <div className="card">
                <div className="card-title">氧浓度趋势</div>
                <div className="chart-320">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={oxygenTrend}>
                      <defs>
                        <linearGradient id="oxFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[20, 23]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#oxFill)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card">
                <div className="card-title">异常告警</div>
                <div className="reply-list">
                  {podFiltered.filter((p) => !p.online || p.state !== 'Normal').map((pod) => (
                    <div key={pod.id} className="alert-item">
                      <AlertTriangle size={16} /> {pod.id} · {pod.store} · {pod.state}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'reports' && (
          <div className="grid-orders reports-grid-2col">
            <section className="card reports-main">
              <div className="card-title">动态报表</div>
              <div className="report-grid">
                <div className="report-box">
                  <div className="report-title">实时营收与利润趋势</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueSeries}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" name="营收" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="profit" name="利润" fill="#22c55e" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box">
                  <div className="report-title">舱型分布</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={roomDistribution} dataKey="value" nameKey="name" outerRadius={82} innerRadius={34}>
                          {roomDistribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box report-box-wide">
                  <div className="report-title">月内每日营收数据</div>
                  <div className="chart-320">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthDailySeries}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={2} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="营收" stroke="#3b82f6" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="profit" name="利润" stroke="#22c55e" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box">
                  <div className="report-title">月内每天订单量</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthDailySeries}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={2} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="orders" name="订单量" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box">
                  <div className="report-title">门店月度营收排行</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={storeMonthlyRanking} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="store" width={100} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="revenue" name="营收" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box">
                  <div className="report-title">舱型月度销量排行</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={roomMonthlySalesRanking}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" name="销量" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="report-box">
                  <div className="report-title">运营指标</div>
                  <div className="chart-240">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={serviceMetrics}>
                        <CartesianGrid vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>

            <section className="card reports-side">
              <div className="card-title">详细报表</div>
              <div className="reply-list">
                <div className="reply-item"><div className="reply-title">本期应收</div><div className="reply-text">¥{financeStats.receivable}</div></div>
                <div className="reply-item"><div className="reply-title">本期实收</div><div className="reply-text">¥{financeStats.revenue}</div></div>
                <div className="reply-item"><div className="reply-title">本期成本</div><div className="reply-text">¥{financeStats.cost}</div></div>
                <div className="reply-item"><div className="reply-title">本期净利润</div><div className="reply-text">¥{financeStats.profit}</div></div>
                <div className="reply-item"><div className="reply-title">月内累计营收</div><div className="reply-text">¥{monthSummary.revenue}</div></div>
                <div className="reply-item"><div className="reply-title">月内累计利润</div><div className="reply-text">¥{monthSummary.profit}</div></div>
                <div className="reply-item"><div className="reply-title">月内订单量</div><div className="reply-text">{monthSummary.orders} 单</div></div>
                <div className="reply-item"><div className="reply-title">日均营收</div><div className="reply-text">¥{monthSummary.avgRevenue}</div></div>
                <div className="reply-item">
                  <div className="reply-title">本月回本进度</div>
                  <div className="reply-text">按单店投入 ¥{estimatedSingleStoreInvestment} 测算，当前进度 {paybackProgress}%</div>
                  <div className="payback-track">
                    <div className="payback-fill" style={{ width: `${paybackProgress}%` }} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

<section className="card timeline-card">
  <div className="timeline-head">
    <div className="card-title">实时动态</div>
    <div className="live-badge">
      <span className="live-dot"></span>
      实时刷新中
    </div>
  </div>

  <div className="timeline timeline-scroll">
    {timeline.map((item, idx) => (
      <div className={cn('timeline-item', idx === 0 && 'timeline-item-latest')} key={idx}>
        <div className="timeline-time">{item.time}</div>
        <div className="timeline-text">{item.text}</div>
      </div>
    ))}
  </div>
</section>
      </main>

      <Modal open={orderModalOpen} title="订单详情弹窗" onClose={() => setOrderModalOpen(false)}>
        <div className="detail-grid">
          <div><strong>订单号：</strong>{selectedOrder.id}</div>
          <div><strong>用户：</strong>{selectedOrder.guest}</div>
          <div><strong>门店：</strong>{selectedOrder.store}</div>
          <div><strong>舱型：</strong>{selectedOrder.roomType}</div>
          <div><strong>状态：</strong>{selectedOrder.status}</div>
          <div><strong>支付状态：</strong>{selectedOrder.paymentStatus}</div>
          <div><strong>入住码：</strong>{selectedOrder.accessCode}</div>
          <div><strong>订单金额：</strong>¥{selectedOrder.unitPrice}</div>
          <div><strong>实收金额：</strong>¥{selectedOrder.paidAmount}</div>
          <div><strong>成本：</strong>¥{selectedOrder.cost}</div>
          <div><strong>利润：</strong>¥{selectedOrder.paidAmount - selectedOrder.refundAmount - selectedOrder.cost}</div>
          <div><strong>睡眠评分：</strong>{selectedOrder.rating ?? '-'}</div>
          <div><strong>AI 建议：</strong>{selectedOrder.ai}</div>
          <div><strong>供氧策略：</strong>{selectedOrder.oxygenPlan}</div>
          <div><strong>入住时间：</strong>{selectedOrder.checkinTime}</div>
        </div>
        <div className="modal-actions">
          <button className="mini-btn blue" onClick={() => confirmPayment(selectedOrder.id)}>确认支付</button>
          <button className="mini-btn green" onClick={() => completeOrder(selectedOrder.id)}>完成订单</button>
          <button className="mini-btn dark" onClick={() => regenerateAI(selectedOrder.id)}>重新生成AI</button>
          <button className="mini-btn refund-btn" onClick={() => refundOrder(selectedOrder.id)}>退款</button>
        </div>
      </Modal>

      <Modal open={podModalOpen} title="舱位详情弹窗" onClose={() => setPodModalOpen(false)}>
        <div className="detail-grid">
          <div><strong>舱位编号：</strong>{selectedPod.id}</div>
          <div><strong>门店：</strong>{selectedPod.store}</div>
          <div><strong>区域：</strong>{selectedPod.zone}</div>
          <div><strong>在线状态：</strong>{selectedPod.online ? 'Online' : 'Offline'}</div>
          <div><strong>氧浓度：</strong>{selectedPod.online ? `${selectedPod.oxygen}%` : '--'}</div>
          <div><strong>气压：</strong>{selectedPod.online ? `${selectedPod.pressure} atm` : '--'}</div>
          <div><strong>温度：</strong>{selectedPod.online ? `${selectedPod.temp}℃` : '--'}</div>
          <div><strong>湿度：</strong>{selectedPod.online ? `${selectedPod.humidity}%` : '--'}</div>
          <div><strong>状态：</strong>{selectedPod.state}</div>
        </div>
      </Modal>
    </div>
  )
}

