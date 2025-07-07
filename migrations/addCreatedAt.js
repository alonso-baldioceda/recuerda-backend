const fs = require("fs");

const bills = require("./data/bills.json");

function randomDateBefore(dateStr, minMonths, maxMonths) {
  const date = new Date(dateStr);
  const monthsBefore =
    Math.floor(Math.random() * (maxMonths - minMonths + 1)) + minMonths;
  const result = new Date(date);
  result.setMonth(result.getMonth() - monthsBefore);
  // Ajuste para evitar fechas inválidas (por ejemplo, 31 de febrero)
  if (result.getMonth() !== (date.getMonth() - monthsBefore + 12) % 12) {
    result.setDate(0);
  }
  return result.toISOString().split("T")[0];
}

const updated = bills.map((bill) => {
  if (bill.votedAt) {
    const createdAt = randomDateBefore(bill.votedAt, 4, 12);
    return {
      ...bill,
      createdAt,
    };
  }
  return bill;
});

fs.writeFileSync("./bills.json", JSON.stringify(updated, null, 2), "utf-8");

console.log("Archivo actualizado con createdAt aleatorio.");
