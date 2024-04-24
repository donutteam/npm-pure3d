//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface AnimationSizeChunkOptions
{
	version : number;

	pc : number;

	playStation2 : number;

	xbox : number;

	gameCube : number;
}

export class AnimationSizeChunk extends Chunk implements AnimationSizeChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : AnimationSizeChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const pc = binaryReader.readUInt32();

		const playStation2 = binaryReader.readUInt32();

		const xbox = binaryReader.readUInt32();

		const gameCube = binaryReader.readUInt32();

		return {
			version,
			pc,
			playStation2,
			xbox,
			gameCube,
		};
	}

	version : number;

	pc : number;

	playStation2 : number;

	xbox : number;

	gameCube : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & AnimationSizeChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.ANIMATION_SIZE,
			});

		this.version = options.version;

		this.pc = options.pc;

		this.playStation2 = options.playStation2;

		this.xbox = options.xbox;

		this.gameCube = options.gameCube;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.pc);

		binaryWriter.writeUInt32(this.playStation2);

		binaryWriter.writeUInt32(this.xbox);

		binaryWriter.writeUInt32(this.gameCube);
	}
}