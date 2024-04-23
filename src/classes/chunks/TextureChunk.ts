//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface TextureChunkOptions
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
}

export class TextureChunk extends Chunk implements TextureChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : TextureChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const width = binaryReader.readUInt32();

		const height = binaryReader.readUInt32();

		const bitsPerPixel = binaryReader.readUInt32();

		const alphaDepth = binaryReader.readUInt32();

		const numberOfMipMaps = binaryReader.readUInt32();

		const textureType = binaryReader.readUInt32();

		const usage = binaryReader.readUInt32();

		const priority = binaryReader.readUInt32();

		return {
			name,
			version,
			width,
			height,
			bitsPerPixel,
			alphaDepth,
			numberOfMipMaps,
			textureType,
			usage,
			priority,
		};
	}

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

	constructor(options : ChunkOptions & TextureChunkOptions)
	{
		super(options);

		if (this.data == null)
		{
			throw new Error("Missing data.");
		}

		this.name = options.name;

		this.version = options.version;

		this.width = options.width;

		this.height = options.height;

		this.bitsPerPixel = options.bitsPerPixel;

		this.alphaDepth = options.alphaDepth;

		this.numberOfMipMaps = options.numberOfMipMaps;

		this.textureType = options.textureType;

		this.usage = options.usage;

		this.priority = options.priority;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.width);

		binaryWriter.writeUInt32(this.height);

		binaryWriter.writeUInt32(this.bitsPerPixel);

		binaryWriter.writeUInt32(this.alphaDepth);

		binaryWriter.writeUInt32(this.numberOfMipMaps);

		binaryWriter.writeUInt32(this.textureType);

		binaryWriter.writeUInt32(this.usage);

		binaryWriter.writeUInt32(this.priority);
	}
}