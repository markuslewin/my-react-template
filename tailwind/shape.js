import plugin from 'tailwindcss/plugin'

const defaultWidth = '1px'
const borderWidth = `var(--shape-border-width, ${defaultWidth})`

function getPadding(size) {
	return `calc(${size} - ${borderWidth})`
}

// Draws outlines for borderless shapes during forced-colors
export const shape = plugin(({ matchUtilities, theme }) => {
	matchUtilities(
		{
			'shape-p': (size) => {
				return {
					padding: getPadding(size),
					borderWidth,
				}
			},
			'shape-py': (size) => {
				return {
					'padding-top': getPadding(size),
					'padding-bottom': getPadding(size),
					borderWidth,
				}
			},
			'shape-px': (size) => {
				return {
					'padding-left': getPadding(size),
					'padding-right': getPadding(size),
					borderWidth,
				}
			},
		},
		{ values: theme('size') },
	)
	matchUtilities(
		{
			'shape-border': (borderWidth) => {
				return {
					'--shape-border-width': borderWidth,
				}
			},
		},
		{ values: theme('borderWidth') },
	)
})
