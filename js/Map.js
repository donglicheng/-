function Map(row,col,width,height){
	this.col = col;
	this.row = row;
	this.width = width;
	this.height = height;
	this.arr = [];
	this.dom = document.createElement("div")
}
Map.prototype.fill=function(){
	for(j=0;j<this.row;j++){
		var row_dom=document.createElement("div");
		var arr_row=[];
		row_dom.className="row"
		for(i=0;i<this.col;i++){
			var col_dom=document.createElement("span");
			col_dom.className = "col";
			row_dom.appendChild(col_dom);
			arr_row.push(col_dom);
		}
		this.dom.appendChild(row_dom)
		this.arr.push(arr_row); 
		this.dom.className="box";
	}
	document.body.appendChild(this.dom);
}
// 清屏
Map.prototype.clean=function(){
	for(j=0;j<this.arr.length;j++){
		for(i=0;i<this.arr[j].length;i++){
			// this.arr[j][i].style.backgroundColor = "white";
			this.arr[j][i].style.backgroundImage = "none";

		}
	}
}