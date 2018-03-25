<template>
  <div>
   <h1>{{ title }}</h1>
    <div class="game-container">
          <div class="case-to-find" v-for="(num,index) in numberOfcases" :key="index"><span ref="letter"></span></div>
    </div>
    <div class="game-button">
      <button class="help">Demande un indice</button>
      <button class="give-up">Abandonne</button>
      <button class="add-word">Joue</button>
    </div>

   
  </div>
</template>

<script>
export default {
  name: "GetWord",
  data() {
    return {
      title: "Find The Word, find it....",
      wordToFind: "",
      attempt: "",
      numberOfcases: 0,
    };
  },
  mounted: function() {
    console.log(this.$refs);
    this.$http.get("http://localhost:3000/word").then(
      response => {
        this.words = response.body;
        this.howManyWords = response.body.length;
        let indice = Math.floor(Math.random() * this.howManyWords);
        this.wordToFind = this.words[indice];
        this.numberOfcases = this.wordToFind.word.length;
        console.log('Le mot à trouver : ',this.wordToFind.word);
      },
      response => {
        console.log("erreur : ", response);
      }
    );

     window.addEventListener("keypress", e => {
       if (this.attempt.length < this.numberOfcases) {
       this.attempt += String.fromCharCode(e.keyCode);
      for ( let i = 0; i < this.attempt.length ; i++) {
        this.$refs.letter[i].textContent = this.attempt[i].toUpperCase();
      }
       }
    });
  },
  methods: {
    chooseWord: function() {
      let indice = Math.floor(Math.random() * this.howManyWords);
      this.wordToFind = this.words[indice];
      console.log('Le mot à trouver : ',this.wordToFind.word);
      this.wordToFind;
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}
.game-container {
  width: 950px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
}
.game-button {
  text-align:center;
}
.case-to-find {
  display:inline-block;
  height:70px;
  width:70px;
  border-radius:10px;
  /* background:#54ae45; */
  background:#ffa500;
  margin-right:20px;
  text-align:center;
  line-height: 70px;
}
.case-to-find span {
  color:white;
  font-size:70px;
}
button.add-word {
    background:#11ee88;
    border-radius:5px;
    color:white;
    width:150px;
    height:40px;
    border: solid 1px #11ee88;
    font-weight:bold;
}
button.help {
    background:#ffa500;
    border-radius:5px;
    color:white;
    width:150px;
    height:40px;
    border: solid 1px #ffa500;
    font-weight:bold;
}
button.give-up {
    background:#ee1122;
    border-radius:5px;
    color:white;
    width:150px;
    height:40px;
    border: solid 1px #ee1122;
    font-weight:bold;
}

</style>