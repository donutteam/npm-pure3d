//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

//
// Class
//

export interface Vector3Options
{
	x : number;

	y : number;

	z : number;
}

export class Vector3 implements Vector3Options
{
	static readBinary(binaryReader : BinaryReader) : Vector3
	{
		const x = binaryReader.readFloat32();

		const y = binaryReader.readFloat32();

		const z = binaryReader.readFloat32();

		return new Vector3({ x, y, z });
	}

	static writeBinary(binaryWriter : BinaryWriter, vector3 : Vector3) : void
	{
		binaryWriter.writeFloat32(vector3.x);

		binaryWriter.writeFloat32(vector3.y);

		binaryWriter.writeFloat32(vector3.z);
	}

	x : number;

	y : number;

	z : number;

	constructor(options : Vector3Options)
	{
		this.x = options.x;

		this.y = options.y;

		this.z = options.z;
	}
}