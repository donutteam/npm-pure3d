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
	chunkClasses : Record<number, typeof Chunk> = {};

	/** @deprecated */
	chunkClass : Record<number, typeof Chunk> = {};

	constructor(options : ChunkRegistryOptions = {})
	{
		this.chunkClasses = options.chunkRegistry?.chunkClasses ?? {};

		this.chunkClass = this.chunkClasses;
	}

	getClass(chunkIdentifier : number) : typeof Chunk
	{
		return this.chunkClasses[chunkIdentifier] ?? UnknownChunk;
	}

	register(chunkIdentifier : number, chunkClass : new (...args : any[]) => Chunk)
	{
		this.chunkClasses[chunkIdentifier] = chunkClass as typeof Chunk;
	}
}