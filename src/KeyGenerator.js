
const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

  /*Just a function I got from Stack Overflow to generate unique key for every table item.
  I would've used the id as the key, but when fetching from the Dummy API sometimes you get the same result twice.
  */

export default generateKey;