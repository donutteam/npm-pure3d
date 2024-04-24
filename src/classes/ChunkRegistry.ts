//
// Imports
//

import { Chunk } from "./chunks/Chunk.js";
import { UnknownChunk } from "./chunks/UnknownChunk.js";

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
		return this.chunkClass[chunkIdentifier] ?? UnknownChunk;
	}

	register(chunkIdentifier : number, chunkClass : new (...args : any[]) => Chunk)
	{
		this.chunkClass[chunkIdentifier] = chunkClass as typeof Chunk;
	}
}