import React from 'react';
import { User, Mail, Calendar, MessageSquare } from 'lucide-react';

const LeadCard = ({ lead, onStatusUpdate, onDelete }) => {
    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{lead.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <Mail size={14} /> {lead.email}
                    </div>
                </div>
                <span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                    <MessageSquare size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <p style={{ margin: 0 }}>{lead.notes || "No notes available."}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                        className="glass-input"
                        style={{ padding: '0.4rem', fontSize: '0.85rem', width: 'auto' }}
                        value={lead.status}
                        onChange={(e) => onStatusUpdate(lead.id, e.target.value)}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                    <button
                        onClick={() => onDelete(lead.id)}
                        className="btn-secondary"
                        style={{ padding: '0.4rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadCard;
