//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface PackedNormalListChunkOptions
{
	normals : number[];
}

export class PackedNormalListChunk extends Chunk implements PackedNormalListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : PackedNormalListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfNormals = binaryReader.readUInt32();

		const normals : number[] = [];

		for (let i = 0; i < numberOfNormals; i++)
		{
			normals.push(binaryReader.readUInt8());
		}

		return {
			normals,
		};
	}

	normals : number[];

	constructor(options : Omit<ChunkOptions, "identifier"> & PackedNormalListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.PACKED_NORMAL_LIST,
			});

		this.normals = options.normals;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.normals.length);

		for (const normal of this.normals)
		{
			binaryWriter.writeUInt8(normal);
		}
	}
}