class MarkovChain {
  constructor(word_list) {
    this.chain = {
      lengths: [],
      initials: {},
    };
    this.table = {};


    if (word_list instanceof Array) {
      this.constructChain(word_list);
    }
  }

  constructChain(word_list) {
    for (const word of word_list) {
      if (this.chain.lengths[word.length]) this.chain.lengths[word.length]++;
      else this.chain.lengths[word.length] = 1;

      let i = word.substring(0, 1);
      if (this.chain.initials[i]) this.chain.initials[i]++;
      else this.chain.initials[i] = 1;

      let remaining = word.substring(1);
      while (remaining.length > 0) {
        let next = remaining.substring(0,1);
        if(!this.chain[i]) this.chain[i] = {};
        if (this.chain[i][next]) this.chain[i][next]++;
        else this.chain[i][next] = 1;

        i = next;
        remaining = remaining.substring(1);
      }
    }

    for (const key in this.chain) {
      this.table[key] = 0;
      for (const token in this.chain[key]) {
        let count = this.chain[key][token];
        let weighted = Math.floor(Math.pow(count, 1.3));
        this.chain[key][token] = weighted;
        this.table[key] += weighted;
      }
    }

  };

  selector(key) {
    let randomChance = Math.floor(Math.random() * this.table[key]);
    let threshold = 0;

    for (const token in this.chain[key]) {
      threshold += this.chain[key][token];
      if (randomChance < threshold) return token;
    }
    return ' ';
  };

  generate() {
    let length = this.selector('lengths');
    let i = this.selector('initials');
    let word = '';

    while (word.length <= length) {
      word += i;
      i = this.selector(i);
    }
    return word;

  }
}

module.exports = MarkovChain;
