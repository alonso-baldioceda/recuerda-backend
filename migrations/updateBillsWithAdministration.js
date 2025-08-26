const fs = require("fs");
const path = require("path");

// Leer el archivo de bills
const billsPath = path.join(__dirname, "data", "bills.json");
const bills = JSON.parse(fs.readFileSync(billsPath, "utf8"));

// Función para determinar la administración basada en la fecha de creación
function getAdministrationId(createdAt) {
  const date = new Date(createdAt);

  // Luis Guillermo Solís Rivera: 2014-05-08 a 2018-05-08
  if (date >= new Date("2014-05-08") && date < new Date("2018-05-08")) {
    return 1;
  }

  // Carlos Andrés Alvarado Quesada: 2018-05-08 a 2022-05-08
  if (date >= new Date("2018-05-08") && date < new Date("2022-05-08")) {
    return 2;
  }

  // Rodrigo Chaves Robles: 2022-05-08 en adelante
  if (date >= new Date("2022-05-08")) {
    return 3;
  }

  // Por defecto, si no coincide con ninguna, asignar a la actual
  return 3;
}

// Agregar administrationId a todos los bills basado en su fecha de creación
const updatedBills = bills.map((bill) => ({
  ...bill,
  administrationId: getAdministrationId(bill.createdAt),
}));

// Escribir el archivo actualizado
fs.writeFileSync(billsPath, JSON.stringify(updatedBills, null, 2));

// Mostrar estadísticas
const stats = updatedBills.reduce((acc, bill) => {
  acc[bill.administrationId] = (acc[bill.administrationId] || 0) + 1;
  return acc;
}, {});

console.log(`✅ Actualizado ${updatedBills.length} bills con administrationId`);
console.log("📊 Distribución por administración:");
console.log("   ID 1 (Luis Guillermo Solís): " + (stats[1] || 0) + " bills");
console.log("   ID 2 (Carlos Alvarado): " + (stats[2] || 0) + " bills");
console.log("   ID 3 (Rodrigo Chaves): " + (stats[3] || 0) + " bills");
