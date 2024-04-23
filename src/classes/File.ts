//
// Imports
//

import { Chunk } from "./chunks/Chunk.js";

import { ChunkRegistry } from "./ChunkRegistry.js";
import { Pure3DBinaryReader } from "./Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "./Pure3DBinaryWriter.js";

import { defaultChunkRegistry } from "../instances/default-chunk-registry.js";

import * as FileSignatures from "../data/file-signatures.js";


//
// Class
//

export interface FileReadOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry? : ChunkRegistry;
}

export interface FileReadChunkOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry? : ChunkRegistry;

	isLittleEndian : boolean;

	offset? : number;
}

export interface FileWriteOptions
{
	chunks : Chunk[];

	littleEndian? : boolean;
}

export class File
{
	static read(options : FileReadOptions) : Chunk
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, true);

		const fileIdentifier = binaryReader.readUInt32();

		switch (fileIdentifier)
		{
			case FileSignatures.BIG_ENDIAN:
			{
				return File.readChunk(
					{
						isLittleEndian: false,
						arrayBuffer: options.arrayBuffer,
						chunkRegistry: options.chunkRegistry ?? defaultChunkRegistry,
					});
			}

			case FileSignatures.COMPRESSED:
			{
				throw new Error("Compressed P3D files are not supported.");
			}

			case FileSignatures.LITTLE_ENDIAN:
			{
				return File.readChunk(
					{
						isLittleEndian: true,
						arrayBuffer: options.arrayBuffer,
						chunkRegistry: options.chunkRegistry ?? defaultChunkRegistry,
					});
			}

			default:
			{
				throw new Error("Input file is not a P3D file.");
			}
		}
	}

	static readChunk(options : FileReadChunkOptions) : Chunk
	{
		//
		// Get Offset
		//

		const offset = options.offset ?? 0;

		//
		// Create Binary Reader
		//

		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		binaryReader.seek(offset);

		//
		// Get Chunk Header Data
		//

		const identifier = binaryReader.readUInt32();

		const dataSize = binaryReader.readUInt32();

		const entireSize = binaryReader.readUInt32();

		//
		// Get Chunk Class
		//

		const chunkRegistry = options.chunkRegistry ?? defaultChunkRegistry;

		const chunkClass = chunkRegistry.getClass(identifier) ?? Chunk;

		//
		// Get Data
		//

		let dataOffset = offset + 12;

		let data : ArrayBuffer | null = null;

		if (dataSize > 12)
		{
			const extraDataSize = dataSize - 12;

			data = options.arrayBuffer.slice(dataOffset, dataOffset + extraDataSize);

			dataOffset += extraDataSize;
		}

		let parsedData : object = {};

		if (data)
		{
			parsedData = chunkClass.parseData(
				{
					isLittleEndian: options.isLittleEndian,
					arrayBuffer: data,
				});
		}

		//
		// Get Children
		//

		let children : Chunk[] = [];

		if (entireSize > dataSize)
		{
			const childrenDataSize = entireSize - dataSize;

			let offset = 0;

			const childrenArrayBuffer = options.arrayBuffer.slice(dataOffset, dataOffset + childrenDataSize);

			while (offset < childrenArrayBuffer.byteLength)
			{
				const chunk = File.readChunk(
					{
						arrayBuffer: childrenArrayBuffer,
						chunkRegistry,
						isLittleEndian: options.isLittleEndian,
						offset,
					});

				children.push(chunk);

				offset += chunk.entireSize;
			}
		}

		//
		// Return
		//

		return new chunkClass(
			{
				identifier,
				dataSize,
				entireSize,
				data,
				children,

				...parsedData,
			});
	}

	static write(options : FileWriteOptions) : ArrayBuffer
	{
		const binaryWriter = new Pure3DBinaryWriter(undefined, options.littleEndian ?? true);

		// Note: Even when writing a big-endian file, the file signature here should still be little-endian.
		//	It will be converted to big-endian when the file is written.
		binaryWriter.writeUInt32(FileSignatures.LITTLE_ENDIAN);

		binaryWriter.writeUInt32(12);

		const childrenSize = options.chunks.reduce((size, chunk) => size + chunk.getEntireSize(), 0);

		binaryWriter.writeUInt32(12 + childrenSize);

		for (const chunk of options.chunks)
		{
			chunk.write(binaryWriter);
		}

		return binaryWriter.getBuffer();
	}
}