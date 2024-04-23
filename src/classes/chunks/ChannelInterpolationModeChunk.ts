//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ChannelInterpolationModeChunkOptions
{
	version : number;

	interpolate : number;
}

export class ChannelInterpolationModeChunk extends Chunk implements ChannelInterpolationModeChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ChannelInterpolationModeChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const interpolate = binaryReader.readUInt32();

		return {
			version,
			interpolate,
		};
	}

	version : number;

	interpolate : number;

	constructor(options : ChunkOptions & ChannelInterpolationModeChunkOptions)
	{
		super(options);

		this.version = options.version;

		this.interpolate = options.interpolate;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeUInt32(this.interpolate);
	}
}