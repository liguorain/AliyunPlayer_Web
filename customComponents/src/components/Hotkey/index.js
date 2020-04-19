/**
 * @file index.js
 */
 
 /**
  * @const {Object} defaultHotkeySet - 默认内置的热键
  */
 const defaultHotkeySet = { 
            // 内置默认事件  
            '32': function(){  // 空格键暂停/播放  
                if(this.paused()){  
                    this.play();  
                } else {  
                    this.pause();  
                }  
            },  
            '37': function(){  //“←”键  
                var next = this.getCurrentTime() - 10;  
                (next < 0) && (next = 0);  
                this.seek(next);  
            },  
            '38': function(){  // “↑”键加音量  
                var volume = this.getVolume() + 0.1;  
                (volume > 1) && (volume = 1);  
                this.setVolume(volume);  
            },  
            '39': function(){  // “→”键加进度  
                var next = this.getCurrentTime() + 10;  
                var duration = this.getDuration();
  
                (next > duration) && (next = duration);  
                this.seek(next);  
            },  
            '40': function(){  //“↓”键减音量  
                var volume = this.getVolume() - 0.1;  
                (volume < 0) && (volume = 0);  
                this.setVolume(volume);  
            }  
        };
  
 class HotkeyComponent{
     constructor({
         keySet = {},
         disableDefaultHotkey = false
     }){
         super();
         this.init(keySet, disableDefaultHotkey);
     }
     
     /**
      * @method init - 初始化用户及内置的热键
      * @param {Object} keySet - 键码-事件对应表
      * @param {Boolean} disableDefaultHotkey - 是否禁用默认键码表
      */
     init(keySet, disableDefaultHotkey){
        this.keyMap = Object.extends(keySet, disableDefaultHotkey && {} || defaultHotkeySet);
        
        return this;
     }
     
    /**
     * @method createEl
     */
    createEl(html, player){
       // 确保播放器区域可以监听键盘事件
        var that = this;  
        html.setAttribute('tabindex', 1);  
        html.style.outline = 'none';  
        html.addEventListener('mouseenter', function(){  
            html.focus();  
        }, false);  
        html.addEventListener('mouseleave', function(){  
            html.blur();  
        }, false);  
        html.addEventListener('keydown', function(e){  
            var event = e || window.event,  
                callback = that.keyMap[event.keyCode];  
            callback instanceof Function && callback.bind(player)();  
            event.stopPropagation();  
        });  
        setTimeout(function(){html.focus()}, 200);
    }
     
 }
 
 export default HotkeyComponent;
