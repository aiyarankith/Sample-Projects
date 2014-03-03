function fetchData(callback,number){
	var primes = [];

	for (var counter = 0; counter <= number; counter++)
	{
		/* Loop through values from 2 to 1 before the counter. */
		for (var i = 2; i <= counter-1; i++) {
			if (counter%i === 0) break;
	    }
		
		if(i === counter){
			primes.push(counter);	
		}
		
	}
	callback(primes);
	var flag;
	for (var e=2; e<=number; e++)
	{
		if (number%e===0)
			flag = 0;
		else{
			flag =1;
		}
	}
	if (flag===1) console.log(number+" is Prime");
	else console.log(number+" is not Prime");
}

exports.fetchData = fetchData;
