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

export interface RoadDataSegmentChunkOptions
{
	name : string;

	type : number;

	lanes : number;

	hasShoulder : number;

	position1 : Vector3;

	position2 : Vector3;

	position3 : Vector3;
}

export class RoadDataSegmentChunk extends Chunk implements RoadDataSegmentChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : RoadDataSegmentChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const type = binaryReader.readUInt32();

		const lanes = binaryReader.readUInt32();

		const hasShoulder = binaryReader.readUInt32();

		const position1 = binaryReader.readPure3DVector3();

		const position2 = binaryReader.readPure3DVector3();

		const position3 = binaryReader.readPure3DVector3();

		return {
			name,
			type,
			lanes,
			hasShoulder,
			position1,
			position2,
			position3,
		};
	}

	name : string;

	type : number;

	lanes : number;

	hasShoulder : number;

	position1 : Vector3;

	position2 : Vector3;

	position3 : Vector3;

	constructor(options : Omit<ChunkOptions, "identifier"> & RoadDataSegmentChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.INTERSECTION,
			});

		this.name = options.name;

		this.type = options.type;

		this.lanes = options.lanes;

		this.hasShoulder = options.hasShoulder;

		this.position1 = options.position1;

		this.position2 = options.position2;

		this.position3 = options.position3;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.type);

		binaryWriter.writeUInt32(this.lanes);

		binaryWriter.writeUInt32(this.hasShoulder);

		binaryWriter.writePure3DVector3(this.position1);

		binaryWriter.writePure3DVector3(this.position2);

		binaryWriter.writePure3DVector3(this.position3);
	}
}