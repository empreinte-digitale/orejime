module.exports = {
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^react$': 'preact/compat',
		'^react-dom$': 'preact/compat'
	}
};
