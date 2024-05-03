//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface CompositeDrawableSkinChunkOptions
{
	name : string;

	isTranslucent : number;
}

export class CompositeDrawableSkinChunk extends Chunk implements CompositeDrawableSkinChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : CompositeDrawableSkinChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const isTranslucent = binaryReader.readUInt32();

		return {
			name,
			isTranslucent,
		};
	}

	name : string;

	isTranslucent : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & CompositeDrawableSkinChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COMPOSITE_DRAWABLE_SKIN,
			});

		this.name = options.name;

		this.isTranslucent = options.isTranslucent;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.isTranslucent);
	}
}