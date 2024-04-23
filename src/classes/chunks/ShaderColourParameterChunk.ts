//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ShaderColourParameterChunkOptions
{
	parameter : string;

	red : number;

	green : number;

	blue : number;

	alpha : number;
}

export class ShaderColourParameterChunk extends Chunk implements ShaderColourParameterChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : ShaderColourParameterChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const parameter = binaryReader.readFourCharacterCode();

		const red = binaryReader.readUInt8();

		const green = binaryReader.readUInt8();

		const blue = binaryReader.readUInt8();

		const alpha = binaryReader.readUInt8();

		return {
			parameter,
			red,
			green,
			blue,
			alpha,
		};
	}

	parameter : string;

	red : number;

	green : number;

	blue : number;

	alpha : number;

	constructor(options : ChunkOptions & ShaderColourParameterChunkOptions)
	{
		super(options);

		this.parameter = options.parameter;

		this.red = options.red;

		this.green = options.green;

		this.blue = options.blue;

		this.alpha = options.alpha;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeFourCharacterCode(this.parameter);

		binaryWriter.writeUInt8(this.red);

		binaryWriter.writeUInt8(this.green);

		binaryWriter.writeUInt8(this.blue);

		binaryWriter.writeUInt8(this.alpha);
	}
}