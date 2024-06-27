import functions from '/manager/functions.js'

const html_grammar_files = [
    "chi_vi_tri.html",
    "cho_toi_thu_gi.html",
    "dem_so_cai.html",
    "hoi_chu_nhan.html",
    "hoi_dia_diem.html",
    "hoi_gia_tien.html",
    "hoi_nguyen_lieu.html",
    "hoi_so_tang.html",
    "hoi_tu_trong_ngon_ngu.html",
    "hoi_xuat_xu.html"
];

const based_link = "/models/grammar/lesson2/";
const grammar_buttons = document.querySelector("button.grammar");

function init_grammar_table() {
    html_grammar_files.forEach(file => {
        create_grammar_table(file);
    })
    setTimeout(()=>{
        var grammar_table = document.querySelectorAll(".grammar-table");
        grammar_table.forEach(g => {
            functions.init_draggable(g);
        })
        var grammar_button = document.querySelectorAll('.grammar-button button');
        grammar_button.forEach(gm => {
            var svg = functions.createSVG();
            functions.drawLine(svg, document.getElementById('title'), gm); 
            window.addEventListener('mousemove', () => {
                svg.innerHTML = '';
                functions.drawLine(svg, document.getElementById("title"), gm);
            });
        })
    }, 100)
    
}


function create_grammar_table(file_name) {
    //fetch data
    var background_html;
    fetch("/models/grammar/grammar_table.html")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        background_html = data;
        fetch(based_link + file_name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var grammar_table = document.createElement('div');
            grammar_table.innerHTML = `${background_html}`;
            grammar_table.className = "grammar-table";
            grammar_table.querySelector(".grammar-button button").innerHTML = file_name.replace(".html", "");
            grammar_table.querySelector(".grammar-button button").addEventListener('click', ()=>{
                togglePopup(file_name.replace(".html", ""));
            })
            grammar_table.querySelector(".grammar-button .popup-content").innerHTML = data;
            grammar_table.querySelector(".grammar-button .popup-content").className += (" " + file_name.replace(".html", ""));
            document.body.appendChild(grammar_table);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
    
}

export default new class grammar_render {

    init_grammar() {
        grammar_buttons.addEventListener('click', init_grammar_table);
    }
}
