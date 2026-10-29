export const seoCities = [
  { name: "Paris", slug: "paris", zipPattern: "75", region: "Île-de-France" },
  { name: "Marseille", slug: "marseille", zipPattern: "13", region: "Provence-Alpes-Côte d'Azur" },
  { name: "Lyon", slug: "lyon", zipPattern: "69", region: "Auvergne-Rhône-Alpes" },
  { name: "Toulouse", slug: "toulouse", zipPattern: "31", region: "Occitanie" },
  { name: "Nice", slug: "nice", zipPattern: "06", region: "Provence-Alpes-Côte d'Azur" },
  { name: "Nantes", slug: "nantes", zipPattern: "44", region: "Pays de la Loire" },
  { name: "Montpellier", slug: "montpellier", zipPattern: "34", region: "Occitanie" },
  { name: "Strasbourg", slug: "strasbourg", zipPattern: "67", region: "Grand Est" },
  { name: "Bordeaux", slug: "bordeaux", zipPattern: "33", region: "Nouvelle-Aquitaine" },
  { name: "Lille", slug: "lille", zipPattern: "59", region: "Hauts-de-France" },
  { name: "Rennes", slug: "rennes", zipPattern: "35", region: "Bretagne" },
  { name: "Reims", slug: "reims", zipPattern: "51", region: "Grand Est" },
  { name: "Le Havre", slug: "le-havre", zipPattern: "76", region: "Normandie" },
  { name: "Saint-Étienne", slug: "saint-etienne", zipPattern: "42", region: "Auvergne-Rhône-Alpes" },
  { name: "Toulon", slug: "toulon", zipPattern: "83", region: "Provence-Alpes-Côte d'Azur" },
  { name: "Grenoble", slug: "grenoble", zipPattern: "38", region: "Auvergne-Rhône-Alpes" },
  { name: "Dijon", slug: "dijon", zipPattern: "21", region: "Bourgogne-Franche-Comté" },
  { name: "Angers", slug: "angers", zipPattern: "49", region: "Pays de la Loire" },
  { name: "Nîmes", slug: "nimes", zipPattern: "30", region: "Occitanie" },
  { name: "Villeurbanne", slug: "villeurbanne", zipPattern: "69", region: "Auvergne-Rhône-Alpes" },
  { name: "Saint-Denis", slug: "saint-denis-reunion", zipPattern: "974", region: "La Réunion" },
  { name: "Le Mans", slug: "le-mans", zipPattern: "72", region: "Pays de la Loire" },
  { name: "Aix-en-Provence", slug: "aix-en-provence", zipPattern: "13", region: "Provence-Alpes-Côte d'Azur" },
  { name: "Clermont-Ferrand", slug: "clermont-ferrand", zipPattern: "63", region: "Auvergne-Rhône-Alpes" },
  { name: "Brest", slug: "brest", zipPattern: "29", region: "Bretagne" },
  { name: "Tours", slug: "tours", zipPattern: "37", region: "Centre-Val de Loire" },
  { name: "Amiens", slug: "amiens", zipPattern: "80", region: "Hauts-de-France" },
  { name: "Limoges", slug: "limoges", zipPattern: "87", region: "Nouvelle-Aquitaine" },
  { name: "Annecy", slug: "annecy", zipPattern: "74", region: "Auvergne-Rhône-Alpes" },
  { name: "Perpignan", slug: "perpignan", zipPattern: "66", region: "Occitanie" },
  // Local pour ACO HABITAT (Alençon / Orne / Normandie)
  { name: "Alençon", slug: "alencon", zipPattern: "61", region: "Normandie" },
  { name: "Caen", slug: "caen", zipPattern: "14", region: "Normandie" },
  { name: "Rouen", slug: "rouen", zipPattern: "76", region: "Normandie" },
  { name: "Évreux", slug: "evreux", zipPattern: "27", region: "Normandie" },
  { name: "Cherbourg", slug: "cherbourg", zipPattern: "50", region: "Normandie" },
];

export const seoPathologies = [
  {
    name: "Mérule Pleureuse",
    slug: "merule-pleureuse",
    family: "Champignon Lignivore",
    scientificName: "Serpula lacrymans",
    description: "La mérule pleureuse est le champignon lignivore le plus redouté dans les bâtiments. Elle se développe dans des conditions d'humidité anormale et d'obscurité, détruisant la cellulose du bois et causant la pourriture cubique.",
    symptoms: [
      "Traces d'humidité importantes",
      "Bois qui se fragilise, se fissure en cubes (pourriture cubique)",
      "Apparition de mycélium blanc et cotonneux",
      "Fructification sous forme de crêpe de couleur rouille avec les bords blancs",
      "Odeur forte de champignon"
    ],
    dangers: "La mérule peut détruire la solidité structurelle d'une maison en quelques mois. Elle est capable de traverser les murs en maçonnerie pour aller chercher de l'eau. Dans certaines régions, sa présence oblige à une déclaration en mairie.",
  },
  {
    name: "Capricorne des Maisons",
    slug: "capricorne-des-maisons",
    family: "Insecte Xylophage",
    scientificName: "Hylotrupes bajulus",
    description: "Le capricorne des maisons est l'un des insectes xylophages les plus destructeurs pour les charpentes en bois résineux. Les larves creusent des galeries à l'intérieur du bois pendant plusieurs années avant de sortir.",
    symptoms: [
      "Trous de sortie ovales de 6 à 10 mm à la surface du bois",
      "Bruit de grignotement audible dans le silence",
      "Galeries remplies de sciure compacte en forme de petits tonnelets",
      "Aspect vermoulu du bois en surface, s'effritant facilement"
    ],
    dangers: "Les larves du capricorne peuvent affaiblir considérablement les poutres et la charpente, entraînant un risque d'effondrement si l'infestation n'est pas traitée rapidement.",
  },
  {
    name: "Petite Vrillette",
    slug: "petite-vrillette",
    family: "Insecte Xylophage",
    scientificName: "Anobium punctatum",
    description: "La petite vrillette s'attaque aussi bien aux bois de structure qu'aux meubles. Elle apprécie les bois légèrement humides et anciens.",
    symptoms: [
      "Petits trous de sortie circulaires (1 à 2 mm de diamètre)",
      "Présence de fine sciure (vermoulure) sous les trous",
      "Le bois prend un aspect 'piqué'"
    ],
    dangers: "Moins fulgurante que le capricorne, la petite vrillette cause néanmoins des dégâts esthétiques importants et peut, à long terme et en grand nombre, fragiliser des pièces de bois.",
  },
  {
    name: "Grosse Vrillette",
    slug: "grosse-vrillette",
    family: "Insecte Xylophage",
    scientificName: "Xestobium rufovillosum",
    description: "La grosse vrillette est souvent associée à une attaque préalable de champignons (pourriture cubique ou fibreuse) car elle a besoin d'un bois dégradé par l'humidité et les champignons pour se développer.",
    symptoms: [
      "Trous de sortie circulaires de 2 à 4 mm de diamètre",
      "Présence de sciure en forme de lentilles",
      "Bois souvent déjà abîmé par l'humidité ou des champignons"
    ],
    dangers: "Elle indique non seulement une attaque d'insectes mais aussi un problème d'humidité sous-jacent ou une attaque fongique qui fragilise la structure.",
  },
  {
    name: "Termites",
    slug: "termites",
    family: "Insecte Xylophage (Isoptères)",
    scientificName: "Reticulitermes spp.",
    description: "Les termites sont des insectes sociaux vivant en colonies souterraines. Ils remontent dans les bâtiments pour se nourrir de cellulose, détruisant le bois de l'intérieur en laissant une fine pellicule intacte en surface.",
    symptoms: [
      "Bois qui sonne creux",
      "Cordons de terre (cordonnets) sur les murs de fondation",
      "Plinthes ou cadres de portes qui cèdent facilement sous la pression",
      "Présence d'essaimage (insectes volants ressemblant à des fourmis ailées) au printemps"
    ],
    dangers: "Extrêmement destructeurs, les termites peuvent causer l'effondrement d'une structure en s'attaquant aux fondations en bois et charpentes. Ils sont soumis à un arrêté préfectoral obligatoire de déclaration dans de nombreuses régions françaises.",
  },
  {
    name: "Coniophore des Caves",
    slug: "coniophore-des-caves",
    family: "Champignon Lignivore",
    scientificName: "Coniophora puteana",
    description: "Souvent confondu avec la mérule, le coniophore des caves attaque principalement les bois très humides (fuites d'eau continues). Il provoque une pourriture cubique sombre.",
    symptoms: [
      "Apparition de fins filaments bruns ou noirs (cordonnets mycéliens)",
      "Bois très assombri, se craquelant en petits cubes",
      "Bois cassant et perdant toute sa résistance mécanique"
    ],
    dangers: "Affaiblissement grave des structures en bois (planchers, solives) en contact direct avec une forte humidité (souvent supérieure à 40%). Contrairement à la mérule, il nécessite une source d'humidité constante pour survivre.",
  }
];
