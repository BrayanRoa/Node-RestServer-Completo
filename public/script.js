/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function handleCredentialResponse(response) {
           
	//* GOOGLE TOKEN
	const body = {id_token:response.credential};
	console.log(response.credential);
	fetch('http://localhost:3000/api/auth/google', {
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(body)
	})
		.then(resp =>resp.json())
		.then(resp =>{
			console.log(resp);
			localStorage.setItem('email', resp.usuario.correo);
			location.reload();
		})
		.catch(console.warn());
}

const button = document.getElementById('google-sign-out');
button.onclick = ()=>{
	console.log(google.accounts.id);
	google.accounts.id.disableAutoSelect();

	console.log('Todo bieo!!');
	google.accounts.id.revoke(localStorage.getItem('email'), done=>{
		localStorage.clear();
		location.reload();
	});
};