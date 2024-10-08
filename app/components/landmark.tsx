import { invariant } from '@epic-web/invariant'
import { Slot } from '@radix-ui/react-slot'
import {
	type ComponentPropsWithoutRef,
	type ReactNode,
	createContext,
	forwardRef,
	useContext,
	useId,
} from 'react'

const context = createContext<{ headingId: string } | null>(null)

function useLandmarkContext() {
	const value = useContext(context)
	invariant(value !== null, 'Value of landmark context was null')

	return value
}

interface RootProps extends ComponentPropsWithoutRef<'section'> {}

export const Root = forwardRef<HTMLElement, RootProps>((props) => {
	const headingId = useId()

	return (
		<context.Provider value={{ headingId }}>
			<section aria-labelledby={headingId} {...props} />
		</context.Provider>
	)
})

interface LabelProps {
	children: ReactNode
}

export const Label = forwardRef<HTMLElement, LabelProps>(({ children }) => {
	const { headingId } = useLandmarkContext()

	return <Slot id={headingId}>{children}</Slot>
})
