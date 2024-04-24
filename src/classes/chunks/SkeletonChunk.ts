//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SkeletonChunkOptions
{
	name : string;

	version : number;
}

export class SkeletonChunk extends Chunk implements SkeletonChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SkeletonChunkOptions
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

	constructor(options : Omit<ChunkOptions, "identifier"> & SkeletonChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SKELETON,
			});

		this.name = options.name;

		this.version = options.version;
	}

	getNumberOfJoints() : number
	{
		let numberOfJoints = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.SKELETON_JOINT)
			{
				numberOfJoints++;
			}
		}

		return numberOfJoints;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.getNumberOfJoints());
	}
}