//
// Imports
//

import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface ChunkParseDataOptions
{
	arrayBuffer : ArrayBuffer;

	isLittleEndian : boolean;
}

export interface ChunkOptions
{
	identifier : number;

	dataSize : number;

	entireSize : number;

	data : ArrayBuffer | null;

	children : Chunk[];
}

export class Chunk
{
	static parseData(_options : ChunkParseDataOptions) : object
	{
		return {};
	}

	identifier : number;

	dataSize : number;

	entireSize : number;

	data : ArrayBuffer | null;

	children : Chunk[];

	constructor(options : ChunkOptions)
	{
		this.identifier = options.identifier;

		this.dataSize = options.dataSize;

		this.entireSize = options.entireSize;

		this.data = options.data;

		this.children = options.children;
	}

	getChildrenSize() : number
	{
		return this.children.reduce((size, child) => size + child.getEntireSize(), 0);
	}

	getDataSize() : number
	{
		const binaryWriter = new Pure3DBinaryWriter();

		this.writeData(binaryWriter);

		return binaryWriter.getBuffer().byteLength;
	}

	getEntireSize() : number
	{
		return 12 + this.getDataSize() + this.getChildrenSize();
	}

	write(binaryWriter : Pure3DBinaryWriter)
	{
		binaryWriter.writeUInt32(this.identifier);

		const dataSize = 12 + this.getDataSize();

		binaryWriter.writeUInt32(dataSize);

		const entireSize = this.getEntireSize();

		binaryWriter.writeUInt32(entireSize);

		this.writeData(binaryWriter);

		for (const child of this.children)
		{
			child.write(binaryWriter);
		}
	}

	writeData(binaryWriter : Pure3DBinaryWriter)
	{
		if (this.data)
		{
			binaryWriter.writeBytes(this.data);
		}
	}
}