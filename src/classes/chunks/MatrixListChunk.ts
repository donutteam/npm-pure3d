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

export interface MatrixListChunkOptions
{
	matrices : Colour[]; // yes, this is supposed to be a list of colours and NOT matrices
}

export class MatrixListChunk extends Chunk implements MatrixListChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : MatrixListChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const numberOfMatrices = binaryReader.readUInt32();

		const matrices : Colour[] = [];

		for (let i = 0; i < numberOfMatrices; i++)
		{
			matrices.push(binaryReader.readPure3DColour());
		}

		return {
			matrices,
		};
	}

	matrices : Colour[];

	constructor(options : Omit<ChunkOptions, "identifier"> & MatrixListChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.MATRIX_LIST,
			});

		this.matrices = options.matrices;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.matrices.length);

		for (const matrix of this.matrices)
		{
			binaryWriter.writePure3DColour(matrix);
		}
	}
}