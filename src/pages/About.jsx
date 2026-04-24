import { motion } from 'framer-motion';
import { PawPrint, Users, Star, Target, ShieldCheck, ChevronDown } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] overflow-x-hidden selection:bg-brand-naranja selection:text-white">
      
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <motion.video 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
        />
        
        {/* Multiplying Color Overlays for Depth */}
        <div className="absolute inset-0 bg-brand-verde-oscuro/80 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-verde-oscuro/40 via-transparent to-brand-verde-oscuro z-10" />

        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
          >
            <Star className="w-4 h-4 text-brand-verde-claro" />
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold font-amsi pt-0.5">
              Nuestra Manada
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-collier font-bold mb-6 drop-shadow-2xl leading-tight text-white"
          >
            Nacimos para<br/><span className="text-brand-verde-claro italic">Nutrir.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-xl font-amsi leading-relaxed text-white/80 drop-shadow-md max-w-2xl font-light mb-12"
          >
            No hacemos "solo alimento". En San Marcos alimentamos el vínculo más puro de las familias, y con El Parián impulsamos el motor del comercio de mascotas en México.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2 font-amsi">Descubrir</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-brand-verde-claro opacity-80" />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy & Manifesto (Scrollable) */}
      <section className="relative py-24 bg-brand-verde-oscuro text-white">
        {/* subtle background pattern could go here */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-collier font-bold mb-6 tracking-tight">
              Un Ecosistema <br/> de <span className="text-brand-verde-claro border-b-2 border-brand-verde-claro/30 pb-1">Calidad Integral</span>
            </h2>
            <p className="text-gray-300 font-amsi md:text-lg leading-relaxed font-light">
              Respaldamos la nutrición y logística con décadas de experiencia. Diseñamos modelos operativos exactos para dueños de mascotas y para líderes comerciales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="group relative bg-[#093A2B] border border-white/5 p-8 lg:p-10 rounded-[2rem] hover:bg-[#0E4535] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(132,197,97,0.15)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-naranja to-orange-400 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-collier font-bold mb-4 group-hover:text-brand-naranja transition-colors duration-300">San Marcos Mascotas</h3>
              <p className="font-amsi text-gray-300 leading-relaxed text-sm lg:text-base">
                Dedicados al consumidor final (B2C). Garantizamos fórmulas selectas avaladas por expertos para que tu fiel compañero obtenga longevidad y energía en cada bocado.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative bg-[#093A2B] border border-white/5 p-8 lg:p-10 rounded-[2rem] hover:bg-[#0E4535] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(132,197,97,0.15)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-verde-claro to-teal-500 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Users className="w-8 h-8 text-brand-verde-oscuro" />
              </div>
              <h3 className="text-xl lg:text-2xl font-collier font-bold mb-4 group-hover:text-brand-verde-claro transition-colors duration-300">El Parián Mayoristas</h3>
              <p className="font-amsi text-gray-300 leading-relaxed text-sm lg:text-base">
                Nuestro poderoso ecosistema B2B. Surtimos inventarios masivos en tiempo récord y autorizamos líneas de crédito flexibles diseñadas para acelerar el crecimiento de tu tienda.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.3 }}
              className="group relative bg-[#093A2B] border border-white/5 p-8 lg:p-10 rounded-[2rem] hover:bg-[#0E4535] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl lg:text-2xl font-collier font-bold mb-4">Calidad Verificada</h3>
              <p className="font-amsi text-gray-300 leading-relaxed text-sm lg:text-base">
                La excelencia no es promesa, es proceso. Nuestras bodegas y la operación logística corren bajo lineamientos de primer nivel asegurando que cada envío llegue intacto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Call to Action Island */}
      <section className="py-20 lg:py-32 px-4 sm:px-6">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative gradients inside the island */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-naranja via-brand-verde-claro to-brand-naranja" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-naranja/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-verde-claro/5 rounded-full blur-3xl" />

          <Target className="w-16 h-16 md:w-20 md:h-20 text-brand-verde-claro-oscuro mx-auto mb-8 opacity-90" />
          <h2 className="text-3xl md:text-5xl font-collier font-bold text-gray-900 mb-6 tracking-tight">Eleva tu Experiencia</h2>
          <p className="text-gray-500 font-amsi md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Pertenecer a la familia San Marcos significa hacer negocios con pioneros de la nutrición y distribución en México. Da el siguiente paso.
          </p>
          <button className="bg-brand-verde-oscuro text-white px-10 py-5 rounded-full font-bold font-collier shadow-xl hover:shadow-brand-verde-oscuro/30 hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            Explorar el Catálogo
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
