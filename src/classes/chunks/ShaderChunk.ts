//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

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

export class ShaderChunk extends Chunk implements ShaderChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const pddiShaderName = binaryReader.readPure3DString();

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

	constructor(options : Omit<ChunkOptions, "identifier"> & ShaderChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER,
			});

		this.name = options.name;

		this.version = options.version;

		this.pddiShaderName = options.pddiShaderName;

		this.hasTranslucency = options.hasTranslucency;

		this.vertexNeeds = options.vertexNeeds;

		this.vertexMask = options.vertexMask;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.pddiShaderName);

		binaryWriter.writeUInt32(this.hasTranslucency);

		binaryWriter.writeUInt32(this.vertexNeeds);

		binaryWriter.writeUInt32(this.vertexMask);

		binaryWriter.writeUInt32(this.children.length);
	}
}