document.addEventListener("DOMContentLoaded", () => main());

function main () {
    const canvas = new Canvas(document.getElementById("main_canvas"));

    // textarea消去
    document.getElementById("")

    // クエリランダム生成
    document.getElementById("query_generate_button").addEventListener("click", (eve) => {
        const textarea = document.getElementById("query_output");

        let ok = true;
        const x_max = parseInt(document.getElementById("query_max_x").value);
        if (x_max < 10 || 500 < x_max) ok = false;
        const y_max = parseInt(document.getElementById("query_max_y").value);
        if (y_max < 10 || 500 < y_max) ok = false;
        const amount = parseInt(document.getElementById("query_amount").value);
        if (amount < 10 || 500 < amount) ok = false;

        if (!ok) {
            alert("クエリ生成のパラメータが不正です。");
            return;
        }

        textarea.innerHTML = "";
        const query = random_query_generator(x_max, y_max, amount);
        textarea.innerHTML += `${query.length}\n`;
        for (let i = 0; i < query.length; i++) {
            textarea.innerHTML += `${query[i][0]} ${query[i][1]}\n`;
        }
    });
}
