//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ExportInfoChunkNamedStringOptions
{
	name : string;

	value : string;
}

export class ExportInfoNamedStringChunk extends Chunk implements ExportInfoChunkNamedStringOptions
{
	static override parseData(options : ChunkParseDataOptions) : ExportInfoChunkNamedStringOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const value = binaryReader.readPure3DString();

		return {
			name,
			value,
		};
	}

	name : string;

	value : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & ExportInfoChunkNamedStringOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.EXPORT_INFO_NAMED_STRING,
			});

		this.name = options.name;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DString(this.value);
	}
}