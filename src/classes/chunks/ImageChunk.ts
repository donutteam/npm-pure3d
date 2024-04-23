//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ImageChunkOptions
{
	name : string;

	version : number;

	width : number;

	height : number;

	bitsPerPixel : number;

	palettised : number;

	hasAlpha : number;

	format : number;
}

export class ImageChunk extends Chunk implements ImageChunkOptions
{
	static formats =
		{
			RAW: 0,
			PNG: 1,
			TGA: 2,
			BMP: 3,
			IPU: 4,
			DXT: 5,
			DXT1: 6,
			DXT2: 7,
			DXT3: 8,
			DXT4: 9,
			DXT5: 10,
			PS24BIT: 11,
			PS28BIT: 12,
			PS216BIT: 13,
			PS232BIT: 14,
			GC4BIT: 15,
			GC8BIT: 16,
			GC16BIT: 17,
			GC32BIT: 18,
			GCDXT1: 19,
			OTHER: 20,
			INVALID: 21,
			PSP4BIT: 22,
		};

	static override parseData(options : ChunkParseDataOptions) : ImageChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const width = binaryReader.readUInt32();

		const height = binaryReader.readUInt32();

		const bitsPerPixel = binaryReader.readUInt32();

		const palettised = binaryReader.readUInt32();

		const hasAlpha = binaryReader.readUInt32();

		const format = binaryReader.readUInt32();

		return {
			name,
			version,
			width,
			height,
			bitsPerPixel,
			palettised,
			hasAlpha,
			format,
		};
	}

	name : string;

	version : number;

	width : number;

	height : number;

	bitsPerPixel : number;

	palettised : number;

	hasAlpha : number;

	format : number;

	constructor(options : ChunkOptions & ImageChunkOptions)
	{
		super(options);

		this.name = options.name;

		this.version = options.version;

		this.width = options.width;

		this.height = options.height;

		this.bitsPerPixel = options.bitsPerPixel;

		this.palettised = options.palettised;

		this.hasAlpha = options.hasAlpha;

		this.format = options.format;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.width);

		binaryWriter.writeUInt32(this.height);

		binaryWriter.writeUInt32(this.bitsPerPixel);

		binaryWriter.writeUInt32(this.palettised);

		binaryWriter.writeUInt32(this.hasAlpha);

		binaryWriter.writeUInt32(this.format);
	}
}