//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ShaderIntegerParameterChunkOptions
{
	parameter : string;

	value : number;
}

export class ShaderIntegerParameterChunk extends Chunk implements ShaderIntegerParameterChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderIntegerParameterChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const parameter = binaryReader.readPure3DFourCharacterCode();

		const value = binaryReader.readUInt32();

		return {
			parameter,
			value,
		};
	}

	parameter : string;

	value : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & ShaderIntegerParameterChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER_INTEGER_PARAMETER,
			});

		this.parameter = options.parameter;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DFourCharacterCode(this.parameter);

		binaryWriter.writeUInt32(this.value);
	}
}