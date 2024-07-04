import { z } from 'zod'

export const serverSchema = z.object({
	MESSAGE: z.string(),
})

export const clientSchema = z.object({
	VITE_FRUIT: z.string(),
})
