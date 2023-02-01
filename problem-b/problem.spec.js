//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const jsPath = __dirname + '/js/index.js';

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    await expect([jsPath]).toHaveNoEsLintErrors();
  })
});

const solution = require(jsPath); //load the solution

describe('addFour() function', () => {
  test('produces expected output', () => {
    expect(solution.addFour(8997)).toBeGreaterThan(9000);
  })

  test('has been called', () => {
    expect(solution.twelveString).toEqual('84');
  })
})

describe('compoundInterest() function', () => {
  test('produces expected output', () => {
    expect(solution.compoundInterest(1000,.06,5)).toBeCloseTo(1349.86);
    expect(solution.compoundInterest(1000,.01,10)).toBeCloseTo(1105.17);
  })  
})

describe('fizzBuzz() function', () => {
  test('produces expected output', () => {
    expect(solution.fizzBuzz(20).slice(7,15)).toEqual([8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz']);
    expect(solution.fizzBuzz(355).slice(343, 350)).toEqual([344,'FizzBuzz',346,347,'Fizz',349,'Buzz']);    
  })
})

describe('getLetterFrequencies() function', () => {
  test('produces expected output', () => {
    expect(solution.getLetterFrequencies("mississippi")).toEqual({m:1,i:4,s:4,p:2});
    expect(solution.getLetterFrequencies("she sells sea shells down by the sea shore")).toEqual({h:4,e:7,' ':8,l:4,a:2,d:1,o:2,w:1,n:1,b:1,y:1,t:1,r:1,s:8});
  })
})

describe('Deck variable of "cards"', () => {
  test('contains a full deck', () => {
    expect(solution.deck.length).toBe(52);
  })
  test('contains expected cards', () => {
    expect(solution.deck).toContainEqual({rank:14, suit:'spades'}); //AS    
    expect(solution.deck).toContainEqual({rank:12, suit:'hearts'}); //QH
    expect(solution.deck).toContainEqual({rank:2, suit:'clubs'}); //2C
    expect(solution.deck).toContainEqual({rank:9, suit:'diamonds'}); //9D
    expect(solution.deck).not.toContainEqual({rank:1, suit:'spades'}); //! 1S
    expect(solution.deck).not.toContainEqual({rank:15, suit:'hearts'}); //! 15H    
  });
})

describe('Searching functions', () => {
  describe('containsQueenOfHearts() function', () => {
    test('produces expected output', () => {
      let hand = [
        {rank:12, suit:'diamonds'},
        {rank:3, suit:'hearts'},
        {rank:12, suit:'hearts'},
        {rank:14, suit:'spades'},
      ];
      expect(solution.containsQueenOfHearts(hand)).toBe(true);

      hand = [
        {rank:3, suit:'diamonds'},
        {rank:4, suit:'diamonds'},
        {rank:3, suit:'spades'},
      ];
      expect(solution.containsQueenOfHearts(hand)).toBe(false);        
    })
  });
  describe('getHighCard() function', () => {
    test('produces expected output', () => {
      let hand = [
        {rank:3, suit:'diamonds'},
        {rank:4, suit:'diamonds'},
        {rank:3, suit:'spades'},
        {rank:14, suit:'spades'},
        {rank:9, suit:'diamonds'}
      ];
      expect(solution.getHighCard(hand)).toEqual({rank:14, suit:'spades'});        
    })
  });
  describe('isFlush() function', () => {
    test('produces expected output', () => {
      let hand = [
        {rank:2, suit:'spades'},{rank:3, suit:'spades'},{rank:4, suit:'spades'},
      ];
      expect(solution.isFlush(hand)).toEqual(true);        
      hand = [
        {rank:2, suit:'clubs'},
        {rank:3, suit:'spades'},
        {rank:4, suit:'spades'},
        {rank:5, suit:'spades'},
      ];
      expect(solution.isFlush(hand)).toEqual(false);
      hand = [
        {rank:3, suit:'spades'},
        {rank:4, suit:'spades'},
        {rank:2, suit:'clubs'},
        {rank:5, suit:'spades'},
      ];
      expect(solution.isFlush(hand)).toEqual(false);
    })
  });
})
