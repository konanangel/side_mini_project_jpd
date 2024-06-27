import functions from './functions.js'
import grammar_render from './grammar_handler/grammar_render.js';

const baseUrl = '/dekiru/lesson2/data_text/vocabulary/';
const files = ['conversation.json', 'food.json', 'location.json', 'object.json'];
const title = document.getElementById("title");
functions.init_draggable(title);


//preload

//=========================================================================\\

// Hiển thị ảnh GIF loading khi bắt đầu preload
document.getElementById('loading').style.display = 'block';

files.forEach(file => {
    fetch(baseUrl + file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải tập tin JSON');
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            // Khi đã xử lý xong fetch, ẩn đi ảnh loading
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
                document.querySelector("#title").style.display = "block";
            }, 800)

        });
});





//=========================================================================\\


//thêm bảng từ vựng
//=========================================================================\\

function init_table_content(baseUrl, file, target) {
    functions.init_draggable(target);
    functions.init_table(baseUrl, file, target);
    setTimeout(() => {
        target.querySelector(".title").innerHTML = target.id;
    }, 100)
}

function create_and_handle_vocabulary(vocabulary_file_name) {
    var table = document.createElement("div");
    table.id = vocabulary_file_name.replace(".json", "");
    document.querySelector("style").innerHTML +=
        `#${vocabulary_file_name.replace(".json", "")}{
        position: absolute;
        width: 35rem;
        height: 30vh;
        overflow-y: auto;
        overflow-x: hidden;
        border: 0.4rem solid black;
        border-radius: 1rem;
        background-color: rgb(203, 208, 247);
        text-align: center;
        font-size: 0.75rem;
    }`
    document.body.appendChild(table);
    init_table_content(baseUrl, vocabulary_file_name, document.getElementById(vocabulary_file_name.replace(".json", "")));

    //svg
    var svg = functions.createSVG();
    functions.drawLine(svg, document.getElementById("title"), table);
    window.addEventListener('mousemove', () => {
        svg.innerHTML = '';
        functions.drawLine(svg, document.getElementById("title"), table);
    });

}


//=========================================================================\\


//=========================================================================\\

//main

//=========================================================================\\






async function init_vocabulary() {
    document.getElementById('loading').style.display = 'block';
    for (let index = 0; index < files.length; index++) {
        await new Promise(resolve => setTimeout(() => {
            create_and_handle_vocabulary(files[index], index + 1);
            resolve();
        }, index * 100));
    }
    document.getElementById('loading').style.display = 'none';

    // custom cho lesson 2
    // conversation, location, object, food
    let conversation = document.getElementById('conversation');
    let location = document.getElementById('location');
    let food = document.getElementById('food');
    let object = document.getElementById('object');

    if (conversation && location && food && object) {
        conversation.style.top = '30%';
        conversation.style.left = 0;

        location.style.top = '30%';
        location.style.right = 0;

        food.style.bottom = 0;
        food.style.left = 0;

        object.style.bottom = 0;
        object.style.right = 0;
    }
}


function init_grammar() {
    try {
        let conversation = document.getElementById('conversation');
        let location = document.getElementById('location');
        let food = document.getElementById('food');
        let object = document.getElementById('object');
        conversation.remove();
        location.remove();
        food.remove();
        object.remove();
    } catch (error) {

    }

    grammar_render.init_grammar();
    document.querySelector("#title button.vocabulary").addEventListener('click', vocabulary_action);
    document.querySelector("#title button.grammar").removeEventListener('click', init_grammar);
}

function vocabulary_action() {
    try {
        let chi_vi_tri = document.querySelector('.chi_vi_tri');
        chi_vi_tri.remove();
        let cho_toi_thu_gi = document.querySelector('.cho_toi_thu_gi');
        cho_toi_thu_gi.remove();
        let dem_so_cai = document.querySelector('.dem_so_cai');
        dem_so_cai.remove();
        let hoi_chu_nhan = document.querySelector('.hoi_chu_nhan');
        hoi_chu_nhan.remove();
        let hoi_dia_diem = document.querySelector('.hoi_dia_diem');
        hoi_dia_diem.remove();
        let hoi_gia_tien = document.querySelector('.hoi_gia_tien');
        hoi_gia_tien.remove();
        let hoi_nguyen_lieu = document.querySelector('.hoi_nguyen_lieu');
        hoi_nguyen_lieu.remove();
        let hoi_so_tang = document.querySelector('.hoi_so_tang');
        hoi_so_tang.remove();
        let hoi_tu_trong_ngon_ngu = document.querySelector('.hoi_tu_trong_ngon_ngu');
        hoi_tu_trong_ngon_ngu.remove();
        let hoi_xuat_xu = document.querySelector('.hoi_xuat_xu');
        hoi_xuat_xu.remove();
    } catch (error) {

    }

    init_vocabulary();
    document.querySelector("#title button.vocabulary").removeEventListener('click', vocabulary_action);
    document.querySelector("#title button.grammar").addEventListener('click', init_grammar);

}


document.querySelector("#title button.vocabulary").addEventListener('click', vocabulary_action);
document.querySelector("#title button.grammar").addEventListener('click', init_grammar);






