const zahl = '4.n4';

verdoppeln(zahl,(ergebnis) => {
    if (isNaN(ergebnis)) {
        throw new Error('Ergebnis muss eine Zahl sein');
    }
    else {
        console.log('Das Ergebnis ist: '+ ergebnis);   
    }


   


   
  });

function verdoppeln(zahl, callback) {
    setTimeout(() => {
      callback(zahl * 2);
    }, 1000);
  }

