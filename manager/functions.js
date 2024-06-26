import table from './table.js';


export default new class functions {
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


