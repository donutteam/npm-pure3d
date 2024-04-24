//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface AnimationGroupListChunkOptions
{
	version : number;
}

export class AnimationGroupListChunk extends Chunk implements AnimationGroupListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : AnimationGroupListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		return {
			version,
		};
	}

	version : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & AnimationGroupListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.ANIMATION_GROUP_LIST,
			});

		this.version = options.version;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.children.length);
	}
}