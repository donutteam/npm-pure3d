//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Matrix } from "../Matrix.js";
import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export interface SkeletonJointChunkOptions
{
	name : string;

	parent : number;

	dof : number;

	freeAxis : number;

	primaryAxis : number;

	secondaryAxis : number;

	twistAxis : number;

	restPose : Matrix;
}

export class SkeletonJointChunk extends Chunk implements SkeletonJointChunkOptions
{
	static override parseData(options : ChunkParseDataOptions) : SkeletonJointChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const parent = binaryReader.readUInt32();

		const dof = binaryReader.readInt32();

		const freeAxis = binaryReader.readInt32();

		const primaryAxis = binaryReader.readInt32();

		const secondaryAxis = binaryReader.readInt32();

		const twistAxis = binaryReader.readInt32();

		const matrix = Matrix.readBinary(binaryReader);

		return {
			name,
			parent,
			dof,
			freeAxis,
			primaryAxis,
			secondaryAxis,
			twistAxis,
			restPose: matrix,
		};
	}

	name : string;

	parent : number;

	dof : number;

	freeAxis : number;

	primaryAxis : number;

	secondaryAxis : number;

	twistAxis : number;

	restPose : Matrix;

	constructor(options : Omit<ChunkOptions, "identifier"> & SkeletonJointChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SKELETON_JOINT,
			});

		this.name = options.name;

		this.parent = options.parent;

		this.dof = options.dof;

		this.freeAxis = options.freeAxis;

		this.primaryAxis = options.primaryAxis;

		this.secondaryAxis = options.secondaryAxis;

		this.twistAxis = options.twistAxis;

		this.restPose = options.restPose;
	}

	override writeData(binaryWriter : Pure3DBinaryWriter) : void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.parent);

		binaryWriter.writeInt32(this.dof);

		binaryWriter.writeInt32(this.freeAxis);

		binaryWriter.writeInt32(this.primaryAxis);

		binaryWriter.writeInt32(this.secondaryAxis);

		binaryWriter.writeInt32(this.twistAxis);

		Matrix.writeBinary(binaryWriter, this.restPose);
	}
}