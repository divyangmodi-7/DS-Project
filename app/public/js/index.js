const SomeApp = {

    data() {

        return {
            "referee" : [],
            "offers": [],
            "offerForm": {},
            selectedOffer : null,
            selectedGame: null,
            selectedAssignment: null,
            selectUnassigned: false,
            gameForm : {},
            refForm : {},
            assignForm : {},
            "games": [],
            "assignments": [],
            "unassignedGames": []
        }

    },

    computed: { },

    methods: {

        prettyDollar(n) {

            const d = new Intl.NumberFormat("en-US").format(n);

            return "$ " + d;

        },

        fetchBookData() {
            fetch('/api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.referee = parsedJson
            })
            .catch( err => {
                console.error(err)
            })
        },

        postOffer(evt) {
            if (this.selectedOffer === null) {
                this.postNewOffer(evt);
            } else {
                this.postEditOffer(evt);
            }
          },

        selectOffer(evt) {
          if (evt == this.selectedOffer) {
              return;
          }
          this.selectedOffer = evt;
          this.assignments = [];
          this.fetchAssignmentData(this.selectedOffer);
      },

        postGame(evt) {
          if(this.selectedGame === null) {
              this.postNewGame(evt);
          } else {
              this.postEditGame(evt);
          }
      },

        postAssignment(evt) {
          if(this.selectedAssignment === null) {
              this.postNewAssignment(evt);
          } else {
              this.postEditAssignment(evt);
          }
      },

        fetchGameData(){
          fetch('/api/games/')
      
          .then( response => response.json())

          .then( (responseJson) => {
              console.log(responseJson);
              this.games = responseJson;
          }
          )

          .catch( (err) => {

                  console.error(err);
          })
      },

        fetchUnassigned() {
          this.selectUnassigned = true;
          this.fetchUnassignedGames();
      },

        fetchUnassignedGames() {
          console.log("Fetching Unassigned Games");
          fetch('api/reports/')

          .then( response => response.json())

          .then( (responseJson) => {
              console.log(responseJson);
              this.unassignedGames = responseJson;
          })
      },

      postEditGame(evt) {
        this.gameForm.game_id = this.selectedGame.game_id;

        fetch('api/games/update.php', {
            method:'POST',
            body: JSON.stringify(this.gameForm),
            headers: {
                "content-Type": "application/json; charset=utf-8"
            }
        })
        .then( response => response.json() )
        .then ( json => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.games = json;

            //Reset the form
            this.resetGameForm();
        });
    },

      postDeleteGame(o) {

          ///Use "prompt" instead of confirm to have them type in a response, not just a clickable button
          if (!confirm("Are you sure you want to delete the game from "+o.field_num+"?")){
              return; 
          }

          fetch('api/games/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                  "content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json() )
          .then ( json => {
              console.log("Returned from post:", json);
              //TODO: test a result was returned!
              this.games = json;

              //Reset the form
              this.resetGameForm();
          });
      },

    postDeleteAssignment(o) {

        ///Use "prompt" instead of confirm to have them type in a response, not just a clickable button
        if (!confirm("Are you sure you want to delete the game from "+o.assignment_id+"?")){
            return; 
        }

        fetch('api/assignment/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
                "content-Type": "application/json; charset=utf-8"
            }
        })
        .then( response => response.json() )
        .then ( json => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.assignments = json;

            //Reset the form
            this.resetAssignForm();
        });
    },

    selectGame(o) {
      this.selectedGame = o;
      this.gameForm = Object.assign({}, this.selectedGame);
  },

  resetGameForm() {
      this.selectedGame = null;
      this.gameForm = {};
  },

  postEditAssignment(evt) {
      this.assignForm.id = this.selectedOffer.id;
      this.assignForm.assignment_id = this.selectedAssignment.assignment_id;

      console.log("Updating:", this.assignForm);
      // alert("Posting!");

      fetch('api/assignment/update.php', {
          method:'POST',
          body: JSON.stringify(this.assignForm),
          headers: {
              "content-Type": "application/json; charset=utf-8"
          }
      })
      .then( response => response.json() )
      .then ( json => {
          console.log("Returned from post:", json);
          //TODO: test a result was returned!
          this.assignments = json;

          //Reset the form
          this.resetAssignForm();
      });
  },

  selectAssignment(o) {
      this.selectedAssignment = o;
      this.assignForm = Object.assign({}, this.selectedAssignment);
  },

  resetAssignForm() {
      this.selectedAssignment = null;
      this.assignForm = {};
  },

        postNewOffer(evt) {
                
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referee = json;
                
                // reset the form
                this.resetOfferForm();

              })
              
              .catch( err => {
                alert("Please fill the requirements!");
              });
          },

          postEditOffer(evt) {
            // this.offerForm.studentId = this.selectedStudent.id;
            this.offerForm.id = this.selectedOffer.id;
            // console.log("Updating!", this.offerForm);
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referee = json;
    
                // reset the form
                this.resetOfferForm();
              });
          },

          postDeleteOffer(o) {
            if (!confirm("Are you sure you want to delete "+o.rname+"?")) {
              return;
            }
            console.log("Delete!", o);
    
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referee = json;
    
                // reset the form
                this.resetOfferForm();
              });
          },
          
          selectOfferToEdit(o) {
              this.selectedOffer = o;
              this.offerForm = Object.assign({}, this.selectedOffer);
          },

          resetOfferForm() {
              this.selectedOffer = null;
              this.offerForm = {};
          },

        fetchAssignmentData(ref){
          console.log("Fetching assignment data for ", ref);
          fetch('/api/assignment/?id=' + ref.id)
          .then( response => response.json())
          .then( (responseJson) => {
              console.log(responseJson);
              this.assignments = responseJson;
          })
  
          .catch( (err) => {
  
                  console.error(err);
          })
      },

    postNewGame(evt) {

          fetch('api/games/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;

              // reset the form
              this.gameForm = {};
            });

          },

      postNewAssignment(evt) {

        ///this.gameForm.game_id = this.selectedGame.game_id;
        console.log("Creating:", this.assignForm);
        // alert("Posting!");

        fetch('api/assignment/create.php', {
            method:'POST',
            body: JSON.stringify(this.assignForm),
            headers: {
                "content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json'
            }
        })
        .then( response => response.json() )
        .then ( json => {
            console.log("Returned from post:", json);
            //TODO: test a result was returned!
            this.assignments = json;

            //Reset the form
            this.assignForm = {};
        });
    }
    },

    created(){

        this.fetchBookData();
        this.fetchGameData();

    }

}

Vue.createApp(SomeApp).mount('#anotherApp');