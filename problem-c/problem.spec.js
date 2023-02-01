//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

//console spy!
const LOG = []; //global to store the logged output
let storeLogFunction = (...inputs) => {
  LOG.push(inputs.reduce((out, arg) => {
    return out+' '+(typeof arg === 'string' ? arg : JSON.stringify(arg));
  },'').trim()); //add it to the log
}
console['log'] = jest.fn(storeLogFunction) //store results of console.log

const jsPath = __dirname + '/js/index.js';

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    await expect([jsPath]).toHaveNoEsLintErrors();
  })
});

const solution = require(jsPath); //run the solution

describe('Analyzes football games', () => {
  test('Extracts and log the array of opponents', () => {
    const val = [ 'Rutgers','Idaho','Portland State','Arizona','Stanford','Oregon',
    'Oregon State','Utah','Cal','USC','Arizona State','Washington State','Colorado',
    'Alabama' ]  
    expect(LOG[0]).toEqual(JSON.stringify(val));
  });
  test('Filter and logs the games UW lost', () => {
    const val = [ { date: '11/12/16', home: 'UW', opponent: 'USC', home_score: 13,
      opponent_score: 26, passing_yards: 259, rushing_yards: 17, fumbles: 0 },
      { date: '12/31/16', home: 'UW', opponent: 'Alabama', home_score: 7,
      opponent_score: 24, passing_yards: 150, rushing_yards: 44, fumbles: 1 } ]
    expect(LOG[1]).toEqual(JSON.stringify(val));
  })
  test('Filter+maps and logs the opponents UW lost to', () => {
    const val = [ 'USC', 'Alabama' ];
    expect(LOG[2]).toEqual(JSON.stringify(val));
  })
  test('Prints the game UW lost, each on their own line', () => {
    expect(LOG[3]).toEqual('USC at UW, 26 to 13');
    expect(LOG[4]).toEqual('Alabama at UW, 24 to 7');
  })
  test('Filter and logs how many games had fumbles', () => {
    expect(LOG[5]).toEqual('7');
  })
  test('Reduces and logs the game with most yards passed', () => {
    const val = { date: '11/5/16', home: 'Cal', opponent: 'UW', home_score: 27,
      opponent_score: 66, passing_yards: 417, rushing_yards: 287, fumbles: 2 }
    expect(LOG[6]).toEqual(JSON.stringify(val));
  })
  test('Use a closure and filter for fumbled losses', () => {
    const val = [ { date: '12/31/16', home: 'UW', opponent: 'Alabama', home_score: 7,
      opponent_score: 24, passing_yards: 150, rushing_yards: 44, fumbles: 1 } ]
    expect(LOG[7]).toEqual(JSON.stringify(val));
  })
})
