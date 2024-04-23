//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { cleanP3DString } from "../../libs/miscellaneous.js";

//
// Class
//

export interface ShaderChunkOptions
{
	name : string;

	version : number;

	pddiShaderName : string;

	hasTranslucency : number;

	vertexNeeds : number;

	vertexMask : number;
}

export class ShaderChunk extends Chunk
{
	static override parseData(options : ChunkParseDataOptions) : ShaderChunkOptions
	{
		const binaryReader = new BinaryReader(options.arrayBuffer, options.isLittleEndian);

		const nameLength = binaryReader.readUInt8();

		const name = cleanP3DString(binaryReader.readString(nameLength));

		const version = binaryReader.readUInt32();

		const pddiShaderNameLength = binaryReader.readUInt8();

		const pddiShaderName = cleanP3DString(binaryReader.readString(pddiShaderNameLength));

		const hasTranslucency = binaryReader.readUInt32();

		const vertexNeeds = binaryReader.readUInt32();

		const vertexMask = binaryReader.readUInt32();

		return {
			name,
			version,
			pddiShaderName,
			hasTranslucency,
			vertexNeeds,
			vertexMask,
		};
	}

	name : string;

	version : number;

	pddiShaderName : string;

	hasTranslucency : number;

	vertexNeeds : number;

	vertexMask : number;

	constructor(options : ChunkOptions & ShaderChunkOptions)
	{
		super(options);

		this.name = options.name;

		this.version = options.version;

		this.pddiShaderName = options.pddiShaderName;

		this.hasTranslucency = options.hasTranslucency;

		this.vertexNeeds = options.vertexNeeds;

		this.vertexMask = options.vertexMask;
	}

	override getDataSize() : number
	{
		return 1 + this.name.length +
			4 +
			1 + this.pddiShaderName.length +
			4 +
			4 +
			4 +
			4;
	}

	override writeData(binaryWriter : BinaryWriter) : void
	{
		binaryWriter.writeUInt8(this.name.length);
		binaryWriter.writeString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt8(this.pddiShaderName.length);
		binaryWriter.writeString(this.pddiShaderName);

		binaryWriter.writeUInt32(this.hasTranslucency);

		binaryWriter.writeUInt32(this.vertexNeeds);

		binaryWriter.writeUInt32(this.vertexMask);

		binaryWriter.writeUInt32(this.children.length);
	}
}