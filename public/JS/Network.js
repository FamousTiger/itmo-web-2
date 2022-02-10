async function getPlaceHolder( PicNum ) {
    const url = "https://jsonplaceholder.typicode.com/photos/"+ PicNum;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        alert(error);
        return error
    }
}

function setPlaceHolder( PicNum ) {
    let PlaceHolder = getPlaceHolder(PicNum);
    PlaceHolder.then((PlaceHolder) => {
        for (let i=1; i<=5; i++) {
            let url = PlaceHolder.url;
            if (url)
            {
                console.log(url);
                let ProjectPicture = document.getElementById('img'+i);
                ProjectPicture.src = url;
            }
        }} )
}

window.addEventListener('load',function () {

    setPlaceHolder(1 + Math.floor(Math.random() * 4));

}, false)
