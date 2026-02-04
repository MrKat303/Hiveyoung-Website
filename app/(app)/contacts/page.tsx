"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { 
  Plus, 
  Search, 
  X, 
  Building2, 
  Users,
  Loader2,
  FolderOpen,
  Globe,
  Gavel,
  Megaphone,
  Heart
} from 'lucide-react';
import { Contact } from '@/types/contact';
import { useProfile } from '@/hooks/useProfile';
import './Contacts.css';

export default function ContactsPage() {
  const { profile } = useProfile();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('Todos');

  const folders = [
    { name: 'Todos', icon: FolderOpen },
    { name: 'Política', icon: Gavel },
    { name: 'Sector Público', icon: Globe },
    { name: 'Sector Privado', icon: Building2 },
    { name: 'Medios de Comunicación', icon: Megaphone },
    { name: 'Aliados', icon: Heart },
    { name: 'Fundaciones', icon: Users },
  ];
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    contact_info: '',
    category: '',
    related_user_id: ''
  });

  // User search for "Persona"
  const [userQuery, setUserQuery] = useState('');
  const [userResults, setUserResults] = useState<{ id: string, full_name: string | null, avatar_url: string | null }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string, full_name: string | null, avatar_url: string | null } | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          profiles:related_user_id (id, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }

  // Handle User Search for "Persona"
  useEffect(() => {
    const searchUsers = async () => {
      if (userQuery.length > 2) {
        const { data } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .ilike('full_name', `%${userQuery}%`)
          .limit(5);
        setUserResults(data || []);
      } else {
        setUserResults([]);
      }
    };
    const timer = setTimeout(searchUsers, 300);
    return () => clearTimeout(timer);
  }, [userQuery]);

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          organization: formData.organization,
          role: formData.role,
          contact_info: formData.contact_info,
          category: formData.category,
          related_user_id: selectedUser?.id || null,
          added_by: profile.id
        }]);

      if (error) throw error;
      
      setIsModalOpen(false);
      setFormData({ name: '', organization: '', role: '', contact_info: '', category: '', related_user_id: '' });
      setSelectedUser(null);
      setUserQuery('');
      fetchContacts();
    } catch (err) {
      console.error('Error saving contact:', err);
    } finally {
      setSaving(false);
    }
  }

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = selectedFolder === 'Todos' || c.category === selectedFolder;

    return matchesSearch && matchesFolder;
  });

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1>Contactos</h1>
        <button className="add-contact-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Nuevo Contacto</span>
        </button>
      </div>

      <div className="contacts-folders">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const count = folder.name === 'Todos' 
            ? contacts.length 
            : contacts.filter(c => c.category === folder.name).length;
          
          return (
            <div 
              key={folder.name} 
              className={`folder-tab ${selectedFolder === folder.name ? 'active' : ''}`}
              onClick={() => setSelectedFolder(folder.name)}
            >
              <Icon size={16} className="folder-icon" />
              <span>{folder.name}</span>
              <span className="folder-count">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="search-container mb-8">
        <div className="search-input-wrapper">
          <Search className="search-icon-inside" size={18} />
          <input 
            type="text" 
            placeholder={`Buscar en ${selectedFolder.toLowerCase()}...`}
            className="search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <Loader2 className="animate-spin text-[#3a1b4e]" size={40} />
          <p className="text-gray-400 font-medium tracking-wider">Cargando la libreta...</p>
        </div>
      ) : (
        <div className="contacts-grid">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Organización</th>
                <th>Rol</th>
                <th>Contacto</th>
                <th>Categoría</th>
                <th>Persona (Relación)</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact: Contact) => (
                  <tr key={contact.id}>
                    <td data-label="Nombre" className="font-bold">{contact.name}</td>
                    <td data-label="Organización">{contact.organization || '-'}</td>
                    <td data-label="Rol">{contact.role || '-'}</td>
                    <td data-label="Contacto">{contact.contact_info || '-'}</td>
                    <td data-label="Categoría">
                      {contact.category && <span className="category-chip">{contact.category}</span>}
                    </td>
                    <td data-label="Persona">
                      {contact.profiles ? (
                        <div className="related-person">
                          <div className="person-avatar">
                            {contact.profiles.avatar_url ? (
                              <img src={contact.profiles.avatar_url} alt="" />
                            ) : (
                              <span>{contact.profiles.full_name?.[0] || '?'}</span>
                            )}
                          </div>
                          <span>{contact.profiles.full_name?.split(' ')[0] || '-'}</span>
                        </div>
                      ) : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-gray-400">
                    No se encontraron contactos en esta búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Agregar Contacto */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nuevo Contacto</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddContact} className="space-y-6">
                <div className="form-group">
                  <label className="form-label">Nombre Completo *</label>
                  <input 
                    required
                    placeholder="Eje: Juan Pérez"
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Organización</label>
                    <input 
                      placeholder="Empresa o Institución"
                      className="form-input"
                      value={formData.organization}
                      onChange={e => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rol</label>
                    <input 
                      placeholder="Cargo o Puesto"
                      className="form-input"
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email / Teléfono</label>
                  <input 
                    placeholder="contacto@ejemplo.com"
                    className="form-input"
                    value={formData.contact_info}
                    onChange={e => setFormData({...formData, contact_info: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <select 
                    className="form-select"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Selecciona una categoría</option>
                    {folders.filter(f => f.name !== 'Todos').map(f => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Selector de Persona (Usuario Registrado) */}
                <div className="form-group relative">
                  <label className="form-label">Persona (Relación en Hiveyoung)</label>
                  {selectedUser ? (
                    <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-[#3a1b4e]" />
                        <span className="text-sm font-bold text-[#3a1b4e]">{selectedUser.full_name}</span>
                      </div>
                      <button onClick={() => setSelectedUser(null)} className="text-purple-400 hover:text-purple-700">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          placeholder="Busca un miembro del equipo..."
                          className="form-input pl-10"
                          value={userQuery}
                          onChange={e => setUserQuery(e.target.value)}
                        />
                      </div>
                      {userResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden">
                          {userResults.map(u => (
                            <div 
                              key={u.id} 
                              onClick={() => { setSelectedUser(u); setUserQuery(''); }}
                              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-0 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#3a1b4e10] overflow-hidden flex items-center justify-center font-bold text-xs text-[#3a1b4e]">
                                {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full object-cover" alt="" /> : (u.full_name ? u.full_name[0] : '?')}
                              </div>
                              <span className="text-sm font-semibold text-gray-700">{u.full_name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={saving || !formData.name}
                    className="submit-btn"
                  >
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        <span>Guardando...</span>
                      </div>
                    ) : 'Crear Contacto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
