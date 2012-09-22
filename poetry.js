var fs = require("fs");

var input = fs.readFileSync("poetry.in", "utf8");
var output = "";

var input_lines = input.split("\n");

var number_of_verses = parseInt(input_lines[0], 10);

function get_last_syllable(line) {
  var words = line.split(" ");

  var last_syllable_match = words[words.length - 1].match(/[aeiou][^aeiou]*?$/);

  if(last_syllable_match)
    var last_syllable = last_syllable_match[0];
  else
    var last_syllable = words[words.length - 1];

  return last_syllable;
}

var last_syllables = [];

for(var i = 1; i < input_lines.length - 1; i++)
  last_syllables[i - 1] = get_last_syllable(input_lines[i]);

for(var i = 0; i < number_of_verses; i++) {
  var offset = i * 4;

  if(last_syllables[0 + offset] === last_syllables[1 + offset] === last_syllables[2 + offset] === last_syllables[3 + offset])
    output += "perfect\n";
  else if(last_syllables[0 + offset] === last_syllables[1 + offset] && last_syllables[2 + offset] === last_syllables[3 + offset])
    output += "even\n";
  else if(last_syllables[0 + offset] === last_syllables[2 + offset] && last_syllables[1 + offset] === last_syllables[3 + offset])
    output += "cross\n";
  else if(last_syllables[0 + offset] === last_syllables[3 + offset] && last_syllables[1 + offset] === last_syllables[2 + offset])
    output += "shell\n";
  else
    output += "free\n";
}

fs.writeFileSync("poetry.out", output, "utf8");
