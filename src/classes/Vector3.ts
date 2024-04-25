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