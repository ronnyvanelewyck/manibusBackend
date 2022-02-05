
const mongoose = require('mongoose');
const { Workflow, Task } = require('../models/models');

// connect to database
mongoose.connect('mongodb://localhost/manibus')
    .then(() => console.log('connected to manibus...'))
    .catch(err => console.log('not connected to manibus: ', err)); 



async function createWorkflow1(){
    const workflow = new Workflow({
        header: {
            tasktype: 'standard1',
            text1: 'Handen wassen',
            text2: 'Hoe doe je dit?'
        },
        material: [
        ],
        ingredient: [
        ],        
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Alles klaarleggen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Goed inzepen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Dit is nog een laatste stap',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            }
        ]         
    })
    try {
        const result = await workflow.save();
        console.log(result);
    }
    catch (ex){
        
        for (field in ex.errors)
             console.log(ex.errors[field].message);
    }


}

createWorkflow1();

async function createWorkflow2(){
    const workflow = new Workflow({
        header: {
            tasktype: 'standard2',
            text1: 'Strijken',
            text2: 'Met een een stroomstrijkijzer'
        },
        material: [
            {
                order: 1,        
                text: 'Gedistilleerd water',
                amount: 10,
                uom: 'Liter'
            },
            {
                order: 2,        
                text: 'Stekkerdoos',
                amount: 1
            },
            {
                order: 3,        
                text: 'Strijkplank',
                amount: 1
            }
        ],
        ingredient: [
        ],        
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Alles klaarleggen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Den tweede',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Dit is nog een laatste stap',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            }
        ]         
    })
    try {
        const result = await workflow.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }


}

createWorkflow2();

async function createWorkflow3(){
    const workflow = new Workflow({
        header: {
            tasktype: 'standard3',
            text1: 'Spaghetti met tomaten en mozzarella',
            text2: '2 personen'
        },
        material: [
            {
                order: 1,        
                text: 'Aardappelmesje',
                amount: 1
            },
            {
                order: 2,        
                text: 'Blikopener',
                amount: 1
            },
            {
                order: 3,        
                text: 'Houten lepel',
                amount: 1
            }, 
            {
                order: 4,        
                text: 'Vergiet',
                amount: 1
            }, 
            {
                order: 5,        
                text: 'Steelpan',
                amount: 1
            },
            {
                order: 6,        
                text: 'Kookpot klein',
                amount: 1
            }, 
            {
                order: 7,        
                text: 'Snijplank',
                amount: 1
            }, 
        ],
        ingredient: [
            {
                order: 1,        
                text: 'Mozarella',
                amount: 1,
                uom: 'bol',
                allergen: ['Lactose'],
                nutriscore: 'A',
                price: 10.6
            },
            {
                order: 2,        
                text: 'Ui',
                amount: 1,
                uom: 'stuk',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },
            {
                order: 3,        
                text: 'Pijnboompit',
                amount: 1,
                uom: 'el',
                allergen: ['Noten'],
                nutriscore: 'A',
                price: 0.7
            },
            {
                order: 4,        
                text: 'Knoflook',
                amount: 1,
                uom: 'Teentje',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },
            {
                order: 5,        
                text: 'Olijfolie',
                amount: 1,
                uom: 'el',
                allergen: [],
                nutriscore: 'B',
                price: 1.6
            },
            {
                order: 6,        
                text: 'Kerstomaat',
                amount: 250,
                uom: 'gram',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },            {
                order: 7,        
                text: 'Tomaat gepeld uit blik',
                amount: 400,
                uom: 'gram',
                allergen: [],
                nutriscore: 'A',
                price: 2.5
            },
            {
                order: 8,        
                text: 'Spaghetti',
                amount: 100,
                uom: 'gram',
                allergen: ['Gluten','Eieren'],
                nutriscore: 'C',
                price: 0.6
            },
            {
                order: 9,        
                text: 'Oregano gedroogd',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            },
            {
                order: 10,        
                text: 'Thijm',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            },
            {
                order: 11,        
                text: 'Peper en zout (PEZO)',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            }
        ] ,       
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Pasta 1',
                textlines: [ 'Neem een kookpot.' , 'Doe water in de kookpot.' , 'Zet de kookpot op een hoog vuur.']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Pasta 2',
                textlines: [ 'Als het water levendig kookt.' , 'Doe de pasta in het kokend water' , 'Kijk op de verpakking hoe lang de pasta moet koken.' , 'Terwijl je wacht tot de pasta beetgaar is, mag je volgende stappen uitvoeren: zet het vergiet in de afwasbak, kook de pasta beetgaar en giet de pasta af in vergiet']  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Pijnboompitten',
                textlines: [ 'Zet de steelpan op een hoog vuur.' , 'Rooster de pijnboompitten in de hete pan goudgeel.' , 'OPGELET: pijnboompitten verbranden heel snel!']  
            },
            {
                order: 4,
                screenformat: 'C0',
                steptext: 'Stap 4',
                steptitle: 'Ui',
                textlines: [ 'Pel een ui.' , 'Snij de ui doormidden.' , 'Snij de helft in reepjes.' , 'Versnipper de reepjes.']  
            },
            {
                order: 5,
                screenformat: 'C0',
                steptext: 'Stap 5',
                steptitle: 'Knoflook',
                textlines: [ 'Plet en schil de look.' , 'Versnijd de look zeer fijn.' ]  
            },
            {
                order: 6,
                screenformat: 'C0',
                steptext: 'Stap 6',
                steptitle: 'Kerstomaat',
                textlines: [ 'Was de kerstomaten.' , 'Snij de kerstomaten in twee.' ]  
            },
            {
                order: 7,
                screenformat: 'C0',
                steptext: 'Stap 7',
                steptitle: 'Mozzarella',
                textlines: [ 'Snijd de mozzarella in plakjes.' , 'Snijd de mozzarella plakjes in reepjes.' , 'Snij de mozzarella reepjes in blokjes.' ]  
            },
            {
                order: 8,
                screenformat: 'C0',
                steptext: 'Stap 8',
                steptitle: 'Blik openen',
                textlines: [ 'Doe de tomatenblik open met de blikopener.' ]  
            },
            {
                order: 9,
                screenformat: 'C0',
                steptext: 'Stap 9',
                steptitle: 'Saus maken',
                textlines: [ 'Zet de lege kookpot op een matig vuur.' , 'Doe de olijfolie in de kookpot' , 'Als de olie heet is doe je de ui in de kookpot.' , 'Stoof de ui glazig.' , 'Doe de knoflook bij in de kookpot.' , 'Stoof de ui en de knoflook.' , 'Voeg het blik tomaat bij de ui.' , 'Voeg de kerstomaten bij de ui.'  ]  
            },
            {
                order: 10,
                screenformat: 'C0',
                steptext: 'Stap 10',
                steptitle: 'Pasta Mengen',
                textlines: [ 'Voeg de uitgelekte pasta bij de saus.' , 'Meng de pasta en de saus.' , 'Voeg de mozzarella partjes bij de pasta.' , 'Meng alles zorgvuldig.' , 'Serveer de pasta in het bord.' , 'Strooi de pijnboompitten over de pasta.' ]  
            }
        ]         
    })
    try {
        const result = await workflow.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }

}

createWorkflow3();


// create test tasks


async function createTask1(){
    const task = new Task({
        header: {
            tasktype: 'standard1',
            text1: 'Handen wassen',
            text2: 'Hoe doe je dit?'
        },
        material: [
        ],
        ingredient: [
        ],        
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Alles klaarleggen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Goed inzepen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Dit is nog een laatste stap',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            }
        ],
        task: {
            header: {
              order: 1
            },
            user: {
                firstname: 'Ron',    
                lastname: 'Van Elewyck',    
                company: 'RVE Solutions',    
                group: 'IT',
            },
            teacher: {
                firstname: 'Stef',    
                lastname: 'De Feyter',    
                course: 'MONGODB'
            },
        }
    })
    try {
        const result = await task.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }

}

createTask1();

async function createTask2(){
    const task = new Task({
        header: {
            tasktype: 'standard1',
            text1: 'Handen wassen',
            text2: 'Hoe doe je dit?'
        },
        material: [
        ],
        ingredient: [
        ],        
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Alles klaarleggen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Goed inzepen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Dit is nog een laatste stap',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            }
        ],
        task: {
            header: {
              order: 1
            },
            user: {
                firstname: 'Karin',    
                lastname: 'Foucart',    
                company: 'RVE Solutions',    
                group: 'Kitchen',
            },
            teacher: {
                firstname: 'Stef',    
                lastname: 'De Feyter',    
                course: 'MONGODB'
            },
        }
    })
    try {
        const result = await task.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }

}

createTask2();

async function createTask3(){
    const task = new Task({
        header: {
            tasktype: 'standard2',
            text1: 'Strijken',
            text2: 'Met een een stroomstrijkijzer'
        },
        material: [
            {
                order: 1,        
                text: 'Gedistilleerd water',
                amount: 10,
                uom: 'Liter'
            },
            {
                order: 2,        
                text: 'Stekkerdoos',
                amount: 1
            },
            {
                order: 3,        
                text: 'Strijkplank',
                amount: 1
            }
        ],
        ingredient: [
        ],        
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Alles klaarleggen',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Den tweede',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Dit is nog een laatste stap',
                textlines: [ 'eerste tekstlijn' , 'tweede tekstlijn', 'en nog eentje' , 'en nog eentje voor den tweede keer' ]  
            }
        ],
        task: {
            header: {
              order: 2
            },
            user: {
                firstname: 'Karin',    
                lastname: 'Foucart',    
                company: 'RVE Solutions',    
                group: 'Kitchen',
            },
            teacher: {
                firstname: 'Stef',    
                lastname: 'De Feyter',    
                course: 'MONGODB'
            },
        }         
    })
    try {
        const result = await task.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }

}

createTask3();

async function createTask4(){
    const task = new Task({
        header: {
            tasktype: 'standard3',
            text1: 'Spaghetti met tomaten en mozzarella',
            text2: '2 personen'
        },
        material: [
            {
                order: 1,        
                text: 'Aardappelmesje',
                amount: 1
            },
            {
                order: 2,        
                text: 'Blikopener',
                amount: 1
            },
            {
                order: 3,        
                text: 'Houten lepel',
                amount: 1
            }, 
            {
                order: 4,        
                text: 'Vergiet',
                amount: 1
            }, 
            {
                order: 5,        
                text: 'Steelpan',
                amount: 1
            },
            {
                order: 6,        
                text: 'Kookpot klein',
                amount: 1
            }, 
            {
                order: 7,        
                text: 'Snijplank',
                amount: 1
            }, 
        ],
        ingredient: [
            {
                order: 1,        
                text: 'Mozarella',
                amount: 1,
                uom: 'bol',
                allergen: ['Lactose'],
                nutriscore: 'A',
                price: 10.6
            },
            {
                order: 2,        
                text: 'Ui',
                amount: 1,
                uom: 'stuk',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },
            {
                order: 3,        
                text: 'Pijnboompit',
                amount: 1,
                uom: 'el',
                allergen: ['Noten'],
                nutriscore: 'A',
                price: 0.7
            },
            {
                order: 4,        
                text: 'Knoflook',
                amount: 1,
                uom: 'Teentje',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },
            {
                order: 5,        
                text: 'Olijfolie',
                amount: 1,
                uom: 'el',
                allergen: [],
                nutriscore: 'B',
                price: 1.6
            },
            {
                order: 6,        
                text: 'Kerstomaat',
                amount: 250,
                uom: 'gram',
                allergen: [],
                nutriscore: 'A',
                price: 0.6
            },            {
                order: 7,        
                text: 'Tomaat gepeld uit blik',
                amount: 400,
                uom: 'gram',
                allergen: [],
                nutriscore: 'A',
                price: 2.5
            },
            {
                order: 8,        
                text: 'Spaghetti',
                amount: 100,
                uom: 'gram',
                allergen: ['Gluten','Eieren'],
                nutriscore: 'C',
                price: 0.6
            },
            {
                order: 9,        
                text: 'Oregano gedroogd',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            },
            {
                order: 10,        
                text: 'Thijm',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            },
            {
                order: 11,        
                text: 'Peper en zout (PEZO)',
                uom: 'naar smaak',
                allergen: [],
                nutriscore: 'A',
                price: 0.1
            }
        ] ,       
        workflow: [
            {
                order: 1,
                screenformat: 'C0',
                steptext: 'Stap 1',
                steptitle: 'Pasta 1',
                textlines: [ 'Neem een kookpot.' , 'Doe water in de kookpot.' , 'Zet de kookpot op een hoog vuur.']  
            },
            {
                order: 2,
                screenformat: 'C0',
                steptext: 'Stap 2',
                steptitle: 'Pasta 2',
                textlines: [ 'Als het water levendig kookt.' , 'Doe de pasta in het kokend water' , 'Kijk op de verpakking hoe lang de pasta moet koken.' , 'Terwijl je wacht tot de pasta beetgaar is, mag je volgende stappen uitvoeren: zet het vergiet in de afwasbak, kook de pasta beetgaar en giet de pasta af in vergiet']  
            },
            {
                order: 3,
                screenformat: 'C0',
                steptext: 'Stap 3',
                steptitle: 'Pijnboompitten',
                textlines: [ 'Zet de steelpan op een hoog vuur.' , 'Rooster de pijnboompitten in de hete pan goudgeel.' , 'OPGELET: pijnboompitten verbranden heel snel!']  
            },
            {
                order: 4,
                screenformat: 'C0',
                steptext: 'Stap 4',
                steptitle: 'Ui',
                textlines: [ 'Pel een ui.' , 'Snij de ui doormidden.' , 'Snij de helft in reepjes.' , 'Versnipper de reepjes.']  
            },
            {
                order: 5,
                screenformat: 'C0',
                steptext: 'Stap 5',
                steptitle: 'Knoflook',
                textlines: [ 'Plet en schil de look.' , 'Versnijd de look zeer fijn.' ]  
            },
            {
                order: 6,
                screenformat: 'C0',
                steptext: 'Stap 6',
                steptitle: 'Kerstomaat',
                textlines: [ 'Was de kerstomaten.' , 'Snij de kerstomaten in twee.' ]  
            },
            {
                order: 7,
                screenformat: 'C0',
                steptext: 'Stap 7',
                steptitle: 'Mozzarella',
                textlines: [ 'Snijd de mozzarella in plakjes.' , 'Snijd de mozzarella plakjes in reepjes.' , 'Snij de mozzarella reepjes in blokjes.' ]  
            },
            {
                order: 8,
                screenformat: 'C0',
                steptext: 'Stap 8',
                steptitle: 'Blik openen',
                textlines: [ 'Doe de tomatenblik open met de blikopener.' ]  
            },
            {
                order: 9,
                screenformat: 'C0',
                steptext: 'Stap 9',
                steptitle: 'Saus maken',
                textlines: [ 'Zet de lege kookpot op een matig vuur.' , 'Doe de olijfolie in de kookpot' , 'Als de olie heet is doe je de ui in de kookpot.' , 'Stoof de ui glazig.' , 'Doe de knoflook bij in de kookpot.' , 'Stoof de ui en de knoflook.' , 'Voeg het blik tomaat bij de ui.' , 'Voeg de kerstomaten bij de ui.'  ]  
            },
            {
                order: 10,
                screenformat: 'C0',
                steptext: 'Stap 10',
                steptitle: 'Pasta Mengen',
                textlines: [ 'Voeg de uitgelekte pasta bij de saus.' , 'Meng de pasta en de saus.' , 'Voeg de mozzarella partjes bij de pasta.' , 'Meng alles zorgvuldig.' , 'Serveer de pasta in het bord.' , 'Strooi de pijnboompitten over de pasta.' ]  
            }
        ],
        task: {
            header: {
              order: 3
            },
            user: {
                firstname: 'Karin',    
                lastname: 'Foucart',    
                company: 'RVE Solutions',    
                group: 'Kitchen',
            },
            teacher: {
                firstname: 'Stef',    
                lastname: 'De Feyter',    
                course: 'MONGODB'
            },
        }              
    })
    try {
        const result = await task.save();
        console.log(result);
    }
    catch (ex){
        for (field in ex.errors)
        console.log(ex.errors[field].message);
    }

}

createTask4();


