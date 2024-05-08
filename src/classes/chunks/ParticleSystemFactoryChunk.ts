//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ParticleSystemFactoryChunkOptions
{
	version : number;

	name : string;

	frameRate : number;

	numberOfAnimationFrames : number;

	numberOfOlFrames : number;

	cycleAnimation : number;

	enableSorting : number;
}

export class ParticleSystemFactoryChunk extends Chunk implements ParticleSystemFactoryChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ParticleSystemFactoryChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const frameRate = binaryReader.readFloat32();

		const numberOfAnimationFrames = binaryReader.readUInt32();

		const numberOfOlFrames = binaryReader.readUInt32();

		const cycleAnimation = binaryReader.readUInt16();

		const enableSorting = binaryReader.readUInt16();

		return {
			version,
			name,
			frameRate,
			numberOfAnimationFrames,
			numberOfOlFrames,
			cycleAnimation,
			enableSorting,
		};
	}

	version : number;

	name : string;

	frameRate : number;

	numberOfAnimationFrames : number;

	numberOfOlFrames : number;

	cycleAnimation : number;

	enableSorting : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & ParticleSystemFactoryChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.PARTICLE_SYSTEM_FACTORY,
			});

		this.version = options.version;

		this.name = options.name;

		this.frameRate = options.frameRate;

		this.numberOfAnimationFrames = options.numberOfAnimationFrames;

		this.numberOfOlFrames = options.numberOfOlFrames;

		this.cycleAnimation = options.cycleAnimation;

		this.enableSorting = options.enableSorting;
	}

	getNumberOfEmitters() : number
	{
		let numberOfEmitters = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.OLD_SPRITE_EMITTER)
			{
				numberOfEmitters += 1;
			}
		}

		return numberOfEmitters;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeFloat32(this.frameRate);

		binaryWriter.writeUInt32(this.numberOfAnimationFrames);

		binaryWriter.writeUInt32(this.numberOfOlFrames);

		binaryWriter.writeUInt16(this.cycleAnimation);

		binaryWriter.writeUInt16(this.enableSorting);

		binaryWriter.writeUInt32(this.getNumberOfEmitters());
	}
}