//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface EntityChannelChunkOptions
{
	version : number;

	parameter : string;

	frames : number[];

	values : string[];
}

export class EntityChannelChunk extends Chunk implements EntityChannelChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : EntityChannelChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const parameter = binaryReader.readFourCharacterCode();

		const numberOfFrames = binaryReader.readUInt32();

		let frames : number[] = [];

		for (let i = 0; i < numberOfFrames; i++)
		{
			frames.push(binaryReader.readUInt16());
		}

		let values : string[] = [];

		for (let i = 0; i < numberOfFrames; i++)
		{
			values.push(binaryReader.readPure3DString());
		}

		return {
			version,
			parameter,
			frames,
			values,
		};
	}

	version : number;

	parameter : string;

	frames : number[];

	values : string[];

	constructor(options : Omit<ChunkOptions, "identifier"> & EntityChannelChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.ENTITY_CHANNEL,
			});

		this.version = options.version;

		this.parameter = options.parameter;

		this.frames = options.frames;

		this.values = options.values;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		if (this.frames.length != this.values.length)
		{
			throw new Error("Frames and values lengths do not match.");
		}

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeFourCharacterCode(this.parameter);

		binaryWriter.writeUInt32(this.frames.length);

		for (let frame of this.frames)
		{
			binaryWriter.writeUInt16(frame);
		}

		for (let value of this.values)
		{
			binaryWriter.writePure3DString(value);
		}
	}
}