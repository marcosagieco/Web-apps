'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  LayoutDashboard, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  MessageSquare,
  Globe,
  Database, 
  Lock,
  TrendingUp,
  TrendingDown,
  Settings,
  Users,
  Plus,
  Search as SearchIcon,
  DollarSign,
  Package,
  Home,
  MousePointer2,
  Trash2,
  X,
  Save,
  ChevronDown,
  Tag,
  Wallet,
  PieChart,
  HelpCircle,
  Monitor,
  Rocket,
  Check,
  Menu
} from 'lucide-react';

/**
 * LANDING PAGE DE ALTA CONVERSIÓN
 * Estrategia: StoryBrand + Cialdini
 * Objetivo: Vender software de gestión a emprendedores.
 */

// --- UTILIDAD DE NAVEGACIÓN ---
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- DASHBOARD INTERACTIVO ---
const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('Inicio');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  const [inventory, setInventory] = useState([
    { id: 'p1', name: "Licencia Estándar", stock: 45, price: 29, category: "Software" },
    { id: 'p2', name: "Pack Gestión Pro", stock: 12, price: 79, category: "Software" },
    { id: 'p3', name: "Soporte Premium", stock: 99, price: 45, category: "Servicio" },
  ]);

  const [sales, setSales] = useState([
    { id: 1, customer: "Tienda Central", product: "Pack Gestión Pro", amount: 79, status: "Completado", date: "Hoy, 10:30" },
    { id: 2, customer: "Marcos Pérez", product: "Soporte Premium", amount: 45, status: "Pendiente", date: "Hoy, 09:15" },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, provider: "Hosting Cloud", description: "Servidor Mensual", amount: 15, date: "Hoy, 08:00", category: "Operativo" },
    { id: 2, provider: "Proveedor Internet", description: "Fibra Óptica", amount: 30, date: "Ayer", category: "Servicios" },
  ]);

  const [newSale, setNewSale] = useState({ customer: '', productId: '', amount: '', status: 'Completado' });
  const [newExpense, setNewExpense] = useState({ provider: '', description: '', amount: '', category: 'Operativo' });

  const totalRevenue = useMemo(() => sales.reduce((acc, sale) => acc + Number(sale.amount), 0), [sales]);
  const totalExpenses = useMemo(() => expenses.reduce((acc, exp) => acc + Number(exp.amount), 0), [expenses]);
  const netProfit = totalRevenue - totalExpenses;

  useEffect(() => {
    if (newSale.productId) {
      const selectedProduct = inventory.find(p => p.id === newSale.productId);
      if (selectedProduct) {
        setNewSale(prev => ({ ...prev, amount: selectedProduct.price.toString() }));
      }
    }
  }, [newSale.productId, inventory]);

  const handleSaveSale = (e: React.FormEvent) => {
    e.preventDefault();
    const product = inventory.find(p => p.id === newSale.productId);
    const saleToAdd = {
      id: Date.now(),
      customer: newSale.customer,
      product: product ? product.name : 'Desconocido',
      amount: Number(newSale.amount),
      status: newSale.status,
      date: "Recién"
    };
    setSales([saleToAdd, ...sales]);
    if (product) {
      setInventory(prev => prev.map(p => p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p));
    }
    setShowAddForm(false);
    setNewSale({ customer: '', productId: '', amount: '', status: 'Completado' });
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const expenseToAdd = {
      id: Date.now(),
      provider: newExpense.provider,
      description: newExpense.description,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      date: "Recién"
    };
    setExpenses([expenseToAdd, ...expenses]);
    setShowExpenseForm(false);
    setNewExpense({ provider: '', description: '', amount: '', category: 'Operativo' });
  };

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900 overflow-hidden text-left font-sans">
      <div className="w-16 md:w-52 bg-white border-r border-slate-200 flex flex-col p-4 shrink-0 transition-all">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl shrink-0 shadow-lg shadow-blue-600/20 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-xs hidden md:block uppercase tracking-tighter text-slate-900 italic">SOFT<span className="text-blue-600">PRO</span></span>
        </div>
        <nav className="space-y-1.5">
          {[
            { name: 'Inicio', icon: <Home className="w-4 h-4" /> },
            { name: 'Ventas', icon: <TrendingUp className="w-4 h-4" /> },
            { name: 'Gastos', icon: <TrendingDown className="w-4 h-4" /> },
            { name: 'Stock', icon: <Package className="w-4 h-4" /> },
            { name: 'Usuarios', icon: <Users className="w-4 h-4" /> }
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => { setActiveTab(item.name); setShowAddForm(false); setShowExpenseForm(false); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === item.name 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="text-[11px] font-bold hidden md:block tracking-wide uppercase">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl w-48 md:w-72 border border-slate-100">
            <SearchIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-400 font-medium tracking-tight italic">Buscar transacción...</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Balance Actual</p>
               <p className={`text-sm font-black ${netProfit >= 0 ? 'text-blue-600' : 'text-red-500'}`}>${netProfit.toFixed(2)}</p>
             </div>
             <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Settings className="w-4 h-4 text-blue-500" />
             </div>
          </div>
        </header>

        <main className="p-4 md:p-8 overflow-y-auto space-y-6">
          {activeTab === 'Inicio' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute right-4 top-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Ingresos Totales</p>
                  <h4 className="text-3xl font-black text-slate-900">${totalRevenue}</h4>
                </div>
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute right-4 top-4 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Gastos Totales</p>
                  <h4 className="text-3xl font-black text-slate-900">${totalExpenses}</h4>
                </div>
                <div className="bg-slate-900 p-6 rounded-[1.5rem] shadow-xl text-white border border-slate-800 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <PieChart className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Ganancia Neta</p>
                  <h4 className={`text-3xl font-black ${netProfit >= 0 ? 'text-blue-400' : 'text-red-400'}`}>${netProfit}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Ventas Recientes
                    </h5>
                  </div>
                  <div className="p-2 flex-1">
                    {sales.slice(0, 3).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">$</div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{sale.customer}</p>
                            <p className="text-[10px] text-slate-400">{sale.product}</p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-slate-900">+${sale.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div> Gastos Recientes
                    </h5>
                  </div>
                  <div className="p-2 flex-1">
                    {expenses.slice(0, 3).map((exp) => (
                      <div key={exp.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">!</div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{exp.provider}</p>
                            <p className="text-[10px] text-slate-400">{exp.category}</p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-red-500">-${exp.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTRAS VISTAS (Funcionalidad mantenida igual) */}
          {activeTab === 'Ventas' && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Ingresos</h3>
                {!showAddForm && (
                  <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all">
                    <Plus className="w-4 h-4" /> Registrar
                  </button>
                )}
              </div>

              {showAddForm ? (
                <div className="bg-white rounded-[2rem] border border-blue-100 p-8 shadow-xl animate-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-800">Nueva Venta</h4>
                    <button onClick={() => setShowAddForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleSaveSale} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cliente</label>
                        <input type="text" required placeholder="Nombre..." className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500" value={newSale.customer} onChange={e => setNewSale({...newSale, customer: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Producto</label>
                        <select required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500" value={newSale.productId} onChange={e => setNewSale({...newSale, productId: e.target.value})}>
                          <option value="">Seleccionar...</option>
                          {inventory.map(i => <option key={i.id} value={i.id}>{i.name} (${i.price})</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Monto</label>
                        <input type="number" required placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500" value={newSale.amount} onChange={e => setNewSale({...newSale, amount: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                      <Save className="w-4 h-4" /> Guardar Venta
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left italic">
                    <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest"><tr className="border-b border-slate-100"><th className="px-6 py-4">Cliente</th><th className="px-6 py-4">Monto</th><th className="px-6 py-4">Estado</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">{sales.map(s => (<tr key={s.id} className="text-[11px] hover:bg-slate-50"><td className="px-6 py-4 font-bold">{s.customer}</td><td className="px-6 py-4 font-black text-green-600">+${s.amount}</td><td className="px-6 py-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 font-bold text-[9px]">{s.status}</span></td></tr>))}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Gastos' && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Egresos</h3>
                {!showExpenseForm && (
                  <button onClick={() => setShowExpenseForm(true)} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 transition-all">
                    <Plus className="w-4 h-4" /> Registrar Gasto
                  </button>
                )}
              </div>

              {showExpenseForm ? (
                <div className="bg-white rounded-[2rem] border border-red-100 p-8 shadow-xl animate-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-800">Nuevo Gasto</h4>
                    <button onClick={() => setShowExpenseForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleSaveExpense} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proveedor / Concepto</label>
                        <input type="text" required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-red-500" value={newExpense.provider} onChange={e => setNewExpense({...newExpense, provider: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
                        <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-red-500" value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}>
                          <option>Operativo</option><option>Servicios</option><option>Impuestos</option><option>Personal</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Monto ($)</label>
                        <input type="number" required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-red-500" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-red-500 text-white p-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-600 transition-all">
                      <Save className="w-4 h-4" /> Guardar Gasto
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left italic">
                    <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest"><tr className="border-b border-slate-100"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4">Categoría</th><th className="px-6 py-4">Monto</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">{expenses.map(e => (<tr key={e.id} className="text-[11px] hover:bg-slate-50"><td className="px-6 py-4 font-bold">{e.provider}</td><td className="px-6 py-4 text-slate-500">{e.category}</td><td className="px-6 py-4 font-black text-red-500">-${e.amount}</td></tr>))}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Stock' && <div className="p-10 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">Módulo de Inventario Integrado</div>}
          {activeTab === 'Usuarios' && <div className="p-10 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">Gestión de Clientes y Proveedores</div>}
        </main>
      </div>
    </div>
  );
};

// --- COMPONENTES DE LA LANDING ---

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors shadow-sm">
      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm italic font-medium opacity-80">"{description}"</p>
  </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors pr-8">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <p className="pb-6 text-slate-500 text-sm leading-relaxed italic pr-8 animate-in slide-in-from-top-2 duration-200">{a}</p>}
    </div>
  );
};

const PricingCard = ({ title, price, features, highlighted = false }: any) => (
  <div className={`p-8 rounded-[3rem] border-2 ${highlighted ? 'bg-slate-900 text-white border-blue-500 shadow-2xl scale-105 relative z-10' : 'bg-white text-slate-900 border-slate-100'} transition-all`}>
    <h3 className="text-xl font-black uppercase tracking-widest mb-2 italic">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-black tracking-tighter">{price}</span>
      <span className={`${highlighted ? 'text-slate-400' : 'text-slate-500'} text-sm font-bold`}>/mes</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className={`w-5 h-5 shrink-0 ${highlighted ? 'text-blue-400' : 'text-blue-600'}`} />
          {feature}
        </li>
      ))}
    </ul>
    <button 
      onClick={() => scrollToSection('contacto')}
      className={`w-full py-4.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${highlighted ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
    >
      Seleccionar Plan
    </button>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight italic">SOFT<span className="text-blue-600 text-sm">GESTIÓN</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => scrollToSection('soluciones')} className="hover:text-blue-600 transition-colors">Soluciones</button>
            <button onClick={() => scrollToSection('demo')} className="hover:text-blue-600 transition-colors">Demo</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-blue-600 transition-colors">FAQ</button>
          </div>
          <button 
            onClick={() => scrollToSection('demo')}
            className="bg-slate-900 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
          >
            Ver Demo Gratis
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="relative pt-44 pb-28 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center">
          {/* Social Proof + Authority Signal */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm mb-10">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500`}>{i}</div>)}
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 ml-2">Elegido por +500 Empresas</span>
          </div>
          
          {/* H1: The Big Promise (Extreme Brevity) - UPDATED SLOGAN V11 */}
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 mb-10 leading-[0.85] tracking-tighter uppercase italic">
            Tu Negocio, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              En Orden.
            </span>
          </h1>
          
          {/* Subheadline: Short & Punchy */}
          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-14 leading-relaxed font-medium italic opacity-90">
            Registra ventas, controla gastos y visualiza tu ganancia real. Todo en un solo lugar, sin complicaciones.
          </p>
          
          {/* CTA: Direct Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={() => scrollToSection('precios')}
              className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5.5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30"
            >
              Empezar Ahora <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-200 px-12 py-5.5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-50 transition-all"
            >
              Ver Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest opacity-60">
             <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Cuentas claras</span>
             <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Control total</span>
          </div>
        </div>
      </section>

      {/* SOLUCIONES (Benefit Driven) */}
      <section id="soluciones" className="py-24 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">El Plan para tu Éxito</h2>
             <p className="text-slate-500 text-lg max-w-2xl mx-auto italic font-light">
               No necesitas ser contador ni experto en tecnología. Solo necesitas querer crecer.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Zap}
              title="Cobra más rápido y sin errores"
              description="Olvídate de las notas en papel. Registra ventas en segundos y dale a tu cliente una experiencia profesional instantánea."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="El fin del 'no me queda'"
              description="Nuestro stock inteligente te avisa antes de que te quedes sin productos, para que nunca pierdas una venta por falta de inventario."
            />
            <FeatureCard 
              icon={Monitor}
              title="Descubre dónde está tu dinero"
              description="Reportes automáticos que te dicen qué producto es tu mina de oro y dónde se están yendo tus gastos hormiga."
            />
          </div>
        </div>
      </section>

      {/* DEMO INTERACTIVA */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.5em] mb-4 italic">Pruébalo Tú Mismo</h2>
            <p className="text-4xl font-black text-slate-900 uppercase italic leading-tight tracking-tighter">No nos creas a nosotros, mira lo fácil que es</p>
          </div>
          <div className="relative bg-slate-900 rounded-[4rem] p-5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5 group">
            <div className="relative bg-white rounded-[3rem] overflow-hidden border border-white/10 shadow-inner h-[650px] flex flex-col">
              <div className="flex items-center gap-2 px-10 py-5 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-1.5"><div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div><div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div><div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div></div>
                <div className="ml-8 bg-slate-900/60 rounded-xl px-7 py-1.5 flex items-center gap-3 text-[10px] text-slate-500 font-mono tracking-widest border border-white/5"><Lock className="w-3.5 h-3.5" /> APP.TU-NEGOCIO.COM</div>
              </div>
              <InteractiveDashboard />
            </div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl z-20 hover:scale-105 transition-transform cursor-default">
               <MousePointer2 className="w-4 h-4" /> Toca los botones y mira la magia
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS (Psychological Anchoring) */}
      <section id="precios" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">Una Inversión, No un Gasto</h2>
            <p className="text-slate-500 max-w-xl mx-auto italic font-medium opacity-80">Elige la herramienta que hará crecer tu facturación este mes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PricingCard title="Emprendedor" price="$29" features={["Gestión de Ventas", "Control de Gastos", "Reporte Mensual", "1 Usuario"]} />
            <PricingCard title="Negocio Pro" price="$59" highlighted={true} features={["Todo lo de Inicial", "Control de Stock Inteligente", "Usuarios Ilimitados", "Soporte Prioritario", "App Móvil"]} />
            <PricingCard title="Imperio" price="$99" features={["Todo lo de Pro", "Facturación Automática", "API para E-commerce", "Consultoría Mensual"]} />
          </div>
        </div>
      </section>

      {/* FAQ (Objection Handling) */}
      <section id="faq" className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Resolvemos tus Dudas</h2>
            <p className="text-slate-500 italic">Queremos que estés 100% seguro de tu decisión.</p>
          </div>
          <div className="space-y-2">
            <FAQItem q="¿Es difícil de aprender a usar?" a="Para nada. Está diseñada para que hasta un niño pueda registrar una venta. Si sabes usar WhatsApp, sabes usar nuestra app en 5 minutos." />
            <FAQItem q="¿Mis datos están seguros?" a="Absolutamente. Utilizamos encriptación de grado bancario. Nadie, excepto tú, puede ver tus números. Tus datos son tu propiedad." />
            <FAQItem q="¿Puedo cancelar si no me sirve?" a="Sí, sin preguntas. No tenemos contratos forzosos. Si no te ayuda a ganar más dinero, puedes irte cuando quieras y exportar todos tus datos." />
            <FAQItem q="¿Sirve para mi rubro específico?" a="Nuestra herramienta es flexible y se adapta a comercios, servicios, profesionales y más. Si vendes algo, SoftGestión es para ti." />
          </div>
        </div>
      </section>

      {/* CTA FINAL & FOOTER */}
      <section id="contacto" className="py-36 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-[#0f172a] rounded-[4.5rem] p-12 md:p-28 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase italic leading-[0.9]">¿Cuánto dinero estás <br /><span className="text-blue-500">dejando sobre la mesa?</span></h2>
            <p className="text-slate-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-light">Cada día sin organización es un día perdiendo oportunidades. Agenda tu demo y cambia tu historia hoy.</p>
            <div className="flex flex-wrap justify-center gap-7">
              <button 
                onClick={() => window.open('https://wa.me/', '_blank')}
                className="bg-blue-600 text-white px-12 py-5.5 rounded-2xl font-black uppercase tracking-[0.25em] text-xs hover:bg-blue-500 transition-all flex items-center gap-4 shadow-2xl shadow-blue-600/20 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> Quiero Agendar Mi Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"><Globe className="text-slate-400 w-5 h-5" /></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 italic">SOFTGESTIÓN © 2024</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 