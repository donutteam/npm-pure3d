//
// Imports
//

import { ImageChunk } from "../classes/chunks/ImageChunk.js";
import { TextureChunk } from "../classes/chunks/TextureChunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

import * as ChunkIdentifierLib from "../data/chunk-identifiers.js";

//
// Default Chunk Registry
//

export const defaultChunkRegistry = new ChunkRegistry();

defaultChunkRegistry.register(ChunkIdentifierLib.IMAGE, ImageChunk);

defaultChunkRegistry.register(ChunkIdentifierLib.TEXTURE, TextureChunk);