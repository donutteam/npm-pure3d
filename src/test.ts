//
// Imports
//

import "source-map-support/register.js";

import fs from "node:fs";

import { TextureChunk } from "./classes/chunks/TextureChunk.js";

import * as FileLib from "./libs/file.js";

//
//
//

const filePath = "E:\\Other\\The Simpsons Hit & Run\\Installs\\The Simpsons Hit & Run\\art\\chars\\a_army_m.p3d";

const fileData = await fs.promises.readFile(filePath);

const { chunks } = FileLib.readFile(
	{
		arrayBuffer: fileData.buffer,
	});

for (const chunk of chunks)
{
	if (chunk instanceof TextureChunk)
	{
		console.log(JSON.stringify(chunk, null, "\t"));
	}
}