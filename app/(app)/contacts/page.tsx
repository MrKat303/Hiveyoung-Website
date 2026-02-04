"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useContacts } from '@/hooks/useContacts';
import './Contacts.css';
import { 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  ChevronDown, 
  Check, 
  User, 
  Mail, 
  Briefcase,
  Users
} from 'lucide-react';

export default function ContactsPage() {
  const { contacts, loading, addContact, deleteContact } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', role: '', status: 'active' as const });
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, error } = await addContact(newContact);
    if (success) {
      setIsModalOpen(false);
      setNewContact({ name: '', email: '', role: '', status: 'active' });
    } else {
      alert('Error al crear contacto: ' + error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.role && contact.role.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = statusFilter === 'all' || contact.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const getFilterLabel = () => {
    switch(statusFilter) {
      case 'active': return 'Activos';
      case 'pending': return 'Pendientes';
      case 'inactive': return 'Inactivos';
      default: return 'Todos';
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-100 border-b-[#3A1B4E]"></div>
      <p className="text-gray-400 font-bold tracking-widest uppercase text-xs animate-pulse">Sincronizando red...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto px-6 py-8 lg:px-10 lg:py-12">
      
      {/* 1. Header Section - Elegant and Airy */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tightest">Contactos</h1>
          <p className="text-base text-gray-400 font-medium max-w-md">Organiza tu red con total claridad.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-button bg-[#3A1B4E] text-white shadow-xl shadow-purple-900/20 hover:shadow-purple-900/40 hover:-translate-y-0.5 active:scale-95 shrink-0"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="text-base">Nuevo Contacto</span>
        </button>
      </div>

      {/* 2. Controls Toolbar - Balanced */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#3A1B4E] transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nombre, rol o email..."
            className="premium-input bg-white border border-gray-200 focus:border-[#3A1B4E] focus:ring-[10px] focus:ring-[#3A1B4E]/5 outline-none shadow-sm hover:border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative shrink-0" ref={filterRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full md:w-auto premium-button border-2 transition-all shadow-sm active:scale-95 ${
              statusFilter !== 'all' 
              ? 'bg-[#3A1B4E] border-[#3A1B4E] text-white' 
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-200 hover:bg-gray-50'
            }`}
            style={{ height: '3.5rem' }}
          >
              <Filter size={18} className={statusFilter !== 'all' ? 'text-white' : 'text-gray-400'} />
              <span>{statusFilter === 'all' ? 'Filtrar' : getFilterLabel()}</span>
              <ChevronDown size={18} className={`ml-1 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : 'text-gray-400'}`} />
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-4 w-72 bg-white border border-gray-100 rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-2.5">
               {['all', 'active', 'pending'].map((status) => (
                 <button
                   key={status}
                   onClick={() => { setStatusFilter(status as any); setIsFilterOpen(false); }}
                   className={`w-full flex items-center justify-between px-6 py-4.5 rounded-2xl text-sm font-black transition-all ${
                     statusFilter === status 
                       ? 'bg-[#3A1B4E]/5 text-[#3A1B4E]' 
                       : 'text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                   <span className="capitalize">{status === 'all' ? 'Todos' : status === 'active' ? 'Activos' : 'Pendientes'}</span>
                   {statusFilter === status && <Check size={18} className="text-[#3A1B4E]" />}
                 </button>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Content Area */}
      {filteredContacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-48 bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
            <Users className="text-gray-200" size={48} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Vibras solitarias...</h3>
          <p className="text-gray-400 text-center max-w-md text-lg font-medium">No se encontraron contactos para esta búsqueda.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-[0_20px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/40">
                  <th className="table-cell text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.25em]">Contacto</th>
                  <th className="table-cell text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.25em]">Detalles</th>
                  <th className="table-cell text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.25em]">Estado</th>
                  <th className="table-cell text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.25em] text-right">Mantenimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="group hover:bg-purple-50/50 transition-all duration-500">
                    <td className="table-cell">
                      <div className="flex items-center gap-8">
                        <div className="contact-avatar bg-gradient-to-br from-[#3A1B4E] to-purple-800 text-white shadow-xl shadow-purple-900/20 group-hover:scale-105 transition-transform duration-500">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">{contact.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col gap-4">
                         {contact.role && (
                            <div className="role-tag bg-purple-50 text-[#3A1B4E] border border-purple-100">
                                <Briefcase size={14} strokeWidth={3} />
                                {contact.role}
                            </div>
                         )}
                         <div className="flex items-center gap-4 text-base text-gray-400 font-medium">
                            <Mail size={18} className="text-gray-300" />
                            {contact.email}
                         </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className={`status-badge ${
                        contact.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          contact.status === 'active' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-amber-500'
                        }`}></div>
                        {contact.status.toUpperCase()}
                      </div>
                    </td>
                    <td className="table-cell text-right">
                       <button 
                        onClick={() => deleteContact(contact.id)}
                        className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                       >
                         <Trash2 size={24} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Add Contact Modal - Sculpted spacing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-[#3A1B4E]/30 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] shadow-[0_50px_150px_-30px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 border border-white/50">
            {/* Modal Header */}
            <div className="px-16 py-16 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Añadir<br/>Talento</h2>
                <p className="text-gray-400 text-xl font-medium tracking-tight">Alimenta tu red estratégica ahora.</p>
              </div>
              <div className="p-7 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl text-[#3A1B4E]">
                 <User size={40} strokeWidth={3} />
              </div>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-16 space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.3em] ml-3">Nombre</label>
                    <div className="relative group/input">
                        <User size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#3A1B4E] transition-colors" />
                        <input 
                            type="text" 
                            className="premium-input bg-gray-50/50 border-2 border-gray-100 focus:bg-white focus:border-[#3A1B4E] focus:ring-[15px] focus:ring-[#3A1B4E]/5 outline-none font-bold"
                            placeholder="Nombre Apellido"
                            value={newContact.name}
                            onChange={e => setNewContact({...newContact, name: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.3em] ml-3">Rol</label>
                    <div className="relative group/input">
                        <Briefcase size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#3A1B4E] transition-colors" />
                        <input 
                            type="text" 
                            className="premium-input bg-gray-50/50 border-2 border-gray-100 focus:bg-white focus:border-[#3A1B4E] focus:ring-[15px] focus:ring-[#3A1B4E]/5 outline-none font-bold"
                            placeholder="Ej: CEO"
                            value={newContact.role}
                            onChange={e => setNewContact({...newContact, role: e.target.value})}
                        />
                    </div>
                </div>
              </div>

               <div className="space-y-4">
                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.3em] ml-3">Email</label>
                    <div className="relative group/input">
                        <Mail size={22} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#3A1B4E] transition-colors" />
                        <input 
                            type="email" 
                            className="premium-input bg-gray-50/50 border-2 border-gray-100 focus:bg-white focus:border-[#3A1B4E] focus:ring-[15px] focus:ring-[#3A1B4E]/5 outline-none font-bold"
                            placeholder="hola@empresa.com"
                            value={newContact.email}
                            onChange={e => setNewContact({...newContact, email: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.3em] ml-3">Estatus</label>
                    <div className="relative">
                        <select 
                            className="premium-input bg-gray-50/50 border-2 border-gray-100 focus:bg-white focus:border-[#3A1B4E] focus:ring-[15px] focus:ring-[#3A1B4E]/5 outline-none font-bold appearance-none cursor-pointer"
                            style={{ paddingLeft: '2rem' }}
                            value={newContact.status}
                            onChange={(e) => setNewContact({...newContact, status: e.target.value as any})}
                        >
                            <option value="active">✓ Activo</option>
                            <option value="pending">⏳ Pendiente</option>
                        </select>
                        <ChevronDown size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    </div>
                </div>

              <div className="pt-12 flex items-center justify-end gap-12 mt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="text-lg font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="premium-button bg-[#3A1B4E] text-white shadow-2xl shadow-purple-900/50 hover:bg-[#2A1239] active:scale-95 transition-all flex items-center gap-5"
                  style={{ paddingLeft: '4rem', paddingRight: '4rem', height: '5rem' }}
                >
                  <Plus size={28} strokeWidth={4} />
                  <span className="text-xl">GUARDAR</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
