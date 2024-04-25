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

export interface ShaderColourParameterChunkOptions
{
	parameter : string;

	colour : Colour;
}

export class ShaderColourParameterChunk extends Chunk implements ShaderColourParameterChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderColourParameterChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const parameter = binaryReader.readFourCharacterCode();

		const colour = binaryReader.readColour();

		return {
			parameter,
			colour,
		};
	}

	parameter : string;

	colour : Colour;

	constructor(options : Omit<ChunkOptions, "identifier"> & ShaderColourParameterChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER_COLOUR_PARAMETER,
			});

		this.parameter = options.parameter;

		this.colour = options.colour;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeFourCharacterCode(this.parameter);

		binaryWriter.writeColour(this.colour);
	}
}