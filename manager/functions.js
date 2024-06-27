import table from './table.js';



export default new class functions {

    //vẽ đường nối
    //=========================================================================\\

    createSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "svgContainer");
        document.body.appendChild(svg);
        return svg;
    }

    drawLine(svg, div1, div2) {
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



    init_draggable(div) {

        // Biến để lưu trạng thái kéo
        let isDragging = false;
        let startX, startY;

        // Sự kiện bắt đầu kéo
        div.addEventListener('mousedown', function (e) {
            isDragging = true;

            // Lưu vị trí ban đầu
            startX = e.clientX - div.offsetLeft;
            startY = e.clientY - div.offsetTop;
        });

        // Sự kiện kéo
        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                // Cập nhật vị trí của div
                div.style.left = (e.clientX - startX) + 'px';
                div.style.top = (e.clientY - startY) + 'px';
            }
        });

        // Sự kiện kết thúc kéo
        document.addEventListener('mouseup', function () {
            isDragging = false;
        });
        div.style.cursor = "move";

    }

    init_table(baseUrl, file, target) {
        //table.init_vocab_part(baseUrl, file);
        fetch("/models/table.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log(data)
                target.innerHTML = data;
                table.init_vocab_part(baseUrl, file);

            })
            .catch(error => console.error('Error:', error));

    }


}


