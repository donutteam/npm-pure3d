//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SpriteChunkOptions
{
	name : string;

	nativeX : number;

	nativeY : number;

	shader : string;

	imageWidth : number;

	imageHeight : number;

	blitBorder : number;
}

export class SpriteChunk extends Chunk implements SpriteChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SpriteChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const nativeX = binaryReader.readUInt32();

		const nativeY = binaryReader.readUInt32();

		const shader = binaryReader.readPure3DString();

		const imageWidth = binaryReader.readUInt32();

		const imageHeight = binaryReader.readUInt32();

		binaryReader.readUInt32(); // Image Count

		const blitBorder = binaryReader.readUInt32();

		return {
			name,
			nativeX,
			nativeY,
			shader,
			imageWidth,
			imageHeight,
			blitBorder,
		};
	}

	name : string;

	nativeX : number;

	nativeY : number;

	shader : string;

	imageWidth : number;

	imageHeight : number;

	blitBorder : number;

	constructor(options : Omit<ChunkOptions, "identifier"> & SpriteChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SPRITE,
			});

		this.name = options.name;

		this.nativeX = options.nativeX;

		this.nativeY = options.nativeY;

		this.shader = options.shader;

		this.imageWidth = options.imageWidth;

		this.imageHeight = options.imageHeight;

		this.blitBorder = options.blitBorder;
	}

	getNumberOfImages() : number
	{
		let numberOfImages = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.IMAGE)
			{
				numberOfImages += 1;
			}
		}

		return numberOfImages;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.nativeX);

		binaryWriter.writeUInt32(this.nativeY);

		binaryWriter.writePure3DString(this.shader);

		binaryWriter.writeUInt32(this.imageWidth);

		binaryWriter.writeUInt32(this.imageHeight);

		binaryWriter.writeUInt32(this.getNumberOfImages());

		binaryWriter.writeUInt32(this.blitBorder);
	}
}