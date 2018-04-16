<template>
  <div>
   <h1>{{ title }}</h1>
   <p><router-link to="AddWord">Ajoute des mots</router-link></p>
   <p>Il y a {{ howManyWords }} mots en base de données</p>
   <div class="score-view">SCORE : {{score}}</div>
    <div class="game-container">
          <div class="case-to-find" v-for="(num,index) in numberOfcases" :key="index"><span ref="letter"></span></div>
    </div>
    <div class="game-container">
      <div ref="findCase" class="case-has-find" v-for="(num,index) in numberOfcases" :key="index"><span ref="find"></span></div>
    </div>
    <div class="game-button">
      <button ref="evidenceButton" type="button" @click="evidence = true;score-=10" class="help">Demande un indice</button>
      <button class="give-up">Abandonne</button>
      <button class="add-word">Joue [Enter]</button>
    </div>
    <div v-if="evidence === true" class="game-evidence">
        <p>{{ wordToFind.evidence }}</p>
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
      score:0,
      evidence: false
    };
  },
  mounted: function() {
    console.log(this.$refs);
    this.$http.get("/word").then(
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

     window.addEventListener("keydown", e => {
       if (this.attempt.length < this.numberOfcases && e.key != 'Enter' && e.keyCode != 8 && e.keyCode != 46) {
         if (e.keyCode == 50 ) {
           this.attempt+= 'É';
         }
         if (e.keyCode == 55 ) {
           this.attempt+= 'È';
         }
         if (e.keyCode == 48 ) {
           this.attempt+= 'À';
         }
         if (e.keyCode == 192 ) {
           this.attempt+= 'Ù';
         }
         if (e.keyCode == 57 ) {
           this.attempt+= 'Ç';
         }
         if (e.keyCode == 54 || e.keyCode == 109) {
           this.attempt+= '-';
         }
         if (e.keyCode != 50 && e.keyCode != 55 && e.keyCode != 48 && e.keyCode != 192 && e.keyCode != 57 && e.keyCode != 54 && e.keyCode != 109) {
           this.attempt += String.fromCharCode(e.keyCode);
         }
      for ( let i = 0; i < this.attempt.length ; i++) {
        this.$refs.letter[i].textContent = this.attempt[i].toUpperCase();
        }
       }
       if (e.key == 'Enter' && this.attempt.length > 0) {
         this.checkResult();
       }
       if (e.keyCode == 8 || e.keyCode == 46 && this.attempt.length > 0){   
       let indice = this.attempt.length - 1
       this.$refs.letter[indice].textContent = '';
       this.attempt  = this.attempt.substring(0, indice);
       }
    });
  },
  methods: {
    chooseWord: function() {
      if (this.evidence === true) {
        this.evidence = !this.evidence
        this.$refs.evidenceButton.blur()
      }
      let indice = Math.floor(Math.random() * this.howManyWords);
      this.attempt = '';
      for ( let i = 0; i < this.$refs.letter.length ; i++) {
        this.$refs.letter[i].textContent = '';
      }
      for ( let i = 0; i < this.$refs.find.length ; i++) {
        this.$refs.find[i].textContent = '';
        this.$refs.findCase[i].style.opacity = 0;
      }
      this.wordToFind = this.words[indice];
      this.numberOfcases = this.wordToFind.word.length;
      console.log('Le mot à trouver : ',this.wordToFind.word);
    },
    checkResult: function () {
      console.log('attempt : ' , this.attempt.toLowerCase() , 'word ' , this.wordToFind.word);
      if (this.attempt.toLowerCase() == this.wordToFind.word.toLowerCase()) {
        this.score+= this.wordToFind.level * 10;
        this.chooseWord(); 
      } else if (this.attempt.toLowerCase() !== this.wordToFind.word.toLowerCase()) {
        for (let i = 0; i < this.attempt.length; i++) {
          if (this.attempt.toLowerCase()[i] === this.wordToFind.word.toLowerCase()[i]) {
              this.$refs.find[i].textContent = this.attempt.toUpperCase()[i];
              this.$refs.findCase[i].style.opacity = 1;
          }
        }
      }
      for ( let i = 0; i < this.$refs.letter.length ; i++) {
        this.$refs.letter[i].textContent = '';
      }
      this.attempt = '';
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
  width: 1100px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
}
.game-evidence {
  text-align:center;
  font-size:40px;
}
.game-button {
  text-align:center;
}
.case-to-find {
  display:inline-block;
  height:70px;
  width:70px;
  border-radius:10px;
  background:#333;
  margin-right:20px;
  text-align:center;
  line-height: 70px;
}
.case-has-find {
  display:inline-block;
  height:70px;
  width:70px;
  border-radius:10px;
  background:#11ee88;
  margin-right:20px;
  text-align:center;
  line-height: 70px;
  opacity: 0;
}
.case-to-find span,
.case-has-find span {
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