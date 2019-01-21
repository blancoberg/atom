var activeSlider;

function RangeSlider(obj,param,min,max){

  this.over = false;
  this.object = obj;
  this.param = param;

  this.label = document.createElement("span");
  this.label.className="slider--label";
  this.label.innerText = param;
  this.value = this.object[param];
  console.log("new rangeslider",param,this.value)
  this.dom = document.createElement("input");
  this.dom.setAttribute("type","range");
  this.dom.setAttribute("min",min);
  this.dom.setAttribute("max",max);
  this.dom.setAttribute("value",this.value);
  this.dom.className="slider";

  this.dom.oninput  = this.onChangeInternal.bind(this);

  this.dom.onmouseover = this.onMouseOver.bind(this);
  this.dom.onmouseout = this.onMouseOut.bind(this);
  this.dom.onmousedown = this.onStart.bind(this);
  window.addEventListener("mouseup",this.onEnd.bind(this));
}

RangeSlider.prototype.appendTo = function(el){
  el.appendChild(this.label);
  el.appendChild(this.dom);
}

RangeSlider.prototype.onMouseOver = function(e){
  TweenLite.to(this.dom,0.2,{opacity:1})
  //console.log("onmouseover")
  this.over = true;
}

RangeSlider.prototype.onMouseOut = function(e){
  if(activeSlider != this){
    TweenLite.to(this.dom,0.2,{opacity:0.2})
  }
  this.over=false;
}

RangeSlider.prototype.onStart = function(e){
  activeSlider = this;
}

RangeSlider.prototype.onEnd = function(e){
  if(this.over == false){
    this.onMouseOut()
  }
  activeSlider = null;
}

RangeSlider.prototype.text = function(s){
  this.label.innerText = s;
}

RangeSlider.prototype.step = function(s){
  this.dom.step = s;
  this.dom.setAttribute("value",this.value);
}

RangeSlider.prototype.onChange = function(callback){
  this.onChangeCallback = callback;
}

RangeSlider.prototype.onChangeInternal = function(){
  //console.log("on change internal")

  this.value = this.dom.value;
  this.object[this.param] = this.dom.value;
  if(this.onChangeCallback)
    this.onChangeCallback(this);
}
