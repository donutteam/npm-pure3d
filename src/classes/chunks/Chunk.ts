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
	isLittleEndian : boolean;

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
}