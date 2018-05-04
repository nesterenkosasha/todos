class TodoContainer{
    constructor(){
        this.body = document.getElementsByTagName("body")[0]
        this.wrapper = this.createEl("div", "div")
        this.header = this.createEl("div", "header", this.wrapper)
        this.content = this.createEl("div", "content", this.wrapper)
        this.ul = this.createEl("ul", "ul", this.content)
        this.inputField = this.createEl("div", "inputField", this.wrapper)
        this. input = this.createEl("input", "input", this.inputField)
        this.btn = this.createEl("button", "btn", this.inputField)
        this.footer = this.createEl("div", "footer", this.wrapper)
        this.loader = this.createEl("div", "loader", this.footer)
        this.block = this.createEl("div", "block", this.loader)
        this.persent = this.createEl("div", "persent", this.footer)
        this.inputField.addEventListener("click", this.createLi())
      //  this.ul.addEventListener("click", this.handelClick())
           // this.ul.addEventListener("click", this.handelClick())

        //--------- change text in li------------
        this.wrapper.addEventListener("change", (e) => {
            if(e.target.getAttribute("class") == "text"){

               e.target.dispatchEvent(new CustomEvent("change-view", {
                    detail:{
                        value: e.target.value
                    }
               }))
            }
        })

        //-----------------
        this.lis = []
        this.checked = []
        this.res = (this.checked.length / (this.lis.length || 1))*100
//-------------footer--progress-----bar----------
        this.footer.addEventListener("change-loader", ({ detail: { liItem } }) => {
            this.checked.push(liItem);
            this.res = (this.checked.length / (this.lis.length || 1))*100

            this.block.style.width = this.res + "%";
        })
    }

    handelClick({ target }){
        const targetClass = target.getAttribute("class")
        const liItem = target.parentNode

        switch( targetClass ){
            case "pen": {
                const i = liItem.getElementsByClassName("text")[0]
                const temp = i.value
                i.removeAttribute("readonly");
                break
            }
            case "btnDel": {
                const answer = confirm("Are you sure?")
                    if(answer == true){
                        liItem.remove()
                    }
                break
            }
            case "ch": {
                if(target.checked){
                    const foot = target.parentNode.parentNode.parentNode.parentNode.lastChild
                    foot.dispatchEvent(new CustomEvent("change-loader", {
                        detail: {
                            liItem
                        }
                    }))
                    console.log(this)
                }
                break
            }
        }

    }

    createEl(el, className, place){
        let elNode = document.createElement(el)
        elNode.classList.add(className)
        if(place){
            return place.appendChild(elNode)
        } else {
            return elNode
        }
    }

    render(){
        this.input.type = "text"
        this.input.setAttribute('placeholder', "For note..")
        this.header.innerText = "To buy"
        this.btn.innerText = "BUTTON"
        this.body.appendChild(this.wrapper)

    }

    createLi() {
        return (e) =>{

            this.block.style.width = this.res + "%"
            console.log(this.block)
            // console.log(this)
            if(e.target.value){
                console.log(this)
                this.li = this.createEl("li", "li")
                this.li.addEventListener("click", this.handelClick)

                this.checkbox = this.createEl("input", "ch")
                this.checkbox.type = "checkbox"
                this.text = this.createEl("input", "text")
                this.text.type = "text"
                this.text.value = e.target.value
                this.text.setAttribute("readonly", "true")
                this.text.addEventListener("change-view", ({ detail: { value }}) => {
                    if(value !== this.text.value){
                        this.text.value = value
                    }
                })
                console.log("text", this.text)
                this.pen = this.createEl("button", "pen")
                this.del = this.createEl("button", "btnDel")


                this.li.appendChild(this.checkbox)
                this.li.appendChild(this.text)
                this.li.appendChild(this.pen)
                this.li.appendChild(this.del)
                this.ul.appendChild(this.li)
                this.lis.push(e.target.value)

                e.target.value = ""


            }

        }
    }

}
document.addEventListener("DOMContentLoaded", ()=>{
    new TodoContainer().render()
})
