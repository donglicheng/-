function Snake(pic_obj){
	this.arr = [
	{row:4,col:4},
	{row:4,col:5},
	{row:4,col:6},
	{row:4,col:7},
	{row:4,col:8}
	];
	this.direction = 39;
	this.lock = true;
	this.head_pic = pic_obj.head_pic;
	this.body_pic = pic_obj.body_pic ;
	this.tail_pic = pic_obj.tail_pic;
	this.head_idx = 2;
	this.tail_idx = 0;

	
}
Snake.prototype.move=function(){
	// console.log(arr.length - 1);
	var newhead = {
		row : this.arr[this.arr.length - 1].row,
		col : this.arr[this.arr.length - 1].col,
	}
	// var nowhead={
	// 	row : this.arr[arr.length-1].row,
	// 	col : this.arr[arr.length-1].col,
	// }
	if(this.direction===37){
		newhead.col--;
	}else if(this.direction===38){
		newhead.row--;
	}else if(this.direction===39){
		newhead.col++;
	}else if(this.direction===40){
		newhead.row++;
	}
	this.arr.push(newhead);
	// console.log(this);
	// 
	this.arr.shift();

	this.lock =true;
	var tail = this.arr[0];
	var pg = this.arr[1];
	if(tail.row === pg.row){
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}else {
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	}
}
Snake.prototype.change=function(direction){
	if(!this.lock){
		return;
	}
	lock = false;
	var result=Math.abs(direction-this.direction);
	if(result===2||result===0){
		return;
	}else{
		this.direction = direction;
	}
	if(direction===37){
		this.head_idx = 0;
	}else if(direction === 38){
		this.head_idx = 1;
	}else if (direction === 39){
		this.head_idx = 2;
	}else if(direction === 40){
		this.head_idx = 3;
	}
}
// 社生长
Snake.prototype.growUp=function(){
	var tail =this.arr[0];
	this.arr.unshift(tail);
}