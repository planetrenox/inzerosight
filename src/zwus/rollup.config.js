import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/zwus/zwus.js',
    output: [
        {file: 'zwus.esm.js', format: 'es'},
        {file: 'zwus.cjs.js', format: 'cjs'},
    ],
    plugins: [
        resolve()
    ]
};
