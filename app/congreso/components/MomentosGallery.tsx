import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MOMENTOS_IMAGES = [
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766510857/Orquesta_1_yzgvao.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512549/Tres_o062mf.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681260/IMG_1780_rrrrjc.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766536322/Guys_1_x2jbh7.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512713/Participacion_1_uvfjiq.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512767/IMG_1994-Mejorado-NR_obmhj3.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766681074/IMG_0008_zqu4dr.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766673917/IMG_1949_basypv.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684852/IMG_9768_zun8u5.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684680/IMG_1913_rne4wd.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684690/IMG_2083-Mejorado-NR_jonwir.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684685/IMG_1934_1_j97axx.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766684720/IMG_2027-Mejorado-NR_bueblx.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766512618/Panel_zz5lbb.jpg",
    "https://res.cloudinary.com/dlipwrbvd/image/upload/v1766673944/IMG_1958_gznyqx.jpg"
];

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
                {MOMENTOS_IMAGES.map((url, i) => (
                    <div key={i} className="momento-item">
                        <Image
                            src={url}
                            alt={`Momento ${i + 1}`}
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
