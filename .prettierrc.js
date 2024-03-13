/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import ('@trivago/prettier-plugin-sort-imports').PluginConfig} */
module.exports = {
  singleQuote: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^server-only$',
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '^#/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['cva', 'cx'],
};
