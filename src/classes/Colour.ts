//
// Class
//

export interface ColourOptions
{
	blue : number;

	green : number;

	red : number;

	alpha : number;
}

export class Colour
{
	blue : number;

	green : number;

	red : number;

	alpha : number;

	constructor(options : ColourOptions)
	{
		this.blue = options.blue;

		this.green = options.green;

		this.red = options.red;

		this.alpha = options.alpha;
	}
}