import{a as E,S as q,i as l}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const P="https://pixabay.com/api/",S="57941114-822f0913fcffde60ac0282970",B=15;async function m(o,t){const s={key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:B};return(await E.get(P,{params:s})).data}const M=new q(".gallery a",{captionsData:"alt",captionDelay:250}),i={loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more-btn")};function y(o){const t=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:c,comments:w,downloads:v})=>`<li class="gallery-item">
                    <a class="gallery-link" href="${a}">
                        <img
                            class="gallery-image"
                            src="${s}"
                            alt="${e}"
                        />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${r}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${c}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${w}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${v}
                        </p>
                    </div>
                </li>`).join("");i.gallery.insertAdjacentHTML("beforeend",t),M.refresh()}function A(){i.gallery.innerHTML=""}function g(){i.loader.classList.add("show")}function h(){i.loader.classList.remove("show")}function p(){i.loadMoreBtn.classList.add("show")}function b(){i.loadMoreBtn.classList.remove("show")}const f=document.querySelector(".form"),$=document.querySelector(".load-more-btn");let d="",n=1,u=0;const L=15;f.addEventListener("submit",async o=>{o.preventDefault();const t=f.elements["search-text"].value.trim();if(!t){l.error({title:"Error",message:"Please enter a search query"});return}d=t,n=1,A(),b(),g();try{const s=await m(d,n),{hits:a}=s;u=s.totalHits,a.length===0?l.error({message:"Sorry, there are no images matching your search query. Please try again!"}):(y(a),n*L<u&&p())}catch(s){l.error({title:"Error",message:s.message||"An error occurred while fetching images"})}finally{h()}});$.addEventListener("click",async()=>{n+=1,b(),g();try{const o=await m(d,n);y(o.hits);const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),n*L>=u?l.info({message:"We're sorry, but you've reached the end of search results."}):p()}catch(o){l.error({title:"Error",message:o.message||"An error occurred while fetching images"})}finally{h()}});
//# sourceMappingURL=index.js.map
