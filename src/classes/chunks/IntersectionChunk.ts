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

export interface IntersectionChunkOptions
{
	name : string;

	position : Vector3;

	radius : number;

	trafficBehaviour : number;
}

export class IntersectionChunk extends Chunk implements IntersectionChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : IntersectionChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const position = binaryReader.readPure3DVector3();

		const radius = binaryReader.readFloat32();

		const trafficBehaviour = binaryReader.readUInt32();

		return {
			name,
			position,
			radius,
			trafficBehaviour,
		};
	}

	name : string;

	position : Vector3;

	radius : number;

	trafficBehaviour : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & IntersectionChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.INTERSECTION,
			});

		this.name = options.name;

		this.position = options.position;

		this.radius = options.radius;

		this.trafficBehaviour = options.trafficBehaviour;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DVector3(this.position);

		binaryWriter.writeFloat32(this.radius);

		binaryWriter.writeUInt32(this.trafficBehaviour);
	}
}