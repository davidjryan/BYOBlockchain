const fetchToken = async () => {
  const email = document.getElementById('email-input').value;
  const appName = document.getElementById('app-input').value;
  console.log(email)
  console.log(appName)

  if (email.includes('turing.io')) {
    const initialFetch = await fetch('/authenticate', {
      method: POST,
      body: JSON.stringify({
        email,
        appName
      });
    const token = initialFetch.json()
    })
  }
  
}

document.getElementById('btn-jwt').addEventListener('click', fetchToken)