//
// Imports
//

import { Chunk, ChunkOptions } from "./Chunk.js";

//
// Class
//

export class FenceChunk extends Chunk
{
	// Note: Fence chunks don't have any data.

	constructor(options : Omit<ChunkOptions, "identifier">)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.FENCE,
			});
	}
}