import React from 'react';
import { Users, Mic2, Building2 } from 'lucide-react';

interface Stat {
    val: number;
    label: string;
    icon: React.ReactNode;
    prefix: string;
}

interface CountUpProps {
    value: number;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ value, duration = 2 }) => {
    const [count, setCount] = React.useState(0);
    const nodeRef = React.useRef(null);
    const [hasAnimated, setHasAnimated] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = value;
                    const totalFrames = duration * 60;
                    const frameDuration = 1000 / 60;

                    const counter = setInterval(() => {
                        start += end / totalFrames;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(counter);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, frameDuration);
                    return () => clearInterval(counter);
                }
            },
            { threshold: 0.1 }
        );

        if (nodeRef.current) {
            observer.observe(nodeRef.current);
        }

        return () => {
            if (nodeRef.current) {
                observer.unobserve(nodeRef.current);
            }
        };
    }, [value, duration, hasAnimated]);

    return <span ref={nodeRef} className="count-up-val">{count.toLocaleString()}</span>;
};

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
                        {s.prefix}<CountUp value={s.val} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                </div>
            ))}
        </div>
    );
};
