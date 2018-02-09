const fetchToken = async () => {
  const email = document.getElementById('email-input').value;
  const appName = document.getElementById('app-input').value;
  console.log(email)
  console.log(appName)

  const initialFetch = await fetch('/authenticate', {
    method: 'POST',
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({
      email,
      appName
    })
  })
  const token = await initialFetch.json()
  console.log(token)
  document.getElementById('token-container').innerHTML=`<p class='appended-token'>Your JWT token is:${token}</p>`
}


document.getElementById('btn-jwt').addEventListener('click', fetchToken)