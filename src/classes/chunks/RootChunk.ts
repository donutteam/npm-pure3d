//
// Imports
//

import { Chunk, ChunkOptions } from "./Chunk.js";

import { File } from "../File.js";

//
// Class
//

export interface RootChunkOptions
{
	identifier? : typeof File.signatures.LITTLE_ENDIAN | typeof File.signatures.BIG_ENDIAN;

	isNewFile? : boolean;
}

export class RootChunk extends Chunk implements RootChunkOptions
{
	isNewFile : boolean;

	constructor(options : ChunkOptions & RootChunkOptions)
	{
		const identifier = options.identifier ?? File.signatures.LITTLE_ENDIAN;

		super(
			{
				identifier,
			});

		this.isNewFile = options.isNewFile ?? true;
	}
}