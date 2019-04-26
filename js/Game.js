function Game(food,map,snake,block){
	this.food = food;
	this.map = map;
	this.snake = snake;
	this.block = block;
	this.flag= true;
	this.timer= null;
	this.init();
}
Game.prototype.init=function(){
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.start();
	this.bindEvent();
	this.renderBlock();
	
}
Game.prototype.renderMap=function(){
	this.map.fill();
}
Game.prototype.renderFood=function(){
	var row = this.food.x;
	var col = this.food.y;
	// this.map.arr[row][col].style.backgroundColor = "red";
	this.map.arr[row][col].style.backgroundImage = "url("+ this.food.img +")";
	this.map.arr[row][col].style.backgroundSize = "cover";

}
// 渲染蛇
Game.prototype.renderSnake=function(){
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" +this.snake.head_pic[this.snake.head_idx] + ")";
	for(i=1;i<this.snake.arr.length-1;i++){
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor = "green";
		this.map.arr[row][col].style.backgroundImage = "url(" +this.snake.body_pic[0] + ")";
	}
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" +this.snake.tail_pic[this.snake.tail_idx] + ")";
}
// 渲染障碍物
Game.prototype.renderBlock=function(){
	for (i = 0 ; i < this.block.arr.length; i++){
		var col = this.block.arr[i].col;
		var row = this.block.arr[i].row;
		this.map.arr[row][col].style.backgroundImage = "url("+this.block.img+")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}
// 游戏开始
Game.prototype.start=function(){
	var me =this;
	this.timer =setInterval(function(){
		
		// 移动
		me.snake.move();
		me.checkMap();
		me.checkFood();
		me.checkSnake();
		me.checkBlock();
		if(me.flag){
		me.map.clean();
			// 渲染实物
		me.renderFood();
		me.renderSnake();
		me.renderBlock();
		}
		
	},200)
	
}
Game.prototype.bindEvent=function(){
	var me = this;
	document.onkeydown=function(e){
		var code = e.keyCode;
		if(code === 37||code === 38||code === 39||code === 40){
			me.snake.change(code);
			// console.log(code);
		}
	}
}
// 游戏结束
Game.prototype.gameOver=function(){
	this.flag = false;
	clearInterval(this.timer);
}
// 边界判定
Game.prototype.checkMap=function(){
	var head = this.snake.arr[this.snake.arr.length-1];
	// console.log( this.snake.arr);
	if(head.row < 0|| head.row >= this.map.row ||head.col<0 || head.col >= this.map.col){
		
		console.log("撞到了");
		this.gameOver();
	}
}
/*******************************************************/ 

// 检测吃到实物
Game.prototype.checkFood=function(){
	var head = this.snake.arr[this.snake.arr.length-1];
	var food = this.food;
	// console.log(food);
	if(head.row===food.x && head.col===food.y){
		console.log("吃到实物了");
		this.snake.growUp();
		this.resetFood();
	}
}
// 检测是否撞到障碍物
Game.prototype.checkBlock = function(){
	var head = this.snake.arr[this.snake.arr.length-1];
	for (i = 0;i < this.block.arr.length;i++){
		var one =this.block.arr[i];
		if(head.row === one.row  && head.col === one.col){
			console.log("撞到障碍物");
			this.gameOver();
		}
	}
}
// 检测是否吃到自己
Game.prototype.checkSnake = function(){
	var head = this.snake.arr[this.snake.arr.length-1];
	for (i = 0;i < this.snake.arr.length-1;i++){
		var one =this.snake.arr[i];
		if(one.row ===head.row  && one.col === head.col){
			console.log("吃到自己了");
			clearInterval(this.timer);
		}
	}
}
// 重置方法
Game.prototype.resetFood=function(){
	var row = parseInt(Math.random()*this.map.row);
	var col = parseInt(Math.random()*this.map.col);
	for (i = 0;i < this.snake.arr.length;i++){
		var one =this.snake.arr[i];
		if(one.row ===row  && one.col === col){
			alert("重合到蛇身上了");
			this.resetFood();
			return;
		}
	}
	for (i = 0;i < this.block.arr.length;i++){
		var one =this.block.arr[i];
		if(one.row ===row  && one.col === col){
			alert("重合到障碍物上了");
			this.resetFood();
			return;
		}
	}
	console.log(row,col);
	this.food.reset(row,col); 
}