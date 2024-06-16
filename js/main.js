var title= document.getElementById('title');
var price= document.getElementById('price');
var taxes= document.getElementById('taxes');
var ads= document.getElementById('ads');
var discount= document.getElementById('discount');
var total= document.getElementById('total');
var count= document.getElementById('count');
var category= document.getElementById('category');
var submit= document.getElementById('submit');
var mood='create';
var tmp;

function getTotal(){
    if(price.value != ' '){
        var result= (+price.value + +taxes.value + +ads.value )
         - +discount.value;
        total.innerHTML= result;
        total.style.backgroundColor = '#040' ;
    }
}

// create product............

var dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product)
}else{
     dataPro=[];
}
submit.onclick=function(){
    var newPro={
     title:title.value,
     price:price.value,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value,
     category:category.value,
    };
     if(mood==='create'){
        if(newPro.count>1){
            for(var i=0; i<newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
     }else{
        dataPro[tmp] = newPro;
        mood='create'
        submit.innerHTML='create'
        count.style.display='block'

     }



   
    console.log(dataPro)
    localStorage.setItem('product', JSON.stringify(dataPro))
    clearData();
    showData();
}
// clearData.................

function clearData(){
     title.value = '';
     price.value ='';
     taxes.value ='';
     ads.value ='';
     discount.value ='';
     total.innerHTML ='';
     count.value='';
     category.value='';
}

// showData........

function showData(){
    getTotal()
    var table='';
    for(var i=0 ; i < dataPro.length; i++){

        table +=
        `<tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
       </tr>`
    }

    document.getElementById('tbody').innerHTML=table;
    var btnDelete=document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }else{
        btnDelete.innerHTML='';
    }
}

showData();



function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}




function updateData(i){
 title.value=dataPro[i].title;
 price.value=dataPro[i].price;
 taxes.value=dataPro[i].taxes;
 ads.value=dataPro[i].ads;
 discount.value=dataPro[i].discount;
 getTotal();
 count.style.display='none';
 submit.innerHTML='Update'
 category.value=dataPro[i].category;
 mood='update'
 tmp=i;
 scroll({
    top:0,
    behavior:'smooth',
 })

}


var searchMood='title';
function getSearchMood(id){
    var search=document.getElementById('search');
   if(id=='searchTitle'){
    searchMood='title'
    search.Placeholder='search by title';
   }else{
     searchMood='category'
     search.Placeholder='search by category';
   }
   search.focus();
   search.value='';
   showData();
}

function searchData(value){
    var table='';
if(searchMood=='title'){
    for(var i = 0; i<dataPro.length;i++){
       if(dataPro[i].title.includes(value)){
        
        table +=
        `<tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
       </tr>`
       }
    }
}else{
    for(var i = 0; i<dataPro.length;i++){
        if(dataPro[i].category.includes(value)){
         
         table +=
         `<tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>`
        }
     }
}
  document.getElementById('tbody').innerHTML=table;
}
