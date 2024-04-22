//
// Class
//

export interface ChunkOptions
{
	isLittleEndian : boolean;

	chunkType : number;

	dataSize : number;

	entireSize : number;

	data : ArrayBuffer | null;

	children : Chunk[];
}

export class Chunk
{
	isLittleEndian : boolean;

	type : number;

	dataSize : number;

	entireSize : number;

	data : ArrayBuffer | null;

	children : Chunk[];

	constructor(options : ChunkOptions)
	{
		this.isLittleEndian = options.isLittleEndian;

		this.type = options.chunkType;

		this.dataSize = options.dataSize;

		this.entireSize = options.entireSize;

		this.data = options.data;

		this.children = options.children;
	}
}