//
// Imports
//

import { HistoryChunk } from "../classes/chunks/HistoryChunk.js";
import { ImageChunk } from "../classes/chunks/ImageChunk.js";
import { TextureChunk } from "../classes/chunks/TextureChunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

import * as ChunkIdentifiers from "../data/chunk-identifiers.js";

//
// Default Chunk Registry
//

export const defaultChunkRegistry = new ChunkRegistry();

defaultChunkRegistry.register(ChunkIdentifiers.HISTORY, HistoryChunk);

defaultChunkRegistry.register(ChunkIdentifiers.IMAGE, ImageChunk);

defaultChunkRegistry.register(ChunkIdentifiers.TEXTURE, TextureChunk);