//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";
import { Vector3 } from "../Vector3.js";

//
// Class
//

export interface NormalListChunkOptions
{
	normals : Vector3[];
}

export class NormalListChunk extends Chunk implements NormalListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : NormalListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfNormals = binaryReader.readUInt32();

		const normals : Vector3[] = [];

		for (let i = 0; i < numberOfNormals; i++)
		{
			normals.push(binaryReader.readPure3DVector3());
		}

		return {
			normals,
		};
	}

	normals : Vector3[];

	constructor(options : Omit<ChunkOptions, "identifier"> & NormalListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.NORMAL_LIST,
			});

		this.normals = options.normals;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.normals.length);

		for (const position of this.normals)
		{
			binaryWriter.writePure3DVector3(position);
		}
	}
}