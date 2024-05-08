//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface MultiControllerTrack
{
	name : string;

	startTime : number;

	endTime : number;

	scale : number;
}

export interface MultiControllerTracksChunkOptions
{
	tracks : MultiControllerTrack[];
}

export class MultiControllerTracksChunk extends Chunk implements MultiControllerTracksChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : MultiControllerTracksChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfTracks = binaryReader.readUInt32();

		const tracks : MultiControllerTrack[] = [];

		for (let i = 0; i < numberOfTracks; ++i)
		{
			const name = binaryReader.readPure3DString();

			const startTime = binaryReader.readFloat32();

			const endTime = binaryReader.readFloat32();

			const scale = binaryReader.readFloat32();

			tracks.push(
				{
					name,
					startTime,
					endTime,
					scale,
				});
		}

		return {
			tracks,
		};
	}

	tracks : MultiControllerTrack[];

	constructor(options : Omit<ChunkOptions, "identifier"> & MultiControllerTracksChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.MULTI_CONTROLLER_TRACKS,
			});

		this.tracks = options.tracks;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.tracks.length);

		for (const track of this.tracks)
		{
			binaryWriter.writePure3DString(track.name);

			binaryWriter.writeFloat32(track.startTime);

			binaryWriter.writeFloat32(track.endTime);

			binaryWriter.writeFloat32(track.scale);
		}
	}
}