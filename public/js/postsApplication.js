const formPost = document.querySelector('.newPost');
const themeLink = document.querySelector('.themeLink');
const postDelete = document.querySelector('.delete');
const getEdit = document.querySelector('.edit');
const postEdit = document.querySelector('.editPost');
const comment = document.querySelector('.addCommentOrder');


if (formPost) {
  formPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { name, type, description, link, country } = event.target;
    const res = await fetch('/posts/new', {
      method: 'POST',
      credentials: 'include',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        type: type.value,
        description: description.value,
        link: link.value,
        country: country.value
      })
    })
    if (res.status !== 200) {
      window.location = '/new';
    }
    window.location = '/posts';
  })
}

if (themeLink) {
  themeLink.addEventListener('click', async (event) => {
    event.preventDefault();
    const { id } = event.target;
    const res = await fetch(`posts/${id}`, {
      method: 'GET',
    })
    window.location = `/posts/${id}`
  })
}

if (postDelete) {
  postDelete.addEventListener('click', async (event) => {
    event.preventDefault();
    const { id } = event.target;
    const res = await fetch(`/posts/${id}`, {
      method: 'DELETE',
    })
    if (res.status !== 200) {
      window.location = `/posts/${id}`
    }
    window.location = '/posts'

  })
}

if (getEdit) {
  getEdit.addEventListener('click', async (event) => {
    event.preventDefault();
    const { id } = event.target;
    const res = await fetch(`/posts/edit/${id}`, {
      method: 'GET',
    })

    window.location = `/posts/edit/${id}`
  })
}

if (postEdit) {
  postEdit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { name, type, description, link, country, id } = event.target;
    const res = await fetch(`/posts/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        type: type.value,
        description: description.value,
        link: link.value,
        country: country.value
      })
    })
    if (res.status !== 200) {
      window.location = `/posts/edit/${id}`;
    }
    window.location = `/posts/${id}`;
  })
}

if(comment){
  comment.addEventListener('submit', async(event)=>{
event.preventDefault();
const {comments} =event.target;
const {id} = comment.dataset; 
const res = await fetch(`/posts/${id}/comments`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    comments: comments.value,
  })
})
if (res.status !== 200) {
  window.location = `/posts/${id}`;
}
window.location = `/posts/${id}`;
  })
}
