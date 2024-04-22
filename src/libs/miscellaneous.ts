//
// Functions
//

export function cleanP3DString(inputString : string) : string
{
	const nullIndex = inputString.indexOf("\0");

	if (nullIndex == -1)
	{
		return inputString;
	}

	return inputString.substring(0, nullIndex);
}