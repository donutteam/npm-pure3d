//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface AnimationGroupChunkOptions
{
	version : number;

	name : string;

	groupIdentifier : number;
}

export class AnimationGroupChunk extends Chunk implements AnimationGroupChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : AnimationGroupChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const groupIdentifier = binaryReader.readUInt32();

		return {
			version,
			name,
			groupIdentifier,
		};
	}

	version : number;

	name : string;

	groupIdentifier : number;

	constructor(options : ChunkOptions & AnimationGroupChunkOptions)
	{
		super(options);

		this.version = options.version;

		this.name = options.name;

		this.groupIdentifier = options.groupIdentifier;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.groupIdentifier);

		binaryWriter.writeUInt32(this.children.length);
	}
}