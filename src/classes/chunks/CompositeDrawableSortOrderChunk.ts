//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface CompositeDrawableSortOrderChunkOptions
{
	sortOrder : number;
}

export class CompositeDrawableSortOrderChunk extends Chunk implements CompositeDrawableSortOrderChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : CompositeDrawableSortOrderChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const sortOrder = binaryReader.readFloat32();

		return {
			sortOrder,
		};
	}

	sortOrder : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & CompositeDrawableSortOrderChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COMPOSITE_DRAWABLE_SORT_ORDER,
			});

		this.sortOrder = options.sortOrder;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeFloat32(this.sortOrder);
	}
}