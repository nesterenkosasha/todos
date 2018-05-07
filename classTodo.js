class TodoContainer{
    constructor() {
       this.lis = this.getItem();
       console.log(this.lis)
       this.ul = [];
       this.checked = 0;
       this.res = null
       this.render()
        this.createLi= this.createLi.bind(this)

                    //--------- change text in li------------
        this.wrapper.addEventListener("click", (e) => {
            switch(e.target.getAttribute("class")){
                case "btn": {
                    console.log("input", this.input.value)
                    this.lis.unshift({
                        li: this.input.value,
                        check: false
                    })
                    this.createLi()
                    this.renderBar()
                    break
                }
            }

        })
        this.footer.addEventListener("add-check", () => {
            this.checked = this.checked + 1
            //console.log(this.checked)
            this.renderBar()
        })
        this.footer.addEventListener("remove-check", () => {
            this.checked = this.checked - 1
            //console.log(this.checked)
            this.renderBar()
        })
        this.footer.addEventListener("remove-item", ({ detail: { liItem } }) => {
            if(liItem.childNodes[0].checked){
                this.checked = this.checked - 1
            }
            this.renderBar()
        })
    }

    renderBar(){
        console.log("renderGDSA", this.checked, this.ul.children.length)
        this.res = (this.checked / (this.ul.children.length) * 100)
        this.block.style.width = this.res + "%"
        console.log(this.res)
    }

    handelClick({ target }){
        const targetClass = target.getAttribute("class").slice(0, 3)
        console.log(target.parentNode.parentNode.parentNode.parentNode)
        const foot = target.parentNode.parentNode.parentNode.parentNode.lastChild
        const liItem = target.parentNode
        switch( targetClass ){
            case "pen": {
                const i = liItem.getElementsByClassName("text")[0]
                i.removeAttribute("readonly");
                break
            }
            case "btn": {
                console.log(targetClass)
                const answer = confirm("Are you sure?")
                    if(answer == true){
                        target.parentNode.remove()
                        foot.dispatchEvent(new CustomEvent("remove-item" , {
                            detail: {
                                liItem
                            }
                        }))
                    }
                break
            }
            case "ch": {
                if(target.checked){
                    foot.dispatchEvent(new CustomEvent("add-check", {
                        detail: {
                            liItem
                        }
                    }))
                } else {
                    foot.dispatchEvent(new CustomEvent("remove-check", {
                        detail: {
                            liItem
                        }
                    }))
                }
                break
            }
        }

    }
    setItem(d){
        localStorage.setItem("lis", JSON.stringify(d))
    }
    getItem(){
        return localStorage.getItem("lis") || []
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
        this.body = document.getElementsByTagName("body")[0]
        this.todo = this.createEl("div", "todo")
        this.wrapper = this.createEl("div", "div", this.todo)
        this.newtodo = this.createEl("button", "newTodoBtn", this.todo)
        this.newtodo.innerText = "+"
        this.newtodo.addEventListener("click", () => {
            new TodoContainer()
        }, true)
        this.deltodo = this.createEl("button", "delTodoBtn", this.todo)
        this.deltodo.innerText = "x"
        this.deltodo.addEventListener("click", () => {
            this.todo.remove()
        })
        this.header = this.createEl("div", "header", this.wrapper)
        this.content = this.createEl("div", "content", this.wrapper)
        this.ul = this.createEl("ul", "ul", this.content)
        this.inputField = this.createEl("div", "inputField", this.wrapper)
        this.input = this.createEl("input", "input", this.inputField)
        this.btn = this.createEl("button", "btn", this.inputField)
        this.footer = this.createEl("div", "footer", this.wrapper)
        this.loader = this.createEl("div", "loader", this.footer)
        this.block = this.createEl("div", "block", this.loader)
        this.persent = this.createEl("div", "persent", this.footer)
        this.btn.addEventListener("click", this.createLi)
        this.input.type = "text"
        this.input.setAttribute('placeholder', "For note..")
        this.header.innerText = "To buy"
        this.btn.innerText = "BUTTON"
        this.body.appendChild(this.todo)

    }
    //
    createLi() {
            if(this.input.value){
               // console.log(this)
                this.li = this.createEl("li", "li")
                this.li.addEventListener("click", this.handelClick)

                this.checkbox = this.createEl("input", "ch")
                this.checkbox.type = "checkbox"
                this.text = this.createEl("input", "text")
                this.text.type = "text"
                this.text.value = this.input.value
                this.text.setAttribute("readonly", "true")
                this.text.addEventListener("change-view", ({ detail: { value }}) => {
                    if(value !== this.text.value){
                        this.text.value = value
                    }
                })
              //  console.log("text", this.text)
                this.pen = this.createEl("button", "pen")
                this.pen.classList.add("fas")
                this.pen.classList.add("fa-pencil-alt")

                this.del = this.createEl("button", "btnDel")
                this.del.classList.add("fas")
                this.del.classList.add("fa-trash-alt")

                this.li.appendChild(this.checkbox)
                this.li.appendChild(this.text)
                this.li.appendChild(this.pen)
                this.li.appendChild(this.del)
                this.ul.appendChild(this.li)

                console.log("ul", this.ul.childNodes.length)

                this.input.value = ""


            }
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    new TodoContainer()
})


