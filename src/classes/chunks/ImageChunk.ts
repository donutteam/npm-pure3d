//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import * as ChunkLib from "../../libs/miscellaneous.js";

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

export class ImageChunk extends Chunk
{
	static override parseData(options : ChunkParseDataOptions) : ImageChunkOptions
	{
		const binaryReader = new BinaryReader(options.arrayBuffer, options.isLittleEndian);

		const nameLength = binaryReader.readUInt8();

		const name = ChunkLib.cleanP3DString(binaryReader.readString(nameLength));

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
}