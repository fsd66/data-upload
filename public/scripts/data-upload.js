window.onload = () => {
    console.log("Hello world!");
    getDownloadableFiles();
};

async function getDownloadableFiles() {
    fetch("/files", {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        headers: {
            "ContentType": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        populateDownloadLinks(data.files);
    });
}

async function populateDownloadLinks(files = []) {
    const downloadDiv = document.getElementById("downloadable-files");

    if (!files.length > 0) {
        const msgNode = document.createElement("li");
        msgNode.innerText = "No files available.";

        downloadDiv.appendChild(msgNode);

        return;
    }

    files.forEach(f => {
        const listNode = document.createElement("li")
        const linkNode = document.createElement("a");
        linkNode.innerText = `${f}`;
        linkNode.href = `/file/${f}`;

        listNode.appendChild(linkNode);
        downloadDiv.appendChild(listNode);
    });
}
