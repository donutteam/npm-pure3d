//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface OldBillboardQuadGroupChunkOptions
{
	version : number;

	name : string;

	shader : string;

	zTest : number;

	zWrite : number;

	fog : number;
}

export class OldBillboardQuadGroupChunk extends Chunk implements OldBillboardQuadGroupChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : OldBillboardQuadGroupChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const version = binaryReader.readUInt32();

		const name = binaryReader.readPure3DString();

		const shader = binaryReader.readPure3DString();

		const zTest = binaryReader.readUInt32();

		const zWrite = binaryReader.readUInt32();

		const fog = binaryReader.readUInt32();

		return {
			version,
			name,
			shader,
			zTest,
			zWrite,
			fog,
		};
	}

	version : number;

	name : string;

	shader : string;

	zTest : number;

	zWrite : number;

	fog : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & OldBillboardQuadGroupChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.OLD_BILLBOARD_QUAD_GROUP,
			});

		this.version = options.version;

		this.name = options.name;

		this.shader = options.shader;

		this.zTest = options.zTest;

		this.zWrite = options.zWrite;

		this.fog = options.fog;
	}

	getNumberOfQuads() : number
	{
		let numberOfQuads = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.OLD_BILLBOARD_QUAD)
			{
				numberOfQuads += 1;
			}
		}

		return numberOfQuads;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.name);

		binaryWriter.writePure3DString(this.shader);

		binaryWriter.writeUInt32(this.zTest);

		binaryWriter.writeUInt32(this.zWrite);

		binaryWriter.writeUInt32(this.fog);

		binaryWriter.writeUInt32(this.getNumberOfQuads());
	}
}