const inquirer = require('inquirer');

class Pet {
    name ="";
    happinessLevel = 50;
    hungerLevel = 50;
    tirednessLevel = 0;

    sleep(){
        setTimeout(() => {
            this.tirednessLevel = 0;
            console.log(`${this.name} has woke up and is energitic`);
        }, 5000);
    }

    displayStats(){
        console.log(`${this.name}'s happiness is ${this.happinessLevel}, hunger is ${this.hungerLevel} and tiredness is ${this.tirednessLevel}`)
    }

    run(){
        console.clear();
        this.firstQuestion();
    }

    notValid(){
        console.log("Answer not valid. Enter yes or no.");
        this.secondQuestion();
    }

    firstQuestion(){
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "What would you like to name your pet?"
                }
            ])
            .then(answer => {
                this.name = answer.name;
                this.secondQuestion();
            });
    };

    secondQuestion(){
        inquirer
            .prompt([{
                name: "playResponse",
                type: "input",
                message: "Do you want to play with your pet? yes:no"
            }])
            .then(answer => {
                if((!(answer.playResponse === "yes") && !(answer.playResponse === "no"))){
                    this.notValid();
                }else if(answer.playResponse === "yes"){
                    if(this.hungerLevel >= 10){
                        this.happinessLevel += 10;
                        this.hungerLevel -= 10;
                        this.tirednessLevel =+ 10;
                        console.log(`${this.name} is eager to play with you.`);
                        this.displayStats();
                        this.thirdQuestion();
                    } else {
                        console.log(`${this.name} is too hungry to play anymore`)
                        this.displayStats();
                        this.thirdQuestion();
                    }
                }
                
            })
    }

    thirdQuestion(){
        inquirer
            .prompt([{
                name: "feedResponse",
                type: "input",
                message: "Do you want to feed your pet? yes:no"
            }])
            .then(answer => {
                if(answer.feedResponse  === "yes"){
                    this.hungerLevel += 10;
                } else if(this.tirednessLevel > 90){
                    console.log(`${this.name} is tired and goes to sleep.`);
                    this.sleep();
                };
                this.fourthQuestion();
            })
    }

    fourthQuestion(){
        inquirer
            .prompt([{
                name: "keepPlaying",
                type: "input",
                message: "Do you want to keep playing?"
            }])
            .then(answer =>{
                if(answer.keepPlaying === "yes"){
                    this.secondQuestion();
                } else {
                    console.log(`${this.name} is sad to see you go.`);
                }
            })
    }
       
};


let myPet = new Pet();
myPet.run();
