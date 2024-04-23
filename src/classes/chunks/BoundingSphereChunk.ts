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

export interface BoundingSphereChunkOptions
{
	centre : Vector3;

	radius : number;
}

export class BoundingSphereChunk extends Chunk implements BoundingSphereChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : BoundingSphereChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const centre = Vector3.readBinary(binaryReader);

		const radius = binaryReader.readFloat32();

		return {
			centre,
			radius,
		};
	}

	centre : Vector3;

	radius : number;

	constructor(options : ChunkOptions & BoundingSphereChunkOptions)
	{
		super(options);

		this.centre = options.centre;

		this.radius = options.radius;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		Vector3.writeBinary(binaryWriter, this.centre);

		binaryWriter.writeFloat32(this.radius);
	}
}