document.addEventListener('DOMContentLoaded', function() {
    btnDog = document.querySelector('.btn-dog');
    btnDog.addEventListener('click', (e) => {
        console.log(e.target)
        e.target.disabled = true
        renderLoader()
        fetchRundomDog(e.target);
    });
});

async function fetchRundomDog(t) {
    try{
        await fetch("https://dog.ceo/api/breeds/image/random")
            .then(data => {
                const div = document.querySelector('.load')
                div.remove()
                t.disabled = false
                return data.json()
            })
            .then(data => {
                const img = document.createElement("IMG")
                img.classList.add("image")
                img.setAttribute("src", data.message)
                document.querySelector('.content').appendChild(img);
                return this
    })
    } catch({message}){
        console.error(message)
    }
}
function renderLoader(){
    let content = document.querySelector('.content');
    let loaderElem = `<div class="load">
    <div class="loader"></div>
     </div>`;
    content.innerHTML += loaderElem;
    content.scrollTop = content.scrollHeight;
}
