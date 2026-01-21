import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOMENTOS_IMAGES } from '@/data/congreso';


export const MomentosGallery: React.FC = () => {
    return (
        <motion.div
            key="momentos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="resumen-grid"
        >
            <div className="section-header">
                <h2>Momentos</h2>
                <p>Revive la energía y los mejores instantes del congreso.</p>
            </div>
            <div className="momentos-grid">
                {MOMENTOS_IMAGES.map((img, i) => (
                    <div key={i} className="momento-item">
                        <Image
                            src={img.url}
                            alt={img.alt}
                            width={800}
                            height={600}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
