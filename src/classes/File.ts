//
// Imports
//

import { Chunk } from "./chunks/Chunk.js";
import { ExportInfoChunk } from "./chunks/ExportInfoChunk.js";
import { ExportInfoNamedIntegerChunk } from "./chunks/ExportInfoNamedIntegerChunk.js";
import { ExportInfoNamedStringChunk } from "./chunks/ExportInfoNamedStringChunk.js";
import { RootChunk } from "./chunks/RootChunk.js";

import { ChunkRegistry } from "./ChunkRegistry.js";
import { Pure3DBinaryReader } from "./Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "./Pure3DBinaryWriter.js";

import { defaultChunkRegistry } from "../instances/default-chunk-registry.js";

import { version } from "../version.js";

//
// Class
//

export interface FileFromArrayBufferOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry? : ChunkRegistry;
}

export type FileToArrayBufferOptions = { addExportInfo? : boolean } & (FileToArrayBufferOptionsUsingChunks | FileToArrayBufferOptionsUsingRootChunk);

export interface FileToArrayBufferOptionsUsingChunks
{
	chunks : Chunk[];

	littleEndian? : boolean;
}

export interface FileToArrayBufferOptionsUsingRootChunk
{
	rootChunk : RootChunk;
}

interface FileReadChunkOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry? : ChunkRegistry;

	isLittleEndian : boolean;

	offset? : number;
}

interface FileReadChunkChildrenOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry : ChunkRegistry;

	isLittleEndian : boolean;
}

export class File
{
	static signatures =
		{
			LITTLE_ENDIAN: 0xFF443350, // P3Dÿ

			BIG_ENDIAN: 0x503344FF, // ÿD3P

			COMPRESSED: 0x5A443350, // P3DZ
		};

	static fromArrayBuffer(options : FileFromArrayBufferOptions) : RootChunk
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, true);

		const fileIdentifier = binaryReader.readUInt32();

		switch (fileIdentifier)
		{
			case File.signatures.LITTLE_ENDIAN:
			{
				break;
			}

			case File.signatures.BIG_ENDIAN:
			{
				binaryReader.isLittleEndian = false;

				break;
			}

			case File.signatures.COMPRESSED:
			{
				throw new Error("Input buffer is a compressed Pure3D file. These are not currently supported.");
			}

			default:
			{
				throw new Error("Input buffer is not a P3D file.");
			}
		}

		return new RootChunk(
			{
				identifier: fileIdentifier,

				// Note: If the consumer is calling this method, it's likely that
				//	the file has been loaded from disk, so it's not a new file.
				isNewFile: false,

				children: File.#readChunkChildren(
					{
						arrayBuffer: options.arrayBuffer.slice(12),
						chunkRegistry: options.chunkRegistry ?? defaultChunkRegistry,
						isLittleEndian: binaryReader.isLittleEndian,
					}),
			});
	}

	static toArrayBuffer(options : FileToArrayBufferOptions) : ArrayBuffer
	{
		//
		// Get Chunks
		//

		let chunks : Chunk[];

		if ("chunks" in options)
		{
			chunks = [ ...options.chunks ];
		}
		else
		{
			chunks = [ ...options.rootChunk.children ];
		}

		//
		// Add Export Info Chunk (if requested)
		//

		const addExportInfo = options.addExportInfo ?? true;

		if (addExportInfo)
		{
			chunks.unshift(this.#generateExportInfo());
		}

		//
		// Create Binary Writer
		//

		let isLittleEndian : boolean;

		if ("chunks" in options)
		{
			isLittleEndian = options.littleEndian ?? true;
		}
		else
		{
			isLittleEndian = options.rootChunk.identifier == File.signatures.LITTLE_ENDIAN;
		}

		const binaryWriter = new Pure3DBinaryWriter(undefined, isLittleEndian);

		//
		// Write File
		//

		// Note: Even when writing a big-endian file, the file signature here should still be little-endian.
		//	It will be converted to big-endian when the file is written.
		binaryWriter.writeUInt32(File.signatures.LITTLE_ENDIAN);

		binaryWriter.writeUInt32(12);

		const childrenSize = chunks.reduce((size, chunk) => size + chunk.getEntireSize(), 0);

		binaryWriter.writeUInt32(12 + childrenSize);

		for (const chunk of chunks)
		{
			chunk.write(binaryWriter);
		}

		//
		// Return Buffer
		//

		return binaryWriter.getBuffer();
	}

	static #generateExportInfo() : ExportInfoChunk
	{
		return new ExportInfoChunk(
			{
				name: "Exported From TypeScript Pure3D Library",
				children:
					[
						new ExportInfoNamedStringChunk(
							{
								name: "Version",
								value: version,
							}),

						new ExportInfoNamedStringChunk(
							{
								name: "Date",
								value: new Date().toLocaleString(),
							}),

						new ExportInfoNamedIntegerChunk(
							{
								name: "Timestamp",
								value: Math.round(Date.now() / 1000),
							}),
					],
			});
	}

	static #readChunk(options : FileReadChunkOptions) : Chunk
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

		const chunkClass = chunkRegistry.getClass(identifier);

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

			const childrenArrayBuffer = options.arrayBuffer.slice(dataOffset, dataOffset + childrenDataSize);

			children = File.#readChunkChildren(
				{
					arrayBuffer: childrenArrayBuffer,
					chunkRegistry,
					isLittleEndian: options.isLittleEndian,
				});
		}

		//
		// Return
		//

		return new chunkClass(
			{
				identifier,
				children,

				...parsedData,
			});
	}

	static #readChunkChildren(options : FileReadChunkChildrenOptions) : Chunk[]
	{
		const children : Chunk[] = [];

		let offset = 0;

		while (offset < options.arrayBuffer.byteLength)
		{
			const chunk = File.#readChunk(
				{
					arrayBuffer: options.arrayBuffer,
					chunkRegistry: options.chunkRegistry,
					isLittleEndian: options.isLittleEndian,
					offset,
				});

			children.push(chunk);

			offset += chunk.getEntireSize();
		}

		return children;
	}
}