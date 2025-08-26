const fs = require("fs");
const path = require("path");

// Leer el archivo de representantes
const representativesPath = path.join(
  __dirname,
  "data",
  "representatives.json"
);
const representatives = JSON.parse(
  fs.readFileSync(representativesPath, "utf8")
);

// Agregar administrationId: 3 (Rodrigo Chaves Robles - última administración) a todos los representantes
const updatedRepresentatives = representatives.map((rep) => ({
  ...rep,
  administrationId: 3,
}));

// Escribir el archivo actualizado
fs.writeFileSync(
  representativesPath,
  JSON.stringify(updatedRepresentatives, null, 2)
);

console.log(
  `✅ Actualizado ${updatedRepresentatives.length} representantes con administrationId: 3`
);
console.log(
  "📋 Todos los representantes ahora están asociados a la administración de Rodrigo Chaves Robles"
);
