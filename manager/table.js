
export default new class table {
    insert_data(data) {
        var tbodys = document.querySelectorAll("tbody");
        var tbody = tbodys[tbodys.length - 1];
        let i = 0;
        Object.keys(data).forEach(() => {
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            var td0 = document.createElement("td");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            th.innerText = i;
            td0.innerText = data[i].hiragana;
            td1.innerText = data[i].kanji;
            td2.innerText = data[i].romanji;
            td3.innerText = data[i].meaning;
            tr.appendChild(th);
            tr.appendChild(th);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
            i++;
        });
    }
    // hoạt động chính ở hàm này, truyền link vào hàm này để render bảng trong main.js
    // (new table).init_vocab_part('/dekiru/lesson2/data_text/vocabulary/', 'conversation.json');
    init_vocab_part(baseUrl, file) {
        fetch(baseUrl + file)
            .then(response => response.json())
            .then(data => {
                this.insert_data(data); 
            })
            .catch(error => console.error('Error:', error));
    }
}

