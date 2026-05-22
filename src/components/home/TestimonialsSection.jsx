import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Gran experiencia de compra: surtido rápido, buenos precios y me atendieron al instante por WhatsApp.',
    author: 'María González',
    business: 'Pet Shop Centro · CDMX',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces',
  },
  {
    quote: 'Muy contento con el servicio. Pedí mayoreo un martes y todo llegó completo. Sin duda vuelvo a comprar.',
    author: 'Carlos Ramírez',
    business: 'Veterinaria del Norte',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
  },
];

const TestimonialsSection = () => (
  <section id="testimonios" className="section-pad section-alt">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="section-title text-center mb-8 md:mb-10">
        Lo que dicen nuestros clientes
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map(({ quote, author, business, image }, idx) => (
          <motion.blockquote
            key={author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-brand-beige/80 relative flex flex-col"
          >
            <Quote className="w-7 h-7 text-brand-verde-claro/50 mb-3" />

            <div className="flex gap-0.5 mb-4" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-naranja text-brand-naranja" />
              ))}
            </div>

            <p className="font-amsi text-brand-verde-oscuro/80 text-sm leading-relaxed mb-6 flex-1">
              &ldquo;{quote}&rdquo;
            </p>

            <footer className="flex items-center gap-4 pt-4 border-t border-brand-beige/60">
              <img
                src={image}
                alt=""
                className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-beige shadow-sm"
                loading="lazy"
              />
              <div>
                <cite className="not-italic font-collier font-bold text-brand-verde-oscuro block text-sm">
                  {author}
                </cite>
                <span className="text-xs text-brand-verde-oscuro/60 font-amsi">{business}</span>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </motion.div>
  </section>
);

export default TestimonialsSection;
