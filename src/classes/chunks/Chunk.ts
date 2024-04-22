//
// Imports
//

import { BinaryWriter } from "@donutteam/binary-rw";

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
		return this.data?.byteLength ?? 0;
	}

	getEntireSize() : number
	{
		return 12 + this.getDataSize() + this.getChildrenSize();
	}

	write(binaryWriter : BinaryWriter)
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

	writeData(binaryWriter : BinaryWriter)
	{
		if (this.data)
		{
			binaryWriter.writeBytes(this.data);
		}
	}
}