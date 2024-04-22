//
// Imports
//

import { Chunk, ChunkOptions } from "./Chunk.js";

import { BinaryReader } from "../BinaryReader.js";

//
// Class
//

export class TextureChunk extends Chunk
{
	name : string;

	version : number;

	width : number;

	height : number;

	bitsPerPixel : number;

	alphaDepth : number;

	textureType : number;

	usage : number;

	priority : number;

	constructor(options : ChunkOptions)
	{
		super(options);

		if (this.data == null)
		{
			throw new Error("Missing data.");
		}

		const binaryReader = new BinaryReader(
			{
				arrayBuffer: this.data,
				isLittleEndian: this.isLittleEndian,
			});

		this.name = binaryReader.readLengthPrefixedString();

		this.version = binaryReader.readUInt32();

		this.width = binaryReader.readUInt32();

		this.height = binaryReader.readUInt32();

		this.bitsPerPixel = binaryReader.readUInt32();

		this.alphaDepth = binaryReader.readUInt32();

		this.textureType = binaryReader.readUInt32();

		this.usage = binaryReader.readUInt32();

		this.priority = binaryReader.readUInt32();
	}
}