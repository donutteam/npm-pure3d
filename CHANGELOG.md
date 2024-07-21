# Changelog
## 1.5.0

* Added an explicit return type to `Chunk.write`.
* Renamed `File.signatures.COMPRESSED` to `LITTLE_ENDIAN_COMPRESSED`.
* Added `File.signatures.BIG_ENDIAN_COMPRESSED`.
* Added `IntersectionChunk` class.
* Added `RoadChunk` class.
* Added `RoadDataSegmentChunk` class.
* Added `RoadSegmentChunk` class.
* Updated the `defaultChunkRegistry` instance with the new classes.
* Renamed `ChunkRegistry.chunkClass` to `chunkClasses`.
	* The only name is now marked as deprecated.
* Now exports `version` constant.

## 1.4.0

* Added `StaticEntityChunk` class.

## 1.3.2
Removing a test log.

## 1.3.1
Fixed a mistake in the `MultiControllerChunk` class where the name and version were written in the wrong order.

## 1.3.0

* Added `MeshChunk` class.
* Added `MultiControllerChunk` class.
* Added `MultiControllerTracksChunk` class.
* Added `OldBillboardQuadGroupChunk` class.
* Added `OldFrameControllerChunk` class.
* Added `ParticleSystem2Chunk` class.
* Added `ParticleSystemFactoryChunk` class.
* Updated the `defaultChunkRegistry` instance with the new classes.

## 1.2.0

* Added `MatrixListChunk` class.
* Added `PackedNormalListChunk` class.
* Added `UVListChunk` class.
* Added `WeightListChunk` class.
* Added `CompositeDrawableChunk` class.
* Added `CompositeDrawableEffectChunk` class.
* Added `CompositeDrawableEffectListChunk` class.
* Added `CompositeDrawablePropChunk` class.
* Added `CompositeDrawablePropListChunk` class.
* Added `CompositeDrawableSkinChunk` class.
* Added `CompositeDrawableSkinListChunk` class.
* Added `CompositeDrawableSortOrderChunk` class.
* Updated the `defaultChunkRegistry` instance with the new classes.

## 1.1.0

* Added `FenceChunk` class.
* Added `Fence2Chunk` class.
* Updated the `defaultChunkRegistry` instance with the new classes.

## 1.0.0
Initial release.