export const simpleColumnarTranspositionDecrypt = (ciphertext, key) => {
    const numRows = Math.ceil(ciphertext.length / key);
    const numCols = key;
    const numEmpty = numRows * numCols - ciphertext.length;
  
    let plaintext = "";
    let col = 0;
    let row = 0;
  
    for (let i = 0; i < ciphertext.length; i++) {
      if (row === numRows - 1 && col >= numCols - numEmpty) {
        col++;
      }
      const index = col * numRows + row;
      plaintext += ciphertext.charAt(index);
      col++;
      if (col >= numCols) {
        col = 0;
        row++;
      }
    }
  
    return plaintext;
  };  
  
export const multipleColumnarTranspositionDecrypt = (text, keys) => {
    let plainText = text;

    keys.forEach((key) => {
        plainText = simpleColumnarTranspositionDecrypt(plainText, key);
    });

    return plainText;
};

export const railFenceDecrypt = (text, key) => {
    const numOfRows = key;
    const numOfCols = Math.ceil(text.length / numOfRows);

    const matrix = Array.from({ length: numOfRows }, () => []);
    let index = 0;
    for (let i = 0; i < numOfCols; i++) {
        for (let j = 0; j < numOfRows; j++) {
            if (index < text.length) {
                matrix[j][i] = text[index];
                index++;
            }
        }
    }

    let plainText = "";
    let row = 0,
        col = 0;
    let dir = -1;

    for (let i = 0; i < text.length; i++) {
        if (row === 0 || row === numOfRows - 1) {
            dir = -dir;
        }
        plainText += matrix[row][col];
        row += dir;
        col++;
    }

    return plainText;
};
