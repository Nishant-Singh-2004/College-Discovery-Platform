import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const states = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Punjab",
  "Rajasthan",
  "Haryana",
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Lucknow",
  "Pune",
  "Jaipur",
  "Chandigarh",
];

async function main() {
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();

  for (let i = 1; i <= 100; i++) {
    console.log(`Creating college ${i}`);
    const college = await prisma.college.create({
      data: {
        name: `Institute of Technology ${i}`,
        state: states[i % states.length],
        city: cities[i % cities.length],

        fees: 100000 + i * 10000,

        rating: Number((3 + Math.random() * 2).toFixed(1)),

        placementRate: 50 + (i % 50),

        avgPackage: Number((3 + Math.random() * 20).toFixed(1)),

        description:
          "A leading institution focused on academic excellence and career growth.",
      },
    });

    await prisma.course.createMany({
      data: [
        {
          name: "B.Tech Computer Science",
          duration: "4 Years",
          collegeId: college.id,
        },
        {
          name: "MBA",
          duration: "2 Years",
          collegeId: college.id,
        },
        {
          name: "BCA",
          duration: "3 Years",
          collegeId: college.id,
        },
      ],
    });

    await prisma.review.createMany({
      data: [
        {
          rating: 4,
          comment: "Great campus and placements.",
          collegeId: college.id,
        },
        {
          rating: 5,
          comment: "Excellent faculty.",
          collegeId: college.id,
        },
      ],
    });
  }

  console.log("Database Seeded");
}

main()
  .then(() => {
    console.log("Database Seeded");
  })
  .catch((error) => {
    console.error("SEED ERROR:");
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });