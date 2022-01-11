const request =require("request");
const cheerio=require("cheerio");
const { text } = require("cheerio/lib/api/manipulation");
let min=30000000;
let max=30001000;
let url;
var new_url;
var CUIT;
let random;
let counter=0;
//let DNI1;
let i;
for(i=min;i<max;i++){
    //random= Math.random() * (max - min) + min;
    //random=parseInt(random);
    //console.log(i);
    url=`https://www.cuitonline.com/search.php?q=${i}`;
    console.log(url);
    //console.log("request at: "+url);
    request(url,cb1);
  
}
 function cb1(err,response,html){
     
    if(html){
        //async:false;
        //let ch=cheerio.load(html);
        //let DNI=ch(`input[id="searchBox"]`);
        //DNI1=DNI[0].attribs.value;
        extract_url_FLname(html);
        
    }
}
//console.log("After");
function extract_url_FLname(html){
    let $=cheerio.load(html);
    let text=$("a .denominacion").text();
    CUIT=$("span .cuit").text();
    if(text){
        CUIT=CUIT.replace(/-/g,"");
        text=text.replace(/ /g,"-");
        new_url=`https://www.cuitonline.com/detalle/${CUIT}/${text}.html`;
        //console.log(new_url);
        request(new_url,cb2);
    }
}
function cb2(err,response,html,new_url){
    if(err){
        //console.log(err);
    }
    else{
        //console.log(html);
       extract_1site_Data(html);
       
    }
}
function extract_1site_Data(html){
    let $=cheerio.load(html);
    let full_name=$("h1 span").text();
    let city=$(`span[itemprop="addressLocality"]`).text();
    let state=$(`span[itemprop="addressRegion"]`).text();
    let CUIT1=$(`.p_cuit_title  .p_cuit`).text();
    let DNI=CUIT1.split("-")[1];
    CUIT1=CUIT1.replace(/-/g,"");
    let name_array=full_name.split(" ");
    let gender=$(`span[itemprop="gender"]`).text();
    let name=name_array.slice(1)
    name=name.join(" ");
    text1=full_name.replace(/ /g,"-");
    new_url=`https://www.cuitonline.com/detalle/${CUIT1}/${text1}.html`;
    if(full_name){
    console.log("--------------------------------------");
    console.log("URL: "+new_url);
    console.log("CUIT: "+CUIT1);
    console.log("NAME:  "+name);
    console.log("SURNAME: "+name_array[0]);
    console.log("CITY: "+city);
    console.log("STATE: "+state);
    console.log("GENDER: "+gender);
    counter=counter+1;
    console.log("COUNTER: "+counter);
    console.log("DNI: "+DNI);
    console.log("--------------------------------------");
}
}
