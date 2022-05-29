let person = new Map();
person.set("name" , "ahmed");
person.set("age" , 25);
person.set("salary" , 6000);
person.set("gender" , "male");


for(let [x,y] of person)
{

    console.log(`key ${x} and value ${y }`)
}




var myData;
getData("general");
function getData(category)
{
    myData= [];
http = new XMLHttpRequest ;
//http.open("GET" , "https://jsonplaceholder.typicode.com/posts");
http.open("GET" , "https://newsapi.org/v2/top-headlines?country=eg&category="+category+"&apiKey=c3072bad2ada460887a9a45b263f9301")
http.send();
http.addEventListener("readystatechange" , function(){
    if(http.readyState == 4 && http.status == 200)
    {

       myData =JSON.parse(http.response).articles;
        displayData();
    }
})

}

function displayData()
{
    var cartona = "";
    for(i=0 ; i < myData.length ; i++)
    {
        cartona += 
        `<div class='col-md-3'>
          <div>
            <img class='w-100' src=`+myData[i].urlToImage+`>
            <h3>`+myData[i].title+`</h3>
            <p>`+myData[i].description+`</p>
          </div>
        </div>`
    }
    document.getElementById("rowResult").innerHTML = cartona;
}
var links = document.getElementsByClassName("nav-link")

for(i=0 ; i < links.length ; i++)
{
    links[i].addEventListener("click" , function(e){
        getData(e.target.text)
    })
}


var imgList = document.getElementsByClassName("item-img");
var imgArray = [];
var lightboxContainer = document.getElementById("lightbox-container");
var lightboxItem = document.getElementById("lightbox-item");
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");
var closeBtn = document.getElementById("close");
var currentSlideIndex = 0;


for(i = 0 ; i < imgList.length ; i++)
{
    imgArray.push(imgList[i])

    imgArray[i].addEventListener("click" , function(e){

        currentSlideIndex = imgArray.indexOf(e.target);
        lightboxContainer.style.display = "flex";
        var imgSrc = e.target.getAttribute("src");
        lightboxItem.style.backgroundImage = "url("+imgSrc+")";
    })
}

function nextSlide()
{
    currentSlideIndex++;
    if(currentSlideIndex == imgArray.length)
    {
        currentSlideIndex = 0;
    }
    lightboxItem.style.backgroundImage = "url("+imgArray[currentSlideIndex].getAttribute("src")+")";
}

function prevSlide()
{
    currentSlideIndex--;
    if(currentSlideIndex < 0)
    {
        currentSlideIndex = imgArray.length - 1;
    }
    lightboxItem.style.backgroundImage = "url("+imgArray[currentSlideIndex].getAttribute("src")+")";
}

function closeSlide()
{
    lightboxContainer.style.display = "none";
}

lightboxContainer.addEventListener("click" , function(e){

    if(e.target != lightboxItem && e.target != nextBtn && e.target != prevBtn)
    {
        lightboxContainer.style.display = "none";
    }
})

nextBtn.addEventListener("click" , nextSlide);
prevBtn.addEventListener("click" , prevSlide);
closeBtn.addEventListener("click" , closeSlide);

document.body.addEventListener("keydown" , function(e){

    if(e.keyCode == 39)
    {
        nextSlide();
    }
    else if (e.keyCode == 37)
    {
        prevSlide();
    }
    else if (e.keyCode == 27)
    {
        closeSlide();
    }
})
