import { z } from 'zod';

export const CreateEntrySchema = z.object({
  companySlug: z.string().min(1),
  normalizedRole: z.string().min(1),
  city: z.string().min(1),
  level: z.string().min(1),
  yearsOfExp: z.number().int().min(0).max(40),
  baseSalary: z.number().int().min(0),
  annualBonus: z.number().int().min(0).default(0),
  equityAnnual: z.number().int().min(0).default(0),
  currency: z.string().default('INR'),
});

export type CreateEntryDto = z.infer<typeof CreateEntrySchema>;