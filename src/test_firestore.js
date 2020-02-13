import firebase from 'firebase'; 
import 'firebase/firestore'

export function firedb(){
    const db = firebase.firestore();
    db.collection('boogle_grid').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            return doc.data();
        });
    });
}

