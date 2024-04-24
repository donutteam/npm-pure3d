//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SkeletonJointBonePreserveChunkOptions
{
	preserveBoneLengths : number;
}

export class SkeletonJointBonePreserveChunk extends Chunk implements SkeletonJointBonePreserveChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SkeletonJointBonePreserveChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const preserveBoneLengths = binaryReader.readUInt32();

		return {
			preserveBoneLengths,
		};
	}

	preserveBoneLengths : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & SkeletonJointBonePreserveChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SKELETON_JOINT_BONE_PRESERVE,
			});

		this.preserveBoneLengths = options.preserveBoneLengths;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.preserveBoneLengths);
	}
}