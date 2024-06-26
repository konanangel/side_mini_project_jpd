import functions from './functions.js'
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
        document.getElementById('loading').style.display = 'none';
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
        width: 30vw;
        height: 50vh;
        overflow: auto;
        border: 0.5rem solid black;
        border-radius: 1rem;
        background-color: rgb(203, 208, 247);
        text-align: center;
    }`
    document.body.appendChild(table);
    init_table_content(baseUrl, vocabulary_file_name, document.getElementById(vocabulary_file_name.replace(".json", "")));

    //svg
    const svg = createSVG();
    drawLine(svg, document.getElementById("title"), table);
    window.addEventListener('mousemove', () => {
        svg.innerHTML = '';
        drawLine(svg, document.getElementById("title"), table);
    });

}


//=========================================================================\\

//vẽ đường nối
//=========================================================================\\

function createSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "svgContainer");
    document.body.appendChild(svg);
    return svg;
}

function drawLine(svg, div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.bottom;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    svg.appendChild(line);
}



//=========================================================================\\

//main

//=========================================================================\\


files.forEach((file, index) => {
    setTimeout(() => {
        create_and_handle_vocabulary(file, index + 1);
    }, index * 100); // 100ms cho mỗi lần gọi, dựa vào index để tăng thời gian chờ
});







