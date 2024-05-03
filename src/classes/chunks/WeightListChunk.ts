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

export interface WeightListChunkOptions
{
	weights : Vector3[];
}

export class WeightListChunk extends Chunk implements WeightListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : WeightListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfWeights = binaryReader.readUInt32();

		const weights : Vector3[] = [];

		for (let i = 0; i < numberOfWeights; i++)
		{
			weights.push(binaryReader.readPure3DVector3());
		}

		return {
			weights,
		};
	}

	weights : Vector3[];

	constructor(options : Omit<ChunkOptions, "identifier"> & WeightListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.WEIGHT_LIST,
			});

		this.weights = options.weights;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.weights.length);

		for (const weight of this.weights)
		{
			binaryWriter.writePure3DVector3(weight);
		}
	}
}