//
// Imports
//

import { AnimationChunk } from "../classes/chunks/AnimationChunk.js";
import { AnimationGroupChunk } from "../classes/chunks/AnimationGroupChunk.js";
import { AnimationGroupListChunk } from "../classes/chunks/AnimationGroupListChunk.js";
import { AnimationSizeChunk } from "../classes/chunks/AnimationSizeChunk.js";
import { ChannelInterpolationModeChunk } from "../classes/chunks/ChannelInterpolationModeChunk.js";
import { EntityChannelChunk } from "../classes/chunks/EntityChannelChunk.js";
import { HistoryChunk } from "../classes/chunks/HistoryChunk.js";
import { ImageChunk } from "../classes/chunks/ImageChunk.js";
import { ImageDataChunk } from "../classes/chunks/ImageDataChunk.js";
import { ShaderChunk } from "../classes/chunks/ShaderChunk.js";
import { ShaderColourParameterChunk } from "../classes/chunks/ShaderColourParameterChunk.js";
import { ShaderFloatParameterChunk } from "../classes/chunks/ShaderFloatParameterChunk.js";
import { ShaderIntegerParameterChunk } from "../classes/chunks/ShaderIntegerParameterChunk.js";
import { ShaderTextureParameterChunk } from "../classes/chunks/ShaderTextureParameterChunk.js";
import { TextureChunk } from "../classes/chunks/TextureChunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

import * as ChunkIdentifiers from "../data/chunk-identifiers.js";

//
// Default Chunk Registry
//

export const defaultChunkRegistry = new ChunkRegistry();

defaultChunkRegistry.register(ChunkIdentifiers.ANIMATION, AnimationChunk);

defaultChunkRegistry.register(ChunkIdentifiers.ANIMATION_GROUP, AnimationGroupChunk);

defaultChunkRegistry.register(ChunkIdentifiers.ANIMATION_GROUP_LIST, AnimationGroupListChunk);

defaultChunkRegistry.register(ChunkIdentifiers.ANIMATION_SIZE, AnimationSizeChunk);

defaultChunkRegistry.register(ChunkIdentifiers.CHANNEL_INTERPOLATION_MODE, ChannelInterpolationModeChunk);

defaultChunkRegistry.register(ChunkIdentifiers.ENTITY_CHANNEL, EntityChannelChunk);

defaultChunkRegistry.register(ChunkIdentifiers.HISTORY, HistoryChunk);

defaultChunkRegistry.register(ChunkIdentifiers.IMAGE, ImageChunk);

defaultChunkRegistry.register(ChunkIdentifiers.IMAGE_DATA, ImageDataChunk);

defaultChunkRegistry.register(ChunkIdentifiers.SHADER, ShaderChunk);

defaultChunkRegistry.register(ChunkIdentifiers.SHADER_COLOUR_PARAMETER, ShaderColourParameterChunk);

defaultChunkRegistry.register(ChunkIdentifiers.SHADER_FLOAT_PARAMETER, ShaderFloatParameterChunk);

defaultChunkRegistry.register(ChunkIdentifiers.SHADER_INTEGER_PARAMETER, ShaderIntegerParameterChunk);

defaultChunkRegistry.register(ChunkIdentifiers.SHADER_TEXTURE_PARAMETER, ShaderTextureParameterChunk);

defaultChunkRegistry.register(ChunkIdentifiers.TEXTURE, TextureChunk);