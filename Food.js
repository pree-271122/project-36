class Food {
    constructor(){
    //creating variables to store foodstock, lastfed 
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Milk.png');
    }
//updating the Food
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
//Getting the lastFed time
   getFedTime(lastFed){
     this.lastFed=lastFed;
   }
//check the food
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
//get the changed foodstock
    getFoodStock(){
      return this.foodStock;
    }
//display the milk bottle ie., the Food
    display(){
      var x=80,y=100;
//firest bottle position      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
//displaying the food using if only 10 bottles per row    
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
//added food bottles
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
