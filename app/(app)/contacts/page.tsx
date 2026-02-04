"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { 
  Plus, 
  Search, 
  X, 
  FolderOpen, 
  Loader2,
  Filter,
  MoreHorizontal,
  Mail,
  Phone as PhoneIcon,
  Building2,
  User,
  Tag,
  Edit2,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Contact, ContactFolder } from '@/types/contact';
import { useProfile } from '@/hooks/useProfile';
import { useContacts } from '@/hooks/useContacts';
import './Contacts.css';

export default function ContactsPage() {
  const { profile } = useProfile();
  const { contacts, loading, addContact, updateContact, deleteContact, fetchContacts } = useContacts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('Todos');
  const [folders, setFolders] = useState<ContactFolder[]>([]);
  const [saving, setSaving] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: '',
    phone: '',
    email: '',
    avatar_url: '',
    folder_id: '',
    tags: [] as string[]
  });

  const [currentTag, setCurrentTag] = useState('');
  const predefinedTags = ['Innovación', 'Venture', 'Emprendimiento', 'Ciencia', 'Arte'];

  useEffect(() => {
    fetchFolders();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  async function fetchFolders() {
    const { data } = await supabase.from('contact_folders').select('*').order('name');
    if (data) setFolders(data);
  }

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      const contactData = {
        name: formData.name,
        organization: formData.organization,
        role: formData.role,
        phone: formData.phone,
        email: formData.email,
        avatar_url: formData.avatar_url || null,
        folder_id: formData.folder_id || null,
        tags: formData.tags.length > 0 ? formData.tags : null
      };

      let result;
      if (editingContactId) {
        result = await updateContact(editingContactId, contactData);
      } else {
        result = await addContact(contactData);
      }

      if (!result.success) throw new Error(result.error);
      
      setIsModalOpen(false);
      setEditingContactId(null);
      setFormData({ name: '', organization: '', role: '', phone: '', email: '', avatar_url: '', folder_id: '', tags: [] });
      fetchContacts();
    } catch (err) {
      console.error('Error saving contact:', err);
    } finally {
      setSaving(false);
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContactId(contact.id);
    setFormData({
      name: contact.name,
      organization: contact.organization || '',
      role: contact.role || '',
      phone: contact.phone || '',
      email: contact.email || '',
      avatar_url: contact.avatar_url || '',
      folder_id: contact.folder_id || '',
      tags: contact.tags || []
    });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) return;
    try {
      const { success } = await deleteContact(id);
      if (success) {
        fetchContacts();
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(id);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleTag = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag];
    setFormData({ ...formData, tags: newTags });
  };

  const handleManualTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      }
      setCurrentTag('');
    }
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFolder = selectedFolderId === 'Todos' || c.folder_id === selectedFolderId;

    return matchesSearch && matchesFolder;
  });

  const getIcon = (iconName: string | null) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ElementType || Icons.Folder;
    return <Icon size={14} className="folder-icon" />;
  };

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1>Contactos</h1>
        <div className="header-actions">
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={16} />
            <input 
              type="text" 
              placeholder="Buscar..."
              className="search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="secondary-actions-mobile">
            <button className="filter-btn">
              <Filter size={16} />
              <span>Filtrar</span>
            </button>
            <button className="add-contact-btn" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              <span>Agregar Contacto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="contacts-folders">
        <div 
          className={`folder-tab ${selectedFolderId === 'Todos' ? 'active' : ''}`}
          onClick={() => setSelectedFolderId('Todos')}
        >
          <FolderOpen size={16} className="folder-icon" />
          <span>Todos</span>
          <span className="folder-count">{contacts.length}</span>
        </div>
        {folders.map((folder) => {
          const count = contacts.filter(c => c.folder_id === folder.id).length;
          
          return (
            <div 
              key={folder.id} 
              className={`folder-tab ${selectedFolderId === folder.id ? 'active' : ''}`}
              onClick={() => setSelectedFolderId(folder.id)}
            >
              {getIcon(folder.icon)}
              <span>{folder.name}</span>
              <span className="folder-count">{count}</span>
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <Loader2 className="animate-spin text-[#3a1b4e]" size={40} />
          <p className="text-gray-400 font-medium tracking-wider text-sm">Cargando contactos...</p>
        </div>
      ) : (
        <>
          {/* Vista de Escritorio (Tabla) */}
          <div className="contacts-grid desktop-only">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Organización</th>
                  <th>Etiquetas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact: Contact) => (
                    <tr key={contact.id}>
                      <td>
                        <div className="name-cell">
                          <div className="contact-avatar">
                            {contact.avatar_url ? (
                              <img src={contact.avatar_url} alt={contact.name} />
                            ) : (
                              contact.name[0].toUpperCase()
                            )}
                          </div>
                          <div className="flex flex-col">
                             <span>{contact.name}</span>
                             <span className="text-[10px] text-gray-400 font-normal">{contact.role || '-'}</span>
                          </div>
                        </div>
                      </td>
                      <td 
                        className="clickable-cell" 
                        onClick={() => contact.phone && copyToClipboard(contact.phone, `${contact.id}-phone`)}
                      >
                        <div className="flex items-center gap-2">
                          {contact.phone || '-'}
                          {copyFeedback === `${contact.id}-phone` && <Check size={12} className="text-green-500" />}
                        </div>
                      </td>
                      <td 
                        className="clickable-cell" 
                        onClick={() => contact.email && copyToClipboard(contact.email, `${contact.id}-email`)}
                      >
                        <div className="flex items-center gap-2">
                          {contact.email || '-'}
                          {copyFeedback === `${contact.id}-email` && <Check size={12} className="text-green-500" />}
                        </div>
                      </td>
                      <td>{contact.organization || '-'}</td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags?.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-purple-50 text-[#3a1b4e] text-[10px] font-bold rounded-md border border-purple-100">
                              {tag}
                            </span>
                          )) || '-'}
                        </div>
                      </td>
                      <td>
                        <div className="actions-wrapper">
                          <MoreHorizontal 
                            size={24} 
                            className="action-dots" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === contact.id ? null : contact.id);
                            }}
                          />
                          {activeDropdown === contact.id && (
                            <div className="actions-dropdown">
                              <button 
                                className="dropdown-item"
                                onClick={() => handleEdit(contact)}
                              >
                                <Edit2 size={14} />
                                <span>Editar</span>
                              </button>
                              <button 
                                className="dropdown-item delete"
                                onClick={() => handleDelete(contact.id)}
                              >
                                <Trash2 size={14} />
                                <span>Eliminar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-400">
                      No se encontraron contactos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Vista de Móvil (Cards) */}
          <div className="contacts-mobile-list mobile-only">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact: Contact) => (
                <div key={contact.id} className="contact-card-mobile">
                  <div className="card-header">
                    <div className="name-cell">
                      <div className="contact-avatar">
                        {contact.avatar_url ? (
                          <img src={contact.avatar_url} alt={contact.name} />
                        ) : (
                          contact.name[0].toUpperCase()
                        )}
                      </div>
                      <div className="flex flex-col">
                         <span className="contact-name">{contact.name}</span>
                         <span className="contact-role">{contact.role || 'Sin cargo'}</span>
                      </div>
                    </div>
                    <div className="actions-wrapper">
                      <MoreHorizontal 
                        size={24} 
                        className="action-dots" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === contact.id ? null : contact.id);
                        }}
                      />
                      {activeDropdown === contact.id && (
                        <div className="actions-dropdown">
                          <button 
                            className="dropdown-item"
                            onClick={() => handleEdit(contact)}
                          >
                            <Edit2 size={14} />
                            <span>Editar</span>
                          </button>
                          <button 
                            className="dropdown-item delete"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash2 size={14} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-info-grid">
                    {contact.organization && (
                      <div className="info-item">
                        <span className="info-label">Organización</span>
                        <span className="info-value">{contact.organization}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div 
                        className="info-item clickable-info"
                        onClick={() => copyToClipboard(contact.phone!, `${contact.id}-phone-mobile`)}
                      >
                        <span className="info-label">Teléfono</span>
                        <div className="flex items-center justify-between">
                          <span className="info-value">{contact.phone}</span>
                          {copyFeedback === `${contact.id}-phone-mobile` ? <Check size={14} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                        </div>
                      </div>
                    )}
                    {contact.email && (
                      <div 
                        className="info-item clickable-info"
                        onClick={() => copyToClipboard(contact.email!, `${contact.id}-email-mobile`)}
                      >
                        <span className="info-label">Correo</span>
                        <div className="flex items-center justify-between">
                          <span className="info-value">{contact.email}</span>
                          {copyFeedback === `${contact.id}-email-mobile` ? <Check size={14} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                        </div>
                      </div>
                    )}
                  </div>

                  {contact.tags && contact.tags.length > 0 && (
                    <div className="card-tags">
                      {contact.tags.map(tag => (
                        <span key={tag} className="mobile-tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state-mobile">
                No se encontraron contactos.
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal Agregar Contacto */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingContactId ? 'Editar Contacto' : 'Nuevo Contacto'}</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingContactId(null);
                  setFormData({ name: '', organization: '', role: '', phone: '', email: '', avatar_url: '', folder_id: '', tags: [] });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleAddContact} className="space-y-6">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Nombre Completo *</label>
                    <input 
                      required
                      placeholder="Ej: Juan Pérez"
                      className="form-input"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">URL de la Foto</label>
                    <input 
                      placeholder="https://ejemplo.com/foto.jpg"
                      className="form-input"
                      value={formData.avatar_url}
                      onChange={e => setFormData({...formData, avatar_url: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Teléfono</label>
                    <input 
                      placeholder="+56 9 ..."
                      className="form-input"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo</label>
                    <input 
                      type="email"
                      placeholder="ejemplo@correo.com"
                      className="form-input"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Organización / Institución</label>
                    <input 
                      placeholder="Empresa o Institución"
                      className="form-input"
                      value={formData.organization}
                      onChange={e => setFormData({...formData, organization: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cargo / Rol</label>
                    <input 
                      placeholder="Ej: Director, Gerente..."
                      className="form-input"
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Etiquetas</label>
                    <div className="tags-selection-wrapper">
                      <div className="predefined-tags-list">
                        {predefinedTags.map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`tag-pill-btn ${formData.tags.includes(tag) ? 'active' : ''}`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <input 
                        placeholder="Escribe otra etiqueta y presiona Enter..."
                        className="form-input tag-input-field"
                        value={currentTag}
                        onChange={e => setCurrentTag(e.target.value)}
                        onKeyDown={handleManualTag}
                      />
                      <div className="selected-custom-tags">
                         {formData.tags.filter(t => !predefinedTags.includes(t)).map(tag => (
                           <span key={tag} className="custom-tag-chip">
                             {tag}
                             <X size={10} className="remove-tag-icon" onClick={() => toggleTag(tag)} />
                           </span>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Categoría / Carpeta</label>
                    <select 
                      className="form-select"
                      value={formData.folder_id}
                      onChange={e => setFormData({...formData, folder_id: e.target.value})}
                    >
                      <option value="">Sin carpeta</option>
                      {folders.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
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
                    ) : (editingContactId ? 'Actualizar Contacto' : 'Crear Contacto')}
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
