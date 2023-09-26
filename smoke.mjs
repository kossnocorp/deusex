import npmName from "npm-name"

const { idea } = args;

const names = await message(
  `Give me 10 ideas for npm package name. The project idea is ${idea}. Make sure that each name is available on npm, if some of the names aren't - generate and check more until you get 10. The names must be lowercased.`,
  isAvailable
);

console.log(names);

/**
 * The function checks if the names are available on npm.
 * @param {string[]} names - The names to check
 * @returns {Promise<boolean[]>} array of booleans indicating if the corresponding name is available
 */
async function isAvailable(names) {
  return Promise.all(names.map(name => npmName(name)))
}
