//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ExportInfoNamedIntegerOptions
{
	name : string;

	value : number;
}

export class ExportInfoNamedIntegerChunk extends Chunk implements ExportInfoNamedIntegerOptions
{
	static override parseData(options : ChunkParseDataOptions) : ExportInfoNamedIntegerOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const value = binaryReader.readUInt32();

		return {
			name,
			value,
		};
	}

	name : string;

	value : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & ExportInfoNamedIntegerOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.EXPORT_INFO_NAMED_INTEGER,
			});

		this.name = options.name;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.value);
	}
}