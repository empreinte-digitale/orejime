module.exports = {
	preset: 'ts-jest/presets/js-with-ts-esm',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^react$': 'preact/compat',
		'^react-dom$': 'preact/compat'
	}
};
