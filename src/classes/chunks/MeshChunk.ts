//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface MeshChunkOptions
{
	name : string;

	version : number;
}

export class MeshChunk extends Chunk implements MeshChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : MeshChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		return {
			name,
			version,
		};
	}

	name : string;

	version : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & MeshChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.MESH,
			});

		this.name = options.name;

		this.version = options.version;
	}

	getNumberOfOldPrimitiveGroups() : number
	{
		let numberOfOldPrimitiveGroups = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.OLD_PRIMITIVE_GROUP)
			{
				numberOfOldPrimitiveGroups += 1;
			}
		}

		return numberOfOldPrimitiveGroups;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.getNumberOfOldPrimitiveGroups());
	}
}