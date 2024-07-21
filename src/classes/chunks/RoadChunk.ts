//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface RoadChunkOptions
{
	name : string;

	type : number;

	startIntersection : string;

	endIntersection : string;

	maximumCars : number;

	speed : number;

	intelligence : number;

	shortcut : number;
}

export class RoadChunk extends Chunk implements RoadChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : RoadChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const type = binaryReader.readUInt32();

		const startIntersection = binaryReader.readPure3DString();

		const endIntersection = binaryReader.readPure3DString();

		const maximumCars = binaryReader.readUInt32();

		const speed = binaryReader.readUInt8();

		const intelligence = binaryReader.readUInt8();

		const shortcut = binaryReader.readUInt8();

		return {
			name,
			type,
			startIntersection,
			endIntersection,
			maximumCars,
			speed,
			intelligence,
			shortcut,
		};
	}

	name : string;

	type : number;

	startIntersection : string;

	endIntersection : string;

	maximumCars : number;

	speed : number;

	intelligence : number;

	shortcut : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & RoadChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.ROAD,
			});

		this.name = options.name;

		this.type = options.type;

		this.startIntersection = options.startIntersection;

		this.endIntersection = options.endIntersection;

		this.maximumCars = options.maximumCars;

		this.speed = options.speed;

		this.intelligence = options.intelligence;

		this.shortcut = options.shortcut;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.type);

		binaryWriter.writePure3DString(this.startIntersection);

		binaryWriter.writePure3DString(this.endIntersection);

		binaryWriter.writeUInt32(this.maximumCars);

		binaryWriter.writeUInt8(this.speed);

		binaryWriter.writeUInt8(this.intelligence);

		binaryWriter.writeUInt8(this.shortcut);
	}
}