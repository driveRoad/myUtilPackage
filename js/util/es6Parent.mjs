 class Parent {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  show() {
    console.log("parent x:" + this.x);
    console.log("parent y:" + this.y);
  }

}

export default Parent;