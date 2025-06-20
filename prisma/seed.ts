import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 🧹 Borrar todo en orden inverso a relaciones para evitar errores de FK
  await prisma.representativeParty.deleteMany({});
  await prisma.representative.deleteMany({});
  await prisma.party.deleteMany({});
  await prisma.province.deleteMany({});

  // Provincias (asumiendo que ya las tenés definidas)
  const provinces = [
    { id: 1, name: "San José" },
    { id: 2, name: "Alajuela" },
    { id: 3, name: "Cartago" },
    { id: 4, name: "Heredia" },
    { id: 5, name: "Limón" },
    { id: 6, name: "Puntarenas" },
    { id: 7, name: "Guanacaste" },
  ];

  for (const province of provinces) {
    await prisma.province.upsert({
      where: { id: province.id },
      update: {},
      create: province,
    });
  }

  // Partidos (id: 1-7 + "ind" = 999 para independientes)
  const parties = [
    {
      id: 1,
      name: "Partido Liberación Nacional",
      flag: "pln.png",
      description:
        "El más antiguo de los partidos políticos actuales. Fue fundado en 1952 y un año después participa y gana sus primeros comicios electorales. Se ha mantenido como agrupación política permanente desde entonces, obteniendo en ocho oportunidades el triunfo electoral. Su fundamento ideológico es la social democracia, que propugna la obtención de reformas sociales por medios parlamentarios. En su carta fundamental se propone construir una democracia basada en la justicia social y en la libertad política, consagra el derecho a la propiedad, educación, salud y seguridad social. Liberación Nacional es un partido democrático, popular, independiente, doctrinario y permanente. Se fundamenta en el ejercicio efectivo de la soberanía popular y el respeto a la dignidad del ser humano.",
    },
    {
      id: 2,
      name: "Partido Unidad Social Cristiana",
      flag: "pusc.png",
      description:
        "Ha participado en doce elecciones nacionales, obteniendo el triunfo cuatro veces. Como Coalición Unidad llevó a la Presidencia a Rodrigo Carazo Odio en 1978 y presentó a Rafael Ángel Calderón Fournier como candidato presidencial en 1982. Lograron la Presidencia de la República en 1990 con Calderón Fournier, en 1998 con Miguel Ángel Rodríguez Echeverría y en 2002 con Abel Pacheco de la Espriella. Sus principios ideológicos se basan en el socialcristianismo, que busca la transformación social y económica del país y el desarrollo del ser humano basado en las doctrinas sociales de la Iglesia Católica.",
    },
    {
      id: 3,
      name: "Partido Progreso Social Democrático",
      flag: "ppsd.png",
      description:
        "Comparten en general la propuesta ideológica de la socialdemocracia moderna, en la cual el concurso del sistema capitalista y las demandas de sociedades más justas conducen la forma de organización y el modo en que se toman las decisiones. Conciben que el estado debe abordar los retos que atañen a la justicia social, el crecimiento económico inclusivo, al bienestar de las personas, a la reducción de la desigualdad en el acceso y disfrute de los derechos. Un vigoroso sector empresarial, sector cooperativo y empresas asociativas como clave para la producción de bienes y servicios, para la generación de riqueza, la innovación, la sana competitividad y la democratización de la economía. Resaltan como objetivos: elevar las capacidades individuales, colectivas, institucionales y empresariales a favor de sumar a la productividad y eficiencia que generen calidad de vida de los costarricenses. Considerar la educación, la salud, el trabajo y la equidad como generadores de la paz social y motores del desarrollo económico sostenible. Abrir oportunidades de progreso a las comunidades y asociaciones por medio de una participación activa en el uso de los recursos políticos, económicos, sociales y culturales. Generar confianza en los liderazgos locales por medio de un constante acercamiento a los territorios, la idoneidad y el respeto a las personas que construyen las propuestas y conforman la estructura partidaria con el fin de dar lo mejor al país.",
    },
    {
      id: 4,
      name: "Partido Nueva República",
      flag: "pnr.png",
      description:
        "El Partido se establece como una fuerza política de carácter ideológico, doctrinal y permanente. Su ideología fundamental es el pensamiento clásico republicano. Estima que la República es el sistema de gobierno idóneo para lograr el mayor desarrollo individual, político, económico y social de una nación. La finalidad esencial del Partido es dar expresión a los principios de la República como forma de gobierno, así como promoverlos en el debate político nacional e implementarlos desde el poder. Concibe el sistema republicano como aquel que se rige por el imperio de la ley, la división y limitación del poder político y el principio de igualdad ante la ley. Reconoce la democracia como elemento esencial para la legitimidad de la República y para la expresión de la voluntad popular. Proclama que la finalidad última de la República es satisfacer el interés general, y plantea que el uso del poder político para perjudicar o privilegiar sectores o individuos específicos es inaceptable. La doctrina política del Partido, así como sus medios de acción, se inspiran en los valores y principios más arraigados de la civilización judeocristiana, en el pensamiento republicano democrático, el nacionalismo cívico y el más profundo respeto por la vida y la dignidad humana.",
    },
    {
      id: 5,
      name: "Partido Frente Amplio",
      flag: "pfa.png",
      description:
        "Un partido democrático que promete respetar el orden constitucional, de acuerdo con el sistema de democracia representativa y defiende las instituciones del Estado Social de Derecho. Se instala en la lucha por una democracia avanzada en todos los campos, incluyendo la democracia económica y cultural. Promueve formas de democracia más participativas y directas. Se declara también progresista, como una fuerza transformadora, una alternativa real al modelo neoliberal concentrador y excluyente. Patriótico, defiende el interés nacional frente a la globalización de signo neoliberal. Feminista, rechaza el sistema de dominación sexista y patriarcal. Promueve la igualdad de género y la democracia paritaria.",
    },
    {
      id: 6,
      name: "Partido Liberal Progresista",
      flag: "plp.png",
      description:
        "Los fundamentos de la libertad consisten en el respeto a la autonomía del individuo, a su libertad de elegir y asumir responsabilidades por sus decisiones, a la propiedad privada y al Estado de Derecho. La libertad, en todos sus ámbitos, es la clave para el progreso social y económico de Costa Rica y es la ruta a seguir para alcanzar un país abierto, moderno y tolerante. El libre mercado es el mejor mecanismo que existe para producir riqueza y fomentar el progreso material de una nación, para el beneficio de todos sus habitantes. La función primordial del Estado es garantizar el cumplimiento de las normas que permitan alcanzar fines, sin caer en regulación excesiva que restringe la libertad, asfixia el emprendimiento, distorsiona los incentivos y engrosa una burocracia paralizante. Otro principios fundamentales incluyen la dignidad y autonomía del individuo, la economía de mercado, un Estado pequeño y eficiente, una sociedad tolerante, libre de discriminación y de privilegios creados por ley, la separación entre religión y Estado, el respeto a la propiedad privada y al Estado de Derecho.",
    },
    {
      id: 999,
      name: "Independiente",
      flag: "ind.png",
      description:
        "Los representantes independientes no están afiliados a ningún partido político. Pueden ser candidatos que se postulan por su cuenta o que han sido expulsados de un partido. Su ideología y propuestas pueden variar ampliamente, ya que no siguen una línea partidaria específica.",
    },
  ];

  for (const party of parties) {
    await prisma.party.upsert({
      where: { id: party.id },
      update: {},
      create: party,
    });
  }

  // Diputados (usa solo un subset aquí como ejemplo, el resto podés cargarlo desde JSON o dividirlo)
  const reps = [
    {
      id: 1,
      name: "Rodrigo Arias Sánchez",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: false,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 2,
      name: "Andrea Álvarez Marín",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 3,
      name: "Danny Vargas Serrano",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 4,
      name: "Carolina Delgado Ramírez",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 5,
      name: "Gilberth Jiménez Siles",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 6,
      name: "Pilar Cisneros Gallo",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 7,
      name: "Waldo Agüero Sanabria",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 8,
      name: "Luz Mary Alpízar Loaiza",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 9,
      name: "Manuel Esteban Morales Díaz",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 10,
      name: "Eli Feinzaig Mintzs",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 11,
      name: "Kattia Cambronero Aguiluz",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2022-05-01",
        },
        {
          partyId: 999,
          from: "2022-05-02",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 12,
      name: "Cynthia Córdoba Serrano",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 13,
      name: "Sofía Alejandra Guillén Pérez",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 14,
      name: "Andrés Ariel Robles Barrantes",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 15,
      name: "Rocío Alfaro Molina",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 16,
      name: "Fabricio Alvarado Muñoz",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 17,
      name: "Carlos Felipe García Molina",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 18,
      name: "Vanessa De Paul Castro Mora",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 19,
      name: "Gloria Navas Montero",
      province: 1,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2022-05-01",
        },
        {
          partyId: 999,
          from: "2022-05-02",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 20,
      name: "Dinorah Barquero Barquero",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 21,
      name: "José Joaquín Hernández Rojas",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 22,
      name: "Monserrat Ruiz Guevara",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 23,
      name: "Jorge Antonio Rojas López",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 24,
      name: "María Daniela Rojas Salas",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 25,
      name: "Leslye Rubén Bojorges León",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 26,
      name: "Olga Lidia Morera Arrieta",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 27,
      name: "José Pablo Sibaja Jiménez",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 28,
      name: "Luis Diego Vargas Rodríguez",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 29,
      name: "Priscilla Vindas Salazar",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 30,
      name: "María Marta Padilla Bonilla",
      province: 2,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2022-05-01",
        },
        {
          partyId: 999,
          from: "2022-05-02",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 31,
      name: "Paulina María Ramírez Portuguez",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 32,
      name: "Óscar Izquierdo Sandí",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 33,
      name: "Rosaura Méndez Gamboa",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 34,
      name: "Antonio José Ortega Gutiérrez",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 35,
      name: "Alejandro José Pacheco Castro",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 36,
      name: "Paola Nájera Abarca",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 37,
      name: "Johana Obando Bonilla",
      province: 3,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 38,
      name: "Kattia Rivera Soto",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 39,
      name: "Pedro Rojas Guzmán",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 40,
      name: "Ada Gabriela Acuña Castro",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 41,
      name: "Gilberto Arnoldo Campos Cruz",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 6,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 42,
      name: "Johnatan Jesús Acuña Soto",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 5,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 43,
      name: "Rosaura Méndez Gamboa",
      province: 4,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 44,
      name: "Geison Valverde Álvarez",
      province: 5,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 45,
      name: "Katherine Andrea Moreira Brown",
      province: 5,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 46,
      name: "Yonder Andrey Salas Durán",
      province: 5,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 47,
      name: "Rosalía Brown Young",
      province: 5,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 48,
      name: "María Marta Carballo Arce",
      province: 5,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 49,
      name: "José Francisco Nicolás Alvarado",
      province: 6,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 50,
      name: "Sonia Rojas Méndez",
      province: 6,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 51,
      name: "David Lorenzo Segura Gamboa",
      province: 6,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 4,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 52,
      name: "Carlos Andrés Robles Obando",
      province: 6,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 53,
      name: "Alexander Barrantes Chacón",
      province: 6,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 54,
      name: "Luis Fernando Mendoza Jiménez",
      province: 7,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 55,
      name: "Alejandra Larios Trejos",
      province: 7,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 1,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 56,
      name: "Melina Ajoy Palma",
      province: 7,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 2,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
    {
      id: 57,
      name: "Daniel Gerardo Vargas Quirós",
      province: 7,
      avatar: "homer-simpson.avif",
      fuel: true,
      parties: [
        {
          partyId: 3,
          from: "2018-05-01",
          to: "2026-05-01",
        },
      ],
    },
  ];

  for (const rep of reps) {
    await prisma.representative.create({
      data: {
        id: rep.id,
        name: rep.name,
        avatar: rep.avatar,
        fuel: rep.fuel,
        province: { connect: { id: rep.province } },
        partyAffiliations: {
          create: rep.parties.map((p) => ({
            party: {
              connect: { id: typeof p.partyId === "string" ? 999 : p.partyId },
            },
            from: new Date(p.from),
            to: new Date(p.to),
          })),
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seeding complete");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
