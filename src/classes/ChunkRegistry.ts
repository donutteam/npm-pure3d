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
	chunkClasses : Record<number, typeof Chunk> = {};

	constructor(options : ChunkRegistryOptions = {})
	{
		this.chunkClasses = options.chunkRegistry?.chunkClasses ?? {};
	}

	getClass(chunkType : number) : typeof Chunk
	{
		return this.chunkClasses[chunkType] || Chunk;
	}

	register(chunkType : number, chunkClass : typeof Chunk)
	{
		this.chunkClasses[chunkType] = chunkClass;
	}
}