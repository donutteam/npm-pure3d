//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

import { Chunk } from "../classes/chunks/Chunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

import { defaultChunkRegistry } from "../instances/default-chunk-registry.js";

import * as ChunkLib from "./chunk.js";
import * as FileSignatureLib from "./file-signature.js";

//
// Functions
//

export interface ReadFileOptions
{
	arrayBuffer : ArrayBuffer;

	chunkRegistry? : ChunkRegistry | null;
}

export interface ReadFileResult
{
	chunks : Chunk[];

	rootChunk : Chunk;
}

export function readFile(options : ReadFileOptions) : ReadFileResult
{
	const binaryReader = new BinaryReader(options.arrayBuffer, true);

	const fileIdentifier = binaryReader.readUInt32();

	switch (fileIdentifier)
	{
		case FileSignatureLib.BIG_ENDIAN:
		{
			const rootChunk = ChunkLib.readChunk(
				{
					isLittleEndian: false,
					arrayBuffer: options.arrayBuffer,
					chunkRegistry: options.chunkRegistry ?? defaultChunkRegistry,
				});

			return {
				rootChunk: rootChunk,

				chunks: rootChunk.children,
			};
		}

		case FileSignatureLib.COMPRESSED:
		{
			throw new Error("Compressed P3D files are not supported.");
		}

		case FileSignatureLib.LITTLE_ENDIAN:
		{
			const rootChunk = ChunkLib.readChunk(
				{
					isLittleEndian: true,
					arrayBuffer: options.arrayBuffer,
					chunkRegistry: options.chunkRegistry ?? defaultChunkRegistry,
				});

			return {
				rootChunk: rootChunk,

				chunks: rootChunk.children,
			};
		}

		default:
		{
			throw new Error("Input file is not a P3D file.");
		}
	}
}