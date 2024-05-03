//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface CompositeDrawableChunkOptions
{
	name : string;

	skeletonName : string;
}

export class CompositeDrawableChunk extends Chunk implements CompositeDrawableChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : CompositeDrawableChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const skeletonName = binaryReader.readPure3DString();

		return {
			name,
			skeletonName,
		};
	}

	name : string;

	skeletonName : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & CompositeDrawableChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COMPOSITE_DRAWABLE,
			});

		this.name = options.name;

		this.skeletonName = options.skeletonName;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DString(this.skeletonName);
	}
}