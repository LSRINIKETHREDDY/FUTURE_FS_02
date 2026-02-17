import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadCard from '../components/LeadCard';
import { LayoutDashboard, LogOut, Loader, RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/leads');
            setLeads(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/leads/${id}`, { status: newStatus });
            // Optimistic update
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/leads/${id}`);
            setLeads(leads.filter(l => l.id !== id));
        } catch (err) {
            alert('Failed to delete lead');
        }
    };

    // Calculate stats
    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'New').length,
        converted: leads.filter(l => l.status === 'Converted').length
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{ borderBottom: '1px solid var(--border)', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '8px' }}>
                            <LayoutDashboard size={24} color="white" />
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mini CRM</h1>
                    </div>
                    <button className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container" style={{ flex: 1, padding: '2rem 2rem' }}>
                {/* Stats Row */}
                <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Leads</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.total}</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ color: '#60a5fa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>New Leads</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.new}</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ color: '#34d399', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Converted</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.converted}</div>
                    </div>
                </div>

                {/* Leads Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Recent Leads</h2>
                    <button onClick={fetchLeads} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <RefreshCw size={16} /> Refresh
                    </button>
                </div>

                {/* Leads Grid */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader className="animate-spin" size={32} color="var(--primary)" />
                    </div>
                ) : (
                    <div className="grid-cols-3">
                        {leads.map(lead => (
                            <LeadCard
                                key={lead.id}
                                lead={lead}
                                onStatusUpdate={handleStatusUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {!loading && leads.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        No leads found. Share your public form link to get started!
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
