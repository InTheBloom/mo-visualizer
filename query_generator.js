function random_query_generator (y_max, x_max, amount) {
    const res = new Array(0);
    for (let i = 0; i < amount; i++) {
        const y = Math.random();
        res.push([get_random_int(10, y_max + 1), get_random_int(10, x_max + 1)]);
    }
    return res;
}

function get_random_int (minimum, maximum) {
    console.assert(minimum <= maximum, `get_random_intで不正な入力が与えられました。\nminimum: ${minimum} maximum: ${maximum}`);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}
