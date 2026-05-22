import { motion } from 'framer-motion';
import { Heart, Camera } from 'lucide-react';

const socialFeed = [
  { id: 1, src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800', likes: 342, author: '@max_el_perrito' },
  { id: 2, src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800', likes: 890, author: '@gatafina' },
  { id: 3, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800', likes: 215, author: '@soy_polo' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=800', likes: 124, author: '@michi_club' },
  { id: 5, src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800', likes: 967, author: '@pugslife_mx' },
  { id: 6, src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800', likes: 512, author: '@firulais_pro' },
];

const CommunitySection = () => (
  <section id="comunidad" className="section-pad section-surface pb-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6"
      >
        <div className="text-center md:text-left">
          <h2 className="section-title mb-4">
            La Comunidad <span className="text-brand-naranja">San Marcos</span>
          </h2>
          <p className="text-brand-verde-oscuro/70 font-amsi max-w-xl text-lg">
            Miles de negocios y familias confían en nosotros. Síguenos y comparte los mejores momentos con tus mascotas.
          </p>
        </div>
        <a href="#" className="group flex flex-col items-center">
          <button
            type="button"
            className="flex items-center gap-3 bg-brand-naranja hover:bg-brand-naranja-hover text-white px-8 py-4 rounded-full font-bold font-collier hover:shadow-lg hover:scale-105 transition-all"
          >
            <Camera className="w-6 h-6" />
            Síguenos en Instagram
          </button>
          <span className="text-sm text-brand-verde-oscuro/50 mt-2 font-amsi opacity-0 group-hover:opacity-100 transition-opacity">
            @sanmarcos_oficial
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
      >
        {socialFeed.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: idx * 0.08 }}
            className="relative group overflow-hidden rounded-2xl bg-brand-neutral break-inside-avoid cursor-pointer"
          >
            <img
              src={post.src}
              alt="Mascota de la comunidad"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <motion.div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
              <Heart className="w-12 h-12 fill-white text-white mb-2" />
              <span className="font-bold font-collier text-lg text-white">{post.likes}</span>
              <p className="absolute bottom-4 left-4 text-white/90 font-amsi text-sm">{post.author}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CommunitySection;
