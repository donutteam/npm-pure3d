//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ImageDataChunkOptions
{
	imageData : Uint8Array;
}

export class ImageDataChunk extends Chunk implements ImageDataChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ImageDataChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const imageDataLength = binaryReader.readUInt32();

		const imageData = binaryReader.readBytes(imageDataLength);

		return {
			imageData,
		};
	}

	imageData : Uint8Array;

	constructor(options : Omit<ChunkOptions, "identifier"> & ImageDataChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.IMAGE_DATA,
			});

		this.imageData = options.imageData;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.imageData.byteLength);

		binaryWriter.writeBytes(this.imageData);
	}
}