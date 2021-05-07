var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

//calling the food class using foodobj
  foodObj = new Food();

//getting the Food from database and storing it in foodstock
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

//creating a dog sprite
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

//create feed the dog button will reduce the food whenever pressed
  addFood=createButton("Feed The Dog");
  addFood.position(680,95);
  addFood.mousePressed(feedDog);
  
//create add Food button will increase the food whenever pressed
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
//calling the display fuction from food class
  foodObj.display();

//write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

 //write code to display text lastFed time here using if else
  textSize(15)
  fill('white')
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"PM",300,30)
  }
  else if(lastFed==0){
    text("Last Feed :12 AM",300,30)
  }
  else{
    text("Last Feed:"+lastFed+"PM",300,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to reduce the Food when feedfood button clicked
function feedDog(){

//changed dog image as happy
  dog.addImage(happyDog);

//write code here to update food stock and last fed time
//calling the getfoodstock from food class
  var food_stock_val = foodObj.getFoodStock();

//if foodstock is lessthan 0 update the food stock to 0
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }
//else reduce the food by one
  else{
      foodObj.updateFoodStock(food_stock_val -1);
  }

//updating the changed food and feedtime in database 
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){

//foods is increamented everything add food button is pressed
  foodS++;

//updating food in the database
  database.ref('/').update({
    Food:foodS
  })
}