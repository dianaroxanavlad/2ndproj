# My own bistro

## Introducere
Aplicatia **My own Bistro** este o aplicatie de tip Single Page Application dezvoltata cu ajutorul librariei React si are rolul de a gasi si salva retete favorite de mancare si cocktailuri. Pentru o interfata cat mai placuta am apelat si la libraria Material UI.

## Descriere problema
Aceasta aplicatie vine in ajutorul utilizatorilor ce doresc sa gaseasca rapid anumite feluri de mancare sau bauturi. Aplicatia a fost gandita sa fie cat mai usor de folosit, astfel utilizatorii vor avea nevoie doar de un cont de Google pentru autentificare, iar cautarea retetelor se executa prin folosirea unui cuvant cheie. 

## Servicii CLoud
Pentru functionalitatea aplicatiei a fost folosita pltforma cloud Firebase, pentru usurinta de folosire a acesteaia si documentatia complexa pe care o ofera.

1. Firebase Auhentication
Acest serviciu pune la dispozitie autentificarea rapida prin diferite servicii precum facebook, google, github etc. De asemenea, poate oferi si persistenta autentificarii unui utilizator si poate oferi datele in timp real.

2. Firebase Firestore 
Acest serviciu este folosit pentru stocarea preferintelor utilizatorilor, felurile de mancare favorite dar si a cocktail-urilor. Structura bazei de data se poate observa in imaginea de mai jos.

## REST API

Ambele api-uri sunt free to use si nu este nevoie de o cheie de autentificare. De asemenea pentru apelarea acestora s-a folosit libraria axios. 

1. TheMealDB
Acest API se poate regasi aici : https://www.themealdb.com/api.php
TheMealDB este folosit pentru cautarea retetelor de mancare. Acesta ofera date precum imaginea retetei, ingrediente, reteta, link catre youtube si multe altele. Acesta a fost folosit pentru cautarea felurilor de mancare.

2. TheCocktailDB
Acest api se poate regasi aici: https://www.thecocktaildb.com/api.php
TheCocktailDb este folosit pentru cautarea bauturilor racoritoare. La fel ca MealDB, ofera informatii similare precum ingrediente, reteta, imagine etc.

## Flux de date
Utilizatorul va interactiona prima data cu interfata de autentificare, unde acesta va trebui sa se conecteze cu un cont google. Id-ul acestuia va fi disponibil tuturor componentelor din aplicatie, deoarece se va folosi pentru stocarea preferintelor. Odata autentificat, acesta va observa pagina de cocktails, unde poate cauta o bautura dupa un cuvant cheie. 
Datele sunt preluate din API-ul TheCocktailDb, iar un apel de tip `GET` catre acesta va arata in felul urmator: 
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
Unde 's' este un parametru ce reprezinta cuvantul cheie. Datele vor fi stocate intr-un vector si afisate prin componenta `CocktailCard`.

Un exemplu de response poate fi vizualizat aici: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

Utilizatorul poate accesa interfata de feluri de mancare, deschizand meniul lateral. Similar cu interfata de cocktails, felurile de mancare vor fi cautate dupa un cuvant cheie. Metoda `GET` arata in felul urmator: 
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
Textul va fi preluat din input si 'pasat' catre parametrul `s`.Datele vor fi stocate intr-un vector si afisate prin componenta `MealCard`.

Ulterior, pentru a deschide pagina cu produsele salvate, se va accesa optiunea 'My Bistro'. Odata deschisa interfata, se vor citi din baza de date toate felurile de mancare si bauturile stocate. Aici Firebase vine in ajutor cu propriile metode de apel. Citirea pentru felurile de mancare se va face in felul urmator: 
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
Pentru eficienta codului, se vor refolosi componentele `MealCard` si `CocktailCard`. De asemnea din aceasta interfata utilizatorul poate sterge obiectele din favorite. 
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
De asemenea pentru autentificare se va folosi urmatorul apel:
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
Daca utilizatorul este pentru prima oara autentificat se vor crea vectorii pentru felul de mancare si bauturi in documentul propriu.

## Publicarea
Aplicatia a fost publicata folosind Heroku CLI si poate fi accesata aici: https://my-own-bistro.herokuapp.com/

## Rularea locala
Pentru a rula proiectul local, se vor folosi comenzile:
```
git clone /insert repository/
cd my-own-bistro
npm install
npm start
```
Pentru siguranta, proiectul foloseste un fisier local .env.local unde vor fi stocate cheile catre firebase. Fara acest fisier, proiectul nu va functiona corespunzator.

## Referinte
1. https://firebase.google.com/docs/auth
2. https://firebase.google.com/docs/firestore
3. https://www.themealdb.com/api.php
4. https://www.thecocktaildb.com/api.php
5. https://www.npmjs.com/package/axios
6. https://material-ui.com/

## Capturi de ecran