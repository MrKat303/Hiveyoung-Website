import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Speaker } from '@/data/speakers';

interface SpeakersGridProps {
    speakers: Speaker[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    availableCategories: string[];
}

export const SpeakersGrid: React.FC<SpeakersGridProps> = ({
    speakers,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    availableCategories
}) => {
    const filteredSpeakers = useMemo(() => {
        return speakers.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.company.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'Todos' || s.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [speakers, searchQuery, activeCategory]);

    return (
        <motion.div
            key="speakers"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
        >
            <div className="section-header">
                <h2>Nuestros Speakers</h2>
                <p>Lideres, emprendedores y visionarios que están definiendo el futuro.</p>
            </div>

            <div className="speakers-controls">
                <div className="search-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o empresa..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-tags">
                    {availableCategories.map(cat => (
                        <button
                            key={cat}
                            className={`tag-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="speakers-grid">
                {filteredSpeakers.map((speaker) => (
                    <motion.div
                        layout
                        key={speaker.id}
                        className="speaker-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="speaker-avatar">
                            {speaker.img && (
                                <Image
                                    src={speaker.img}
                                    alt={speaker.name}
                                    width={200}
                                    height={200}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                />
                            )}
                        </div>
                        <h4 className="speaker-name">{speaker.name}</h4>
                        <p className="speaker-role">{speaker.role}</p>
                        <p className="speaker-company">{speaker.company}</p>
                        <div className="speaker-card-tags">
                            {speaker.tags.map((tag: string) => (
                                <span key={tag} className="card-tag">#{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
