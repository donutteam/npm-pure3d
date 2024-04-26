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

export interface Fence2ChunkOptions
{
	start : Vector3;

	end : Vector3;

	normal : Vector3;
}

export class Fence2Chunk extends Chunk implements Fence2ChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : Fence2ChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const start = binaryReader.readPure3DVector3();

		const end = binaryReader.readPure3DVector3();

		const normal = binaryReader.readPure3DVector3();

		return {
			start,
			end,
			normal,
		};
	}

	start : Vector3;

	end : Vector3;

	normal : Vector3;

	constructor(options : Omit<ChunkOptions, "identifier"> & Fence2ChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.HISTORY,
			});

		this.start = options.start;

		this.end = options.end;

		this.normal = options.normal;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DVector3(this.start);

		binaryWriter.writePure3DVector3(this.end);

		binaryWriter.writePure3DVector3(this.normal);
	}
}