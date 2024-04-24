//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ExportInfoChunkOptions
{
	name : string;
}

export class ExportInfoChunk extends Chunk implements ExportInfoChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ExportInfoChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		return {
			name,
		};
	}

	name : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & ExportInfoChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.EXPORT_INFO,
			});

		this.name = options.name;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);
	}
}