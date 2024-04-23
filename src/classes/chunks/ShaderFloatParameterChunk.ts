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

		const parameter = binaryReader.readFourCharacterCode();

		const value = binaryReader.readFloat();

		return {
			parameter,
			value,
		};
	}

	parameter : string;

	value : number;

	constructor(options : ChunkOptions & ShaderFloatParameterChunkOptions)
	{
		super(options);

		this.parameter = options.parameter;

		this.value = options.value;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeFourCharacterCode(this.parameter);

		binaryWriter.writeFloat32(this.value);
	}
}