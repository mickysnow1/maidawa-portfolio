import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email'),
  project: z.string().trim(),
  message: z.string().trim().min(1, 'Tell me about your project'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
