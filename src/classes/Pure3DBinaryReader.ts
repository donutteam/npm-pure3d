//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

import { Colour } from "./Colour.js";
import { Matrix } from "./Matrix.js";
import { Vector2 } from "./Vector2.js";
import { Vector3 } from "./Vector3.js";

//
// Class
//

export class Pure3DBinaryReader extends BinaryReader
{
	readPure3DColour() : Colour
	{
		const colorBytes = this.readBytes(4);

		if (!this.isLittleEndian)
		{
			colorBytes.reverse();
		}

		const blue = colorBytes[0]!;

		const green = colorBytes[1]!;

		const red = colorBytes[2]!;

		const alpha = colorBytes[3]!;

		return new Colour({ blue, green, red, alpha });
	}

	readPure3DFourCharacterCode() : string
	{
		let rawString = this.readString(4);

		if (!this.isLittleEndian)
		{
			rawString = rawString.split("").toReversed().join("");
		}

		return this.trimNull(rawString);
	}

	readPure3DMatrix() : Matrix
	{
		const matrix : number[] = [];

		for (let i = 0; i < 16; i++)
		{
			matrix.push(this.readFloat32());
		}

		return new Matrix(
			{
				m11: matrix[0]!,
				m12: matrix[1]!,
				m13: matrix[2]!,
				m14: matrix[3]!,
				m21: matrix[4]!,
				m22: matrix[5]!,
				m23: matrix[6]!,
				m24: matrix[7]!,
				m31: matrix[8]!,
				m32: matrix[9]!,
				m33: matrix[10]!,
				m34: matrix[11]!,
				m41: matrix[12]!,
				m42: matrix[13]!,
				m43: matrix[14]!,
				m44: matrix[15]!,
			});
	}

	readPure3DString() : string
	{
		const length = this.readUInt8();

		const rawString = this.readString(length);

		return this.trimNull(rawString);
	}

	readPure3DVector2() : Vector2
	{
		const x = this.readFloat32();

		const y = this.readFloat32();

		return new Vector2({ x, y });
	}

	readPure3DVector3() : Vector3
	{
		const x = this.readFloat32();

		const y = this.readFloat32();

		const z = this.readFloat32();

		return new Vector3({ x, y, z });
	}

	trimNull(inputString : string) : string
	{
		const nullIndex = inputString.indexOf("\0");

		if (nullIndex == -1)
		{
			return inputString;
		}

		return inputString.substring(0, nullIndex);
	}
}