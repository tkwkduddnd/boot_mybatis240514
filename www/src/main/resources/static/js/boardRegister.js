console.log("hihi ㅋㅋ");

document.getElementById('trigger').addEventListener('click', () => {
    document.getElementById('file').click();
});

const regExp = new RegExp("\.(exe|sh|bat|jar|dll|msi)$"); // 실행파일 막기
const maxSize = 1024 * 1024 * 20;

function fileValidation(fileName, fileSize) {
    if (regExp.test(fileName) || fileSize > maxSize) {
        return 0;
    } else {
        return 1;
    }
}

document.addEventListener('change', (e) => {
    if (e.target.id == 'file') { // 파일 인풋의 id가 'file'임을 확인
        const fileObject = document.getElementById('file').files; // 파일 객체 가져오기
        console.log(fileObject);
        document.getElementById('regBtn').disabled = false;

        const div = document.getElementById('fileZone');
        div.innerHTML = "";

        let ul = `<ul class="list-group list-group-flush">`;

        let isOk = 1;
        for (let file of fileObject) {
            let validResult = fileValidation(file.name, file.size);
            isOk *= validResult;
            ul += `<li class="list-group-item">`;
            ul += `<div class="ms-2 me-auto">`;
            ul += `${validResult ? '<div class="fw-bold">업로드 가능' : '<div class="fw-bold text-danger">업로드 불가능'} </div>`;
            ul += `${file.name}</div>`;
            ul += `<span class="badge bg-${validResult ? 'success' : 'danger'} rounded-pill">${file.size}Bytes</span>`;
        }
        ul += `</ul>`;
        div.innerHTML = ul;
        if (isOk == 0) {
            document.getElementById('regBtn').disabled = true;
        }
    }
});
