//
// Imports
//

import { Chunk, ChunkOptions } from "./Chunk.js";

import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export class CompositeDrawablePropListChunk extends Chunk
{
	constructor(options : Omit<ChunkOptions, "identifier">)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COMPOSITE_DRAWABLE_PROP_LIST,
			});
	}

	getNumberOfElements() : number
	{
		let numberOfElements = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.COMPOSITE_DRAWABLE_PROP)
			{
				numberOfElements += 1;
			}
		}

		return numberOfElements;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.getNumberOfElements());
	}
}