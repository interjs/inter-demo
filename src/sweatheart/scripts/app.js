/**
 *
 *  App codebase.
 *  Inter demo.
 *  by : Denis Power.
 *  
 */

 // Some functions used in the app code base.
 // These function must be available globally.

 function assign(target,source){

    return Object.assign(target,source);

 }
 

 // Used to toggle the interest button in comment container.

 function toggleInterest(){

    storage.get("user", (user)=>{
      const newUser=assign({},user);
      
      user.interest=!user.interest;

      storage.get("commRef", (r)=>{
          
          r.toggle=user.interest ? "Interessou-te" : "Interesse";

          if(!user.interest){
          r.interested--;

          interests.some((t,i)=>{

              if(t.id==user.id){

                  interests.splice(i,1);

              }

          })

          }else{

              r.interested++;
              interests.unshift(newUser);

          }

          user.interested=r.interested;
      })



    })


  }

  // Interest
const interests=[];
const r={
  
  has:interests.length>0,
}


  // Report comment code.

  function report(){

    document.getElementById("cover").removeAttribute("class");
    document.getElementById("report").setAttribute("class","none");
    
    if(storage.has("reportedComment")){
    storage.get("reportedComment", (r)=>{

       

        r.reported=true;

    })

}

}

  // Used to add user comment in a post comments list.

  function addComment(){

     // Get the comment input value.
    const comm=document.getElementById("comm").value;

    event.fire("addComment", comm);

}



 (function(){



    event.listen("showReportDetail", (userName)=>{


        // This event is used to register autor reference
        // in report div, must be fired only once.
        // And it's reactor must be public, it(the reactor) will be used
        // in others parts of the app.

        event.removeListener("showReportDetail")
        
            toHTML({
                in:"report",
                data:{
                    autor:userName,
                },
                react:"rep"
            })
        
        })
        


    event.listen("addComment", (v)=>{

        let ref;
        let list;
        
        storage.get("commList", l=>list=l);
        storage.get("commRef", r=>ref=r);
        
        list.unshift({
            autor:"VocÃª",
            comment:v,
            reported:false,
            loggedUser:true
        })
        
        ref.length=list.length;
        
        
        })
        
        event.listen("ref", ()=>{
        
            event.removeListener("ref");
        
            const ref=toHTML({
                in:"search",
                data:{
                    search:"",
                    result:0,
                },
                private:true,
            })
        
               storage.set("searchReactor", ref)
            
        
        })



    renderContainer({
        in:"app",
        data:{
            home:false,
            chat:false,
            comment:false,
            relation:false,
            search:false,
            
        },
        react:"page"
    })

// We used the public reactor(page) so that the router has access to it.

// Registering the properties so that we can define an unique value for them all.
page.register=["home","chat","comment","relation","search"]

 


event.listen("home", ()=>{
    event.removeListener("home")
const womenPosts=[{
    autor:"Brendan",
    content:"Eu nunca encontro o grande amor da minha vida, espero encontrar aqui na SweatHeart!",
    views:19,
    detail:false,
    job:"Advogada",
    age:36,
    city:"HÃºngria",
   image:"/images/f5.jpg",
   interest:false,
   id:1,
   phone:3892849574,
   interested:392,
},{
    autor:"Mila",
    content:"Estou a procura da minha cara metade, se vocÃª tambÃ©m estÃ¡, entra em contacto",
    views:37748,
    detail:false,
    job:"Decoradora",
    age:28,
    city:"Brasil",
    image:"/images/f2.jpg",
    interest:false,
    id:2,
    phone:3332849341,
    interested:3289
},{
    autor:"Andrea",
    content:"Quero um novo amor!",
    views:384,
    detail:false,
    job:"Estilista",
    age:21,
    city:"Estados Unidados da Ãmerica",
    image:"/images/f1.jpg",
    interest:false,
    id:3,
    phone:3820184037,
    interested:234
},{
    autor:"Ana",
    content:"AlguÃ©m aÃ­ quer casar comigo?",
    views:8828,
    detail:false,
    job:"SecretÃ¡ria",
    age:23,
    city:"Holanda",
    image:"/images/f3.jpg",
    interest:false,
    id:4,
    phone:2249384932,
    interested:4732
},{
    autor:"Carmen",
    content:"I want to find a LOVE, inbox me.",
    views:19,
    detail:false,
    job:"Recepcionista",
    age:36,
    city:"Inglaterra",
   image:"/images/f4.jpg",
   interest:false,
   id:5,
   phone:2849473927,
   interested:120
}]

const menPosts=[
    {
    autor:"Axel",
    content:"I wonna date some girl, interested ones inbox me!",
    views:19,
    detail:false,
    job:"EstagiÃ¡rio de medicina",
    age:21,
    city:"Alemenha",
   image:"/images/m1.jpg",
   interest:false,
   id:6,
   phone:374837483649,
   interested:84
},
{
    autor:"Fernando",
    content:"Eu sou um jovem calmo, e gostaria de encontrar aqui a minha cara metade alguÃ©m aÃ­?",
    views:39,
    detail:false,
    job:"desempregado",
    age:19,
    city:"Portugal",
   image:"/images/m2.jpg",
   interest:false,
   id:7,
   phone:28392511930,
   interested:22
},
{
    autor:"Herman",
    content:"Solteiro com um filho e querendo mimar uma mulher pelo resto das nossas vidas.",
    views:44,
    detail:false,
    job:"Enginheiro",
    age:39,
    city:"Brasil",
   image:"/images/m3.jpg",
   interest:false,
   id:8,
   phone:2739991540 ,
   interested:320
}
]

storage.set("womenPosts", womenPosts);
storage.set("menPosts", menPosts);


const set=toHTML({
in:"g",
data:{
    genero:"mulheres",
    outroGenero:"homens",
},
private:true,
})

toATTR({
in:"g",
data:{
    changegender:{
        onclick(){

      const g=set.genero == "mulheres" ? "m" : "w";
      event.fire("changeGender",g);

        }
    }
}
})

let list;

event.listen("changeGender", (gend)=>{

const genders={
    m:menPosts,
    w:womenPosts
}

if(gend in genders && list){


    list.otherArray=genders[gend];
     if(gend=="m"){

        set.genero="homens",
        set.outroGenero="mulheres"

     }else{
         set.genero="mulheres";
         set.outroGenero="homens"
     }

}


})

Inter.for({
    in:"morePosts",
    data:womenPosts,
    do(p){

        list=this;

        return template({
            elements:[{
                tag:"div",
                    
                children:[{
                    tag:"div" ,

                     children:[{
                        tag:"img", attrs:{
                            src:p.image,
                            class:"image"
                        }
                    },{
                        tag:"ol", children:[{

                            tag:"li", text:`ProfissÃ£o : ${p.job}`

                        },{
                            tag:"li", text:`Idade : ${p.age}`
                        },{
                            tag:"li", text:`Cidade : ${p.city}`
                        }]
                    }]
                },{
                    tag:"h3", text:p.autor, attrs:{
                        class: "giveMargin" 
                    },
                },{
                    tag:"div", children:[{
                        tag:"p", text:p.content
                    }]
                },{
                    tag:"div", children:[{
                        tag:"button", text:p.interest ? "Interessou-te" : "Interesse ", events:{
                            onclick(){
                             
                                p.interest=!p.interest;
                                const newUser=assign({},p);
                                
                                if(p.interest){
                                    
                                    p.interested++;
                                    if(storage.has("chatList")){
                                        storage.get("chatList", (list)=>{

                                            
                                            list.unshift(newUser)

                                        })
                                    }else{
                                    interests.unshift(newUser)
                                    }

                                    
                                    
                                }else{
                                    interests.some((obj,ind)=>{
                                        
                                        if(obj.id==p.id){
                                          
                                            if(!storage.has("chatList")){
                                            interests.splice(ind,1)
                                            }else{
                                                storage.get("chatList", (list)=>{

                                                    list.splice(ind,1)

                                                     })   
                                            }

                                        
                                            p.interested--;
                                    
                                        }
                                    })
                                }

                        }
                    }
                    },{
                        tag:"button", text:"ComentÃ¡rios", events:{


                            onclick(){

                                storage.set("user",Object.assign(p,{}));
                            
                                url.setPath(`/postagem/${p.id}`)
                                window.scrollTo(0,0)
                                

                            }

                        }
                    }]
                },{
                    tag:"span" , attrs:{
                        class:"space"
                    }
                }]
            }]
        })

    }
})
})


// Interest container code.

event.listen("chat", (obj)=>{
    event.removeListener("chat")
   



  
Inter.renderIf({
    in:"interest",
    watch:r,
    conditions:[{
        index:0,
        render(){
            
            if(r.has){
                
                return template({

                    elements:[{
                        tag:"div",children:[
                     {
                         tag:"h3", text:"Teu interesse", styles:{
                             paddingLeft:"8%"
                         }
                     },{
                         tag:"div", attrs:{
                             id:"hasInterest"
                         }
                     }
                    ]

                    }]

                })

            }else{

                return template({

                    elements:[{
                        tag:"div", attrs:{
                            class:"noInterest",
                        }, children:[{
                            tag:"div", children:[{
                                tag:"h2", text:"Sem interesse", styles:{
                                    paddingLeft:"4%"
                                }
                            },{
                                tag:"div", children:[{
                                    tag:"p", text:"VocÃª ainda nÃ£o mostrou interesse em nenhuma pessoa, quando mostrares elas estarÃ£o listadas aqui."
                                },{
                                    tag:"button", text:"Ver pessoas", attrs:{
                                        class:"ibtn", 
                                    }, events:{
                                        onclick(){

                                            routeTo("/");

                                        }
                                    }
                                }]
                            }]
                        }]
                    }]

                })

            }

        }
    }]


})

event.listen("interest", ()=>{

    

 
    Inter.for({
        in:"hasInterest",
        data:interests,
        do(person,i){
            

            storage.set("chatList", this);
            const self=this;

            return template({

                elements:[{
                    tag:"div", children:[{
                        tag:"div", children:[{
                            tag:"img", attrs:{
                                src:person.image,
                                class:"intImage"
                            }
                        }]},{
                            tag:"div", children:[{
                                tag:"h3", text:person.autor
                            },{
                                tag:"ul", attrs:{
                                    class:"contact"
                                }, children:[{
                                    tag:"li", text:`Moradia: ${person.city}`
                                },{
                                    tag:"li", text:`Contacto: ${person.phone}`
                                }]
                            },{
                                tag:"div", attrs:{
                                    class:"intBtns"
                                }, children:[{
                                    tag:"button", text:"Descartar", events:{

                                    onclick(){
                                    
                                        if(person.id<6){

                               // It's a woman.

                       storage.get("womenPosts", (arr)=>{

                    arr[person.id-1].interest=false;
                    arr[person.id-1].interested--;

                          })

                               }else{

                           // It's a man.

                  storage.get("menPosts", (arr)=>{

                   arr[person.id-6].interest=false;
                   arr[person.id-1].interested--;

                        })

                          }
                                        self.splice(i,1)
                                        

                                        if(self.length==0){

                                            r.has=false;

                                        }
                                    
                                    }

                                    }
                                }]
                            }]
                        }]
                    
                }]

            })

        }
    })


})

if(r.has){

event.fire("interest")


}

})

// relation container code.

event.listen("relation", ()=>{

    event.removeListener("relation");

    const relations=[{
        lovers:"Brian, Killan e Anny, Jordan",
        message:"NÃ³s somos dois casais de jovens que se conheceram na Sweartheart e nutrimos um grande amor um pelo outro, e no Domingo nÃ³s iremos nos casar todos juntos.",
        isLoving:false,
        loves:38835,
        views:134430,
        image:"/images/l4.jpg"
    },{
  lovers:"Ana e Anderson",
   message:"NÃ³s nos encontramos aqui na SweatHeart e mantivemos contacto e nasceu um grande amor!",
   isLoving:false,
   loves:393,
   views:2345,
   image:"/images/l1.jpg",

    },{
   lovers:"JÃ©ssica e Walter",
   message:"5 anos de namoro, uma felhinha de 8 meses e uma vida cheia de felicidade tudo isso graÃ§as Ã  SweatHeart!",
   isLoving:false,
   loves:55553,
   views:234534,
   image:"/images/l2.jpg",

    },{
    lovers:"Emilly e Jonatan",
   message:"HÃ¡ dois anos erÃ¡mos solteiros, mas a Sweatheart nÃ£o queria nos ver solteitos.",
   isLoving:false,
   loves:5783,
   views:56435,
   image:"/images/l3.jpg",
   

    }]

    Inter.for({
        in:"relationList",
        data:relations,
        do(r){

            return template({

                elements:[{
                    tag:"div", children:[{
                        tag:"div", children:[{
                            tag:"img", attrs:{
                                src:r.image,
                                title:r.lovers,
                                class:"rImage"
                            }
                        }]
                    },{tag:"div", children:[{
                        tag:"h4", text:r.lovers, attrs:{
                            class:"msText"
                        }
                    },{
                        tag:"div", children:[{
                            tag:"p", text:r.message, attrs:{
                                class:"msText"
                            }
                        }]
                    },{
                        tag:"div", children:[{
                            tag:"div", children:[{
                                tag:"strong", text:`VisualizaÃ§Ãµes ${r.views}`, attrs:{
                                    class:"msText"
                                }
                            }]
                        },{
                            tag:"strong", text:`Adoros: ${r.loves}`,
                            attrs:{
                                class:"msText"
                            }
                        },{
                            tag:"br"
                        },{
                            tag:"a", attrs:{
                                class:"reactions",
                                title:r.isLoving ? `EstÃ¡s adorando a relaÃ§Ã£o de ${r.lovers}.` : null
                            }, events:{
                                onclick(){
                                    
                                r.isLoving=!r.isLoving;
                                if(r.isLoving){
                                    r.loves++;
                                }else{
                                    r.loves--;
                                }
                                }
                            }, styles:{
                                color:r.isLoving ? "pink" : "gray"
                            }, children:[{
                                tag:"i", attrs:{
                                    class:"fas fa-heart"
                                }
                            }]
                        }]
                    }]
                }]}]

            })

        }
    })

  })

  // search container code.

  event.listen("result", (value)=>{

    const users=[{
        name:"Brendan",
        job:"Advogada",
        age:36,
        city:"HÃºngria",
       image:"/images/f5.jpg",
       interest:false,
       phone:3892849574,
       id:1,
    },{
        name:"Mila",
        job:"Decoradora",
        age:28,
        city:"Brasil",
        image:"/images/f2.jpg",
        interest:false,
        phone:3332849341,
        id:2
    },{
        name:"Andrea",
        job:"Estilista",
        age:21,
        city:"Estados Unidados da Ãmerica",
        image:"/images/f1.jpg",
        interest:false,
        phone:3820184037,
        id:3
    },{
        name:"Ana",
        job:"SecretÃ¡ria",
        age:23,
        city:"Holanda",
        image:"/images/f3.jpg",
        interest:false,
        phone:2249384932,
        id:4
    },{
        name:"Carmen",
        job:"Recepcionista",
        age:36,
        city:"Inglaterra",
       image:"/images/f4.jpg",
       interest:false,
       phone:2849473927,
       id:5
    },
        {
        name:"Axel",
        job:"EstagiÃ¡rio de medicina",
        age:21,
        city:"Alemenha",
       image:"/images/m1.jpg",
       interest:false,
       phone:374837483649,
       id:6
    },
    {
        name:"Fernando",
        job:"desempregado",
        age:19,
        city:"Portugal",
       image:"/images/m2.jpg",
       interest:false,
       phone:28392511930,
       id:7
    },
    {
        name:"Herman",
        job:"Enginheiro",
        age:39,
        city:"Brasil",
       image:"/images/m3.jpg",
       interest:false,
       phone:2739991540 ,
       id:8
    }
]

    const result=[];

    data.query({
        in:users,
        setting:{
            applyTo:result,
            value:value,
            query:"name"
        }
    })

      if(result.length>0 && !warning.hasResult){

          warning.hasResult=true;

      }
    

    Inter.for({
        in:"result",
        data:result,
        do(search){

        return template({

        elements:[{
            tag:"div",  children:[{
                tag:"div", children:[{
                    tag:"img", attrs:{
                        src:search.image,
                        class:"resultImage"
                    }
                }]
            },{
                tag:"div", attrs:{
                    class:"rinfo"
                }, children:[{
                tag:"h3", text:search.name, styles:{
                    paddingLeft:"3%"
                }
            }, {
                    tag:"div", children:[{
                        tag:"button", text:"Postagem", events:{

                          onclick(){

                              

                              if(search.id<6){

                                  storage.get("womenPosts", (posts)=>{
                                         
                                      const user=posts[search.id-1];
                                      storage.set("user",user)
                                  })

                              }else{

                                  storage.get("menPosts", (posts)=>{

                                     const user=posts[search.id-6];
                                     storage.set("user",user)
                                      

                                  })

                              }

                             

                              routeTo(`/postagem/${search.id}`);
                          }

                        }
                    }]
                }]
            }]
        }]

        })

        }
    })

    
       storage.get("searchReactor", (reactor)=>{
        reactor.search=value;
        reactor.result=result.length;
       })

       if(result.length==0){
           if(event.hasListener("noResultWarning")){

            warning.hasResult=false;

              event.fire("noResultWarning");

           }else{

            warning.hasResult=false;

           }
       }
    

})

// comment container code.

event.listen("comment", (i)=>{

    event.removeListener("comment");

    const comments={
         1:[{
          autor:"William",
         comment:"Chama aÃ­ princesinha!",
         reported:false,
         },{
        autor:"DÃ¡rio", comment:"Oi! Eu estou solteiro, posso puxar?", reported:false
},{
  autor:"Dalton", comment:"SÃ©rio? TÃ£o linda assim Ã  procura de uma cara metade? Hmmm sei lÃ¡ hein kkkkk", reported:false
}],
2:[{
    autor:"Marcelo", comment:"Oi Mila eu sou casado mas nÃ£o sou feliz, posso chamar aÃ­?",
    reported:false,
},{
    autor:"Fernando", comment:"Que mambo hein!!!! Passa o teu contacto maravilha!",
    reported:false,
},{
    autor:"Edson", comment:"Essa dama tem cara daquelas que fazem sofrer",
    reported:false,
},{
    autor:"William", comment:"Passa o contacto gata.",
    reported:false,
}],
3:[{
    autor:"Alex", comment:"Devias dizer que : estÃ¡s a procura de um novo coraÃ§Ã£o para partires kkkk",
    reported:false,
},{
    autor:"AntÃ³nio", comment:"Como assim um novo amor? JÃ¡ tens um outro amor e precisas mais um? Criacinhas de hoje em dia kkkk",
    reported:false,
}],
4:[{
    autor:"William", comment:"Que linda hein!!! Mas primeiro Ã© namoro nÃ£o posso casar assim.",
    reported:false,
},{
    autor:"Ernesto", comment:"up!", reported:false,
},{
    autor:"Jeovani", comment:"Claro, sÃ³ chamar.",reported:false,
}],
5:[{
    autor:"Hermenegildo", comment:"I'm right here!",reported:false,
},{
    autor:"Brian", comment:"Inbox.", reported:false,
}],
6:[{
    autor:"Mely", comment:"Up", reported:false,
}],
7:[{
    autor:"Engelic", comment:"Hmmmm!", reported:false,
},{
    autor:"Mila", comment:"DesponÃ­vel!", reported:false,
}],
8:[{
    autor:"Juelma", comment:"Chama aÃ­iiii", reported:false,
},{
    autor:"Denisi", comment:"OiÃ©!!!!", reported:false,
}],

  }
  
  let user;
  
  let list;

  

    storage.get("user", (u)=>user=u)
      
     
      const set=toHTML({
        in:"comment",
        data:{
            posterImg:user.image,
            posterName:user.autor,
            content:user.content,
            length:comments[i].length,
            interested:user.interested,
            toggle:user.interest ? "Interessou-te" : "Interesse"
        },
        private:true
    })


    storage.set("commRef",set);



    Inter.for({
        in:"commentList",
        data:comments[i],
        do(comm,i){

            list=this;
            storage.set("commList",this);

            return template({
                elements:[{
                    tag:"div", children:[{
                        tag:"div", children:[{
                            tag:"h4", text:comm.autor, styles:{
                                
                                fontSize:"1.3rem"
                            }
                        },{
                            tag:"p", text:comm.comment, styles:{
                                
                            }
                        }, {
                            tag:"div", children:[{
                                tag:"button", text:comm.loggedUser ? "Deletar" :  !comm.reported ? "Denunciar" : "Denunciado", events:{
                                    onclick:!comm.loggedUser ? ()=>{

                                        if(comm.reported){

                                            comm.reported=false;
                                        

                                        }else{

                                        storage.set("reportedComment",comm);
                                      document.getElementById("cover").setAttribute("class","cover");
                                      document.getElementById("report").setAttribute("class","report");
                                      if(event.hasListener("showReportDetail")){
                                      event.fire("showReportDetail",comm.autor);
                                      }else{

                                        rep.autor=comm.autor;

                                      }

                                    }
                                } : ()=>{

                                    list.splice(i,1);
                                    set.length=list.length;

                                }
                                }, attrs:{
                                    
                                    class:comm.reported ? "reportedC" : "reportC"
                                }
                            }]
                        },{
                            tag:"span", attrs:{
                                class:"space"
                            }
                        }]
                    }]
                }]
            })

        }
    })



   
    event.listen("comment", (i)=>{

   storage.get("user", (u)=>user=u)
    set.posterImg=user.image;
    set.posterName=user.autor;
    set.content=user.content;
    set.length=comments[i].length;
    set.interested=user.interested;
    set.toggle=user.interest ? "Interessou-te" : "Interesse",
    list.otherArray=comments[i];

    })



   


  })

  const warning={
    hasResult:false,
}

event.listen("noResultWarning", ()=>{
    event.removeListener("noResultWarning");
    
Inter.renderIf({
    in:"search",
    watch:warning,
    conditions:[{
        index:1,
        render(){
 
        if(!warning.hasResult){
            
             return template({
                elements:[{
                    tag:"div", attrs:{
                        class:"noResultDiv"
                    }, children:[{
                        tag:"p", text:"NÃ£o foi encontrado nenhum resultado para a pesquisa."
                    }]
                }]
            })

        }
    }
    }]
})
})




 })();
