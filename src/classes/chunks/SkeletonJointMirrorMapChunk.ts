//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SkeletonJointMirrorMapChunkOptions
{
	mappedJointIndex : number;

	xAxisMap : number;

	yAxisMap : number;

	zAxisMap : number;
}

export class SkeletonJointMirrorMapChunk extends Chunk implements SkeletonJointMirrorMapChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SkeletonJointMirrorMapChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const mappedJointIndex = binaryReader.readUInt32();

		const xAxisMap = binaryReader.readFloat32();

		const yAxisMap = binaryReader.readFloat32();

		const zAxisMap = binaryReader.readFloat32();

		return {
			mappedJointIndex,
			xAxisMap,
			yAxisMap,
			zAxisMap,
		};
	}

	mappedJointIndex : number;

	xAxisMap : number;

	yAxisMap : number;

	zAxisMap : number;

	constructor(options : ChunkOptions & SkeletonJointMirrorMapChunkOptions)
	{
		super(options);

		this.mappedJointIndex = options.mappedJointIndex;

		this.xAxisMap = options.xAxisMap;

		this.yAxisMap = options.yAxisMap;

		this.zAxisMap = options.zAxisMap;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.mappedJointIndex);

		binaryWriter.writeFloat32(this.xAxisMap);

		binaryWriter.writeFloat32(this.yAxisMap);

		binaryWriter.writeFloat32(this.zAxisMap);
	}
}