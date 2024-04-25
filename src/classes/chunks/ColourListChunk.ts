//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Colour } from "../Colour.js";
import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ColourListChunkOptions
{
	colours : Colour[];
}

export class ColourListChunk extends Chunk implements ColourListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ColourListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfColours = binaryReader.readUInt32();

		const colours : Colour[] = [];

		for (let i = 0; i < numberOfColours; i++)
		{
			colours.push(binaryReader.readPure3DColour());
		}

		return {
			colours,
		};
	}

	colours : Colour[];

	constructor(options : Omit<ChunkOptions, "identifier"> & ColourListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.COLOUR_LIST,
			});

		this.colours = options.colours;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.colours.length);

		for (const colour of this.colours)
		{
			binaryWriter.writePure3DColour(colour);
		}
	}
}