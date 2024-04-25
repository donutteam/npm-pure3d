//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ShaderFloatParameterChunkOptions
{
	parameter : string;

	value : number;
}

export class ShaderFloatParameterChunk extends Chunk implements ShaderFloatParameterChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderFloatParameterChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const parameter = binaryReader.readPure3DFourCharacterCode();

		const value = binaryReader.readFloat32();

		return {
			parameter,
			value,
		};
	}

	parameter : string;

	value : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & ShaderFloatParameterChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER_FLOAT_PARAMETER,
			});

		this.parameter = options.parameter;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DFourCharacterCode(this.parameter);

		binaryWriter.writeFloat32(this.value);
	}
}