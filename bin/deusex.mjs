#!/usr/bin/env node

import { readFile } from "fs/promises";
import { parse } from "@babel/parser";
import generateModule from "@babel/generator";
import traverseModule from "@babel/traverse";
import * as t from "@babel/types";

const generate = generateModule.default;
const traverse = traverseModule.default;

const [file] = process.argv.slice(2);

const fileStr = await readFile(file, "utf-8");
const ast = parse(fileStr, {
  sourceType: "module",
});

const newVariableDeclaration = t.variableDeclaration("const", [
  t.variableDeclarator(t.identifier("x"), t.numericLiteral(10)),
]);

ast.program.body.unshift(newVariableDeclaration);

console.log(generate(ast).code);
