const apiEndPoint="https://jsonplaceholder.typicode.com/posts";

const getButton=document.querySelector("#getPost");
const createButton=document.querySelector("#createPost");
const updateButton=document.querySelector("#updatePost");
const patchButton=document.querySelector("#patchPost");
const deleteButton=document.querySelector("#deletePost");

// getpost
const getPosts=async ()=>{
  try {
    const response=await fetch(apiEndPoint);
    if(response.status!=200){
      throw new Error(`Some Error,Status code:${response.status}`);
    }
    const posts=await response.json();
    return posts;
  } catch (error) {
    console.log(error);
  }
}

// create Post
const createPost= async (newPost)=>{
  try {
    const response=await fetch(apiEndPoint,{
      method:'POST',
      body:JSON.stringify(newPost),
      headers:{'Content-type':'application/json; charset=UTF-8'},
    });
    if(response.status!=201){
      throw new Error(`Something went wrong,Status Code:${response.status}`);
    }
    const post=await response.json();
    return post;
  } catch (error) {
    console.log(error);
  }
}

// update post
const updatePost=async (newPost,id)=>{
  try {
    const response=await fetch(`${apiEndPoint}/${id}`,{
      method:'PUT',
      body:JSON.stringify(newPost),
      headers:{'Content-type':'application/json; charset=UTF-8'},
    });
    if(response.status!=200){
      throw new Error(`Something went wrong,Status Code:${response.status}`);
    }
    const post=await response.json();
    return post;
  } catch (error) {
    console.log(error);
  }
}

//delete post
const deletePost=async (id)=>{
  try {
    const response=await fetch(`${apiEndPoint}/${id}`,{
      method:'DELETE',
      
    });
    if(response.status!=200){
      throw new Error(`Something went wrong,Status Code:${response.status}`);
    }
    const post=await response.json();
    return post;
  } catch (error) {
    console.log(error);
  }
}



// getbutton
getButton.addEventListener("click",async ()=>{
  const posts= await getPosts();
  if(posts){

  const table=`<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
    </tr>
  </thead>
  <tbody>
  ${posts.map((post)=>`<tr>
  <th scope="row">${post.id}</th>
  <td>${post.title}</td>
  </tr>`
  
  ).join("\n")}
  
  </tbody>
  </table>
  `;

  document.querySelector('#table').innerHTML=table;
  }
})

// create button
createButton.addEventListener('click',async ()=>{
  const newPost={
    title:'New Post Title',
    body:'New Post Body',
    userId:1,
  };
  const createdPost= await createPost(newPost);
  console.log(createdPost);
})


//updatebutton
updateButton.addEventListener('click',async ()=>{
  const newPost={
    id:2,
    title:'Updated Post Title',
    body:'Updated Post Body',
    userId:1,
  };
  const updatedPost= await updatePost(newPost,2);
  console.log(updatedPost);
})


//deletebutton
deleteButton.addEventListener('click',async ()=>{
  const deletedPost=await deletePost(2);
  console.log(deletedPost);
})