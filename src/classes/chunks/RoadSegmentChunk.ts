//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Matrix } from "../Matrix.js";
import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface RoadSegmentChunkOptions
{
	name : string;

	roadDataSegment : string;

	transform : Matrix;

	scale : Matrix;
}

export class RoadSegmentChunk extends Chunk implements RoadSegmentChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : RoadSegmentChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const roadDataSegment = binaryReader.readPure3DString();

		const transform = binaryReader.readPure3DMatrix();

		const scale = binaryReader.readPure3DMatrix();

		return {
			name,
			roadDataSegment,
			transform,
			scale,
		};
	}

	name : string;

	roadDataSegment : string;

	transform : Matrix;

	scale : Matrix;

	constructor(options : Omit<ChunkOptions, "identifier"> & RoadSegmentChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.INTERSECTION,
			});

		this.name = options.name;

		this.roadDataSegment = options.roadDataSegment;

		this.transform = options.transform;

		this.scale = options.scale;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DString(this.roadDataSegment);

		binaryWriter.writePure3DMatrix(this.transform);

		binaryWriter.writePure3DMatrix(this.scale);
	}
}