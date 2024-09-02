const firebaseConfig = {
apiKey: "AIzaSyAR qHa2HAItGNrfmuY5wug1SpB64Rom0", 
authDomain: "todolist-4ccca.firebaseapp.com",
databaseURL: "https://todolist-4ccca-default-rtdb.firebaseio.com",
projectId: "todolist-4ccca",
storageBucket: "todolist-4ccca.appspot.com",
messagingSenderId: "504568431966",
appId: "1:504568431966:web:8a88556c7c067ce4f7fbcf",
measurementId: "G-T4PRMEYEXV"
};
firebase.initializeApp(firebaseConfig); 
const auth=firebase.auth();
const db=firebase.firestore();
const userInfo=document.getElementById('user-info'); 
const loginForm=document.getElementById('login-form');
const emailInput=document.getElementById('email');
const passwordInput=document.getElementById('password');
const loginButton=document.getElementById('login-btn'); 
const todoList=document.getElementById('todo-list');
const tasksList=document.getElementById('tasks');
const newTaskInput=document.getElementById('new-task');
const addTaskButton=document.getElementById('add-task');
const logoutButton=document.getElementById('logout-btn');
let currentUser=null;
loginButton.addEventListener('click',() =>{
const email=emailInput.value;
const password=passwordInput.value;
auth.signInWithEmailAndPassword(email,password).catch(error=>{ console.err
or(error.meesage);
alert('Login Failed.Check your credentials');
});
});
auth.onAuthStateChanged(user=>{ 
if(user){
currentUser=user;
userInfo.textContent= `Logged in as ${user.email}`;
loginForm.style.display='none'; 
todoList.style.display='block'; 
loadTasks();
}else{
currentUser=null; 
userInfo.textContent=''; 
loginForm.style.display='block'; 
todoList.style.display='none'; 
tasksList.innerHTML='';
}
});
logoutButton.addEventListener('click',()=>{
auth.signOut();
});
addTaskButton.addEventListener('click',()=>{
const taskText = newTaskInput.value;
if(taskText.trim()!=''){
db.collection('todos').add({ user
Id:currentUser.uid, 
task:taskText
}).then(()=>{ newTaskInput.val
ue=''; loadTasks();
}).catch(error=>{ console.error
(error.message); alert('Error 
adding task!');
});
}
});
function loadTasks(){
tasksList.innerHTML='';
db.collection('todos').where('userId','==',currentUser.uid).get().then(querySnapshot=>{ querySnapshot.
forEach(doc=>{
const task=doc.data().task;
const taskId=doc.id;
const taskItem=document.createElement('li'); taskItem.innerHTML=`<span>$
{task}</span> <button class="delete-task" dataid="${taskId}">Delete</button>`;
tasksList.appendChild(taskItem);
});
}).catch(error=>{ console.error(er
ror.message); alert('Error loading
tasks!');
});
}
tasksList.addEventListener('click',event=>{ if(ev
ent.target.classList.contains('delete-task')){ const
taskId=event.target.getAttribute('data-id');
db.collection('todos').doc(taskId).delete().then(()=>{ loadTa
sks();
}).catch(error=>{ console.error(e
rror.message); alert('Error 
deleting task!');
});
}
});
