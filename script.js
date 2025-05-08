let button = document.querySelector("button")
let inputbox = document.querySelector("input")
let acDetails = document.querySelector(".acDetails")


inputbox.addEventListener("input", () => {
   if (inputbox.value.length > 0) {


      acDetails.style.display = "flex"
      acDetails.innerHTML =
         `<div class="shine">
   <div class="top">
       <div class="img-div shining"></div>
       <div class="details">
           <div class="shining"></div>
           <div class="shining"></div>
           <div class="lower">
               <p class="shining"></p>
               <p class="shining"></p>
               <p class="shining"></p>
           </div>
       </div>
   </div>

   <div class="bottom">
       <div class="shining"></div>
       <div class="lower">
           <p class="shining"></p>
           <p class="shining"></p>
           <p class="shining"></p>
           <p class="shining"></p>
       </div>
   </div>
</div>`
   }
   else acDetails.style.display = "none"
})

button.addEventListener('click', (event) => {
   // event.preventDefault()   //if we have a form 

   let userinp = inputbox.value.trim()
   if (!userinp) return alert("Please enter a GitHub username");

   let userRepos = (username) => fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=8`)
      .then(resolove => {
         if (!resolove.ok) {
            alert("User Not Found")
            throw new Error("Something went wrong");
         }
         return resolove.json()
      });

   let userDetails = (username) => fetch(`https://api.github.com/users/${username}`)
      .then(resolve => {
         if (!resolve.ok) {
            console.log("User not found.")
            throw new Error("Something went wrong")
         }
         return resolve.json()
      })
   userDetails(userinp).then((data) => {
      console.log(data);

      let gitDetails = `
        <div class="top-sec">
                <div class="img-cont">
                    <img src="${data.avatar_url}" alt="">
                </div>
                <div class="bio">
                    <a href="">${data.login ? data.login : "Not Available"}</a>
                    <p>${data.bio ? data.bio : " Bio not available"}</p>
                    <div class="follow">
                        <p><span>${data.followers ? data.followers : "0"}</span> - Followers</p>
                        <p><span>${data.following ? data.following : "0"}</span> - Following</p>
                        <p><span>${data.public_repos ? data.public_repos : "0"}</span> - Repositories</p>
                    </div>
                </div>
            </div> `
      acDetails.innerHTML = gitDetails
   })

   userRepos(userinp).then(data => {
      console.log(data);
      acDetails.style.height = "fit-content"
      let repos = document.createElement("div")
      repos.setAttribute("id", "repoCont")
      data.forEach(repo => {
         let repoDiv = document.createElement("div")
         repoDiv.setAttribute("class", "repo")
         repoDiv.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
             <p>${data.description ? data.description : "Not Available"}</p>
            <span><i class="ri-star-line"></i> ${repo.stargazers_count ?? 0}</span>
            <span><i class="ri-git-fork-line"></i> ${repo.forks_count ?? 0}</span>
            <span><i class="ri-eye-line"></i> ${repo.watchers_count ?? 0}</span>
                <span>
                   <span><i class="ri-stack-line"></i></span>
                <span>${repo.language || "Unknown"}</span>
            </span>
                </span>
                `;
         repos.append(repoDiv);
      });
      acDetails.append(repos);
   });
});

