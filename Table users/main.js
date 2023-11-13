let box = document.querySelector(".box")
let btnadd = document.querySelector(".btnadd")
let inp1 = document.querySelector(".inp1")
let inp2 = document.querySelector(".inp2")
let inp3 = document.querySelector(".inp3")
let inp4 = document.querySelector(".inp4")
let btnsave = document.querySelector(".btnsave")
let dia = document.querySelector(".dia")

let inp11 = document.querySelector(".inp11")
let inp22 = document.querySelector(".inp22")
let inp33 = document.querySelector(".inp33")
let inp44 = document.querySelector(".inp44")
let btnsave1 = document.querySelector(".btnsave1")
let dia2 = document.querySelector(".dia2")

let btnclose1 = document.querySelector('.btnclose1')
let btnclose = document.querySelector('.btnclose')


btnclose.onclick =()=>{
    dia.close()
}
btnclose1.onclick=()=>{
    dia2.close()
}

let idx = null
btnsave1.onclick=()=>{
let usereditn={
   name: inp11.value,
   group: inp22.value,
   phone: inp33.value,
   completed: inp44.value
}
  getuseredit(idx,usereditn)
  dia2.close()
}

btnadd.onclick=()=>{
    dia.showModal()
}

btnsave.onclick=()=>{
    let user = {
        name: inp1.value,
        group: inp2.value,
        phone: inp3.value,
        completed: false
    }
    putuser(user)
    dia.close()
}

let serach = document.querySelector(".serach")
serach.oninput= async()=>{
    try {
        const responce = await fetch(`http://localhost:3000/data?q=${serach.value}`)
        let data = await responce.json()
        getdata(data)
     } catch (error) {
        console.log(error);
     }
  }
async function getuseredit(id, user){
    try {
        let responce = await fetch(`http://localhost:3000/data/${id}`,{
            method: "PUT",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.log(error);
    }
}
async function deleteuser(id){
    try {
        let responce = await fetch(`http://localhost:3000/data/${id}`,{
            method: "DELETE"
        })
        get()
    } catch (error) {
        console.log(error);
    }
}

async function putuser(user){
    try {
        let responce = await fetch("http://localhost:3000/data",{
            method: "POST",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.log(error);
    }
}


 async function get(){
    try {
        let responce = await fetch("http://localhost:3000/data")
        let data = await responce.json()
        getdata(data)

    } catch (error) {
        console.log(error);
    }
}

 async function completeuser(id, user){
    try {
        let responce = await fetch(`http://localhost:3000/data/${id}`,{
            method: "PUT",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.log(error);
    }
}
let select = document.querySelector('.select')
select.oninput=async ()=>{
    let api
    if(select.value!="All"){
        api=`http://localhost:3000/data?group=${select.value}`
    }   
    else {
        api=`http://localhost:3000/data`
    }
    try {
        let responce = await fetch(api) 
        let data = await responce.json()
        getdata(data)
    } catch (error) {
        console.log(error);
    }
}



function getdata(data){
  box.innerHTML= ""
    data.forEach(elem => {
        let card = document.createElement('tr')
        card.classList.add("card")
        let tdname = document.createElement('td')
        tdname.innerHTML = elem.name
       if(elem.completed == true){
        tdname.classList.toggle("toggle")
       }
        let tdgroups = document.createElement('td')
        tdgroups.innerHTML = elem.group
         let tdphone = document.createElement('td')
         tdphone.innerHTML = elem.phone
         let tdstatus = document.createElement("td")
         tdstatus.innerHTML =  elem.completed
         tdstatus.classList.add('status')
         let tdactions = document.createElement('td')
         tdactions.classList.add('action')  
        let edit = document.createElement('button')
         edit.innerHTML = "Edit"
       edit.classList.add('edit')
         edit.onclick=()=>{
            idx= elem.id
            dia2.showModal()
         }
         let del = document.createElement('button')
         del.innerHTML = "Delete" 
        del.classList.add("del")
         del.onclick=()=>{
            deleteuser(elem.id)
         }
        
         let check = document.createElement("input")
         check.type = "checkbox"
         check.checked= elem.completed 
         check.classList.add('cheak')
         if(elem.completed == true){
            tdstatus.innerHTML = 'Inactive'
            tdstatus.classList.add('inactiveBtn')
        }else{
            tdstatus.innerHTML = 'Active'
            tdstatus.classList.add('activeBtn')

        }
         
      
        check.onclick=()=>{
            elem.completed = !elem.completed;
            completeuser(elem.id,elem);
        } 
       

         card.append(tdname,tdgroups,tdphone,tdstatus,tdactions)
         tdactions.append(edit,del,check)
         box.appendChild(card)
    });
}
get()


