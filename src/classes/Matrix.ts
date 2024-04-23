//
// Imports
//

import { BinaryReader, BinaryWriter } from "@donutteam/binary-rw";

//
// Class
//

export interface MatrixOptions
{
	m11 : number;

	m12 : number;

	m13 : number;

	m14 : number;

	m21 : number;

	m22 : number;

	m23 : number;

	m24 : number;

	m31 : number;

	m32 : number;

	m33 : number;

	m34 : number;

	m41 : number;

	m42 : number;

	m43 : number;

	m44 : number;
}

export class Matrix implements MatrixOptions
{
	static readBinary(binaryReader : BinaryReader) : Matrix
	{
		const matrix : number[] = [];

		for (let i = 0; i < 16; i++)
		{
			matrix.push(binaryReader.readFloat32());
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

	static writeBinary(binaryWriter : BinaryWriter, matrix : Matrix) : void
	{
		binaryWriter.writeFloat32(matrix.m11);

		binaryWriter.writeFloat32(matrix.m12);

		binaryWriter.writeFloat32(matrix.m13);

		binaryWriter.writeFloat32(matrix.m14);

		binaryWriter.writeFloat32(matrix.m21);

		binaryWriter.writeFloat32(matrix.m22);

		binaryWriter.writeFloat32(matrix.m23);

		binaryWriter.writeFloat32(matrix.m24);

		binaryWriter.writeFloat32(matrix.m31);

		binaryWriter.writeFloat32(matrix.m32);

		binaryWriter.writeFloat32(matrix.m33);

		binaryWriter.writeFloat32(matrix.m34);

		binaryWriter.writeFloat32(matrix.m41);

		binaryWriter.writeFloat32(matrix.m42);

		binaryWriter.writeFloat32(matrix.m43);

		binaryWriter.writeFloat32(matrix.m44);
	}

	m11 : number;

	m12 : number;

	m13 : number;

	m14 : number;

	m21 : number;

	m22 : number;

	m23 : number;

	m24 : number;

	m31 : number;

	m32 : number;

	m33 : number;

	m34 : number;

	m41 : number;

	m42 : number;

	m43 : number;

	m44 : number;

	constructor(options : MatrixOptions)
	{
		this.m11 = options.m11;

		this.m12 = options.m12;

		this.m13 = options.m13;

		this.m14 = options.m14;

		this.m21 = options.m21;

		this.m22 = options.m22;

		this.m23 = options.m23;

		this.m24 = options.m24;

		this.m31 = options.m31;

		this.m32 = options.m32;

		this.m33 = options.m33;

		this.m34 = options.m34;

		this.m41 = options.m41;

		this.m42 = options.m42;

		this.m43 = options.m43;

		this.m44 = options.m44;
	}
}