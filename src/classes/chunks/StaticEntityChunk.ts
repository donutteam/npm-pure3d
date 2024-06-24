//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface StaticEntityChunkOptions
{
	name : string;

	version : number;

	hasAlpha : number;
}

export class StaticEntityChunk extends Chunk implements StaticEntityChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : StaticEntityChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const hasAlpha = binaryReader.readUInt32();

		return {
			name,
			version,
			hasAlpha,
		};
	}

	name : string;

	version : number;

	hasAlpha : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & StaticEntityChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.STATIC_ENTITY,
			});

		this.name = options.name;

		this.version = options.version;

		this.hasAlpha = options.hasAlpha;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.hasAlpha);
	}
}