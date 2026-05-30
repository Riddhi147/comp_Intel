import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Companies ---
  const google = await prisma.company.create({ data: { name: 'Google', slug: 'google', levelFramework: 'L3-L8' } });
  const amazon = await prisma.company.create({ data: { name: 'Amazon', slug: 'amazon', levelFramework: 'SDE1-SDE3' } });
  const flipkart = await prisma.company.create({ data: { name: 'Flipkart', slug: 'flipkart', levelFramework: 'SDE1-SDE3' } });
  const swiggy = await prisma.company.create({ data: { name: 'Swiggy', slug: 'swiggy', levelFramework: 'L1-L5' } });
  const zepto = await prisma.company.create({ data: { name: 'Zepto', slug: 'zepto', levelFramework: 'L1-L5' } });

  // --- Level Mappings ---
  await prisma.levelMapping.createMany({ data: [
    { companyId: google.id, companyLevel: 'L3', normalizedLevel: 'junior' },
    { companyId: google.id, companyLevel: 'L4', normalizedLevel: 'mid' },
    { companyId: google.id, companyLevel: 'L5', normalizedLevel: 'senior' },
    { companyId: google.id, companyLevel: 'L6', normalizedLevel: 'staff' },
    { companyId: amazon.id, companyLevel: 'SDE1', normalizedLevel: 'junior' },
    { companyId: amazon.id, companyLevel: 'SDE2', normalizedLevel: 'mid' },
    { companyId: amazon.id, companyLevel: 'SDE3', normalizedLevel: 'senior' },
    { companyId: flipkart.id, companyLevel: 'SDE1', normalizedLevel: 'junior' },
    { companyId: flipkart.id, companyLevel: 'SDE2', normalizedLevel: 'mid' },
    { companyId: flipkart.id, companyLevel: 'SDE3', normalizedLevel: 'senior' },
    { companyId: swiggy.id, companyLevel: 'L1', normalizedLevel: 'junior' },
    { companyId: swiggy.id, companyLevel: 'L2', normalizedLevel: 'mid' },
    { companyId: swiggy.id, companyLevel: 'L3', normalizedLevel: 'senior' },
    { companyId: zepto.id, companyLevel: 'L1', normalizedLevel: 'junior' },
    { companyId: zepto.id, companyLevel: 'L2', normalizedLevel: 'mid' },
    { companyId: zepto.id, companyLevel: 'L3', normalizedLevel: 'senior' },
  ]});

  // --- Roles ---
  const swe = await prisma.role.create({ data: { name: 'Software Engineer', family: 'Engineering', normalizedTitle: 'swe' } });
  const sre = await prisma.role.create({ data: { name: 'Site Reliability Engineer', family: 'Engineering', normalizedTitle: 'sre' } });
  const ds = await prisma.role.create({ data: { name: 'Data Scientist', family: 'Data', normalizedTitle: 'ds' } });
  const pm = await prisma.role.create({ data: { name: 'Product Manager', family: 'Product', normalizedTitle: 'pm' } });

  // --- Locations ---
  const bangalore = await prisma.location.create({ data: { city: 'Bangalore', metro: 'Bangalore', country: 'India', colIndex: 1.0 } });
  const hyderabad = await prisma.location.create({ data: { city: 'Hyderabad', metro: 'Hyderabad', country: 'India', colIndex: 0.9 } });
  const mumbai = await prisma.location.create({ data: { city: 'Mumbai', metro: 'Mumbai', country: 'India', colIndex: 1.1 } });
  const delhi = await prisma.location.create({ data: { city: 'Delhi', metro: 'NCR', country: 'India', colIndex: 1.05 } });

  // --- Salary Entries ---
  await prisma.salaryEntry.createMany({ data: [
    // Google
    { companyId: google.id, roleId: swe.id, locationId: bangalore.id, level: 'L4', yearsOfExp: 3, baseSalary: 3000000, annualBonus: 400000, equityAnnual: 800000, totalComp: 4200000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: bangalore.id, level: 'L5', yearsOfExp: 6, baseSalary: 4500000, annualBonus: 700000, equityAnnual: 1500000, totalComp: 6700000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: hyderabad.id, level: 'L4', yearsOfExp: 4, baseSalary: 2800000, annualBonus: 350000, equityAnnual: 700000, totalComp: 3850000, currency: 'INR' },
    { companyId: google.id, roleId: ds.id, locationId: bangalore.id, level: 'L5', yearsOfExp: 5, baseSalary: 4200000, annualBonus: 600000, equityAnnual: 1200000, totalComp: 6000000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: mumbai.id, level: 'L6', yearsOfExp: 9, baseSalary: 6000000, annualBonus: 1000000, equityAnnual: 2500000, totalComp: 9500000, currency: 'INR' },

    // Amazon
    { companyId: amazon.id, roleId: swe.id, locationId: bangalore.id, level: 'SDE2', yearsOfExp: 3, baseSalary: 2800000, annualBonus: 300000, equityAnnual: 600000, totalComp: 3700000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: bangalore.id, level: 'SDE2', yearsOfExp: 5, baseSalary: 3200000, annualBonus: 400000, equityAnnual: 800000, totalComp: 4400000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: hyderabad.id, level: 'SDE1', yearsOfExp: 1, baseSalary: 1800000, annualBonus: 150000, equityAnnual: 300000, totalComp: 2250000, currency: 'INR' },
    { companyId: amazon.id, roleId: sre.id, locationId: bangalore.id, level: 'SDE2', yearsOfExp: 4, baseSalary: 2900000, annualBonus: 350000, equityAnnual: 700000, totalComp: 3950000, currency: 'INR' },
    { companyId: amazon.id, roleId: pm.id, locationId: delhi.id, level: 'SDE3', yearsOfExp: 8, baseSalary: 5000000, annualBonus: 800000, equityAnnual: 1800000, totalComp: 7600000, currency: 'INR' },

    // Flipkart
    { companyId: flipkart.id, roleId: swe.id, locationId: bangalore.id, level: 'SDE2', yearsOfExp: 3, baseSalary: 2500000, annualBonus: 250000, equityAnnual: 500000, totalComp: 3250000, currency: 'INR' },
    { companyId: flipkart.id, roleId: swe.id, locationId: bangalore.id, level: 'SDE3', yearsOfExp: 7, baseSalary: 4000000, annualBonus: 600000, equityAnnual: 1200000, totalComp: 5800000, currency: 'INR' },
    { companyId: flipkart.id, roleId: ds.id, locationId: bangalore.id, level: 'SDE2', yearsOfExp: 4, baseSalary: 2700000, annualBonus: 300000, equityAnnual: 600000, totalComp: 3600000, currency: 'INR' },

    // Swiggy
    { companyId: swiggy.id, roleId: swe.id, locationId: bangalore.id, level: 'L2', yearsOfExp: 3, baseSalary: 2200000, annualBonus: 200000, equityAnnual: 400000, totalComp: 2800000, currency: 'INR' },
    { companyId: swiggy.id, roleId: swe.id, locationId: bangalore.id, level: 'L3', yearsOfExp: 6, baseSalary: 3500000, annualBonus: 450000, equityAnnual: 900000, totalComp: 4850000, currency: 'INR' },
    { companyId: swiggy.id, roleId: sre.id, locationId: mumbai.id, level: 'L2', yearsOfExp: 2, baseSalary: 2000000, annualBonus: 180000, equityAnnual: 350000, totalComp: 2530000, currency: 'INR' },

    // Zepto
    { companyId: zepto.id, roleId: swe.id, locationId: mumbai.id, level: 'L2', yearsOfExp: 2, baseSalary: 2000000, annualBonus: 200000, equityAnnual: 500000, totalComp: 2700000, currency: 'INR' },
    { companyId: zepto.id, roleId: swe.id, locationId: mumbai.id, level: 'L3', yearsOfExp: 5, baseSalary: 3200000, annualBonus: 400000, equityAnnual: 900000, totalComp: 4500000, currency: 'INR' },
    { companyId: zepto.id, roleId: ds.id, locationId: mumbai.id, level: 'L2', yearsOfExp: 3, baseSalary: 2100000, annualBonus: 200000, equityAnnual: 450000, totalComp: 2750000, currency: 'INR' },
  ]});

  console.log('✅ Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });