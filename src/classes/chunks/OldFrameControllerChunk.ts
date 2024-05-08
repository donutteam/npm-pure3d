//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface OldFrameControllerChunkOptions
{
	version : number;

	name : string;

	type : string;

	frameOffset : number;

	hierarchyName : string;

	animationName : string;
}

export class OldFrameControllerChunk extends Chunk implements OldFrameControllerChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : OldFrameControllerChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const type = binaryReader.readPure3DFourCharacterCode();

		const frameOffset = binaryReader.readFloat32();

		const hierarchyName = binaryReader.readPure3DString();

		const animationName = binaryReader.readPure3DString();

		return {
			version,
			name,
			type,
			frameOffset,
			hierarchyName,
			animationName,
		};
	}

	version : number;

	name : string;

	type : string;

	frameOffset : number;

	hierarchyName : string;

	animationName : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & OldFrameControllerChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.OLD_FRAME_CONTROLLER,
			});

		this.version = options.version;

		this.name = options.name;

		this.type = options.type;

		this.frameOffset = options.frameOffset;

		this.hierarchyName = options.hierarchyName;

		this.animationName = options.animationName;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DFourCharacterCode(this.type);

		binaryWriter.writeFloat32(this.frameOffset);

		binaryWriter.writePure3DString(this.hierarchyName);

		binaryWriter.writePure3DString(this.animationName);
	}
}