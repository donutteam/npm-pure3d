//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SkinChunkOptions
{
	name : string;

	version : number;

	skeletonName : string;
}

export class SkinChunk extends Chunk implements SkinChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SkinChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const version = binaryReader.readUInt32();

		const skeletonName = binaryReader.readPure3DString();

		return {
			name,
			version,
			skeletonName,
		};
	}

	name : string;

	version : number;

	skeletonName : string;

	constructor(options : ChunkOptions & SkinChunkOptions)
	{
		super(options);

		this.name = options.name;

		this.version = options.version;

		this.skeletonName = options.skeletonName;
	}

	getNumberOfPrimitiveGroups() : number
	{
		let numberOfPrimitiveGroups = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.OLD_PRIMITIVE_GROUP)
			{
				numberOfPrimitiveGroups += 1;
			}
		}

		return numberOfPrimitiveGroups;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.version);

		binaryWriter.writePure3DString(this.skeletonName);

		binaryWriter.writeUInt32(this.getNumberOfPrimitiveGroups());
	}
}