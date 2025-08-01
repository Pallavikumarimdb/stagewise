import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  platform: 'node',
  target: 'node16',
  external: ['vscode'], // VSCode extension API should always be external
  sourcemap: false, // Disable source maps for security
  minify: true, // Always minify for published packages
  treeShaking: true,
  // Additional obfuscation options
  keepNames: false, // Don't preserve function/class names
  mangleProps: /^_/, // Mangle private properties starting with _
  mangleCache: {}, // Consistent mangling across builds
  legalComments: 'none', // Remove all comments
};

if (isWatch) {
  const context = await esbuild.context(buildOptions);
  await context.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('Build complete');
}
