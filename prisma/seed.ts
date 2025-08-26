import { PrismaClient, BillStatus } from "@prisma/client";
import billsData from "./../migrations/data/bills.json";
import representativesData from "./../migrations/data/representatives.json";
import provincesData from "./../migrations/data/provinces.json";
import partiesData from "./../migrations/data/parties.json";
import biographiesData from "./../migrations/data/biographies.json"; // <-- Agrega este import

const prisma = new PrismaClient();

async function main() {
  // 🧹 Borrar todo en orden inverso a relaciones para evitar errores de FK
  await prisma.vote.deleteMany({});
  await prisma.billDetail.deleteMany({});
  await prisma.bill.deleteMany({});
  await prisma.representativeParty.deleteMany({});
  await prisma.representative.deleteMany({});
  await prisma.party.deleteMany({});
  await prisma.province.deleteMany({});
  await prisma.biographyParagraph.deleteMany({});
  await prisma.biographySection.deleteMany({});

  for (const province of provincesData) {
    await prisma.province.upsert({
      where: { id: province.id },
      update: {},
      create: province,
    });
  }

  for (const party of partiesData) {
    await prisma.party.upsert({
      where: { id: party.id },
      update: {},
      create: party,
    });
  }

  for (const rep of representativesData) {
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

  // Biografías
  for (const bio of biographiesData) {
    for (const section of bio.biography) {
      const createdSection = await prisma.biographySection.create({
        data: {
          representativeId: bio.representativeId,
          heading: section.heading,
        },
      });
      for (const paragraph of section.paragraphs) {
        await prisma.biographyParagraph.create({
          data: {
            biographySectionId: createdSection.id,
            content: paragraph.content,
            className: paragraph.className,
          },
        });
      }
    }
  }

  // Proyectos de ley y votos
  for (const bill of billsData) {
    // Ajusta el status según tu enum si es necesario
    let status: BillStatus;
    if (bill.status === "approved") status = BillStatus.APPROVED;
    else if (bill.status === "rejected") status = BillStatus.REJECTED;
    else status = BillStatus.PENDING;

    const createdBill = await prisma.bill.create({
      data: {
        fileNumber: bill.fileNumber,
        description: bill.description,
        status,
        createdAt: bill.createdAt ? new Date(bill.createdAt) : new Date(),
        votedAt: bill.votedAt ? new Date(bill.votedAt) : new Date(),
        proposerId: bill.proposerId,
        proposerName: bill.proposerName,
        details: bill.details
          ? {
              create: bill.details.map((d: any) => ({
                type: d.type,
                content: d.content,
                className: d.className,
              })),
            }
          : undefined,
      },
    });

    // Votos
    const voteTypes = [
      { key: "inFavor", type: "IN_FAVOR" },
      { key: "against", type: "AGAINST" },
      { key: "absent", type: "ABSENT" },
    ];

    if (bill.votes) {
      for (const { key, type } of voteTypes) {
        if (Array.isArray(bill.votes[key as keyof typeof bill.votes])) {
          for (const repId of bill.votes[key as keyof typeof bill.votes]) {
            await prisma.vote.create({
              data: {
                billId: createdBill.id,
                representativeId: repId,
                type: type as any,
              },
            });
          }
        }
      }
    }
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
