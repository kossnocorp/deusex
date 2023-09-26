import openAI from "openai";
import npmName from "npm-name";

const debug = false;

const key = process.env.OPENAI_API_KEY;
const orgId = process.env.OPENAI_ORG_ID;

const openai = new openAI(key, orgId);

const idea = process.argv[2];
if (debug) console.log({ idea });

const message1 = {
  role: "user",
  content: `Give me 10 ideas for npm package name. The project idea is ${idea}. Make sure that each name is available on npm, if some of the names aren't - generate and check more until you get 10. The names must be lowercased.`,
};

const messages = [message1];

const functions = [
  {
    name: "isAvailable",
    description:
      "The function checks if the names are available on npm. Returns array of booleans indicating if the corresponding name is available (array of strings separated by comma)",
    parameters: {
      type: "object",
      properties: {
        names: {
          type: "string",
          description:
            "The names to check (array of strings separated by comma)",
        },
      },
      required: ["names"],
    },
  },
];

let response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages,
  functions,
});

if (debug) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(JSON.stringify(response, null, 2));
}

while (response.choices[0].finish_reason === "function_call") {
  messages.push(response.choices[0].message);

  const args = JSON.parse(response.choices[0].message.function_call.arguments);
  if (debug) console.log({ args });

  const names = args.names.split(",").map((s) => s.trim());
  const available = await isAvailable(names);
  if (debug) console.log({ names, available });

  messages.push({
    role: "function",
    name: "isAvailable",
    content: available.join(","),
  });

  response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    functions,
  });
}

if (debug) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(JSON.stringify(response, null, 2));

  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
}

console.log(response.choices[0].message.content);

async function isAvailable(names) {
  return Promise.all(names.map((name) => npmName(name)));
}
