const Input = document.querySelector("input");
const searchBtn = document.querySelector("button");
const Resultdiv = document.querySelector(".result")

searchBtn.addEventListener("click",getWordInfo);

    async function getWordInfo()
    {
      try
         {
            const InputField = document.querySelector("input").value;
            Resultdiv.innerHTML = "<h2>Fetching Data...</h2>";
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${InputField}`);
            const data = await response.json();
            
           let definitions = data[0].meanings[0].definitions[0];
           const phonetics = data[0].phonetics[0].audio[0];
                Resultdiv.innerHTML = `
            <h2><strong>Word:</strong>${data[0].word}</h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found": definitions.definition}</p>
            <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found": definitions.example}</p>
            <p><strong>Audio:</strong>${ phonetics === undefined ? "Not Found": phonetics}</p>
            <p><strong>Antonyms:</strong></p>`;
            // fetching antonyms
                if(!definitions.antonyms.length){
                    Resultdiv.innerHTML += `<p>Not Found</p>`
                }
               else
               {
                for( let i=0; i<=definitions.antonyms.length; i++){
                    Resultdiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
                }
               }
            // fetching synonyms
            Resultdiv.innerHTML += `<p><strong>Synonyms:</strong></p>`
            if(!definitions.synonyms.length)
            {
                Resultdiv.innerHTML += `<p>Not Found</p>`
            }
            else
            {
                for(let i =0; i<=definitions.synonyms.length; i++){
                Resultdiv.innerHTML += `<li>${definitions.synonyms[i]}}</li>`
                 }
            }
            // adding readmore button
            Resultdiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="blank">Read More</a></div>`
            document.querySelector("input").value = "";
         }
         catch(error)
         {
            Resultdiv.innerHTML = `<h3>Sorry, the word could not be found</h3>`
         }
    
    }    
