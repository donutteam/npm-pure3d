//
// Imports
//

import "source-map-support/register.js";

import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import url from "node:url";

import * as Pure3D from "../index.js";

//
// Tests
//

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const testFilesDir = path.join(__dirname, "..", "..", "test-files");

await test.it("Read a compressed P3D file",
	async () =>
	{
		//
		// Load P3D File
		//

		const originalFileName = "compressed.p3d";

		const originalFilePath = path.join(testFilesDir, originalFileName);

		const originalFileBuffer = await fs.promises.readFile(originalFilePath);

		const rootChunk = Pure3D.File.fromArrayBuffer(
			{
				arrayBuffer: originalFileBuffer.buffer,
			});

		//
		// Create New P3D File
		//

		const newFileBuffer = Pure3D.File.toArrayBuffer(
			{
				addExportInfo: true,
				rootChunk,
			});

		//
		// Write P3D File
		//

		const outputDir = path.join(__dirname, "..", "..", "output");

		await fs.promises.mkdir(outputDir,
			{
				recursive: true,
			});

		await fs.promises.writeFile(path.join(outputDir, "read-compressed.p3d"), Buffer.from(newFileBuffer));
	});