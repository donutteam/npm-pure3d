//
// Imports
//

import { Chunk, ChunkOptions } from "./Chunk.js";

import { BinaryReader } from "../BinaryReader.js";

//
// Class
//

export class ImageChunk extends Chunk
{
	static FORMAT_RAW = 0;

	static FORMAT_PNG = 1;

	static FORMAT_TGA = 2;

	static FORMAT_BMP = 3;

	static FORMAT_IPU = 4;

	static FORMAT_DXT = 5;

	static FORMAT_DXT1 = 6;

	static FORMAT_DXT2 = 7;

	static FORMAT_DXT3 = 8;

	static FORMAT_DXT4 = 9;

	static FORMAT_DXT5 = 10;

	static FORMAT_PS24BIT = 11;

	static FORMAT_PS28BIT = 12;

	static FORMAT_PS216BIT = 13;

	static FORMAT_PS232BIT = 14;

	static FORMAT_GC4BIT = 15;

	static FORMAT_GC8BIT = 16;

	static FORMAT_GC16BIT = 17;

	static FORMAT_GC32BIT = 18;

	// noinspection SpellCheckingInspection
	static FORMAT_GCDXT1 = 19;

	static FORMAT_OTHER = 20;

	static FORMAT_INVALID = 21;

	static FORMAT_PSP4BIT = 22;

	name : string;

	version : number;

	width : number;

	height : number;

	bitsPerPixel : number;

	// noinspection SpellCheckingInspection
	palettised : number;

	hasAlpha : number;

	format : number;

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

		this.palettised = binaryReader.readUInt32();

		this.hasAlpha = binaryReader.readUInt32();

		this.format = binaryReader.readUInt32();
	}
}