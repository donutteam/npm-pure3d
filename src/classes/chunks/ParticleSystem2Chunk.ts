//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ParticleSystem2ChunkOptions
{
	version : number;

	name : string;

	factoryName : string;
}

export class ParticleSystem2Chunk extends Chunk implements ParticleSystem2ChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ParticleSystem2ChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const factoryName = binaryReader.readPure3DString();

		return {
			version,
			name,
			factoryName,
		};
	}

	version : number;

	name : string;

	factoryName : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & ParticleSystem2ChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.PARTICLE_SYSTEM_2,
			});

		this.version = options.version;

		this.name = options.name;

		this.factoryName = options.factoryName;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DString(this.factoryName);
	}
}