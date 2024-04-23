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