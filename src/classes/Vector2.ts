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
	x : number;

	y : number;

	constructor(options : Vector2Options)
	{
		this.x = options.x;

		this.y = options.y;
	}
}