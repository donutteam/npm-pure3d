//
// Imports
//

import "source-map-support/register.js";

import fs from "node:fs";

import * as Pure3D from "./index.js";

//
// Test
//

const filePath = "E:\\Other\\The Simpsons Hit & Run\\Installs\\The Simpsons Hit & Run\\art\\chars\\a_amer_m.p3d";

const fileData = await fs.promises.readFile(filePath);

const rootChunk = Pure3D.File.read(
	{
		arrayBuffer: fileData.buffer,
	});

const newFileBuffer = Pure3D.File.write(
	{
		chunks: rootChunk.children,
		littleEndian: false,
	});

await fs.promises.writeFile("D:\\Desktop\\test.p3d", Buffer.from(newFileBuffer),
	{
		encoding: "binary",
	});