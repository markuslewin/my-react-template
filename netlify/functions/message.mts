import type { Context } from '@netlify/functions'
import { z } from 'zod'
import { serverEnv } from '../../app/utils/env/server'

const schema = z.object({
	input: z.string(),
})

async function getFormData(req: Request) {
	try {
		return { success: true, data: await req.formData() } as const
	} catch (error) {
		return { success: false, error } as const
	}
}

export default async (req: Request, context: Context) => {
	const formData = await getFormData(req)
	if (!formData.success)
		return Response.json({ error: formData.error }, { status: 400 })

	const parsed = schema.safeParse(Object.fromEntries(formData.data))
	if (!parsed.success)
		return Response.json(
			{ error: parsed.error.flatten().fieldErrors },
			{ status: 400 },
		)

	return Response.json({
		input: parsed.data.input,
		message: serverEnv.MESSAGE,
		country: context.geo.country,
	})
}
