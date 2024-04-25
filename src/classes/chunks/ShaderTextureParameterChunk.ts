//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ShaderTextureParameterChunkOptions
{
	parameter : string;

	value : string;
}

export class ShaderTextureParameterChunk extends Chunk implements ShaderTextureParameterChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderTextureParameterChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const parameter = binaryReader.readPure3DFourCharacterCode();

		const value = binaryReader.readPure3DString();

		return {
			parameter,
			value,
		};
	}

	parameter : string;

	value : string;

	constructor(options : Omit<ChunkOptions, "identifier"> & ShaderTextureParameterChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER_TEXTURE_PARAMETER,
			});

		this.parameter = options.parameter;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DFourCharacterCode(this.parameter);

		binaryWriter.writePure3DString(this.value);
	}
}