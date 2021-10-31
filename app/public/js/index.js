const SomeApp = {

    data() {

        return {
            "referee" : [],
            "offers": [],
            "offerForm": {},
            selectedOffer : null
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

        postNewOffer(evt) {
            // this.offerForm.studentId = this.selectedStudent.id;        
            // console.log("Posting:", this.offerForm);
            //  alert("Posting!");
    
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
          }
        },
    created(){

        this.fetchBookData();

    }

}

Vue.createApp(SomeApp).mount('#anotherApp');