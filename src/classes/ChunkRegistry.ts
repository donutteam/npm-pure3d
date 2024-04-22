//
// Imports
//

import { Chunk } from "./chunks/Chunk.js";

//
// Class
//

export class ChunkRegistryOptions
{
	chunkRegistry? : ChunkRegistry;
}

export class ChunkRegistry
{
	chunkClass : Record<number, typeof Chunk> = {};

	constructor(options : ChunkRegistryOptions = {})
	{
		this.chunkClass = options.chunkRegistry?.chunkClass ?? {};
	}

	getClass(chunkIdentifier : number) : typeof Chunk
	{
		return this.chunkClass[chunkIdentifier] ?? Chunk;
	}

	register(chunkIdentifier : number, chunkClass : typeof Chunk)
	{
		this.chunkClass[chunkIdentifier] = chunkClass;
	}
}