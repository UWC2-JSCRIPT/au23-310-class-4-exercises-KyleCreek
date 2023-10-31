/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  // Chicken is Cooked at 165 Degrees Farenheit
  // Beef - Rare: 125
  // Beef - Medium: 138
  // Beef - Well: 160
  // Chicken Use Case
  if (kind == 'chicken') {
    if (internalTemp < 140){
		return false;
	}
	else{
	return true;
	}
	
  };
  // Beef Use Case
  if (kind == 'beef'){
	  if (doneness == 'well' && internalTemp > 160){
	  return true;
	  }
	  if (doneness == 'medium' && internalTemp > 138){
		  return true;
	  }
	  if (doneness == 'rare' && internalTemp > 125){
	  return true;
	  }
	  else{
		  return false;
	  }
  };
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true
