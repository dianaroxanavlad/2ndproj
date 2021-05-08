# My own bistro

## Introducere
Aplicația **My own Bistro** este o aplicație de tip Single Page Application dezvoltată cu ajutorul librăriei React și are rolul de a găsi și salva rețete favorite de mâncare și cocktailuri. Pentru o interfață cât mai plăcută, am apelat și la librăria Material UI.

## Descriere problemă
Această aplicație vine în ajutorul utilizatorilor ce doresc să găsească rapid anumite feluri de mâncare sau băuturi. Aplicația a fost gândită să fie cât mai ușor de folosit, astfel utilizatorii vor avea nevoie doar de un cont de Google pentru autentificare, iar căutarea rețetelor se execută prin folosirea unui cuvânt cheie. 

## Servicii Cloud
Pentru funcționalitatea aplicației, a fost folosită platforma cloud Firebase, datorită usurinței de folosire a acesteia și documentația complexă pe care o oferă.

1. Firebase Authentication
Acest serviciu pune la dispoziție autentificarea rapidă prin diferite servicii precum Facebook, Google, Github etc. De asemenea, poate oferi și persistența autentificării unui utilizator și poate oferi datele în timp real.

2. Firebase Firestore 
Acest serviciu este folosit pentru stocarea preferințelor utilizatorilor, felurile de mâncare favorite, dar și a cocktail-urilor. Structura bazei de date se poate observa în imaginea de mai jos.
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2020.33.54.png

## REST API

Ambele api-uri sunt free to use și nu este nevoie de o cheie de autentificare. De asemenea, pentru apelarea acestora s-a folosit librăria axios. 

1. TheMealDB
Acest API se poate regăsi aici: https://www.themealdb.com/api.php
TheMealDB este folosit pentru căutarea rețetelor de mâncare. Acesta oferă date precum imagine și un link către YouTube cu instrucțiunile de reproducere a acesteia.

2. TheCocktailDB
Acest api se poate regăsi aici: https://www.thecocktaildb.com/api.php
TheCocktailDb este folosit pentru căutarea băuturilor răcoritoare. La fel ca TheMealDB, acesta oferă informații similare, precum imagine și instrucțiuni de utilizare, dar nu și link de YouTube.

## Flux de date
Utilizatorul va interacționa prima dată cu interfața de autentificare, unde acesta va trebui să se conecteze cu un cont Google. Id-ul acestuia va fi disponibil tuturor componentelor din aplicație, deoarece se va folosi pentru stocarea preferințelor. Odată autentificat, acesta va observa pagina de cocktails, unde poate căuta și alege să adauge la favorite o băutură după un cuvânt cheie. 
Datele sunt preluate din API-ul TheCocktailDb, iar un apel de tip `GET` către acesta va arăta in felul urmator: 
```
 const searchCocktails = () =>{
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
            params: {
              s: cocktailInput
            } 
          }).then(res => {
            setCocktails(res.data.drinks);
          })
    }
```
Unde 's' este un parametru ce reprezintă cuvântul cheie. Datele vor fi stocate într-un vector și afișate prin componenta `CocktailCard`.

Un exemplu de response poate fi vizualizat aici: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

Utilizatorul poate accesa interfața de feluri de mâncare, deschizând meniul lateral. Similar cu interfața de cocktails, felurile de mâncare vor fi căutate după un cuvânt cheie. Metoda `GET` în acest caz arată în felul următor: 
```
   const searchMeals = () =>{
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
            params: {
              s: mealInput
            } 
          }).then(res => {
            setMeals(res.data.meals);
          })
    }
```
Textul va fi preluat din input și 'pasat' către parametrul `s`.Datele vor fi stocate într-un vector și afișate prin componenta `MealCard`.

Ulterior, pentru a deschide pagina cu produsele salvate, se va accesa opțiunea 'My Bistro'. Odată deschisă interfața, se vor citi din baza de date toate felurile de mâncare și băuturile stocate. Aici Firebase vine în ajutor cu propriile metode de apel. Citirea pentru felurile de mâncare se va face în felul următor: 
```
    const getMeals = () =>{
        database.collection("users").doc(currentUserId).get().then((doc) => {
            if (doc.exists) {
                setMeals(doc.data().meals);
            } else {
                console.log("No such document!");
            }
        })
    }
```
Pentru eficiența codului, se vor refolosi componentele `MealCard` și `CocktailCard`. De asemnea, din această interfață utilizatorul poate șterge obiectele din favorite. 
```
 const removeMealFromFav = (meal) => {
        database.collection("users").doc(currentUserId).update({
            meals: firebase.firestore.FieldValue.arrayRemove(meal)
        })
        .then((docRef) => {  
            setMeals( meals.filter(elem => elem.idMeal !== meal.idMeal));
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
```
De asemenea, pentru autentificare se va folosi urmatorul apel:
```
const authenticateUser = () => {
        auth.signInWithPopup(googleProvider).then(res => {
            const userId = res.additionalUserInfo.profile.id;
            if (res.additionalUserInfo.isNewUser) {
                createMealsAndCocktailsArray(userId);
            }
            setCurrentUserId(userId);
        }).catch(err => {
            alert('Error while logging in');
        });
    }
```
Daca utilizatorul este pentru prima oară autentificat, se vor crea vectorii pentru felul de mâncare și băuturi în documentul propriu.

## Publicarea
Aplicatia a fost publicata folosind Heroku CLI și poate fi accesată aici: https://my-own-bistro.herokuapp.com/

## Rularea locala
Pentru a rula proiectul local, se vor folosi comenzile:
```
git clone /insert repository/
cd my-own-bistro
npm install
npm start
```
Pentru siguranță, proiectul folosește un fișier local .env.local unde vor fi stocate cheile către firebase. Fără acest fișier, proiectul nu va funcționa corespunzător.

## Referințe
1. https://firebase.google.com/docs/auth
2. https://firebase.google.com/docs/firestore
3. https://www.themealdb.com/api.php
4. https://www.thecocktaildb.com/api.php
5. https://www.npmjs.com/package/axios
6. https://material-ui.com/

## Capturi de ecran
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2020.33.54.png
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2021.11.07.png
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2021.11.15.png
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2021.11.30.png
https://github.com/dianaroxanavlad/my-own-bistro/blob/main/my-own-bistro/Screenshot%202021-05-08%20at%2021.11.49.png
