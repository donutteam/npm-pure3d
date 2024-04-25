//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

//
// Class
//

export interface Vector2Options
{
	x : number;

	y : number;
}

export class Vector2 implements Vector2Options
{
	static readBinary(binaryReader : BinaryReader) : Vector2
	{
		const x = binaryReader.readFloat32();

		const y = binaryReader.readFloat32();

		return new Vector2({ x, y });
	}

	static writeBinary(binaryWriter : BinaryWriter, vector3 : Vector2) : void
	{
		binaryWriter.writeFloat32(vector3.x);

		binaryWriter.writeFloat32(vector3.y);
	}

	x : number;

	y : number;

	constructor(options : Vector2Options)
	{
		this.x = options.x;

		this.y = options.y;
	}
}