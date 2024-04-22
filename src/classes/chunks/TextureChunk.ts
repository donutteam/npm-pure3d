//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

import { Chunk, ChunkOptions } from "./Chunk.js";

import * as ChunkLib from "../../libs/chunk.js";

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

	numberOfMipMaps : number;

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

		const binaryReader = new BinaryReader(this.data, this.isLittleEndian);

		const nameLength = binaryReader.readUInt8();

		const name = binaryReader.readString(nameLength);

		this.name = ChunkLib.cleanP3DString(name);

		this.version = binaryReader.readUInt32();

		this.width = binaryReader.readUInt32();

		this.height = binaryReader.readUInt32();

		this.bitsPerPixel = binaryReader.readUInt32();

		this.alphaDepth = binaryReader.readUInt32();

		this.numberOfMipMaps = binaryReader.readUInt32();

		this.textureType = binaryReader.readUInt32();

		this.usage = binaryReader.readUInt32();

		this.priority = binaryReader.readUInt32();
	}
}