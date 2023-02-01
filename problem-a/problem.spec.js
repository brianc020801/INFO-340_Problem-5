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

describe('Basic Types', () => {
  test('Creates motto', () => {
    expect(LOG[0]).toEqual('The iSchool is my school');
  });
  test('Logs motto length', () => {
    expect(JSON.parse(LOG[1])).toEqual(24);
  });
  test('Finds "cool" presence', () => {
    expect(JSON.parse(LOG[2])).toEqual(false);
  });
  test('Logs expanded motto', () => {
    expect(LOG[3]).toEqual('The Information School is my school');
  });
  test('Calculates motto length ratio', () => {
    expect(LOG[4]).toEqual('145.83%');
  });
})

describe('Arrays', () => {
  test('Creates numbers array', () => {
    expect(JSON.parse(LOG[5])).toEqual([ 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 ]);
  });
  test('Changes array element', () => {
    expect(JSON.parse(LOG[6])).toEqual([ 1, 4.2, 1, 5, 9, 2, 6, 5, 3, 5 ]);
  });
  test('Adds element to array', () => {
    expect(JSON.parse(LOG[7])).toEqual([ 1, 4.2, 1, 5, 9, 2, 6, 5, 3, 5, 3 ]);
  });
  test('Finds median number', () => {
    expect(JSON.parse(LOG[8])).toEqual(4.2);
  });
})

describe('Objects', () => {
  test('Creates rectangle object', () => {
    expect(JSON.parse(LOG[9])).toEqual({ x: 30, y: 50, width: 100, height: 50 });
  });
  test('Logs rect\'s x,y coordinates', () => {
    expect(LOG[10]).toEqual('30, 50');
  });
  test('Finds rect\'s area', () => {
    expect(JSON.parse(LOG[11])).toEqual(1000);
  });
  test('Creates circle object', () => {
    expect(JSON.parse(LOG[12])).toEqual({ cx: 34, cy: 43, radius: 9 });
  });
  test('Creates shape array', () => {
    expect(JSON.parse(LOG[13])).toEqual([ { x: 30, y: 50, width: 100, height: 10 },
      { cx: 34, cy: 43, radius: 9 } ]);
  });
  test('Adds triangle to shape array', () => {
    expect(JSON.parse(LOG[14])).toEqual([ { x: 30, y: 50, width: 100, height: 10 },
      { cx: 34, cy: 43, radius: 9 }, {base: 33, height: 44} ]);   
  })
  test('Logs triangle\'s initial hypotenuse', () => {
    expect(LOG[15]).toEqual("undefined");
  });
  test('Logs the final shapes array', () => {
    expect(JSON.parse(LOG[16])).toEqual([ { x: 30, y: 50, width: 100, height: 10 },
      { cx: 34, cy: 43, radius: 9 }, {base: 33, height: 44, hypotenuse: 55 } ]);
  });
})
