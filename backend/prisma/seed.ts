import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.salaryEntry.deleteMany();
  await prisma.levelMapping.deleteMany();
  await prisma.company.deleteMany();
  await prisma.role.deleteMany();
  await prisma.location.deleteMany();

  // --- Companies ---
  const amazon = await prisma.company.create({ data: { name: 'Amazon', slug: 'amazon', levelFramework: 'L4-L8' } });
  const apple = await prisma.company.create({ data: { name: 'Apple', slug: 'apple', levelFramework: 'ICT2-ICT6' } });
  const bytedance = await prisma.company.create({ data: { name: 'ByteDance', slug: 'bytedance', levelFramework: 'L3-L6' } });
  const citadel = await prisma.company.create({ data: { name: 'Citadel', slug: 'citadel', levelFramework: 'New Grad-Staff' } });
  const coinbase = await prisma.company.create({ data: { name: 'Coinbase', slug: 'coinbase', levelFramework: 'IC3-IC6' } });
  const google = await prisma.company.create({ data: { name: 'Google', slug: 'google', levelFramework: 'L3-L8' } });
  const intel = await prisma.company.create({ data: { name: 'Intel', slug: 'intel', levelFramework: 'Grade 5-10' } });
  const linkedin = await prisma.company.create({ data: { name: 'LinkedIn', slug: 'linkedin', levelFramework: 'IC2-IC6' } });
  const meta = await prisma.company.create({ data: { name: 'Meta', slug: 'meta', levelFramework: 'E3-E9' } });
  const microsoft = await prisma.company.create({ data: { name: 'Microsoft', slug: 'microsoft', levelFramework: 'IC59-IC67' } });
  const netflix = await prisma.company.create({ data: { name: 'Netflix', slug: 'netflix', levelFramework: 'Mid-Principal' } });
  const oracle = await prisma.company.create({ data: { name: 'Oracle', slug: 'oracle', levelFramework: 'IC2-IC6' } });
  const roblox = await prisma.company.create({ data: { name: 'Roblox', slug: 'roblox', levelFramework: 'IC3-IC6' } });
  const salesforce = await prisma.company.create({ data: { name: 'Salesforce', slug: 'salesforce', levelFramework: 'MTS-LMTS' } });
  const snap = await prisma.company.create({ data: { name: 'Snap', slug: 'snap', levelFramework: 'L3-L6' } });
  const uber = await prisma.company.create({ data: { name: 'Uber', slug: 'uber', levelFramework: 'L3-L7' } });

  // --- Level Mappings ---
  await prisma.levelMapping.createMany({ data: [
    { companyId: amazon.id, companyLevel: 'L4', normalizedLevel: 'junior' },
    { companyId: amazon.id, companyLevel: 'L5', normalizedLevel: 'mid' },
    { companyId: amazon.id, companyLevel: 'L6', normalizedLevel: 'senior' },
    { companyId: amazon.id, companyLevel: 'L7', normalizedLevel: 'staff' },
    { companyId: apple.id, companyLevel: 'ICT2', normalizedLevel: 'junior' },
    { companyId: apple.id, companyLevel: 'ICT3', normalizedLevel: 'mid' },
    { companyId: apple.id, companyLevel: 'ICT4', normalizedLevel: 'senior' },
    { companyId: apple.id, companyLevel: 'ICT5', normalizedLevel: 'staff' },
    { companyId: bytedance.id, companyLevel: 'L3', normalizedLevel: 'mid' },
    { companyId: bytedance.id, companyLevel: 'L4', normalizedLevel: 'senior' },
    { companyId: bytedance.id, companyLevel: 'L5', normalizedLevel: 'staff' },
    { companyId: citadel.id, companyLevel: 'New Grad', normalizedLevel: 'junior' },
    { companyId: citadel.id, companyLevel: 'Mid', normalizedLevel: 'mid' },
    { companyId: citadel.id, companyLevel: 'Senior', normalizedLevel: 'senior' },
    { companyId: citadel.id, companyLevel: 'Staff', normalizedLevel: 'staff' },
    { companyId: coinbase.id, companyLevel: 'IC3', normalizedLevel: 'mid' },
    { companyId: coinbase.id, companyLevel: 'IC4', normalizedLevel: 'senior' },
    { companyId: coinbase.id, companyLevel: 'IC5', normalizedLevel: 'staff' },
    { companyId: google.id, companyLevel: 'L3', normalizedLevel: 'junior' },
    { companyId: google.id, companyLevel: 'L4', normalizedLevel: 'mid' },
    { companyId: google.id, companyLevel: 'L5', normalizedLevel: 'senior' },
    { companyId: google.id, companyLevel: 'L6', normalizedLevel: 'staff' },
    { companyId: intel.id, companyLevel: 'Grade 5', normalizedLevel: 'junior' },
    { companyId: intel.id, companyLevel: 'Grade 7', normalizedLevel: 'senior' },
    { companyId: intel.id, companyLevel: 'Grade 8', normalizedLevel: 'staff' },
    { companyId: linkedin.id, companyLevel: 'IC2', normalizedLevel: 'junior' },
    { companyId: linkedin.id, companyLevel: 'IC3', normalizedLevel: 'mid' },
    { companyId: linkedin.id, companyLevel: 'IC4', normalizedLevel: 'senior' },
    { companyId: linkedin.id, companyLevel: 'IC5', normalizedLevel: 'staff' },
    { companyId: meta.id, companyLevel: 'E3', normalizedLevel: 'junior' },
    { companyId: meta.id, companyLevel: 'E4', normalizedLevel: 'mid' },
    { companyId: meta.id, companyLevel: 'E5', normalizedLevel: 'senior' },
    { companyId: meta.id, companyLevel: 'E6', normalizedLevel: 'staff' },
    { companyId: microsoft.id, companyLevel: '59-60', normalizedLevel: 'junior' },
    { companyId: microsoft.id, companyLevel: '61-62', normalizedLevel: 'mid' },
    { companyId: microsoft.id, companyLevel: '63-64', normalizedLevel: 'senior' },
    { companyId: microsoft.id, companyLevel: '65-67', normalizedLevel: 'staff' },
    { companyId: netflix.id, companyLevel: 'Mid', normalizedLevel: 'mid' },
    { companyId: netflix.id, companyLevel: 'Senior', normalizedLevel: 'senior' },
    { companyId: netflix.id, companyLevel: 'Staff', normalizedLevel: 'staff' },
    { companyId: oracle.id, companyLevel: 'IC2', normalizedLevel: 'junior' },
    { companyId: oracle.id, companyLevel: 'IC3', normalizedLevel: 'mid' },
    { companyId: oracle.id, companyLevel: 'IC4', normalizedLevel: 'senior' },
    { companyId: oracle.id, companyLevel: 'IC5', normalizedLevel: 'staff' },
    { companyId: roblox.id, companyLevel: 'IC3', normalizedLevel: 'mid' },
    { companyId: roblox.id, companyLevel: 'IC4', normalizedLevel: 'senior' },
    { companyId: roblox.id, companyLevel: 'IC5', normalizedLevel: 'staff' },
    { companyId: salesforce.id, companyLevel: 'MTS', normalizedLevel: 'mid' },
    { companyId: salesforce.id, companyLevel: 'SMTS', normalizedLevel: 'senior' },
    { companyId: salesforce.id, companyLevel: 'LMTS', normalizedLevel: 'staff' },
    { companyId: snap.id, companyLevel: 'L3', normalizedLevel: 'mid' },
    { companyId: snap.id, companyLevel: 'L4', normalizedLevel: 'senior' },
    { companyId: snap.id, companyLevel: 'L5', normalizedLevel: 'staff' },
    { companyId: uber.id, companyLevel: 'L3', normalizedLevel: 'junior' },
    { companyId: uber.id, companyLevel: 'L4', normalizedLevel: 'mid' },
    { companyId: uber.id, companyLevel: 'L5', normalizedLevel: 'senior' },
    { companyId: uber.id, companyLevel: 'L6', normalizedLevel: 'staff' },
  ]});

  // --- Roles ---
  const swe = await prisma.role.create({ data: { name: 'Software Engineer', family: 'Engineering', normalizedTitle: 'swe' } });
  const sre = await prisma.role.create({ data: { name: 'Site Reliability Engineer', family: 'Engineering', normalizedTitle: 'sre' } });
  const ds = await prisma.role.create({ data: { name: 'Data Scientist', family: 'Data', normalizedTitle: 'ds' } });
  const pm = await prisma.role.create({ data: { name: 'Product Manager', family: 'Product', normalizedTitle: 'pm' } });

  // --- Locations ---
  const bengaluru = await prisma.location.create({ data: { city: 'Bengaluru', metro: 'Bengaluru', country: 'India', colIndex: 1.0 } });
  const hyderabad = await prisma.location.create({ data: { city: 'Hyderabad', metro: 'Hyderabad', country: 'India', colIndex: 0.88 } });
  const london = await prisma.location.create({ data: { city: 'London', metro: 'London', country: 'UK', colIndex: 2.8 } });
  const remote = await prisma.location.create({ data: { city: 'Remote', metro: 'Remote', country: 'Global', colIndex: 1.0 } });
  const san_mateo = await prisma.location.create({ data: { city: 'San Mateo', metro: 'Bay Area', country: 'USA', colIndex: 3.5 } });
  const singapore = await prisma.location.create({ data: { city: 'Singapore', metro: 'Singapore', country: 'Singapore', colIndex: 2.1 } });

  // --- Salary Entries (values converted from Lakhs to INR) ---
  await prisma.salaryEntry.createMany({ data: [
    { companyId: google.id, roleId: swe.id, locationId: bengaluru.id, level: 'L3', yearsOfExp: 0, baseSalary: 2800000, annualBonus: 400000, equityAnnual: 1000000, totalComp: 4200000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: bengaluru.id, level: 'L4', yearsOfExp: 3, baseSalary: 4200000, annualBonus: 600000, equityAnnual: 2000000, totalComp: 6800000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: bengaluru.id, level: 'L5', yearsOfExp: 6, baseSalary: 6500000, annualBonus: 1000000, equityAnnual: 3500000, totalComp: 11000000, currency: 'INR' },
    { companyId: google.id, roleId: swe.id, locationId: bengaluru.id, level: 'L6', yearsOfExp: 10, baseSalary: 9500000, annualBonus: 1500000, equityAnnual: 7500000, totalComp: 18500000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: bengaluru.id, level: 'L4', yearsOfExp: 1, baseSalary: 2200000, annualBonus: 200000, equityAnnual: 800000, totalComp: 3200000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: bengaluru.id, level: 'L5', yearsOfExp: 4, baseSalary: 4000000, annualBonus: 500000, equityAnnual: 2000000, totalComp: 6500000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: bengaluru.id, level: 'L6', yearsOfExp: 7, baseSalary: 6000000, annualBonus: 800000, equityAnnual: 4200000, totalComp: 11000000, currency: 'INR' },
    { companyId: amazon.id, roleId: swe.id, locationId: bengaluru.id, level: 'L7', yearsOfExp: 12, baseSalary: 9000000, annualBonus: 1500000, equityAnnual: 9500000, totalComp: 20000000, currency: 'INR' },
    { companyId: apple.id, roleId: swe.id, locationId: hyderabad.id, level: 'ICT2', yearsOfExp: 1, baseSalary: 3000000, annualBonus: 300000, equityAnnual: 1200000, totalComp: 4500000, currency: 'INR' },
    { companyId: apple.id, roleId: swe.id, locationId: hyderabad.id, level: 'ICT3', yearsOfExp: 4, baseSalary: 4500000, annualBonus: 500000, equityAnnual: 2500000, totalComp: 7500000, currency: 'INR' },
    { companyId: apple.id, roleId: swe.id, locationId: hyderabad.id, level: 'ICT4', yearsOfExp: 7, baseSalary: 6500000, annualBonus: 1000000, equityAnnual: 4500000, totalComp: 12000000, currency: 'INR' },
    { companyId: apple.id, roleId: swe.id, locationId: hyderabad.id, level: 'ICT5', yearsOfExp: 11, baseSalary: 9000000, annualBonus: 1500000, equityAnnual: 7500000, totalComp: 18000000, currency: 'INR' },
    { companyId: meta.id, roleId: swe.id, locationId: bengaluru.id, level: 'E3', yearsOfExp: 1, baseSalary: 3000000, annualBonus: 500000, equityAnnual: 1500000, totalComp: 5000000, currency: 'INR' },
    { companyId: meta.id, roleId: swe.id, locationId: bengaluru.id, level: 'E4', yearsOfExp: 3, baseSalary: 5000000, annualBonus: 800000, equityAnnual: 3000000, totalComp: 8800000, currency: 'INR' },
    { companyId: meta.id, roleId: swe.id, locationId: bengaluru.id, level: 'E5', yearsOfExp: 6, baseSalary: 7500000, annualBonus: 1200000, equityAnnual: 4500000, totalComp: 13200000, currency: 'INR' },
    { companyId: meta.id, roleId: swe.id, locationId: bengaluru.id, level: 'E6', yearsOfExp: 10, baseSalary: 10000000, annualBonus: 1800000, equityAnnual: 9500000, totalComp: 21300000, currency: 'INR' },
    { companyId: microsoft.id, roleId: swe.id, locationId: hyderabad.id, level: '59-60', yearsOfExp: 1, baseSalary: 2200000, annualBonus: 300000, equityAnnual: 800000, totalComp: 3300000, currency: 'INR' },
    { companyId: microsoft.id, roleId: swe.id, locationId: hyderabad.id, level: '61-62', yearsOfExp: 4, baseSalary: 3800000, annualBonus: 500000, equityAnnual: 1800000, totalComp: 6100000, currency: 'INR' },
    { companyId: microsoft.id, roleId: swe.id, locationId: hyderabad.id, level: '63-64', yearsOfExp: 7, baseSalary: 5800000, annualBonus: 800000, equityAnnual: 3500000, totalComp: 10100000, currency: 'INR' },
    { companyId: microsoft.id, roleId: swe.id, locationId: hyderabad.id, level: '65-67', yearsOfExp: 12, baseSalary: 8500000, annualBonus: 1500000, equityAnnual: 8000000, totalComp: 18000000, currency: 'INR' },
    { companyId: uber.id, roleId: swe.id, locationId: bengaluru.id, level: 'L3', yearsOfExp: 1, baseSalary: 2800000, annualBonus: 400000, equityAnnual: 1200000, totalComp: 4400000, currency: 'INR' },
    { companyId: uber.id, roleId: swe.id, locationId: bengaluru.id, level: 'L4', yearsOfExp: 4, baseSalary: 4500000, annualBonus: 600000, equityAnnual: 2500000, totalComp: 7600000, currency: 'INR' },
    { companyId: uber.id, roleId: swe.id, locationId: bengaluru.id, level: 'L5', yearsOfExp: 7, baseSalary: 7000000, annualBonus: 1000000, equityAnnual: 5000000, totalComp: 13000000, currency: 'INR' },
    { companyId: uber.id, roleId: swe.id, locationId: bengaluru.id, level: 'L6', yearsOfExp: 11, baseSalary: 9500000, annualBonus: 1500000, equityAnnual: 9000000, totalComp: 20000000, currency: 'INR' },
    { companyId: linkedin.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC2', yearsOfExp: 1, baseSalary: 3000000, annualBonus: 400000, equityAnnual: 1500000, totalComp: 4900000, currency: 'INR' },
    { companyId: linkedin.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC3', yearsOfExp: 5, baseSalary: 5500000, annualBonus: 800000, equityAnnual: 4000000, totalComp: 10300000, currency: 'INR' },
    { companyId: linkedin.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC4', yearsOfExp: 9, baseSalary: 8000000, annualBonus: 1200000, equityAnnual: 8000000, totalComp: 17200000, currency: 'INR' },
    { companyId: linkedin.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC5', yearsOfExp: 13, baseSalary: 11000000, annualBonus: 1800000, equityAnnual: 13000000, totalComp: 25800000, currency: 'INR' },
    { companyId: netflix.id, roleId: swe.id, locationId: remote.id, level: 'Mid', yearsOfExp: 4, baseSalary: 8000000, annualBonus: 0, equityAnnual: 1000000, totalComp: 9000000, currency: 'INR' },
    { companyId: netflix.id, roleId: swe.id, locationId: remote.id, level: 'Senior', yearsOfExp: 7, baseSalary: 12000000, annualBonus: 0, equityAnnual: 2500000, totalComp: 14500000, currency: 'INR' },
    { companyId: netflix.id, roleId: swe.id, locationId: remote.id, level: 'Staff', yearsOfExp: 10, baseSalary: 17000000, annualBonus: 0, equityAnnual: 5000000, totalComp: 22000000, currency: 'INR' },
    { companyId: oracle.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC2', yearsOfExp: 1, baseSalary: 1800000, annualBonus: 200000, equityAnnual: 400000, totalComp: 2400000, currency: 'INR' },
    { companyId: oracle.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC3', yearsOfExp: 4, baseSalary: 3000000, annualBonus: 400000, equityAnnual: 1000000, totalComp: 4400000, currency: 'INR' },
    { companyId: oracle.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC4', yearsOfExp: 7, baseSalary: 4500000, annualBonus: 600000, equityAnnual: 2000000, totalComp: 7100000, currency: 'INR' },
    { companyId: oracle.id, roleId: swe.id, locationId: bengaluru.id, level: 'IC5', yearsOfExp: 11, baseSalary: 6500000, annualBonus: 1000000, equityAnnual: 4000000, totalComp: 11500000, currency: 'INR' },
    { companyId: coinbase.id, roleId: swe.id, locationId: remote.id, level: 'IC3', yearsOfExp: 2, baseSalary: 4000000, annualBonus: 500000, equityAnnual: 2000000, totalComp: 6500000, currency: 'INR' },
    { companyId: coinbase.id, roleId: swe.id, locationId: remote.id, level: 'IC4', yearsOfExp: 6, baseSalary: 7000000, annualBonus: 1000000, equityAnnual: 5000000, totalComp: 13000000, currency: 'INR' },
    { companyId: coinbase.id, roleId: swe.id, locationId: remote.id, level: 'IC5', yearsOfExp: 10, baseSalary: 10000000, annualBonus: 1500000, equityAnnual: 10000000, totalComp: 21500000, currency: 'INR' },
    { companyId: snap.id, roleId: swe.id, locationId: remote.id, level: 'L3', yearsOfExp: 2, baseSalary: 4200000, annualBonus: 600000, equityAnnual: 2200000, totalComp: 7000000, currency: 'INR' },
    { companyId: snap.id, roleId: swe.id, locationId: remote.id, level: 'L4', yearsOfExp: 6, baseSalary: 7500000, annualBonus: 1000000, equityAnnual: 5500000, totalComp: 14000000, currency: 'INR' },
    { companyId: snap.id, roleId: swe.id, locationId: remote.id, level: 'L5', yearsOfExp: 10, baseSalary: 11000000, annualBonus: 1500000, equityAnnual: 12000000, totalComp: 24500000, currency: 'INR' },
    { companyId: intel.id, roleId: swe.id, locationId: bengaluru.id, level: 'Grade 5', yearsOfExp: 1, baseSalary: 1600000, annualBonus: 200000, equityAnnual: 300000, totalComp: 2100000, currency: 'INR' },
    { companyId: intel.id, roleId: swe.id, locationId: bengaluru.id, level: 'Grade 7', yearsOfExp: 6, baseSalary: 3500000, annualBonus: 400000, equityAnnual: 1200000, totalComp: 5100000, currency: 'INR' },
    { companyId: intel.id, roleId: swe.id, locationId: bengaluru.id, level: 'Grade 8', yearsOfExp: 10, baseSalary: 5500000, annualBonus: 800000, equityAnnual: 2500000, totalComp: 8800000, currency: 'INR' },
    { companyId: salesforce.id, roleId: swe.id, locationId: hyderabad.id, level: 'MTS', yearsOfExp: 2, baseSalary: 2800000, annualBonus: 400000, equityAnnual: 1200000, totalComp: 4400000, currency: 'INR' },
    { companyId: salesforce.id, roleId: swe.id, locationId: hyderabad.id, level: 'SMTS', yearsOfExp: 6, baseSalary: 5500000, annualBonus: 800000, equityAnnual: 4000000, totalComp: 10300000, currency: 'INR' },
    { companyId: salesforce.id, roleId: swe.id, locationId: hyderabad.id, level: 'LMTS', yearsOfExp: 9, baseSalary: 7500000, annualBonus: 1200000, equityAnnual: 6500000, totalComp: 15200000, currency: 'INR' },
    { companyId: bytedance.id, roleId: swe.id, locationId: singapore.id, level: 'L3', yearsOfExp: 2, baseSalary: 4500000, annualBonus: 800000, equityAnnual: 2000000, totalComp: 7300000, currency: 'INR' },
    { companyId: bytedance.id, roleId: swe.id, locationId: singapore.id, level: 'L4', yearsOfExp: 6, baseSalary: 8000000, annualBonus: 1500000, equityAnnual: 6000000, totalComp: 15500000, currency: 'INR' },
    { companyId: bytedance.id, roleId: swe.id, locationId: singapore.id, level: 'L5', yearsOfExp: 10, baseSalary: 12000000, annualBonus: 2000000, equityAnnual: 12000000, totalComp: 26000000, currency: 'INR' },
    { companyId: roblox.id, roleId: swe.id, locationId: san_mateo.id, level: 'IC3', yearsOfExp: 2, baseSalary: 5500000, annualBonus: 800000, equityAnnual: 3500000, totalComp: 9800000, currency: 'INR' },
    { companyId: roblox.id, roleId: swe.id, locationId: san_mateo.id, level: 'IC4', yearsOfExp: 6, baseSalary: 9500000, annualBonus: 1500000, equityAnnual: 8500000, totalComp: 19500000, currency: 'INR' },
    { companyId: roblox.id, roleId: swe.id, locationId: san_mateo.id, level: 'IC5', yearsOfExp: 10, baseSalary: 14000000, annualBonus: 2000000, equityAnnual: 16000000, totalComp: 32000000, currency: 'INR' },
    { companyId: citadel.id, roleId: swe.id, locationId: london.id, level: 'New Grad', yearsOfExp: 0, baseSalary: 9000000, annualBonus: 2500000, equityAnnual: 3500000, totalComp: 15000000, currency: 'INR' },
    { companyId: citadel.id, roleId: swe.id, locationId: london.id, level: 'Mid', yearsOfExp: 4, baseSalary: 14000000, annualBonus: 5000000, equityAnnual: 8000000, totalComp: 27000000, currency: 'INR' },
    { companyId: citadel.id, roleId: swe.id, locationId: london.id, level: 'Senior', yearsOfExp: 8, baseSalary: 22000000, annualBonus: 10000000, equityAnnual: 18000000, totalComp: 50000000, currency: 'INR' },
    { companyId: citadel.id, roleId: swe.id, locationId: london.id, level: 'Staff', yearsOfExp: 12, baseSalary: 30000000, annualBonus: 15000000, equityAnnual: 35000000, totalComp: 80000000, currency: 'INR' },
  ]});

  console.log('✅ Seed complete — 16 companies, 57 entries from dataset');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });