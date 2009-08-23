Ext.ns('Ext.ux');

Ext.ux.MultipleIconsButton = Ext.extend(Ext.Toolbar.Button, {
    getTemplateArgs : function(){
        var cls = (this.cls || '');
        cls += (this.iconCls || this.icon || this.icons) ? (this.text ? ' x-btn-text-icon' : ' x-btn-icon') : ' x-btn-noicon';
        if(this.pressed){
            cls += ' x-btn-pressed';
        }
        return [this.text || '&#160;', this.type, this.iconCls || '', cls, 'x-btn-' + this.scale + ' x-btn-icon-' + this.scale + '-' + this.iconAlign, this.getMenuClass()];
    },
    initButtonEl : function(btn, btnEl){
        this.el = btn;

        if(this.id){
            this.el.dom.id = this.el.id = this.id;
        }
        if(this.icons){
        	this.iconIndex = 0;
    		this.icon = this.icons[0];
        }
        if(this.icon){
        	if(Ext.isArray(this.icon)){ //handles icon/icons typo
        		this.icons = this.icon;
        		this.iconIndex = 0;
        		this.icon = this.icons[0];
        	}
            btnEl.setStyle('background-image', 'url(' +this.icon +')');
        }
        if(this.tabIndex !== undefined){
            btnEl.dom.tabIndex = this.tabIndex;
        }
        if(this.tooltip){
            this.setTooltip(this.tooltip, true);
        }

        if(this.handleMouseEvents){
            this.mon(btn, {
                scope: this,
                mouseover: this.onMouseOver,
                mousedown: this.onMouseDown
            });
            
            // new functionality for monitoring on the document level
            //this.mon(btn, 'mouseout', this.onMouseOut, this);
        }

        if(this.menu){
            this.mon(this.menu, {
                scope: this,
                show: this.onMenuShow,
                hide: this.onMenuHide
            });
        }

        if(this.repeat){
            var repeater = new Ext.util.ClickRepeater(btn, Ext.isObject(this.repeat) ? this.repeat : {});
            this.mon(repeater, 'click', this.onClick, this);
        }
        
        this.mon(btn, this.clickEvent, this.onClick, this);
    },
    onClick : function(e){
        if(e){
            e.preventDefault();
        }
        if(e.button !== 0){
            return;
        }
        if(!this.disabled){
        	if(this.icons){
        		this.setNextIcon();
        	}
            if(this.enableToggle && (this.allowDepress !== false || !this.pressed)){
                this.toggle();
            }
            if(this.menu && !this.menu.isVisible() && !this.ignoreNextClick){
                this.showMenu();
            }
            this.fireEvent('click', this, e);
            if(this.handler){
                //this.el.removeClass('x-btn-over');
                this.handler.call(this.scope || this, this, e);
            }
        }
    },
    setNextIcon : function(){
    	this.iconIndex++;//next icon
    	this.iconIndex%=this.icons.length;//restart at 0 if needed
    	this.icon = this.icons[this.iconIndex];
    	this.el.child('button').setStyle('background-image','url('+this.icon+')');
    }
});

Ext.reg('mibutton',Ext.ux.MultipleIconsButton);
