//
// Imports
//

import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import url from "node:url";

import sharp from "sharp";

import * as Pure3D from "../index.js";

//
// Tests
//

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const testFilesDir = path.join(__dirname, "..", "..", "test-files");

await test.it("Should create a texture",
	async () =>
	{
		//
		// Load Image File
		//

		const imageFileName = "256x256.png";

		const imageFilePath = path.join(testFilesDir, imageFileName);

		const imageFileSharpInstance = sharp(imageFilePath);

		//
		// Get Metadata
		//

		const imageFileMetaData = await imageFileSharpInstance.metadata();

		if (imageFileMetaData.width == null || imageFileMetaData.height == null)
		{
			throw new Error("Image metadata is missing width or height.");
		}

		if (imageFileMetaData.hasAlpha == null)
		{
			throw new Error("Image metadata is missing hasAlpha.");
		}

		//
		// Get Required Data
		//

		const bitsPerPixel = 32; // TODO: Detect this from the image file?

		//
		// Create Chunks
		//

		const imageDataChunk = new Pure3D.ImageDataChunk(
			{
				imageData: await imageFileSharpInstance.toBuffer(),
			});

		const imageChunk = new Pure3D.ImageChunk(
			{
				name: imageFileName,
				version: 14000,
				width: imageFileMetaData.width,
				height: imageFileMetaData.height,
				bitsPerPixel,
				palettised: 0, // TODO: Ask Lucas what this means
				hasAlpha: imageFileMetaData.hasAlpha ? 1 : 0,
				format: Pure3D.ImageChunk.formats.PNG,

				children:
					[
						imageDataChunk,
					],
			});

		const textureChunk = new Pure3D.TextureChunk(
			{
				name: imageFileName,
				version: 14000,
				width: imageFileMetaData.width,
				height: imageFileMetaData.height,
				bitsPerPixel,
				alphaDepth: 8, // TODO: Detect this from the image file?
				numberOfMipMaps: 1,
				textureType: 1, // TODO: Ask Lucas what this means
				usage: 0, // TODO: Ask Lucas what this means
				priority: 0, // TODO: Ask Lucas what this means

				children:
					[
						imageChunk,
					],
			});

		//
		// Create File
		//

		const outputFileBuffer = Pure3D.File.write(
			{
				addHistoryChunk: true,
				chunks:
					[
						textureChunk,
					],
			});

		//
		// Write File
		//

		const outputDir = path.join(__dirname, "..", "..", "output");

		await fs.promises.mkdir(outputDir,
			{
				recursive: true,
			});

		await fs.promises.writeFile(path.join(outputDir, "create-texture.p3d"), Buffer.from(outputFileBuffer));
	});