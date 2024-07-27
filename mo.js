function parse_query () {
    const res = new Array(0);
    let ok = true;

    // 正規表現によるsplit from: https://1-notes.com/javascript-split/
    const tokens = document.getElementById("query_input").innerHTML.split(/\n\r|\n|\r| /);

    let cur = 0;
    const Q = parseInt(tokens[cur++]);
    if (!query_amount_range.validate(Q)) ok = false;

    for (let i = 0; i < Q; i++) {
        const y = tokens[cur++];
        if (!query_y_range.validate(y)) ok = false;
        const x = tokens[cur++];
        if (!query_x_range.validate(x)) ok = false;
        res.push([y, x]);
    }

    if (!ok) {
        alert("不正な入力です。");
        return [];
    }
    return res;
}

function mo_normal (A) {
    arr = A.concat();
    const Q = arr.length;
    let max_y = 0, max_x = 0;
    for (let i = 0; i < arr.length; i++) {
        max_y = Math.max(max_y, arr[i][0]);
        max_x = Math.max(max_x, arr[i][1]);
    }
    const N = Math.max(max_y, max_x);
    const width = Math.max(1, Math.floor((Math.sqrt(3) * N) / (Math.sqrt(2 * Q))));

    arr.sort((a, b) => {
        const ap = Math.floor(a[0] / width);
        const bp = Math.floor(b[0] / width);
        if (ap != bp) return ap < bp ? -1 : 1;
        if (ap % 2 == 0) return a[1] - b[1];
        return b[1] - a[1];
    });

    console.log("width: ", width);
    for (let v = 0; v < 10; v++) {
        console.log(v, " begin");
        for (let i = 0; i < arr.length; i++) {
            if (Math.floor(arr[i][0] / width) == v) console.log(arr[i][1]);
        }
    }

    return arr;
}

function mo_hilbert (A) {
    // source: https://codeforces.com/blog/entry/61203
    function hilbertOrder (y, x, pow, rotate) {
        if (pow == 0) {
            return 0;
        }
        const hpow = 1 << (pow-1);
        let seg = (x < hpow) ? (
            (y < hpow) ? 0 : 3
        ) : (
            (y < hpow) ? 1 : 2
        );
        seg = (seg + rotate) & 3;
        const rotateDelta = [3, 0, 0, 1];
        const nx = x & (x ^ hpow), ny = y & (y ^ hpow);
        const nrot = (rotate + rotateDelta[seg]) & 3;
        const subSquareSize = 1 << (2*pow - 2);
        let ans = seg * subSquareSize;
        const add = hilbertOrder(ny, nx, pow - 1, nrot);
        ans += (seg == 1 || seg == 2) ? add : (subSquareSize - add - 1);
        return ans;
    }

    arr = A.concat();
    arr.sort((a, b) => {
        const ai = hilbertOrder(a[0], a[1], 20, 0);
        const bi = hilbertOrder(b[0], b[1], 20, 0);
        if (ai == bi) return 0;
        return ai < bi;
    });

    return arr;
}
