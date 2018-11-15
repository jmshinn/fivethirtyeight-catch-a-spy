let pct = 100;
let combos = [];

// build all of the potential combinations of 3 traps at different probabilities of success, between 1-100
for (let i=1; i<=pct; i++) {
	for (let j=i+1; j<pct; j++) {
		if (j == i) continue;
		for (let k=j+1; k<=pct; k++) {
			if (k == i || k == j) continue;
			let combo = [i, j, k].sort(function (a, b) { return a - b; });
			combos.push(combo);
		}
	}
}

let winners = new Map;

// let's run our scenario 200 different times, to get a representative sample
for (var n=0; n<200; n++) {
	combos.forEach(function(combo) {
		let won;

		// let's see the result when we use only 5% of the available options, I don't know how many participants
   	 	// do these things, this probably vastly overestimates participation
    		let skip = Math.ceil(Math.random() * 20);
		if (skip > 1) return;

		combo.forEach(function(pct) {
			if (won != undefined) return;
			let result = Math.ceil(Math.random() * 100);
			if (result <= pct) won = pct;
		});
		if (won != undefined) {
			if (!winners.has(won)) winners.set(won, 0);
			winners.set(won, winners.get(won)+1);
		}
	});
}

let sorter = [];

winners.forEach(function(won, winner) {
	sorter.push({winner: winner, won: won});
});

sorter.sort(function(a, b) {
	return b.won - a.won;
});

console.log(sorter);
