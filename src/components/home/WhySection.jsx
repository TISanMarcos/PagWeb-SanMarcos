import { motion } from 'framer-motion';
import { UserCheck, Boxes, MessageCircle, Clock } from 'lucide-react';

const features = [
  { icon: UserCheck, title: 'Atención 1:1' },
  { icon: Boxes, title: 'Stock surtido' },
  { icon: MessageCircle, title: 'WhatsApp' },
  { icon: Clock, title: '24/7' },
];

const WhySection = () => (
  <section id="por-que" className="section-pad section-alt">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="section-title text-center mb-8 md:mb-10">
        ¿Por qué surtirte en San Marcos?
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map(({ icon: Icon, title }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-brand-beige/80 hover:shadow-md transition-shadow"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 rounded-2xl bg-brand-verde-oscuro flex items-center justify-center mb-5"
            >
              <Icon className="w-7 h-7 text-brand-verde-claro" />
            </motion.div>
            <h3 className="font-collier font-bold text-lg text-brand-verde-oscuro">{title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default WhySection;
