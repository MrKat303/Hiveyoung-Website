import React from 'react';
import { Users, Mic2, Building2 } from 'lucide-react';
import CountUp from 'react-countup';

interface Stat {
    val: number;
    label: string;
    icon: React.ReactNode;
    prefix: string;
}

const STATS: Stat[] = [
    { val: 2100, label: 'Asistentes', icon: <Users />, prefix: '+' },
    { val: 30, label: 'Speakers', icon: <Mic2 />, prefix: '+' },
    { val: 40, label: 'Instituciones', icon: <Building2 />, prefix: '+' }
];

export const StatsSection: React.FC = () => {
    return (
        <div className="stats-container">
            {STATS.map((s, i) => (
                <div key={i} className="stat-card">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-val">
                        {s.prefix}<CountUp end={s.val} duration={2.5} enableScrollSpy scrollSpyOnce />
                    </div>
                    <div className="stat-label">{s.label}</div>
                </div>
            ))}
        </div>
    );
};
