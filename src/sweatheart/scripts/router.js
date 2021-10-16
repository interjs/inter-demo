/**
 * 
 *  App router.
 *  Sweatheart.
 *  Inter demo.
 *  by : Denis Power.
 * 
 */

 // Used to change the main containers.
 // home, interest and relation.

function change(name,info){
    if(name=="relation"){

        scrollTo(0,0)

    }
    page.setRegistered=false;
    page[name]=true;
    if(event.hasListener(name)){

    event.fire(name,info)
    }

    if(name=="chat"){

            if(interests.length==0 && r.has){

              r.has=false;


              }else{
                  if(interests.length>0 && !r.has){

                    r.has=true;

                  }
              }

              if(r.has && event.hasListener("interest")){

                event.fire("interest")

              }
        }

}


function routeTo(path){

    url.setPath(path);

}




        
 

function search(value){

    if(window.scrollY>0){

        window.scrollTo(0,0)

    }

routeTo(`/search/${value}`);



}


// App routes.

ROUTER({
    routes:{
        "/":()=>{

          change("home");

        },
        "/relacoes":()=>{
            change("relation")
        },
        "/interesse":()=>{
            
            change("chat");
        },
        "/postagem/*":()=>{

            
            const id=window.location.href.replace(`http://localhost:300/postagem/`,"");

            
                change("comment",id);

            

        },
        "/search":()=>{
            
            if(!page.search){

                page.setRegistered=false;
                page.search=true;
                
        if(event.hasListener("ref")){

          event.fire("ref");

             }

            }

        const value=window.location.href.replace(`http://localhost:300/search/`,"");
        const searchInput=document.getElementById("searchInput");
        
        event.fire("result",value);
        

        if(value!=searchInput.value){
  
            searchInput.value=value;


        }


        },
        "/search/*":()=>{
            

            // page is the reactor of the containers.

            if(!page.search){

                page.setRegistered=false;
                page.search=true;
                
        if(event.hasListener("ref")){

          event.fire("ref");

             }

            }

        const value=window.location.href.replace(`http://localhost:300/search/`,"");
        const searchInput=document.getElementById("searchInput");
        
        event.fire("result",value);
        

        if(value!=searchInput.value){
  
            searchInput.value=value;


        }

        }
    }
})

app.status="production";
console.log(`Version : ${app.version}`) // 1.2.2
