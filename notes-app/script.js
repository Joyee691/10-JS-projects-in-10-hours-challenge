const addBtn=document.getElementById("add");

addBtn.addEventListener("click",()=>{
    addNewNote();
});

function addNewNote(){
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
            <div class="main hidden"></div>
            <textarea name="" id="" ></textarea>
        </div>
    `

    const editBtn=note.querySelector(".edit");
    const deleteBtn=note.querySelector(".delete");
    const mainEl=note.querySelector(".main");
    const textArea=note.querySelector("textarea");

    editBtn.addEventListener("click",()=>{
        mainEl.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });
    textArea.addEventListener("input",(e)=>{
        //解构赋值
        const {value}=e.target;
    
        mainEl.innerHTML=marked(value);
    });
    deleteBtn.addEventListener("click",()=>{
        note.remove();
    });


    document.body.appendChild(note);
}

