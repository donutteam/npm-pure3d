//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface HistoryChunkOptions
{
	lines : string[];
}

export class HistoryChunk extends Chunk
{
	static override parseData(options : ChunkParseDataOptions) : HistoryChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfLines = binaryReader.readUInt16();

		const lines : string[] = [];

		for (let i = 0; i < numberOfLines; i++)
		{
			lines.push(binaryReader.readPure3DString());
		}

		return {
			lines,
		};
	}

	lines : string[];

	constructor(options : ChunkOptions & HistoryChunkOptions)
	{
		super(options);

		this.lines = options.lines;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt16(this.lines.length);

		for (const line of this.lines)
		{
			binaryWriter.writePure3DString(line);
		}
	}
}