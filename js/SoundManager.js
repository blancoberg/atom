function SoundManager(){
  this.sounds = [];
  this.listener = new THREE.AudioListener();
  this.filesLoaded = 0;
  camera.add( this.listener );
}

SoundManager.prototype.loadSounds = function(list){

    this.data = list;
    for(var i = 0;i<list.length;i++){



      /*
      var sound = new Howl({
        src: [list[i].src],
        loop : list[i].loop,
        html5: list[i].html5
      });
      this.sounds[list[i].id] = sound;
      console.log("load sound",list[i].src)

      console.log("sound volume",sound)
      */


      this.loadSound(list[i])
    }


}

SoundManager.prototype.loadSound = function(data){

  var id = data.id;
  var src = data.src;
  var t = this;
  var audio = new THREE.Audio( this.listener );
  var loader = new THREE.AudioLoader();

  loader.load(src,function(buffer){
    audio.setBuffer(buffer);
    t.onAudioLoaded();
  });

  this.sounds[id] = {audio:audio,loaded:loader};
}

SoundManager.prototype.onAudioLoaded = function(){

  this.filesLoaded++;
  console.log("audio loaded")
  //audio.setBuffer()
  if(this.filesLoaded== this.data.length){
    if(this.onLoad)
      this.onLoad();
  }
}

SoundManager.prototype.playSound = function(id,loop){


  var sound = this.sounds[id].audio;
  sound.setLoop( loop );
  //sound.setVolume(0);
  sound.play();
  //this.sounds[id].seek(where);

  this.sounds[id]._playingElement = sound;
}

SoundManager.prototype.setPitch = function(id,value){

  //console.log("pitch",id,value)
  if(this.sounds[id].audio.source && this.sounds[id].audio.source.detune)
    this.sounds[id].audio.source.detune.value = Math.round((value-1) * 600);
  //this.sounds[id].audio.play();

}

SoundManager.prototype.setVolume = function(id,value,smooth=false){

  if(this.sounds[id] && this.sounds[id].audio)
    this.sounds[id].audio.setVolume(value);
  /*
  if(smooth){
    console.log("smooth",this.sounds[id]._volume);
    //this.sounds[id].volume(this.sounds[id]._volume + (value-this.sounds[id]._volume*0.5),this.sounds[id]._playingElement);
    //this.sounds[id]._volume+=(value- this.sounds[id]._volume)*0.1;
    //this.sounds[id].fade(this.sounds[id]._volume,value,1000,this.sounds[id]._playingElement);
  }else{
    this.sounds[id].volume(value,this.sounds[id]._playingElement);
  }
  */

}
