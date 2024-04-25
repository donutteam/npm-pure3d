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