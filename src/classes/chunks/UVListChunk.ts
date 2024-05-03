//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";
import { Vector2 } from "../Vector2.js";

//
// Class
//

export interface UVListChunkOptions
{
	channel : number;

	uvs : Vector2[];
}

export class UVListChunk extends Chunk implements UVListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : UVListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfUvs = binaryReader.readUInt32();

		const channel = binaryReader.readUInt32();

		const uvs : Vector2[] = [];

		for (let i = 0; i < numberOfUvs; i++)
		{
			uvs.push(binaryReader.readPure3DVector2());
		}

		return {
			channel,
			uvs,
		};
	}

	channel : number;

	uvs : Vector2[];

	constructor(options : Omit<ChunkOptions, "identifier"> & UVListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.UV_LIST,
			});

		this.channel = options.channel;

		this.uvs = options.uvs;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.uvs.length);

		binaryWriter.writeUInt32(this.channel);

		for (const uv of this.uvs)
		{
			binaryWriter.writePure3DVector2(uv);
		}
	}
}