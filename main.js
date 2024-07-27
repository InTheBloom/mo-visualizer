const query_y_range = new InputValidator(0, 10000);
const query_x_range = new InputValidator(0, 10000);
const query_amount_range = new InputValidator(0, 10000);

document.addEventListener("DOMContentLoaded", () => main());

function main () {
    query_generator_init();
    visualizer_init();
}

function query_generator_init () {
    // クエリランダム生成
    document.getElementById("query_generate_button").addEventListener("click", (eve) => {
        const textarea = document.getElementById("query_input");

        let ok = true;
        const x_max = parseInt(document.getElementById("query_max_x").value);
        if (!query_x_range.validate(x_max)) ok = false;
        const y_max = parseInt(document.getElementById("query_max_y").value);
        if (!query_y_range.validate(y_max)) ok = false;
        const amount = parseInt(document.getElementById("query_amount").value);
        if (!query_amount_range.validate(amount)) ok = false;

        if (!ok) {
            alert("クエリ生成のパラメータが不正です。");
            return;
        }

        textarea.innerHTML = "";
        const query = random_query_generator(y_max, x_max, amount);
        textarea.innerHTML += `${query.length}\n`;
        for (let i = 0; i < query.length; i++) {
            textarea.innerHTML += `${query[i][0]} ${query[i][1]}\n`;
        }
    });

    // クエリ入力を消去
    document.getElementById("input_delete_button").addEventListener("click", (eve) => {
        const textarea = document.getElementById("query_input");
        if (window.confirm("現在の入力を消去しますか？")) textarea.innerHTML = "";
    });
}

function visualizer_init () {
    const canvas = new Canvas(document.getElementById("main_canvas"));

    // runボタンを押したときの処理
    document.getElementById("run_button").addEventListener("click", (eve) => {
        const select = document.getElementById("sort_method");
        const selected_val = select.selectedIndex;
        if (selected_val == 0) {
            alert("巡回順を選択してください");
            return;
        }


        // 巡回クエリ選択
        let arr;
        const query = parse_query();

        if (selected_val == 1) arr = query;
        if (selected_val == 2) arr = mo_normal(query);
        if (selected_val == 3) arr = mo_hilbert(query);

        // 画面の諸設定 + 描画
        const drawer = new Drawer();
        drawer.set_canvas(canvas);
        {
            let max_y = 0, max_x = 0;
            for (let i = 0; i < arr.length; i++) {
                max_y = Math.max(max_y, arr[i][0]);
                max_x = Math.max(max_x, arr[i][1]);
            }
            drawer.set_draw_range(100 * Math.floor((max_y + 99) / 100), 100 * Math.floor((max_x + 99) / 100));
        }
        draw(drawer, arr);

        // 移動距離を計算
        let dist = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            dist += Math.abs(arr[i][0] - arr[i + 1][0]);
            dist += Math.abs(arr[i][1] - arr[i + 1][1]);
        }


        document.getElementById("result_query_count").innerHTML = `${arr.length}`;
        document.getElementById("result_method").innerHTML = select.options[selected_val].innerHTML;
        document.getElementById("result_distance_sum").innerHTML = `${dist}`;
    });
}

function draw (drawer, query) {
    const color = ["green", "red"];
    drawer.all_clear();
    drawer.draw_cartesian_coordinate_system();
    drawer.draw_tour_route(query, color[0], color[1]);
}
