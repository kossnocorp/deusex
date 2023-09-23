const { idea } = args;

const names = await message(
  `Give me ideas for npm package name. The project idea is ${idea}`,
  isAvailable
);

console.log(names);

/**
 * The function checks if the name is available on npm.
 * @param {string[]} names - The names to check
 * @returns {Promise<boolean>} true if the name is available, false otherwise
 */
async function isAvailable(names) {}
