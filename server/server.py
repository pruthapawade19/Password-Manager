from flask import Flask, jsonify, request
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)
key = "HACK"


@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Your Flask server is running!"})


@app.route('/simplecolumnar', methods=['POST'])
def simpleColumnar():
    data = request.get_json()
    msg = data['message']
    key = "HACK"
    msg = msg.replace(" ", "")

    cipher = ""

    k_indx = 0

    msg_len = float(len(msg))
    msg_lst = list(msg)
    key_lst = sorted(list(key))

    col = len(key)

    row = int(math.ceil(msg_len / col))

    fill_null = int((row * col) - msg_len)
    msg_lst.extend('_' * fill_null)

    matrix = [msg_lst[i: i + col]
              for i in range(0, len(msg_lst), col)]

    for _ in range(col):
        curr_idx = key.index(key_lst[k_indx])
        cipher += ''.join([row[curr_idx]
                           for row in matrix])
        k_indx += 1

    return jsonify({"cipher": cipher})

@app.route('/simplecolumnardecrypt', methods=['POST'])
def decryptMessage():
    msg = ""
    data = request.get_json()
    cipher = data['ciphertext']
    key = "HACK"

    k_indx = 0

    msg_indx = 0
    msg_len = float(len(cipher))
    msg_lst = list(cipher)

    col = len(key)

    row = int(math.ceil(msg_len / col))

    key_lst = sorted(list(key))

    dec_cipher = []
    for _ in range(row):
        dec_cipher += [[None] * col]

    for _ in range(col):
        curr_idx = key.index(key_lst[k_indx])

        for j in range(row):
            dec_cipher[j][curr_idx] = msg_lst[msg_indx]
            msg_indx += 1
        k_indx += 1

    try:
        msg = ''.join(sum(dec_cipher, []))
    except TypeError:
        raise TypeError("This program cannot",
                        "handle repeating words.")

    null_count = msg.count('_')

    if null_count > 0:
        return jsonify({"plaintext": msg[:-null_count]})

    return jsonify({"plaintext": msg})


@app.route('/multiplecolumnar', methods=['POST'])
def encrypt():
    data = request.get_json()
    msg = data['message']
    key = "3524"
    plaintext = msg.replace(" ", "")

    rows = math.ceil(len(plaintext) / len(key))

    plaintext += "X" * (rows * len(key) - len(plaintext))

    indices = [key.index(str(i+1)) for i in range(len(key))]

    columns = [plaintext[i:i+rows] for i in range(0, len(plaintext), rows)]

    columns = [columns[i] for i in indices]

    ciphertext = "".join(["".join(column) for column in columns])

    return jsonify({"ciphertext": ciphertext})


@app.route('/multiplecolumnardecrypt', methods=['POST'])
def decrypt():
    msg = ""
    data = request.get_json()
    ciphertext = data['ciphertext']
    key = "3524"
    rows = math.ceil(len(ciphertext) / len(key))

    indices = [key.index(str(i+1)) for i in range(len(key))]

    last_column_len = len(ciphertext) % len(key)

    columns = []
    start = 0
    for i in range(len(key)):
        if i < last_column_len:
            end = start + rows
        else:
            end = start + rows - 1
        columns.append(ciphertext[start:end])
        start = end

    columns = [columns[indices.index(i)] for i in range(len(key))]

    plaintext = "".join(["".join(row) for row in zip(*columns)])

    return jsonify({"plaintext": plaintext})


@app.route('/railfence', methods=['POST'])
def encryptRailFence():
    data = request.get_json()
    text = data['message']
    key = 3
    rail = [['\n' for i in range(len(text))]
            for j in range(key)]

    dir_down = False
    row, col = 0, 0

    for i in range(len(text)):
        if (row == 0) or (row == key - 1):
            dir_down = not dir_down

        rail[row][col] = text[i]
        col += 1

        if dir_down:
            row += 1
        else:
            row -= 1
    result = []
    for i in range(key):
        for j in range(len(text)):
            if rail[i][j] != '\n':
                result.append(rail[i][j])
    cipher = "".join(result)
    return jsonify({"cipher": cipher})


@app.route('/railfencedecrypt', methods=['POST'])
def decryptRailFence():
    data = request.get_json()
    cipher = data['cipher']
    key = 3

    rail = [['\n' for i in range(len(cipher))]
            for j in range(key)]

    dir_down = None
    row, col = 0, 0

    for i in range(len(cipher)):
        if row == 0:
            dir_down = True
        if row == key - 1:
            dir_down = False

        rail[row][col] = '*'
        col += 1

        if dir_down:
            row += 1
        else:
            row -= 1

    index = 0
    for i in range(key):
        for j in range(len(cipher)):
            if ((rail[i][j] == '*') and
                    (index < len(cipher))):
                rail[i][j] = cipher[index]
                index += 1

    result = []
    row, col = 0, 0
    for i in range(len(cipher)):

        if row == 0:
            dir_down = True
        if row == key-1:
            dir_down = False

        if (rail[row][col] != '*'):
            result.append(rail[row][col])
            col += 1

        if dir_down:
            row += 1
        else:
            row -= 1
    return jsonify({"plaintext": "".join(result)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
    # setting host to "0.0.0.0" eans that the server will be accessible from any device in the network
