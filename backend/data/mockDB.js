const makeSvgUri = (emoji, colorStart, colorEnd) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorStart}"/>
        <stop offset="100%" stop-color="${colorEnd}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#gf)"/>
    <text x="200" y="220" font-size="160" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const mockProducts = [
  {
    id: 'p1',
    name: 'Croquetas Premium Adulto - San Marcos',
    description: 'Alimento seco completo para perros adultos con extra proteína.',
    price: 850,
    segment: 'b2c',
    imageUrl: makeSvgUri('🐕', '#f06020', '#d9541a'),
    stock: 50,
    category: 'Alimento',
    subCategory: 'Alimento seco',
    targetAnimal: 'perros',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p2',
    name: 'Premios de Carne y Ternera',
    description: 'Bolsa de premios suaves para entrenamiento.',
    price: 120,
    segment: 'both',
    imageUrl: makeSvgUri('🍖', '#80c060', '#4a8f38'),
    stock: 200,
    category: 'Premios, Carnazas y Toppings',
    subCategory: 'Premios',
    targetAnimal: 'perros',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p3',
    name: 'Pallets de Alimento x 50 Costales - El Parián',
    description: 'Cargamento de distribución para negocios (Alimento Perro).',
    price: 35000,
    segment: 'b2b',
    imageUrl: makeSvgUri('📦', '#003020', '#004d32'),
    stock: 15,
    category: 'Alimento',
    subCategory: 'Alimento seco',
    targetAnimal: 'perros',
    brand: 'El Parián'
  },
  {
    id: 'p4',
    name: 'Juguetes Interactivos para Gatos',
    description: 'Caja con juguetes surtidos con catnip para gatos.',
    price: 2500,
    segment: 'b2b',
    imageUrl: makeSvgUri('🐁', '#e5243a', '#c41e32'),
    stock: 30,
    category: 'Moda y Diversión',
    subCategory: 'Juguetes',
    targetAnimal: 'gatos',
    brand: 'El Parián'
  },
  {
    id: 'p5',
    name: 'Arena Aglomerante Gatos 5kg',
    description: 'Arena premium con control de olores superior.',
    price: 220,
    segment: 'b2c',
    imageUrl: makeSvgUri('🐈', '#f06020', '#d9541a'),
    stock: 100,
    category: 'Salud y Bienestar',
    subCategory: 'Limpieza',
    targetAnimal: 'gatos',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p6',
    name: 'Mixtura Premium para Aves',
    description: 'Semillas seleccionadas y fortificadas para pericos y canarios.',
    price: 150,
    segment: 'both',
    imageUrl: makeSvgUri('🦜', '#80c060', '#4a8f38'),
    stock: 80,
    category: 'Alimento',
    subCategory: 'Alimento natural',
    targetAnimal: 'aves',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p7',
    name: 'Heno para Conejos y Roedores',
    description: 'Heno fresco y natural para mantener la digestión sana.',
    price: 180,
    segment: 'b2c',
    imageUrl: makeSvgUri('🐇', '#003020', '#004d32'),
    stock: 60,
    category: 'Alimento',
    subCategory: 'Alimento natural',
    targetAnimal: 'conejos',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p8',
    name: 'Correa Reflectiva 2 Metros',
    description: 'Correa tejida de alta durabilidad para paseos nocturnos.',
    price: 350,
    segment: 'both',
    imageUrl: makeSvgUri('🦮', '#e5243a', '#c41e32'),
    stock: 45,
    category: 'Moda y Diversión',
    subCategory: 'Correas, collares y arneses',
    targetAnimal: 'perros',
    brand: 'San Marcos Mascotas'
  },
  {
    id: 'p9',
    name: 'Shampoo Grooming Avena',
    description: 'Limpia profundamente y alivia la irritación en la piel.',
    price: 190,
    segment: 'b2c',
    imageUrl: makeSvgUri('🛁', '#f06020', '#d9541a'),
    stock: 30,
    category: 'Salud y Bienestar',
    subCategory: 'Grooming',
    targetAnimal: 'perros',
    brand: 'San Marcos Mascotas'
  }
];

export const mockPromotions = [
  {
    id: 'promo1',
    title: '¡ENVÍO GRATIS!',
    description: 'En todas tus compras mayores a $999.',
    segment: 'b2c',
    active: true,
    couponCode: 'ENVIO-ZERO',
    imageUrl: makeSvgUri('🚚', '#f06020', '#d9541a')
  },
  {
    id: 'promo2',
    title: 'BONO EL PARIÁN',
    description: 'Cuentas B2B reciben 5% extra en su línea de crédito.',
    segment: 'b2b',
    active: true,
    couponCode: 'B2B-BONUS',
    imageUrl: makeSvgUri('🤝', '#003020', '#004d32') 
  },
  {
    id: 'promo3',
    title: '2x1 EN PREMIOS',
    description: 'Bolsas de Masticables naturales al precio de una.',
    segment: 'b2c',
    active: true,
    couponCode: 'DOBLE-PREMIO',
    imageUrl: makeSvgUri('🎁', '#e5243a', '#c41e32')
  },
  {
    id: 'promo4',
    title: 'DESCUENTO POR TARIMA',
    description: 'Obtén 10% de descuento directo en pallets completos.',
    segment: 'b2b',
    active: true,
    couponCode: 'TARIMA-10',
    imageUrl: makeSvgUri('📦', '#80c060', '#4a8f38')
  },
  {
    id: 'promo5',
    title: 'KITS DE ADOPCIÓN',
    description: 'Correa, tazón y alimento inicial con 20% off.',
    segment: 'b2c',
    active: true,
    couponCode: 'ADOPTA-MASCOTA',
    imageUrl: makeSvgUri('🐕', '#f06020', '#d9541a')
  },
  {
    id: 'promo6',
    title: 'LIQUIDACIÓN JUGUETES',
    description: '50 piezas por caja a mitad de costo de lista.',
    segment: 'b2b',
    active: true,
    couponCode: 'LIQUIDA-50',
    imageUrl: makeSvgUri('🎯', '#e5243a', '#c41e32')
  }
];

export const mockUsersDB = [
  {
    uid: 'admin123',
    email: 'admin@zonapet.com',
    role: 'admin',
    name: 'Administrador Principal'
  },
  {
    uid: 'b2b_client1',
    email: 'distribuidor@gmail.com',
    role: 'b2b',
    name: 'Ferretería Mascotas',
    credit: {
      allocated: 50000,
      currentDebt: 15000,
      available: 35000,
      validUntil: '2027-12-31',
      status: 'Activo'
    }
  },
  {
    uid: 'b2c_client1',
    email: 'cliente@gmail.com',
    role: 'b2c',
    name: 'Juan Pérez',
    credit: null
  }
];
