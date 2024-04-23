//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

//
// Class
//

export interface ImageDataChunkOptions
{
	imageData : Uint8Array;
}

export class ImageDataChunk extends Chunk
{
	static override parseData(options : ChunkParseDataOptions) : ImageDataChunkOptions
	{
		const binaryReader = new BinaryReader(options.arrayBuffer, options.isLittleEndian);

		const imageDataLength = binaryReader.readUInt32();

		const imageData = binaryReader.readBytes(imageDataLength);

		return {
			imageData,
		};
	}

	imageData : Uint8Array;

	constructor(options : ChunkOptions & ImageDataChunkOptions)
	{
		super(options);

		this.imageData = options.imageData;
	}

	override getDataSize() : number
	{
		return 4 + this.imageData.byteLength;
	}

	override writeData(binaryWriter : BinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.imageData.byteLength);

		binaryWriter.writeBytes(this.imageData);
	}
}