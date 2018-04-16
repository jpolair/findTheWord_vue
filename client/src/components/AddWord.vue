<template>
  <div>
      <h1>{{ title }}</h1>
      <div class="form-word">
        <div><label for="wordToAdd">Mot à ajouter</label><input v-model="wordToAdd" type="text"></div>
        <div v-if="errorWord">Pas de chiffre ou de caractère spéciaux dans le mot</div>
        <div><label for="evidenceToAdd">Indice du mot ajouté</label><input v-model="evidenceToAdd" type="text"></div>
        <div><label for="levelToAdd">Niveau de difficulté de 1 à 3</label><input min="1" max="3" v-model="levelToAdd" type="number"></div>
        <div v-if="errorLevel">Ce champs doit contenir un chiffre de 1 à 3</div>
        <div><button class="add-word" @click="addWord" >Ajout du mot</button></div>
        <div v-if="successAdd">
            <p v-for="(data, index) in addedWord" :key="index">Le mot {{ data.word }} a été ajouté son indice est {{ data.evidence }} et son niveau de difficulté est {{ data.level }} </p>
        </div>
      </div>
      <!-- <input  type="text" v-model="wordToDelete">
      <button @click="deleteWord(wordToDelete)">supp</button> -->
      <router-link to="/">Retourne jouer</router-link>
  </div>
  
</template>

<script>
export default {
  name:"addWord",
  data () {
      return {
          title:"Ajouter un mot",
          wordToAdd: '',
          evidenceToAdd: '',
          levelToAdd: 1,
          successAdd:false,
          errorWord:false,
          errorLevel:false,
          addedWord:[],
      }
  },
  methods: {
      addWord: function () {
            let data = {
                evidence:this.evidenceToAdd,
                word:this.wordToAdd,
                level:this.levelToAdd
            }
            this.addedWord.push(data);
            this.wordToAdd = ''; this.evidenceToAdd = ''; this.levelToAdd = 1;
            this.$http.post("/word" , data).then(
            response => {
            console.log(`le mot ${data.word} a été ajouté`);
            this.successAdd = true;
            },
            response => {
             console.log("erreur : ", response);
            }
        );
    },
    deleteWord: function (wordToDelete) {
        this.$http.delete("/word/word", { body : { word:wordToDelete }}).then( 
            response => {
            console.log('supprimé ' + wordToDelete)
            console.log('body' , response.body)
        },
        response => {
            console.log('erreur ', response)
        })
    }
  }
}
</script>

<style scoped>
h1 {
    text-align:center;
    margin:50px 0;
}
label {
    display:inline-block;
    width:30%;
}
div.form-word {
    width:950px;
    margin:auto;
}
div.form-word div {
    margin:15px auto;
}
input {
    border-radius:5px;
    border:1px solid #ccc;
    height:25px;
    width:50%;
    padding:10px;
    font-size:24px;
}
button.add-word {
    background:#11ee88;
    border-radius:5px;
    color:white;
    width:120px;
    height:40px;
    border: solid 1px #11ee88;
    font-weight:bold;
}

</style>

