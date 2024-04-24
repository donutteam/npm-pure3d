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

export interface BoundingBoxChunkOptions
{
	low : Vector3;

	high : Vector3;
}

export class BoundingBoxChunk extends Chunk implements BoundingBoxChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : BoundingBoxChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const low = Vector3.readBinary(binaryReader);

		const high = Vector3.readBinary(binaryReader);

		return {
			low,
			high,
		};
	}

	low : Vector3;

	high : Vector3;

	constructor(options : Omit<ChunkOptions, "identifier"> & BoundingBoxChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.BOUNDING_BOX,
			});

		this.low = options.low;

		this.high = options.high;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		Vector3.writeBinary(binaryWriter, this.low);

		Vector3.writeBinary(binaryWriter, this.high);
	}
}