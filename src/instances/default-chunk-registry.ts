//
// Imports
//

import { TextureChunk } from "../classes/chunks/TextureChunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

import * as ChunkIdentifierLib from "../libs/chunk-identifier.js";

//
// Default Chunk Registry
//

export const defaultChunkRegistry = new ChunkRegistry();

defaultChunkRegistry.register(ChunkIdentifierLib.TEXTURE, TextureChunk);