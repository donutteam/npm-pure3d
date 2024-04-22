//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { cleanP3DString } from "../../libs/miscellaneous.js";

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
		const binaryReader = new BinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfLines = binaryReader.readUInt16();

		const lines : string[] = [];

		for (let i = 0; i < numberOfLines; i++)
		{
			const lineLength = binaryReader.readUInt8();

			const line = cleanP3DString(binaryReader.readString(lineLength));

			lines.push(line);
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

	override getDataSize() : number
	{
		let size = 2;

		for (const line of this.lines)
		{
			size += 1 + line.length;
		}

		return size;
	}

	override writeData(binaryWriter : BinaryWriter) : void
	{
		binaryWriter.writeUInt16(this.lines.length);

		for (const line of this.lines)
		{
			binaryWriter.writeUInt8(line.length);

			binaryWriter.writeString(line);
		}
	}
}