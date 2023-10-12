import babel from 'rollup-plugin-babel';
import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

import pkg from './package.json' assert { type: 'json' };

const PLUGINS = [
  ts({
    tsconfigOverride: { exclude: ['**/*.test.ts', 'jest.config.ts'] },
  }),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }),
  replace({
    preventAssignment: true,
    _VERSION: JSON.stringify(pkg.version),
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: PLUGINS,
  },
];
