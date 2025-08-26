const fs = require("fs");
const path = require("path");

const billsPath = path.join(__dirname, "data", "bills.json");
const representativesPath = path.join(
  __dirname,
  "data",
  "representatives.json"
);

const bills = require(billsPath);
const representatives = require(representativesPath);

function getRandomId() {
  return Math.floor(Math.random() * 57) + 1;
}

// Crear un mapa de ID -> nombre para búsqueda rápida
const representativeMap = {};
representatives.forEach((rep) => {
  representativeMap[rep.id] = rep.name;
});

const updatedBills = bills.map((bill) => {
  const proposerId = getRandomId();
  return {
    ...bill,
    proposerId: proposerId,
    proposerName: representativeMap[proposerId] || "Unknown Representative",
  };
});

fs.writeFileSync(billsPath, JSON.stringify(updatedBills, null, 2));

console.log("proposerId and proposerName added to all bills!");
