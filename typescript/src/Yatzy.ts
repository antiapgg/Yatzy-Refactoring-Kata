export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  static chance(...args: number[]): number {
    return args.reduce((a, b) => a + b);
  }

  static yatzy(...args: number[]): number {
    if (args.every((num) => num === args[0])) {
      return 50;
    }
    return 0;
  }

  static ones(...args: number[]): number {
    return Yatzy.sumOfNumbers(1, args);
  }

  static twos(...args: number[]): number {
    return Yatzy.sumOfNumbers(2, args);
  }

  static threes(...args: number[]): number {
    return Yatzy.sumOfNumbers(3, args);
  }

  fours(): number {
    return Yatzy.sumOfNumbers(4, this.dice);
  }

  fives(): number {
    return Yatzy.sumOfNumbers(5, this.dice);
  }

  sixes(): number {
    return Yatzy.sumOfNumbers(6, this.dice);
  }

  static sumOfNumbers(kindOfNumber: number, args: number[]): number {
    if (args.some((num) => num === kindOfNumber)) {
      return args.filter((num) => num === kindOfNumber).reduce((a, b) => a + b);
    }
    return 0;
  }

  static score_pair(
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    d5: number
  ): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    // console.log(counts);
    var at;
    for (at = 0; at != 6; at++)
      if (counts[6 - at - 1] >= 2) {
        /*console.log("AT: ", at);
        console.log("counts: ", counts[6 - at - 1]);
        console.log("return: ", (6 - at) * 2); */
        return (6 - at) * 2;
      }
    return 0;
  }

  static two_pair(
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    d5: number
  ): number {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1 - 1]++;
    counts[d2 - 1]++;
    counts[d3 - 1]++;
    counts[d4 - 1]++;
    counts[d5 - 1]++;
    var n = 0;
    var score = 0;
    for (let i = 0; i < 6; i += 1)
      if (counts[6 - i - 1] >= 2) {
        n++;
        score += 6 - i;
      }
    if (n == 2) return score * 2;
    else return 0;
  }

  static four_of_a_kind(
    _1: number,
    _2: number,
    d3: number,
    d4: number,
    d5: number
  ): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[_1 - 1]++;
    tallies[_2 - 1]++;
    tallies[d3 - 1]++;
    tallies[d4 - 1]++;
    tallies[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
    return 0;
  }

  static three_of_a_kind(
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    d5: number
  ): number {
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    t[d1 - 1]++;
    t[d2 - 1]++;
    t[d3 - 1]++;
    t[d4 - 1]++;
    t[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
    return 0;
  }

  static smallStraight(...args: number[]): number {
    if (
      args
        .sort((a, b) => a - b)
        .filter((num) => {
          if (num === 1 && args.indexOf(num) === 0) return true;
          if (num === args[(args.indexOf(num) - 1) % 5] + 1) return true;
          return false;
        })
        .reduce((a, b) => a + b) === 15
    )
      return 15;
    return 0;
  }

  static largeStraight(...args: number[]): number {
    if (
      args
        .sort((a, b) => a - b)
        .filter((num) => {
          if (num === 2 && args.indexOf(num) === 0) return true;
          if (num === args[(args.indexOf(num) - 1) % 5] + 1) return true;
          return false;
        })
        .reduce((a, b) => a + b) === 20
    )
      return 20;
    return 0;
  }

  static fullHouse(...args: number[]): number {
    var unics = args
      .sort((a, b) => a - b)
      .filter((num, index, array) => {
        return array.indexOf(num) === index;
      });
    if (unics.length === 2) {
      if (
        args.filter((x) => x === unics[0]).length === 2 ||
        args.filter((x) => x === unics[1]).length === 2
      )
        return (
          args.filter((x) => x === unics[0]).length * unics[0] +
          args.filter((x) => x === unics[1]).length * unics[1]
        );
    }
    return 0;
  }
}
