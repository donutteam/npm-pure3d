//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface OldPrimitiveGroupChunkOptions
{
	version : number;

	shaderName : string;

	primitiveType : number;

	numberOfVertices : number;

	numberOfIndices : number;

	numberOfMatrices : number;
}

export class OldPrimitiveGroupChunk extends Chunk implements OldPrimitiveGroupChunkOptions
{
	static primitiveTypes =
		{
			TRIANGLE_LIST: 0,
			TRIANGLE_STRIP: 1,
			LINE_LIST: 2,
			LINE_STRIP: 3,
		};

	static vertexTypes =
		{
			UVS: 1,
			UVS_2: 2,
			UVS_3: 3,
			UVS_4: 4,
			UVS_5: 5,
			UVS_6: 6,
			UVS_7: 7,
			UVS_8: 8,
			NORMALS: 1 << 4,
			COLOURS: 1 << 5,
			SPECULAR: 1 << 6,
			MATRICES: 1 << 7,
			WEIGHTS: 1 << 8,
			SIZE: 1 << 9,
			W: 1 << 10,
			BI_NORMAL: 1 << 11,
			TANGENT: 1 << 12,
			POSITION: 1 << 13,
			COLOUR_2: 1 << 14,
			COLOUR_COUNT_1: 1 << 15,
			COLOUR_COUNT_2: 2 << 15,
			COLOUR_COUNT_3: 3 << 15,
			COLOUR_COUNT_4: 4 << 15,
			COLOUR_COUNT_5: 5 << 15,
			COLOUR_COUNT_6: 6 << 15,
			COLOUR_COUNT_7: 7 << 15,
			COLOUR_MASK: 7 << 15,
			COLOUR_MASK_OFFSET: 15,
		};

	static vertexTypeMap =
		{
			[Chunk.identifiers.PACKED_NORMAL_LIST]: OldPrimitiveGroupChunk.vertexTypes.NORMALS,
			[Chunk.identifiers.NORMAL_LIST]: OldPrimitiveGroupChunk.vertexTypes.NORMALS,
			[Chunk.identifiers.COLOUR_LIST]: OldPrimitiveGroupChunk.vertexTypes.COLOURS,
			[Chunk.identifiers.MATRIX_LIST]: OldPrimitiveGroupChunk.vertexTypes.MATRICES,
			[Chunk.identifiers.MATRIX_PALETTE]: OldPrimitiveGroupChunk.vertexTypes.MATRICES,
			[Chunk.identifiers.WEIGHT_LIST]: OldPrimitiveGroupChunk.vertexTypes.WEIGHTS,
			[Chunk.identifiers.POSITION_LIST]: OldPrimitiveGroupChunk.vertexTypes.POSITION,
		};

	static uvTypeMap =
		[
			OldPrimitiveGroupChunk.vertexTypes.UVS,
			OldPrimitiveGroupChunk.vertexTypes.UVS_2,
			OldPrimitiveGroupChunk.vertexTypes.UVS_3,
			OldPrimitiveGroupChunk.vertexTypes.UVS_4,
			OldPrimitiveGroupChunk.vertexTypes.UVS_5,
			OldPrimitiveGroupChunk.vertexTypes.UVS_6,
			OldPrimitiveGroupChunk.vertexTypes.UVS_7,
			OldPrimitiveGroupChunk.vertexTypes.UVS_8,
		];

	static override parseData(options : ChunkParseDataOptions) : OldPrimitiveGroupChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const shaderName = binaryReader.readPure3DString();

		const primitiveType = binaryReader.readUInt32();

		// Note: This is the Vertex Type, this is not stored
		//	because it is determined when writing the chunk.
		binaryReader.readUInt32();

		const numberOfVertices = binaryReader.readUInt32();

		const numberOfIndices = binaryReader.readUInt32();

		const numberOfMatrices = binaryReader.readUInt32();

		return {
			version,
			shaderName,
			primitiveType,
			numberOfVertices,
			numberOfIndices,
			numberOfMatrices,
		};
	}

	version : number;

	shaderName : string;

	primitiveType : number;

	numberOfVertices : number;

	numberOfIndices : number;

	numberOfMatrices : number;

	constructor(options : ChunkOptions & OldPrimitiveGroupChunkOptions)
	{
		super(options);

		this.version = options.version;

		this.shaderName = options.shaderName;

		this.primitiveType = options.primitiveType;

		this.numberOfVertices = options.numberOfVertices;

		this.numberOfIndices = options.numberOfIndices;

		this.numberOfMatrices = options.numberOfMatrices;
	}

	getVertexType() : number
	{
		let vertexType = 0;

		let uvListCount = 0;

		for (const chunk of this.children)
		{
			if (chunk.identifier == Chunk.identifiers.UV_LIST)
			{
				uvListCount += 1;
			}
			else
			{
				let chunkVertexType = OldPrimitiveGroupChunk.vertexTypeMap[chunk.identifier];

				if (chunkVertexType != null)
				{
					vertexType |= chunkVertexType;
				}
			}
		}

		if (uvListCount > 0)
		{
			if (uvListCount > 8)
			{
				throw new Error("Old Primitive Groups can only have a maximum of 8 UV Lists.");
			}

			vertexType |= OldPrimitiveGroupChunk.uvTypeMap[uvListCount - 1]!;
		}

		return vertexType;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.shaderName);

		binaryWriter.writeUInt32(this.primitiveType);

		binaryWriter.writeUInt32(this.getVertexType());

		binaryWriter.writeUInt32(this.numberOfVertices);

		binaryWriter.writeUInt32(this.numberOfIndices);

		binaryWriter.writeUInt32(this.numberOfMatrices);
	}
}