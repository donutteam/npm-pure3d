//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { MultiControllerTracksChunk } from "./MultiControllerTracksChunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface MultiControllerChunkOptions
{
	name : string;

	version : number;

	length : number;

	frameRate : number;
}

export class MultiControllerChunk extends Chunk implements MultiControllerChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : MultiControllerChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const length = binaryReader.readFloat32();

		const frameRate = binaryReader.readFloat32();

		return {
			name,
			version,
			length,
			frameRate,
		};
	}

	name : string;

	version : number;

	length : number;

	frameRate : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & MultiControllerChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.MULTI_CONTROLLER,
			});

		this.name = options.name;

		this.version = options.version;

		this.length = options.length;

		this.frameRate = options.frameRate;
	}

	getNumberOfTracks() : number
	{
		let numberOfTracks = 0;

		for (const child of this.children)
		{
			if (child instanceof MultiControllerTracksChunk)
			{
				numberOfTracks = child.tracks.length;
			}
		}

		return numberOfTracks;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writeFloat32(this.length);

		binaryWriter.writeFloat32(this.frameRate);

		binaryWriter.writeUInt32(this.getNumberOfTracks());
	}
}