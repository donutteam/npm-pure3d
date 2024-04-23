//
// Imports
//

import "source-map-support/register.js";

import fs from "node:fs";

import * as Pure3D from "./index.js";

//
// Test
//

const filePath = "D:\\Desktop\\input.p3d";

const fileData = await fs.promises.readFile(filePath);

const rootChunk = Pure3D.File.read(
	{
		arrayBuffer: fileData.buffer,
	});

logChildren(rootChunk);

const newFileData = Pure3D.File.write(
	{
		chunks: rootChunk.children,
	});

await fs.promises.writeFile("D:\\Desktop\\output.p3d", Buffer.from(newFileData));

//
// Functions
//

export function logChildren(chunk : Pure3D.Chunk, depth = 0)
{
	for (const child of chunk.children)
	{
		console.log("\t".repeat(depth) + child.constructor.name);

		logChildren(child, depth + 1);
	}
}