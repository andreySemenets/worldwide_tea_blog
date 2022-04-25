

const signupForm = document.querySelector('#signupForm');
const signinForm = document.querySelector('#signinForm')

if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
console.log(event);
    const { name, email, password } = event.target;
    console.log(name, email, password);
    
    const res = await fetch('/signup', {
      method: 'POST',
      credentials: 'include',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    if (res.status !== 200) {
      window.location = '/signup';
    }
    window.location = '/map';
  });
}

if (signinForm) {
  signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { email, password } = event.target;

    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (res.status !== 200) {
      window.location = '/signin';
    }
    window.location = '/map';
  })
}
