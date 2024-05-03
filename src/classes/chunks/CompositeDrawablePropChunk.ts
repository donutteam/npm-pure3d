//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface CompositeDrawablePropChunkOptions
{
	name : string;

	isTranslucent : number;

	skeletonJointId : number;
}

export class CompositeDrawablePropChunk extends Chunk implements CompositeDrawablePropChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : CompositeDrawablePropChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const isTranslucent = binaryReader.readUInt32();

		const skeletonJointId = binaryReader.readUInt32();

		return {
			name,
			isTranslucent,
			skeletonJointId,
		};
	}

	name : string;

	isTranslucent : number;

	skeletonJointId : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & CompositeDrawablePropChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COMPOSITE_DRAWABLE_PROP,
			});

		this.name = options.name;

		this.isTranslucent = options.isTranslucent;

		this.skeletonJointId = options.skeletonJointId;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.isTranslucent);

		binaryWriter.writeUInt32(this.skeletonJointId);
	}
}