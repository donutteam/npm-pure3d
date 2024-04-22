//
// Imports
//

import { Chunk } from "../classes/chunks/Chunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";
import { BinaryReader } from "../classes/BinaryReader.js";

//
// Functions
//

export interface ReadChunkOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry : ChunkRegistry;

	isLittleEndian : boolean;

	offset? : number;
}

export interface ReadChunkResult
{
	chunk : Chunk;
}

export function readChunk(options : ReadChunkOptions) : ReadChunkResult
{
	const offset = options.offset ?? 0;

	const binaryReader = new BinaryReader(
		{
			arrayBuffer: options.arrayBuffer,
			isLittleEndian: options.isLittleEndian,
			offset,
		});

	let chunkType = binaryReader.readUInt32();

	let dataSize = binaryReader.readUInt32();

	let entireSize = binaryReader.readUInt32();

	let dataOffset = offset + 12;

	let data : ArrayBuffer | null = null;

	if (dataSize > 12)
	{
		const extraDataSize = dataSize - 12;

		data = options.arrayBuffer.slice(dataOffset, dataOffset + extraDataSize);

		dataOffset += extraDataSize;
	}

	let children : Chunk[] = [];

	if (entireSize > dataSize)
	{
		const childrenDataSize = entireSize - dataSize;

		const { chunks } = readChunks(
			{
				arrayBuffer: options.arrayBuffer.slice(dataOffset, dataOffset + childrenDataSize),
				chunkRegistry: options.chunkRegistry,
				isLittleEndian: options.isLittleEndian,
			});

		children = chunks;
	}

	const chunkClass = options.chunkRegistry.getClass(chunkType);

	const chunk = new chunkClass(
		{
			isLittleEndian: options.isLittleEndian,
			chunkType,
			dataSize,
			entireSize,
			data,
			children,
		});

	return {
		chunk,
	};
}

export interface ReadChunksOptions
{
	buffer : Buffer;

	chunkRegistry : ChunkRegistry;

	isLittleEndian : boolean;
}

export interface ReadChunksResult
{
	chunks : Chunk[],
}

export function readChunks(options : ReadChunkOptions) : ReadChunksResult
{
	const chunks : Chunk[] = [];

	let offset = 0;

	while (offset < options.arrayBuffer.byteLength)
	{
		const { chunk } = readChunk(
			{
				arrayBuffer: options.arrayBuffer,
				chunkRegistry: options.chunkRegistry,
				isLittleEndian: options.isLittleEndian,
				offset,
			});

		chunks.push(chunk);

		offset += chunk.entireSize;
	}

	return {
		chunks,
	};
}