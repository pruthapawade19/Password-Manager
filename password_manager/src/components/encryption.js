export const simpleColumnarTransposition = (plaintext, key) => {
  const columns = [];
  for (let i = 0; i < key; i++) {
    columns[i] = [];
  }

  for (let i = 0; i < plaintext.length; i++) {
    const colIndex = i % key;
    columns[colIndex].push(plaintext.charAt(i));
  }

  let ciphertext = "";
  for (let i = 0; i < columns.length; i++) {
    ciphertext += columns[i].join("");
  }

  return ciphertext;
};

export const multipleColumnarTransposition = (text) => {
  // split the text into an array of characters
  let chars = text.split("");

  // calculate the number of rows needed based on the length of the text
  let numRows = Math.ceil(chars.length / 4);

  // create an array of column widths
  let colWidths = [3, 4, 3, 4];

  // create a 2D array to hold the transposed characters
  let transposed = [];
  let colStart = 0;
  for (let colWidth of colWidths) {
    let colEnd = colStart + colWidth;
    let col = chars.slice(colStart, colEnd);
    let paddedCol = col.concat(new Array(numRows - col.length).fill(" "));
    transposed.push(paddedCol);
    colStart = colEnd;
  }

  // flatten the transposed array back into a string
  let result = "";
  for (let row = 0; row < numRows; row++) {
    for (let col of transposed) {
      result += col[row];
    }
  }

  return result;
};

export const railFence = (text) => {
  // split the text into an array of characters
  let chars = text.split("");

  // create an array of rails
  let rails = [];
  for (let i = 0; i < 3; i++) {
    rails[i] = [];
  }

  // populate the rails
  let rail = 0;
  let direction = 1;
  for (let char of chars) {
    rails[rail].push(char);
    rail += direction;
    if (rail === 0 || rail === 2) {
      direction *= -1;
    }
  }

  // flatten the rails back into a string
  let result = "";
  for (let rail of rails) {
    result += rail.join("");
  }

  return result;
};