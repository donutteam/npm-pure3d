//
// Imports
//

import { AnimationChunk } from "../classes/chunks/AnimationChunk.js";
import { AnimationGroupChunk } from "../classes/chunks/AnimationGroupChunk.js";
import { AnimationGroupListChunk } from "../classes/chunks/AnimationGroupListChunk.js";
import { AnimationSizeChunk } from "../classes/chunks/AnimationSizeChunk.js";
import { BoundingBoxChunk } from "../classes/chunks/BoundingBoxChunk.js";
import { BoundingSphereChunk } from "../classes/chunks/BoundingSphereChunk.js";
import { ChannelInterpolationModeChunk } from "../classes/chunks/ChannelInterpolationModeChunk.js";
import { Chunk } from "../classes/chunks/Chunk.js";
import { ColourListChunk } from "../classes/chunks/ColourListChunk.js";
import { EntityChannelChunk } from "../classes/chunks/EntityChannelChunk.js";
import { ExportInfoChunk } from "../classes/chunks/ExportInfoChunk.js";
import { ExportInfoNamedIntegerChunk } from "../classes/chunks/ExportInfoNamedIntegerChunk.js";
import { ExportInfoNamedStringChunk } from "../classes/chunks/ExportInfoNamedStringChunk.js";
import { Fence2Chunk } from "../classes/chunks/Fence2Chunk.js";
import { FenceChunk } from "../classes/chunks/FenceChunk.js";
import { HistoryChunk } from "../classes/chunks/HistoryChunk.js";
import { ImageChunk } from "../classes/chunks/ImageChunk.js";
import { ImageDataChunk } from "../classes/chunks/ImageDataChunk.js";
import { MatrixListChunk } from "../classes/chunks/MatrixListChunk.js";
import { NormalListChunk } from "../classes/chunks/NormalListChunk.js";
import { OldPrimitiveGroupChunk } from "../classes/chunks/OldPrimitiveGroupChunk.js";
import { PackedNormalListChunk } from "../classes/chunks/PackedNormalListChunk.js";
import { PositionListChunk } from "../classes/chunks/PositionListChunk.js";
import { ShaderChunk } from "../classes/chunks/ShaderChunk.js";
import { ShaderColourParameterChunk } from "../classes/chunks/ShaderColourParameterChunk.js";
import { ShaderFloatParameterChunk } from "../classes/chunks/ShaderFloatParameterChunk.js";
import { ShaderIntegerParameterChunk } from "../classes/chunks/ShaderIntegerParameterChunk.js";
import { ShaderTextureParameterChunk } from "../classes/chunks/ShaderTextureParameterChunk.js";
import { SkeletonChunk } from "../classes/chunks/SkeletonChunk.js";
import { SkeletonJointBonePreserveChunk } from "../classes/chunks/SkeletonJointBonePreserveChunk.js";
import { SkeletonJointChunk } from "../classes/chunks/SkeletonJointChunk.js";
import { SkeletonJointMirrorMapChunk } from "../classes/chunks/SkeletonJointMirrorMapChunk.js";
import { SkinChunk } from "../classes/chunks/SkinChunk.js";
import { SpriteChunk } from "../classes/chunks/SpriteChunk.js";
import { TextureChunk } from "../classes/chunks/TextureChunk.js";
import { UVListChunk } from "../classes/chunks/UVListChunk.js";
import { WeightListChunk } from "../classes/chunks/WeightListChunk.js";

import { ChunkRegistry } from "../classes/ChunkRegistry.js";

//
// Default Chunk Registry
//

export const defaultChunkRegistry = new ChunkRegistry();

defaultChunkRegistry.register(Chunk.identifiers.ANIMATION, AnimationChunk);

defaultChunkRegistry.register(Chunk.identifiers.ANIMATION_GROUP, AnimationGroupChunk);

defaultChunkRegistry.register(Chunk.identifiers.ANIMATION_GROUP_LIST, AnimationGroupListChunk);

defaultChunkRegistry.register(Chunk.identifiers.ANIMATION_SIZE, AnimationSizeChunk);

defaultChunkRegistry.register(Chunk.identifiers.BOUNDING_BOX, BoundingBoxChunk);

defaultChunkRegistry.register(Chunk.identifiers.BOUNDING_SPHERE, BoundingSphereChunk);

defaultChunkRegistry.register(Chunk.identifiers.CHANNEL_INTERPOLATION_MODE, ChannelInterpolationModeChunk);

defaultChunkRegistry.register(Chunk.identifiers.COLOUR_LIST, ColourListChunk);

defaultChunkRegistry.register(Chunk.identifiers.ENTITY_CHANNEL, EntityChannelChunk);

defaultChunkRegistry.register(Chunk.identifiers.EXPORT_INFO, ExportInfoChunk);

defaultChunkRegistry.register(Chunk.identifiers.EXPORT_INFO_NAMED_INTEGER, ExportInfoNamedIntegerChunk);

defaultChunkRegistry.register(Chunk.identifiers.EXPORT_INFO_NAMED_STRING, ExportInfoNamedStringChunk);

defaultChunkRegistry.register(Chunk.identifiers.FENCE, FenceChunk);

defaultChunkRegistry.register(Chunk.identifiers.FENCE_2, Fence2Chunk);

defaultChunkRegistry.register(Chunk.identifiers.HISTORY, HistoryChunk);

defaultChunkRegistry.register(Chunk.identifiers.IMAGE, ImageChunk);

defaultChunkRegistry.register(Chunk.identifiers.IMAGE_DATA, ImageDataChunk);

defaultChunkRegistry.register(Chunk.identifiers.MATRIX_LIST, MatrixListChunk);

defaultChunkRegistry.register(Chunk.identifiers.NORMAL_LIST, NormalListChunk);

defaultChunkRegistry.register(Chunk.identifiers.OLD_PRIMITIVE_GROUP, OldPrimitiveGroupChunk);

defaultChunkRegistry.register(Chunk.identifiers.PACKED_NORMAL_LIST, PackedNormalListChunk);

defaultChunkRegistry.register(Chunk.identifiers.POSITION_LIST, PositionListChunk);

defaultChunkRegistry.register(Chunk.identifiers.SHADER, ShaderChunk);

defaultChunkRegistry.register(Chunk.identifiers.SHADER_COLOUR_PARAMETER, ShaderColourParameterChunk);

defaultChunkRegistry.register(Chunk.identifiers.SHADER_FLOAT_PARAMETER, ShaderFloatParameterChunk);

defaultChunkRegistry.register(Chunk.identifiers.SHADER_INTEGER_PARAMETER, ShaderIntegerParameterChunk);

defaultChunkRegistry.register(Chunk.identifiers.SHADER_TEXTURE_PARAMETER, ShaderTextureParameterChunk);

defaultChunkRegistry.register(Chunk.identifiers.SKELETON, SkeletonChunk);

defaultChunkRegistry.register(Chunk.identifiers.SKELETON_JOINT, SkeletonJointChunk);

defaultChunkRegistry.register(Chunk.identifiers.SKELETON_JOINT_BONE_PRESERVE, SkeletonJointBonePreserveChunk);

defaultChunkRegistry.register(Chunk.identifiers.SKELETON_JOINT_MIRROR_MAP, SkeletonJointMirrorMapChunk);

defaultChunkRegistry.register(Chunk.identifiers.SKIN, SkinChunk);

defaultChunkRegistry.register(Chunk.identifiers.SPRITE, SpriteChunk);

defaultChunkRegistry.register(Chunk.identifiers.TEXTURE, TextureChunk);

defaultChunkRegistry.register(Chunk.identifiers.UV_LIST, UVListChunk);

defaultChunkRegistry.register(Chunk.identifiers.WEIGHT_LIST, WeightListChunk);