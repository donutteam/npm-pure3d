//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface AnimationChunkOptions
{
	version : number;

	name : string;

	animationType : string;

	numberOfFrames : number;

	frameRate : number;

	cyclic : number;
}

export class AnimationChunk extends Chunk implements AnimationChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : AnimationChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const animationType = binaryReader.readFourCharacterCode();

		const numberOfFrames = binaryReader.readFloat32();

		const frameRate = binaryReader.readFloat32();

		const cyclic = binaryReader.readUInt32();

		return {
			version,
			name,
			animationType,
			numberOfFrames,
			frameRate,
			cyclic,
		};
	}

	version : number;

	name : string;

	animationType : string;

	numberOfFrames : number;

	frameRate : number;

	cyclic : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & AnimationChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.ANIMATION,
			});

		this.version = options.version;

		this.name = options.name;

		this.animationType = options.animationType;

		this.numberOfFrames = options.numberOfFrames;

		this.frameRate = options.frameRate;

		this.cyclic = options.cyclic;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeFourCharacterCode(this.animationType);

		binaryWriter.writeFloat32(this.numberOfFrames);

		binaryWriter.writeFloat32(this.frameRate);

		binaryWriter.writeUInt32(this.cyclic);
	}
}