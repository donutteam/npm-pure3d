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

export interface PositionListChunkOptions
{
	positions : Vector3[];
}

export class PositionListChunk extends Chunk implements PositionListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : PositionListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfPositions = binaryReader.readUInt32();

		const positions : Vector3[] = [];

		for (let i = 0; i < numberOfPositions; i++)
		{
			positions.push(binaryReader.readPure3DVector3());
		}

		return {
			positions,
		};
	}

	positions : Vector3[];

	constructor(options : Omit<ChunkOptions, "identifier"> & PositionListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.POSITION_LIST,
			});

		this.positions = options.positions;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.positions.length);

		for (const position of this.positions)
		{
			binaryWriter.writePure3DVector3(position);
		}
	}
}