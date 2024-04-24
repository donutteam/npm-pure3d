//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface UnknownChunkOptions
{
	data : ArrayBuffer | null;
}

export class UnknownChunk extends Chunk
{
	static override parseData(options : ChunkParseDataOptions) : UnknownChunkOptions
	{
		return {
			data: options.arrayBuffer,
		};
	}

	data : ArrayBuffer | null;

	constructor(options : ChunkOptions & UnknownChunkOptions)
	{
		super(options);

		this.data = options.data;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter)
	{
		if (this.data)
		{
			binaryWriter.writeBytes(this.data);
		}
	}
}