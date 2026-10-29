import { useEffect, useMemo, useState } from 'react'
import { api } from './api.js'
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, Bell,
  Boxes, BrainCircuit, Building2, CalendarDays, Check, ChevronDown, ChevronLeft,
  ChevronRight, CircleHelp, ClipboardList, Download, FileChartColumn,
  LayoutDashboard, LifeBuoy, Menu, MoreHorizontal, Package, Plus, Search,
  Settings, ShoppingBag, ShoppingCart, Sparkles, Tags, Truck, UserRound,
  Users, Wallet, X, Zap, SlidersHorizontal, RefreshCw, Eye, Pencil, Trash2,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'

const initialProducts = [
  { id: 'PRD-1001', name: 'Wireless Mouse', category: 'Electronics', sku: 'EL-MOU-01', price: 799, stock: 5, reorder: 20, supplier: 'TechSource India' },
  { id: 'PRD-1002', name: 'Basmati Rice 5kg', category: 'Grocery', sku: 'GR-RIC-05', price: 650, stock: 8, reorder: 25, supplier: 'Fresh Farms Co.' },
  { id: 'PRD-1003', name: "Men's Cotton T-Shirt", category: 'Clothing', sku: 'CL-TSH-12', price: 499, stock: 42, reorder: 30, supplier: 'Urban Threads' },
  { id: 'PRD-1004', name: 'Smartphone 128GB', category: 'Electronics', sku: 'EL-PHN-12', price: 18999, stock: 3, reorder: 15, supplier: 'TechSource India' },
  { id: 'PRD-1005', name: 'Instant Noodles Pack', category: 'Grocery', sku: 'GR-NOD-01', price: 60, stock: 10, reorder: 20, supplier: 'Fresh Farms Co.' },
  { id: 'PRD-1006', name: 'Bluetooth Speaker', category: 'Electronics', sku: 'EL-SPK-04', price: 2499, stock: 27, reorder: 10, supplier: 'TechSource India' },
  { id: 'PRD-1007', name: 'Face Moisturizer', category: 'Personal Care', sku: 'PC-MOI-02', price: 349, stock: 64, reorder: 20, supplier: 'Glow Essentials' },
  { id: 'PRD-1008', name: 'Desk Organizer', category: 'Home & Living', sku: 'HM-ORG-09', price: 299, stock: 18, reorder: 15, supplier: 'Urban Threads' },
]
const salesData = [
  { month: 'Jan', sales: 92000, purchases: 61000 }, { month: 'Feb', sales: 118000, purchases: 76000 },
  { month: 'Mar', sales: 104000, purchases: 69000 }, { month: 'Apr', sales: 146000, purchases: 98000 },
  { month: 'May', sales: 132000, purchases: 89000 }, { month: 'Jun', sales: 181000, purchases: 112000 },
  { month: 'Jul', sales: 164000, purchases: 106000 }, { month: 'Aug', sales: 213000, purchases: 131000 },
]
const navGroups = [
  { label: 'OVERVIEW', items: [{ name: 'Dashboard', icon: LayoutDashboard }, { name: 'AI Forecasting', icon: BrainCircuit }] },
  { label: 'INVENTORY', items: [{ name: 'Products', icon: Package }, { name: 'Stock Management', icon: Boxes }, { name: 'Categories', icon: Tags }] },
  { label: 'OPERATIONS', items: [{ name: 'Sales', icon: ShoppingCart }, { name: 'Purchases', icon: ShoppingBag }, { name: 'Suppliers', icon: Truck }, { name: 'Customers', icon: Users }, { name: 'Customer Hub', icon: Bell }] },
  { label: 'INSIGHTS', items: [{ name: 'Reports', icon: FileChartColumn }, { name: 'Settings', icon: Settings }] },
]
const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
const stockStatus = (p) => p.stock <= Math.max(5, Math.floor(p.reorder / 2)) ? 'Critical' : p.stock <= p.reorder ? 'Low stock' : 'In stock'
const categoryColors = ['#2563eb', '#14b8a6', '#8b5cf6', '#f59e0b', '#ec4899']
const initialSuppliers = [
  { name: 'TechSource India', contact: 'Amit Sharma', email: 'sales@techsource.in', products: 3, status: 'Active' },
  { name: 'Fresh Farms Co.', contact: 'Priya Mehta', email: 'orders@freshfarms.in', products: 2, status: 'Active' },
  { name: 'Urban Threads', contact: 'Rohit Verma', email: 'hello@urbanthreads.in', products: 2, status: 'Active' },
  { name: 'Glow Essentials', contact: 'Neha Jain', email: 'care@glowessentials.in', products: 1, status: 'Active' },
]
const initialSales = [
  { id: 'SAL-2408', customer: 'Walk-in Customer', date: '2026-10-14', items: 4, amount: 12450, status: 'Completed' },
  { id: 'SAL-2407', customer: 'Aarav Enterprises', date: '2026-10-14', items: 7, amount: 28700, status: 'Completed' },
  { id: 'SAL-2406', customer: 'Walk-in Customer', date: '2026-10-13', items: 2, amount: 1899, status: 'Pending' },
  { id: 'SAL-2405', customer: 'Mehta Retail', date: '2026-10-12', items: 5, amount: 9450, status: 'Completed' },
]
const initialPurchases = [
  { id: 'PUR-0812', supplier: 'TechSource India', date: '2026-10-14', items: 12, amount: 48500, status: 'Received' },
  { id: 'PUR-0811', supplier: 'Fresh Farms Co.', date: '2026-10-13', items: 24, amount: 12600, status: 'Pending' },
  { id: 'PUR-0810', supplier: 'Urban Threads', date: '2026-10-11', items: 18, amount: 18900, status: 'Received' },
]
const initialCustomers = [
  { name: 'Aarav Enterprises', email: 'aarav@example.com', orders: 24, spent: 148500, type: 'Business' },
  { name: 'Mehta Retail', email: 'mehta@example.com', orders: 18, spent: 92700, type: 'Business' },
  { name: 'Kavya Singh', email: 'kavya@example.com', orders: 7, spent: 12450, type: 'Individual' },
  { name: 'Walk-in Customer', email: '—', orders: 146, spent: 215600, type: 'Individual' },
]

function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }) {
  const styles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200'
    : variant === 'outline'
      ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
      : variant === 'soft'
        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
        : 'text-slate-500 hover:bg-slate-100'
  return <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${styles} ${className}`}>{children}</button>
}
function Status({ children }) {
  const color = ['Critical', 'Low stock', 'Pending'].includes(children) ? 'bg-amber-50 text-amber-700 ring-amber-200' : ['Completed', 'Received', 'Active', 'In stock'].includes(children) ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-slate-100 text-slate-600 ring-slate-200'
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${color}`}>{children}</span>
}
function MetricCard({ title, value, change, icon: Icon, tone = 'blue', caption }) {
  const tones = { blue: 'bg-blue-50 text-blue-600', teal: 'bg-teal-50 text-teal-600', orange: 'bg-orange-50 text-orange-600', purple: 'bg-violet-50 text-violet-600' }
  return <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
    <div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p></div><div className={`rounded-xl p-3 ${tones[tone]}`}><Icon size={21}/></div></div>
    <div className="mt-4 flex items-center gap-1.5 text-xs"><span className="inline-flex items-center font-semibold text-emerald-600"><ArrowUpRight size={15}/>{change}</span><span className="text-slate-400">{caption || 'vs. last month'}</span></div>
  </div>
}
function SectionTitle({ title, subtitle, action }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>{action}</div>
}
function Modal({ title, subtitle, onClose, children }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5"><div><h3 className="text-lg font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18}/></button></div>
      <div className="p-6">{children}</div>
    </div>
  </div>
}
function Field({ label, children }) { return <label className="block"><span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>{children}</label> }
const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
function EmptyState({ title, text }) { return <div className="py-12 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><ClipboardList size={22}/></div><p className="font-semibold text-slate-800">{title}</p><p className="mt-1 text-sm text-slate-500">{text}</p></div> }

function App() {
  const [page, setPage] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(initialProducts)
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [sales, setSales] = useState(initialSales)
  const [purchases, setPurchases] = useState(initialPurchases)
  const [customers, setCustomers] = useState(initialCustomers)
  const [apiStatus, setApiStatus] = useState('Connecting…')
  const [modal, setModal] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [toast, setToast] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All categories')
  const [stockFilter, setStockFilter] = useState('All stock')
  const [productForm, setProductForm] = useState({ name: '', category: 'Electronics', sku: '', price: '', stock: '', reorder: '10', supplier: 'TechSource India' })
  const [transactionForm, setTransactionForm] = useState({ partner: 'Walk-in Customer', productId: initialProducts[0].id, quantity: '1', amount: '' })
  const [supplierForm, setSupplierForm] = useState({ name: '', contact: '', email: '', products: '0' })
  const [settings, setSettings] = useState({ business: 'SmartAI Retail Store', currency: 'INR (₹)', threshold: '10', notifications: true })
  const [reminderPrefs, setReminderPrefs] = useState({ daily: false, weekly: true, monthly: false, lowStock: true, offers: true, email: 'customer@example.com' })
  const [remindersSaved, setRemindersSaved] = useState(false)

  useEffect(() => {
  let active = true;

  api.products()
    .then((data) => {
      if (!active) return;
      setProducts(data);
      setApiStatus('Connected to MySQL API');
    })
    .catch((error) => {
      if (!active) return;
      setApiStatus('Products API error');
      console.error('Products API failed:', error);
    });

  api.suppliers()
    .then((data) => active && setSuppliers(data))
    .catch((error) => console.error('Suppliers API failed:', error));

  api.sales()
    .then((data) => active && setSales(data))
    .catch((error) => console.error('Sales API failed:', error));

  api.purchases()
    .then((data) => active && setPurchases(data))
    .catch((error) => console.error('Purchases API failed:', error));

  api.customers()
    .then((data) => active && setCustomers(data))
    .catch((error) => console.error('Customers API failed:', error));

  return () => {
    active = false;
  };
}, []);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const lowStock = products.filter(p => p.stock <= p.reorder)
  const suggestedRestock =
  [...products]
    .filter(p => p.stock <= p.reorder)
    .sort((a, b) => a.stock - b.stock)[0] || products[0] || null
  const stockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0)
  const filteredProducts = useMemo(() => products.filter(p => {
    const q = search.toLowerCase()
    const matchesSearch = [p.name, p.sku, p.category, p.supplier].some(v => String(v).toLowerCase().includes(q))
    const matchesCategory = categoryFilter === 'All categories' || p.category === categoryFilter
    const status = stockStatus(p)
    const matchesStock = stockFilter === 'All stock' || (stockFilter === 'Low stock' && ['Low stock', 'Critical'].includes(status)) || (stockFilter === 'In stock' && status === 'In stock')
    return matchesSearch && matchesCategory && matchesStock
  }), [products, search, categoryFilter, stockFilter])

  const go = (name) => { setPage(name); setSearch(''); setMobileOpen(false) }
  const openAddProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: '', category: 'Electronics', sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`, price: '', stock: '', reorder: '10', supplier: suppliers[0]?.name || 'New supplier' })
    setModal('product')
  }
  const openEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({ ...product, price: String(product.price), stock: String(product.stock), reorder: String(product.reorder) })
    setModal('product')
  }
  const saveProduct = async (e) => {
    e.preventDefault()
    const payload = { ...productForm, price: Number(productForm.price), stock: Number(productForm.stock), reorder: Number(productForm.reorder) }
    if (!payload.name.trim() || !payload.sku.trim() || payload.price < 0 || payload.stock < 0) return notify('Please enter valid product details.')
    try {
      const saved = editingProduct ? await api.updateProduct(editingProduct.id, payload) : await api.createProduct(payload)
      setProducts(old => editingProduct ? old.map(p => String(p.id) === String(saved.id) ? saved : p) : [saved, ...old])
      setModal(''); notify(editingProduct ? 'Product updated in MySQL.' : 'Product saved to MySQL.')
    } catch (error) { notify(`Could not save product: ${error.message}`) }
  }
  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product from inventory?')) {
      try { await api.deleteProduct(id); setProducts(old => old.filter(p => String(p.id) !== String(id))); notify('Product deleted from MySQL.') }
      catch (error) { notify(`Could not delete product: ${error.message}`) }
    }
  }
  const saveTransaction = async (e) => {
    e.preventDefault()
    const qty = Number(transactionForm.quantity)
    const product = products.find(p => String(p.id) === String(transactionForm.productId))
    if (!product || qty < 1) return notify('Select a product and enter a valid quantity.')
    if (modal === 'sale' && product.stock < qty) return notify('Not enough stock for this sale.')
    const amount = Number(transactionForm.amount) || product.price * qty
    try {
      if (modal === 'sale') {
        const saved = await api.createSale({ productId: product.id, customer: transactionForm.partner || 'Walk-in Customer', quantity: qty, amount })
        setSales(old => [saved, ...old]); setProducts(old => old.map(p => String(p.id) === String(saved.productId) ? { ...p, stock: saved.stockAfter } : p))
      } else {
        const saved = await api.createPurchase({ productId: product.id, supplier: transactionForm.partner || product.supplier, quantity: qty, amount })
        setPurchases(old => [saved, ...old]); setProducts(old => old.map(p => String(p.id) === String(saved.productId) ? { ...p, stock: saved.stockAfter } : p))
      }
      setModal(''); notify(modal === 'sale' ? 'Sale saved; stock reduced in MySQL.' : 'Purchase saved; stock increased in MySQL.')
    } catch (error) { notify(`Transaction failed: ${error.message}`) }
  }
  const openTransaction = (type) => {
    setTransactionForm({ partner: type === 'sale' ? 'Walk-in Customer' : (suppliers[0]?.name || ''), productId: products[0]?.id || '', quantity: '1', amount: '' })
    setModal(type)
  }
  const saveSupplier = async (e) => {
    e.preventDefault()
    if (!supplierForm.name.trim()) return notify('Supplier name is required.')
    try { const saved = await api.createSupplier({ ...supplierForm, products: Number(supplierForm.products) }); setSuppliers(old => [saved, ...old.filter(s => s.name !== saved.name)]); setModal(''); setSupplierForm({ name: '', contact: '', email: '', products: '0' }); notify('Supplier saved to MySQL.') }
    catch (error) { notify(`Could not save supplier: ${error.message}`) }
  }
  const exportCSV = () => {
    const rows = [['Product ID', 'Product', 'Category', 'SKU', 'Price', 'Stock', 'Reorder Level', 'Supplier'], ...filteredProducts.map(p => [p.id, p.name, p.category, p.sku, p.price, p.stock, p.reorder, p.supplier])]
    const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href = url; a.download = 'smartai-inventory-products.csv'; a.click(); URL.revokeObjectURL(url)
    notify('CSV export downloaded.')
  }

  const pageDescriptions = {
    Dashboard: 'Here’s what’s happening with your inventory today.',
    Products: 'Manage your catalog, pricing, stock levels and suppliers.',
    'Stock Management': 'Monitor stock movement and identify items that need attention.',
    Categories: 'Understand how your inventory is distributed across categories.',
    Sales: 'Track customer orders, revenue and sales activity.',
    Purchases: 'Manage supplier orders and incoming stock.',
    Suppliers: 'Keep your supplier information organized in one place.',
    Customers: 'View customer activity and purchase history.',
    'Customer Hub': 'One shared space for customer convenience and seller growth.',
    'AI Forecasting': 'Use demand signals to plan smarter replenishment.',
    Reports: 'Review inventory performance and export your product data.',
    Settings: 'Configure your store preferences and stock alerts.',
  }

  return <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
    {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[258px] flex-col bg-[#111c31] text-slate-300 transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-[82px] items-center gap-3 border-b border-white/8 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 text-white shadow-lg shadow-blue-900/30"><Boxes size={23}/></div>
        <div><p className="text-[17px] font-bold leading-tight tracking-tight text-white">SmartAI <span className="text-cyan-300">Inventory</span></p><p className="mt-1 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Smarter stock. Better decisions.</p></div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map(group => <div key={group.label}><p className="mb-2 px-3 text-[10px] font-bold tracking-[.18em] text-slate-500">{group.label}</p><div className="space-y-1">
          {group.items.map(item => { const Icon = item.icon; const active = page === item.name; return <button key={item.name} onClick={() => go(item.name)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-950/30' : 'text-slate-400 hover:bg-white/6 hover:text-white'}`}><Icon size={18} strokeWidth={1.9}/><span className="flex-1">{item.name}</span>{item.name === 'Stock Management' && lowStock.length > 0 && <span className={`rounded-md px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-amber-400/15 text-amber-300'}`}>{lowStock.length}</span>}</button> })}
        </div></div>)}
      </nav>
      <div className="p-3"><div className="rounded-2xl border border-white/8 bg-white/[.04] p-4"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300"><Sparkles size={18}/></div><p className="text-sm font-semibold text-white">AI stock assistant</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Get smarter recommendations for your next restock.</p><button onClick={() => go('AI Forecasting')} className="mt-3 flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200">Explore insights <ChevronRight size={14}/></button></div><div className="mt-3 flex items-center gap-2 px-2 py-2 text-xs text-slate-500"><LifeBuoy size={15}/> Help & support <span className="ml-auto">v1.0 demo</span></div></div>
    </aside>

    <div className="min-h-screen lg:pl-[258px]">
      <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
        <div className="flex min-w-0 items-center gap-3"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="relative hidden w-[min(42vw,390px)] sm:block"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, suppliers, anything..." className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"/></div><div className="sm:hidden"><p className="font-bold text-slate-900">{page}</p><p className="text-[11px] text-slate-400">SmartAI Inventory</p></div></div>
        <div className="flex items-center gap-2 sm:gap-4"><button onClick={() => notify(`${lowStock.length} products need stock attention.`)} className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={19}/>{lowStock.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"/>}</button><div className="hidden h-8 w-px bg-slate-200 sm:block"/><button className="flex items-center gap-2 rounded-xl p-1.5 pr-1 hover:bg-slate-50" onClick={() => go('Settings')}><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-sm font-bold text-blue-700">AD</div><div className="hidden text-left sm:block"><p className="text-sm font-semibold text-slate-800">Admin User</p><p className="text-[11px] text-slate-400">Store administrator</p></div><ChevronDown size={15} className="hidden text-slate-400 sm:block"/></button></div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><div className="mb-1 flex items-center gap-2 text-xs text-slate-400"><span>Workspace</span><ChevronRight size={13}/><span className="font-medium text-slate-600">{page}</span></div><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{page}</h1><p className="mt-1 text-sm text-slate-500">{pageDescriptions[page]}</p></div><div className="flex flex-wrap items-center gap-2">{page === 'Dashboard' && <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-600 md:flex"><CalendarDays size={15} className="text-slate-400"/> Oct 01 – Oct 15, 2026 <ChevronDown size={13}/></div>}{page === 'Products' && <Button variant="outline" onClick={exportCSV}><Download size={16}/> Export CSV</Button>}{page === 'Products' && <Button onClick={openAddProduct}><Plus size={17}/> Add product</Button>}{page === 'Sales' && <Button onClick={() => openTransaction('sale')}><Plus size={17}/> New sale</Button>}{page === 'Purchases' && <Button onClick={() => openTransaction('purchase')}><Plus size={17}/> New purchase</Button>}{page === 'Suppliers' && <Button onClick={() => setModal('supplier')}><Plus size={17}/> Add supplier</Button>}</div></div>

        {page === 'Dashboard' && <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total products" value={products.length.toLocaleString('en-IN')} change="+8.2%" icon={Package} tone="blue"/>
            <MetricCard title="Inventory value" value={formatINR(stockValue)} change="+4.6%" icon={Wallet} tone="teal" caption="current stock value"/>
            <MetricCard title="Low stock items" value={lowStock.length} change={lowStock.length ? `${lowStock.length} alerts` : 'All good'} icon={AlertTriangle} tone="orange" caption="need attention"/>
            <MetricCard title="Sales this month" value={formatINR(sales.reduce((sum, s) => sum + s.amount, 0))} change="+12.4%" icon={BarChart3} tone="purple"/>
          </div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold text-slate-900">Sales overview</h3><p className="mt-1 text-xs text-slate-500">Revenue vs purchases · Jan – Aug 2026</p></div><div className="flex gap-4 text-xs"><span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-blue-600"/> Sales</span><span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-teal-400"/> Purchases</span></div></div><div className="h-[260px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={salesData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}><defs><linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.18}/><stop offset="100%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#edf1f7" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={9}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `₹${v/1000}k`}/><Tooltip formatter={v => formatINR(v)} contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12 }}/><Area type="monotone" dataKey="sales" name="Sales" stroke="#2563eb" strokeWidth={2.5} fill="url(#salesFill)" activeDot={{ r: 5 }}/><Area type="monotone" dataKey="purchases" name="Purchases" stroke="#14b8a6" strokeWidth={2} fill="transparent" strokeDasharray="4 4"/></AreaChart></ResponsiveContainer></div></section>
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6"><div className="mb-3"><h3 className="font-bold text-slate-900">Stock distribution</h3><p className="mt-1 text-xs text-slate-500">Units by product category</p></div><div className="relative h-[190px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={Object.entries(products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + p.stock; return acc }, {})).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82} paddingAngle={3} stroke="none">{Object.keys(products.reduce((acc, p) => { acc[p.category] = 1; return acc }, {})).map((name, i) => <Cell key={name} fill={categoryColors[i % categoryColors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold text-slate-900">{totalUnits}</span><span className="text-[11px] text-slate-400">Total units</span></div></div><div className="mt-2 space-y-2">{Object.entries(products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + p.stock; return acc }, {})).map(([name, value], i) => <div key={name} className="flex items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full" style={{ background: categoryColors[i % categoryColors.length] }}/><span className="flex-1 text-slate-500">{name}</span><span className="font-semibold text-slate-700">{Math.round(value / Math.max(totalUnits, 1) * 100)}%</span><span className="w-8 text-right text-slate-400">{value}</span></div>)}</div></section>
          </div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(290px,1fr)]">
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"><div><h3 className="font-bold text-slate-900">Low stock alerts</h3><p className="mt-1 text-xs text-slate-500">Products at or below their reorder level</p></div><button onClick={() => go('Stock Management')} className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">View all <ChevronRight size={14}/></button></div>{lowStock.length ? <div className="overflow-x-auto"><table className="w-full min-w-[530px] text-left text-sm"><thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">Stock</th><th className="px-4 py-3 font-semibold">Reorder level</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{lowStock.slice(0, 5).map(p => <tr key={p.id} className="hover:bg-slate-50/70"><td className="px-5 py-3"><p className="font-semibold text-slate-800">{p.name}</p><p className="mt-0.5 text-xs text-slate-400">{p.category}</p></td><td className="px-4 py-3 font-semibold text-slate-700">{p.stock}</td><td className="px-4 py-3 text-slate-500">{p.reorder}</td><td className="px-5 py-3"><Status>{stockStatus(p) === 'Critical' ? 'Critical' : 'Low stock'}</Status></td></tr>)}</tbody></table></div> : <EmptyState title="Stock looks healthy" text="No products are below their reorder level."/>}</section>
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#172554] via-[#1d3b80] to-[#2563eb] p-6 text-white shadow-lg shadow-blue-900/10"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[24px] border-white/5"/><div className="relative flex items-center gap-2"><div className="rounded-xl bg-white/15 p-2.5"><Sparkles size={20}/></div><div><h3 className="font-bold">AI inventory insights</h3><p className="text-xs text-blue-100">Recommendations based on your demo data</p></div></div><div className="relative mt-5 space-y-3">{[{title:'Restock priority',text:lowStock[0] ? `${lowStock[0].name} is down to ${lowStock[0].stock} units. Consider reordering soon.` : 'Your current stock is above reorder levels.'},{title:'Demand signal',text:'Sales activity is strongest in Electronics in this sample dataset.'},{title:'Inventory tip',text:'Review slow-moving stock monthly to keep working capital healthy.'}].map((x, i) => <div key={x.title} className="rounded-xl border border-white/10 bg-white/10 p-3.5"><p className="flex items-center gap-2 text-xs font-bold"><Zap size={14} className="text-amber-300"/>{x.title}</p><p className="mt-1.5 text-xs leading-relaxed text-blue-100">{x.text}</p></div>)}</div><p className="relative mt-4 text-[10px] text-blue-200">Demo recommendations only — connect a forecasting model for real predictions.</p><button onClick={() => go('AI Forecasting')} className="relative mt-4 flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-100">Explore AI forecasting <ChevronRight size={16}/></button></section>
          </div>
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">Recent transactions</h3><p className="mt-1 text-xs text-slate-500">Latest sales recorded in the system</p></div><button onClick={() => go('Sales')} className="text-xs font-semibold text-blue-600">All transactions →</button></div><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="text-xs text-slate-400"><tr><th className="pb-3 font-medium">Transaction ID</th><th className="pb-3 font-medium">Customer</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{sales.slice(0, 4).map(s => <tr key={s.id}><td className="py-3 font-semibold text-blue-700">{s.id}</td><td className="py-3 text-slate-600">{s.customer}</td><td className="py-3 text-slate-500">{s.date}</td><td className="py-3 font-semibold text-slate-800">{formatINR(s.amount)}</td><td className="py-3"><Status>{s.status}</Status></td></tr>)}</tbody></table></div></section>
        </div>}

        {(page === 'Products' || page === 'Stock Management') && <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5"><div><h3 className="font-bold text-slate-900">{page === 'Products' ? 'Product catalog' : 'Current stock levels'}</h3><p className="mt-1 text-xs text-slate-500">{filteredProducts.length} products shown · Demo data is stored in app state</p></div><div className="flex flex-wrap gap-2"><div className="relative sm:hidden"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className={`${inputClass} pl-9`}/></div><select className={`${inputClass} w-auto`} value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}><option>All categories</option>{[...new Set(products.map(p => p.category))].map(c => <option key={c}>{c}</option>)}</select><select className={`${inputClass} w-auto`} value={stockFilter} onChange={e => setStockFilter(e.target.value)}><option>All stock</option><option>Low stock</option><option>In stock</option></select><Button variant="outline" onClick={() => { setSearch(''); setCategoryFilter('All categories'); setStockFilter('All stock') }}><RefreshCw size={14}/> Reset</Button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">SKU</th><th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Price</th><th className="px-4 py-3 font-semibold">Stock</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-5 py-3 text-right font-semibold">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredProducts.map(p => <tr key={p.id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Package size={19}/></div><div><p className="font-semibold text-slate-800">{p.name}</p><p className="mt-0.5 text-xs text-slate-400">{p.id}</p></div></div></td><td className="px-4 py-4 text-xs text-slate-500">{p.sku}</td><td className="px-4 py-4 text-slate-600">{p.category}</td><td className="px-4 py-4 font-semibold text-slate-800">{formatINR(p.price)}</td><td className="px-4 py-4"><span className={`font-semibold ${p.stock <= p.reorder ? 'text-amber-700' : 'text-slate-700'}`}>{p.stock}</span><span className="ml-1 text-xs text-slate-400">units</span></td><td className="px-4 py-4"><Status>{stockStatus(p)}</Status></td><td className="px-5 py-4"><div className="flex justify-end gap-1"><button title="Edit product" onClick={() => openEditProduct(p)} className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"><Pencil size={15}/></button><button title="Delete product" onClick={() => deleteProduct(p.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15}/></button></div></td></tr>)}</tbody></table>{filteredProducts.length === 0 && <EmptyState title="No products found" text="Try changing the search or filters, or add a product."/>}</div><div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-400"><span>Showing {filteredProducts.length} of {products.length} products</span><span>Stock value: <strong className="text-slate-700">{formatINR(stockValue)}</strong></span></div></section>}

        {page === 'Categories' && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Object.entries(products.reduce((acc, p) => { acc[p.category] = acc[p.category] || { count: 0, units: 0, value: 0 }; acc[p.category].count++; acc[p.category].units += p.stock; acc[p.category].value += p.stock * p.price; return acc }, {})).map(([name, data], i) => <div key={name} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${categoryColors[i % categoryColors.length]}15`, color: categoryColors[i % categoryColors.length] }}><Tags size={20}/></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">{data.count} products</span></div><h3 className="mt-4 font-bold text-slate-900">{name}</h3><p className="mt-1 text-sm text-slate-500">{data.units} units in stock</p><p className="mt-4 text-xl font-bold text-slate-900">{formatINR(data.value)}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${Math.min(100, data.units / Math.max(totalUnits, 1) * 100)}%`, background: categoryColors[i % categoryColors.length] }}/></div><button onClick={() => { setCategoryFilter(name); go('Products') }} className="mt-4 text-sm font-semibold text-blue-600">View products →</button></div>)}</div>}

        {page === 'Sales' && <><div className="mb-5 grid gap-4 sm:grid-cols-3"><MetricCard title="Recorded sales" value={sales.length} change="+6.4%" icon={ShoppingCart}/><MetricCard title="Total revenue" value={formatINR(sales.reduce((s, x) => s + x.amount, 0))} change="+12.4%" icon={Wallet} tone="teal"/><MetricCard title="Completed orders" value={sales.filter(s => s.status === 'Completed').length} change="+4.1%" icon={Check} tone="purple"/></div><DataTable title="Sales transactions" subtitle="All sales recorded in this demo" columns={['Transaction ID', 'Customer', 'Date', 'Items', 'Amount', 'Status']} rows={sales.map(s => [s.id, s.customer, s.date, s.items, formatINR(s.amount), <Status>{s.status}</Status>])}/></>}

        {page === 'Purchases' && <><div className="mb-5 grid gap-4 sm:grid-cols-3"><MetricCard title="Purchase orders" value={purchases.length} change="+3.2%" icon={ShoppingBag}/><MetricCard title="Purchase value" value={formatINR(purchases.reduce((s, x) => s + x.amount, 0))} change="+5.8%" icon={Wallet} tone="teal"/><MetricCard title="Pending orders" value={purchases.filter(p => p.status === 'Pending').length} change="Needs review" icon={Truck} tone="orange"/></div><DataTable title="Purchase history" subtitle="Incoming stock and supplier orders" columns={['Purchase ID', 'Supplier', 'Date', 'Units', 'Amount', 'Status']} rows={purchases.map(p => [p.id, p.supplier, p.date, p.items, formatINR(p.amount), <Status>{p.status}</Status>])}/></>}

        {page === 'Suppliers' && <DataTable title="Supplier directory" subtitle={`${suppliers.length} suppliers in your directory`} columns={['Supplier', 'Contact person', 'Email', 'Products', 'Status']} rows={suppliers.map(s => [<span className="font-semibold text-slate-800">{s.name}</span>, s.contact, s.email, s.products, <Status>{s.status}</Status>])}/>}
        {page === 'Customers' && <DataTable title="Customer directory" subtitle="Customer activity and purchase history" columns={['Customer', 'Email', 'Orders', 'Total spent', 'Type']} rows={customers.map(c => [<span className="font-semibold text-slate-800">{c.name}</span>, c.email, c.orders, formatINR(c.spent), <Status>{c.type}</Status>])}/>}

        {page === 'Customer Hub' && <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#10213f] via-[#164e8a] to-[#0f9f91] p-6 text-white sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold"><Sparkles size={14}/> SMARTAI CONNECT</span><h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">A smarter connection between customers and local sellers.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-50">Never miss a regular purchase or a low-stock update. Help sellers understand demand, plan replenishment and build long-term customer relationships.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => { setReminderPrefs(p => ({ ...p, weekly: true })); setRemindersSaved(false); document.getElementById('reminder-settings')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-900 hover:bg-blue-50">Set my reminders <ChevronRight size={15} className="ml-1 inline"/></button><span className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm text-white"><Bell size={16}/> Customer notifications</span></div></div>
             
<div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
  {suggestedRestock ? (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">Next suggested restock</p>
          <p className="mt-1 text-xl font-bold">{suggestedRestock.name}</p>
        </div>
        <div className="rounded-xl bg-amber-300/20 p-3 text-amber-100">
          <AlertTriangle size={22}/>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-amber-300"
          style={{
            width: `${Math.min(
              100,
              (suggestedRestock.stock / Math.max(suggestedRestock.reorder, 1)) * 100
            )}%`
          }}
        />
      </div>

      <div className="mt-2 flex justify-between gap-2 text-xs text-blue-100">
        <span>{suggestedRestock.stock} units remaining</span>
        <span>
          {suggestedRestock.stock <= suggestedRestock.reorder
            ? 'Reorder suggested'
            : 'Stock looks okay'}
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-white/10 p-3 text-sm">
        <Bell size={15} className="mr-2 inline"/>
        {suggestedRestock.stock <= suggestedRestock.reorder
          ? `${suggestedRestock.name} needs replenishment soon.`
          : 'No products currently need replenishment.'}
      </div>
    </>
  ) : (
    <p className="text-sm text-blue-100">No inventory products available yet.</p>
  )}
</div>

            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[{icon:Bell,title:'Timely reminders',text:'Daily, weekly or monthly purchase nudges based on customer choice.',tone:'bg-blue-50 text-blue-600'},{icon:Activity,title:'Low-stock alerts',text:'Notify opted-in customers when a frequently bought item is running low.',tone:'bg-amber-50 text-amber-600'},{icon:RefreshCw,title:'Repeat purchases',text:'Make routine buying quicker with suggested reorder lists.',tone:'bg-emerald-50 text-emerald-600'},{icon:Users,title:'Shared benefits',text:'Help local sellers retain customers and customers save time.',tone:'bg-violet-50 text-violet-600'}].map(card => <div key={card.title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}><card.icon size={21}/></div><h3 className="font-bold text-slate-900">{card.title}</h3><p className="mt-2 text-sm leading-5 text-slate-500">{card.text}</p></div>)}
          </div>
          <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
            <section id="reminder-settings" className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-900">Customer reminder preferences</h3><p className="mt-1 text-sm text-slate-500">Choose when and what you want to be reminded about.</p></div><div className="rounded-xl bg-blue-50 p-3 text-blue-600"><Bell size={20}/></div></div>
             
<div className="mt-5 space-y-3">
  <Field label="Select customer">
    <select
      className={inputClass}
      value={reminderPrefs.email}
      onChange={e => {
        setReminderPrefs({
          ...reminderPrefs,
          email: e.target.value
        });
        setRemindersSaved(false);
      }}
    >
      <option value="">Choose a customer</option>
      {customers.map((customer, index) => (
        <option
          key={customer.id ?? customer.email ?? index}
          value={customer.email ?? ''}
          disabled={!customer.email}
        >
          {customer.name ?? customer.email ?? `Customer ${index + 1}`}
          {customer.email ? ` (${customer.email})` : ''}
        </option>
      ))}
    </select>
  </Field>

  <Field label="Customer email">
    <input
      type="email"
      className={inputClass}
      value={reminderPrefs.email}
      onChange={e => {
        setReminderPrefs({
          ...reminderPrefs,
          email: e.target.value
        });
        setRemindersSaved(false);
      }}
      placeholder="you@example.com"
    />
  </Field>
</div>

              <p className="mb-2 mt-5 text-sm font-semibold text-slate-800">Purchase reminder frequency</p><div className="grid gap-3 sm:grid-cols-3">{[{key:'daily',title:'Daily',desc:'For everyday essentials'},{key:'weekly',title:'Weekly',desc:'For regular shopping'},{key:'monthly',title:'Monthly',desc:'For monthly supplies'}].map(opt => <button key={opt.key} onClick={() => { setReminderPrefs({ ...reminderPrefs, daily: opt.key === 'daily', weekly: opt.key === 'weekly', monthly: opt.key === 'monthly' }); setRemindersSaved(false) }} className={`rounded-xl border p-4 text-left transition ${reminderPrefs[opt.key] ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}><span className="flex items-center justify-between font-semibold text-slate-900">{opt.title}{reminderPrefs[opt.key] && <Check size={16} className="text-blue-600"/>}</span><span className="mt-1 block text-xs text-slate-500">{opt.desc}</span></button>)}</div>
              <div className="mt-5 space-y-3">{[{key:'lowStock',title:'Low-stock item alerts',desc:'Tell me when an item I regularly buy is running low.'},{key:'offers',title:'Personalized offers',desc:'Show relevant deals from my preferred store.'}].map(opt => <label key={opt.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"><span><span className="block text-sm font-semibold text-slate-800">{opt.title}</span><span className="mt-1 block text-xs text-slate-500">{opt.desc}</span></span><input type="checkbox" checked={reminderPrefs[opt.key]} onChange={e => { setReminderPrefs({ ...reminderPrefs, [opt.key]: e.target.checked }); setRemindersSaved(false) }} className="h-4 w-4 accent-blue-600"/></label>)}</div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs leading-5 text-slate-400">Reminder preferences are stored in MySQL. Actual email/SMS/push delivery needs a provider and customer consent.</p><Button onClick={async () => { try { await api.saveReminders(reminderPrefs); setRemindersSaved(true); notify('Reminder preferences saved to MySQL.') } catch (error) { notify(`Could not save reminders: ${error.message}`) } }}><Check size={16}/> Save preferences</Button></div>{remindersSaved && <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"><Check size={16} className="mr-2 inline"/> Preferences saved to the database. Email/SMS delivery needs a configured notification provider.</div>}
            </section>
            <div className="space-y-5"><section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><h3 className="text-lg font-bold text-slate-900">Why customers will use it</h3><div className="mt-4 space-y-4">{[{n:'01',title:'Less forgetting',text:'Gentle reminders help customers remember household essentials and regular orders.'},{n:'02',title:'Fewer surprise stock-outs',text:'Low-stock notices and availability updates help customers plan alternatives.'},{n:'03',title:'Faster repeat ordering',text:'Saved routines make daily, weekly and monthly shopping simpler.'},{n:'04',title:'Relevant offers',text:'Opt-in offers can be tailored to past purchases instead of sending random promotions.'}].map(x => <div key={x.n} className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">{x.n}</span><div><p className="text-sm font-semibold text-slate-800">{x.title}</p><p className="mt-1 text-sm leading-5 text-slate-500">{x.text}</p></div></div>)}</div></section>
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><h3 className="text-lg font-bold text-slate-900">Why sellers will use it</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{[{icon:ArrowUpRight,title:'More repeat sales',text:'Turn reminders into useful repeat orders, not spam.'},{icon:Boxes,title:'Better stock planning',text:'Use low-stock signals and buying patterns to plan replenishment.'},{icon:Wallet,title:'Lower waste & holding cost',text:'Avoid over-ordering by watching actual demand.'},{icon:Users,title:'Customer loyalty',text:'Build trust with reliable availability and useful service.'}].map(x => <div key={x.title} className="flex gap-3 rounded-xl bg-slate-50 p-3"><div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm"><x.icon size={17}/></div><div><p className="text-sm font-semibold text-slate-800">{x.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{x.text}</p></div></div>)}</div></section></div>
          </div>
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-900">Notification centre · sample alerts</h3><p className="mt-1 text-sm text-slate-500">Examples of messages customers could receive after backend integration.</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">Preview only</span></div><div className="mt-4 grid gap-3 md:grid-cols-3">{[{icon:AlertTriangle,title:'Item running low',message:'Basmati Rice 5kg is running low at your preferred store.',time:'When stock reaches the alert threshold',tone:'bg-amber-50 text-amber-700'},{icon:CalendarDays,title:'Weekly shopping reminder',message:'Your weekly essentials list is ready. Review before you reorder.',time:'Your chosen weekly schedule',tone:'bg-blue-50 text-blue-700'},{icon:Sparkles,title:'Relevant offer',message:'A preferred store has an offer on an item you often buy.',time:'Only when opted in',tone:'bg-emerald-50 text-emerald-700'}].map(n => <div key={n.title} className="rounded-xl border border-slate-100 p-4"><div className={`mb-3 inline-flex rounded-lg p-2 ${n.tone}`}><n.icon size={18}/></div><p className="font-semibold text-slate-800">{n.title}</p><p className="mt-2 text-sm leading-5 text-slate-500">{n.message}</p><p className="mt-3 text-xs text-slate-400">{n.time}</p></div>)}</div></section>
        </div>}

        {page === 'AI Forecasting' && <div className="space-y-5"><div className="rounded-2xl bg-gradient-to-r from-[#172554] to-[#2563eb] p-6 text-white sm:p-8"><div className="flex flex-wrap items-center justify-between gap-4"><div className="max-w-xl"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold"><Sparkles size={14}/> SMARTAI INSIGHTS</div><h3 className="text-2xl font-bold sm:text-3xl">Plan ahead with smarter stock decisions.</h3><p className="mt-3 text-sm leading-relaxed text-blue-100">This demo uses inventory thresholds and sample sales data to show how a forecasting workspace could look. Connect a real forecasting model to generate data-driven predictions.</p></div><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10"><BrainCircuit size={42}/></div></div></div><div className="grid gap-4 lg:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-blue-600"><Activity size={18}/><span className="text-sm font-semibold">Reorder recommendations</span></div><p className="mt-3 text-3xl font-bold">{lowStock.length}</p><p className="mt-1 text-sm text-slate-500">Products at or below reorder level</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-teal-600"><Boxes size={18}/><span className="text-sm font-semibold">Total inventory units</span></div><p className="mt-3 text-3xl font-bold">{totalUnits}</p><p className="mt-1 text-sm text-slate-500">Across {products.length} products</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-violet-600"><Wallet size={18}/><span className="text-sm font-semibold">Inventory value</span></div><p className="mt-3 text-3xl font-bold">{formatINR(stockValue)}</p><p className="mt-1 text-sm text-slate-500">Based on listed price × stock</p></div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h3 className="font-bold text-slate-900">Suggested restock list</h3><p className="mt-1 text-sm text-slate-500">Rule-based suggestions for the current demo inventory</p><div className="mt-4 space-y-3">{(lowStock.length ? lowStock : products.slice(0, 3)).map(p => <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"><div><p className="font-semibold text-slate-800">{p.name}</p><p className="mt-1 text-xs text-slate-500">Current stock: {p.stock} · Reorder level: {p.reorder}</p></div><div className="flex items-center gap-3"><Status>{stockStatus(p)}</Status><Button variant="outline" onClick={() => { setTransactionForm({ partner: p.supplier, productId: p.id, quantity: String(Math.max(p.reorder * 2 - p.stock, 1)), amount: '' }); setModal('purchase') }}>Restock</Button></div></div>)}</div></div></div>}

        {page === 'Reports' && <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard title="Product count" value={products.length} change="Live demo" icon={Package}/><MetricCard title="Units in stock" value={totalUnits} change="Live demo" icon={Boxes} tone="teal"/><MetricCard title="Stock valuation" value={formatINR(stockValue)} change="Live demo" icon={Wallet} tone="purple"/><MetricCard title="Low stock" value={lowStock.length} change="Action needed" icon={AlertTriangle} tone="orange"/></div><div className="grid gap-5 xl:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">Monthly sales report</h3><p className="mt-1 text-xs text-slate-500">Sample revenue data for 2026</p><div className="mt-5 h-[280px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={salesData}><CartesianGrid stroke="#edf1f7" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${v/1000}k`}/><Tooltip formatter={v => formatINR(v)}/><Bar dataKey="sales" fill="#2563eb" radius={[5,5,0,0]} name="Sales"/></BarChart></ResponsiveContainer></div></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">Inventory valuation report</h3><p className="mt-1 text-xs text-slate-500">Value by category</p><div className="mt-5 space-y-5">{Object.entries(products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + p.price * p.stock; return acc }, {})).map(([name, value], i) => <div key={name}><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">{name}</span><span className="font-semibold">{formatINR(value)}</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${value / Math.max(stockValue, 1) * 100}%`, background: categoryColors[i % categoryColors.length] }}/></div></div>)}</div><Button className="mt-6" onClick={exportCSV}><Download size={15}/> Export product report</Button></div></div></div>}

        {page === 'Settings' && <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]"><form className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" onSubmit={e => { e.preventDefault(); notify('Settings saved for this session.') }}><h3 className="font-bold text-slate-900">Store preferences</h3><p className="mt-1 text-sm text-slate-500">Customize your inventory workspace.</p><div className="mt-6 space-y-5"><Field label="Business name"><input className={inputClass} value={settings.business} onChange={e => setSettings({ ...settings, business: e.target.value })}/></Field><Field label="Currency"><select className={inputClass} value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })}><option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option></select></Field><Field label="Default low-stock threshold"><input className={inputClass} type="number" min="1" value={settings.threshold} onChange={e => setSettings({ ...settings, threshold: e.target.value })}/><span className="mt-1 block text-xs text-slate-400">Used as your preferred default for new products.</span></Field><div className="flex items-center justify-between rounded-xl border border-slate-100 p-4"><div><p className="text-sm font-semibold">Low-stock notifications</p><p className="mt-1 text-xs text-slate-500">Show alerts when items need replenishment.</p></div><button type="button" onClick={() => setSettings({ ...settings, notifications: !settings.notifications })} className={`relative h-6 w-11 rounded-full transition ${settings.notifications ? 'bg-blue-600' : 'bg-slate-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${settings.notifications ? 'left-6' : 'left-1'}`}/></button></div><Button type="submit"><Check size={16}/> Save preferences</Button></div></form><div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Building2 size={21}/></div><h3 className="mt-4 font-bold text-slate-900">Workspace information</h3><p className="mt-1 text-sm text-slate-500">SmartAI Inventory demo build</p><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between border-b border-slate-100 pb-3"><span className="text-slate-500">Version</span><span className="font-medium">1.0.0</span></div><div className="flex justify-between border-b border-slate-100 pb-3"><span className="text-slate-500">Data storage</span><span className="font-medium">Session state</span></div><div className="flex justify-between border-b border-slate-100 pb-3"><span className="text-slate-500">Backend API</span><Status>{apiStatus}</Status></div><div className="flex justify-between"><span className="text-slate-500">AI model</span><Status>Demo insights</Status></div></div><div className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-800"><AlertTriangle size={16} className="mb-2"/><strong>Demo limitation:</strong> Changes are held in React state and will reset when you refresh. Add a backend and database before using this for real inventory.</div></div></div>}

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400"><span>© 2026 SmartAI Inventory Management System</span><span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${apiStatus.includes('Connected') ? 'bg-emerald-500' : 'bg-amber-500'}`}/> {apiStatus}</span></footer>
      </main>
    </div>

    {modal === 'product' && <Modal title={editingProduct ? 'Edit product' : 'Add new product'} subtitle="Enter product details for your inventory catalog." onClose={() => setModal('')}><form onSubmit={saveProduct} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Product name"><input required className={inputClass} placeholder="e.g. Wireless Keyboard" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })}/></Field><Field label="SKU"><input required className={inputClass} placeholder="e.g. EL-KEY-01" value={productForm.sku} onChange={e => setProductForm({ ...productForm, sku: e.target.value })}/></Field><Field label="Category"><select className={inputClass} value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>{['Electronics', 'Grocery', 'Clothing', 'Personal Care', 'Home & Living', 'Other'].map(c => <option key={c}>{c}</option>)}</select></Field><Field label="Supplier"><select className={inputClass} value={productForm.supplier} onChange={e => setProductForm({ ...productForm, supplier: e.target.value })}>{suppliers.map(s => <option key={s.name}>{s.name}</option>)}{!suppliers.length && <option>New supplier</option>}</select></Field><Field label="Unit price (₹)"><input required min="0" type="number" className={inputClass} placeholder="0" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })}/></Field><Field label="Current stock"><input required min="0" type="number" className={inputClass} placeholder="0" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })}/></Field><Field label="Reorder level"><input required min="0" type="number" className={inputClass} value={productForm.reorder} onChange={e => setProductForm({ ...productForm, reorder: e.target.value })}/></Field></div><div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="outline" onClick={() => setModal('')}>Cancel</Button><Button type="submit"><Check size={16}/>{editingProduct ? 'Save changes' : 'Add product'}</Button></div></form></Modal>}

    {(modal === 'sale' || modal === 'purchase') && <Modal title={modal === 'sale' ? 'Record a sale' : 'Record a purchase'} subtitle={modal === 'sale' ? 'Record an outgoing order and update stock.' : 'Record incoming stock from a supplier.'} onClose={() => setModal('')}><form onSubmit={saveTransaction} className="space-y-4"><Field label={modal === 'sale' ? 'Customer name' : 'Supplier'}>{modal === 'sale' ? <input className={inputClass} value={transactionForm.partner} onChange={e => setTransactionForm({ ...transactionForm, partner: e.target.value })}/> : <select className={inputClass} value={transactionForm.partner} onChange={e => setTransactionForm({ ...transactionForm, partner: e.target.value })}>{suppliers.map(s => <option key={s.name}>{s.name}</option>)}</select>}</Field><Field label="Product"><select className={inputClass} value={transactionForm.productId} onChange={e => setTransactionForm({ ...transactionForm, productId: e.target.value })}>{products.map(p => <option key={p.id} value={p.id}>{p.name} · {p.stock} in stock</option>)}</select></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Quantity"><input required min="1" type="number" className={inputClass} value={transactionForm.quantity} onChange={e => setTransactionForm({ ...transactionForm, quantity: e.target.value })}/></Field><Field label="Total amount (₹, optional)"><input min="0" type="number" className={inputClass} placeholder="Auto calculate from price" value={transactionForm.amount} onChange={e => setTransactionForm({ ...transactionForm, amount: e.target.value })}/></Field></div><div className="rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-800">{modal === 'sale' ? 'Saving a sale will reduce the selected product stock.' : 'Saving a purchase will increase the selected product stock.'} This demo does not process real payments.</div><div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="outline" onClick={() => setModal('')}>Cancel</Button><Button type="submit"><Check size={16}/>{modal === 'sale' ? 'Save sale' : 'Save purchase'}</Button></div></form></Modal>}

    {modal === 'supplier' && <Modal title="Add supplier" subtitle="Create a supplier entry in your directory." onClose={() => setModal('')}><form onSubmit={saveSupplier} className="space-y-4"><Field label="Supplier / company name"><input required className={inputClass} value={supplierForm.name} onChange={e => setSupplierForm({ ...supplierForm, name: e.target.value })} placeholder="Company name"/></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Contact person"><input className={inputClass} value={supplierForm.contact} onChange={e => setSupplierForm({ ...supplierForm, contact: e.target.value })} placeholder="Contact name"/></Field><Field label="Email"><input type="email" className={inputClass} value={supplierForm.email} onChange={e => setSupplierForm({ ...supplierForm, email: e.target.value })} placeholder="name@company.com"/></Field></div><Field label="Products supplied"><input min="0" type="number" className={inputClass} value={supplierForm.products} onChange={e => setSupplierForm({ ...supplierForm, products: e.target.value })}/></Field><div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="outline" onClick={() => setModal('')}>Cancel</Button><Button type="submit"><Plus size={16}/> Add supplier</Button></div></form></Modal>}

    {toast && <div role="status" className="fixed bottom-5 right-5 z-[60] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><Check size={15}/></span>{toast}<button onClick={() => setToast('')} className="ml-1 text-slate-400 hover:text-white"><X size={15}/></button></div>}
  </div>
}

function DataTable({ title, subtitle, columns, rows }) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30"><div className="border-b border-slate-100 px-5 py-4 sm:px-6"><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>{rows.length ? <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-400"><tr>{columns.map(c => <th key={c} className="px-5 py-3 font-semibold">{c}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row, i) => <tr key={i} className="hover:bg-slate-50/70">{row.map((cell, j) => <td key={j} className="px-5 py-4 text-slate-600">{cell}</td>)}</tr>)}</tbody></table></div> : <EmptyState title="No records yet" text="Add a record to see it here."/>}</section>
}

export default App
