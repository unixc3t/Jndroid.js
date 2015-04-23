function LinearLayout() {
    ViewGroup.apply(this, []);

    this.HORIZONTAL = 0;
    this.VERTICAL = 1;

    var mOrientation = this.VERTICAL;

    this.setOrientation = function(orientation) {
        mOrientation = orientation;
        this.requestLayout();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
		var h;
		var i;
		var child;
        if (mOrientation == this.VERTICAL) {
            var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
            var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
            h = this.getPaddingTop() + this.getPaddingBottom();
            for (i = 0; i < this.getChildCount(); i++) {
                child = this.getChildAt(i);
                child.measure(MeasureSpec.makeMeasureSpec(childWidth, MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(childHeight, MeasureSpec.EXACTLY));
                h += child.getMeasuredHeight();
            }
            this.setMeasuredDimension(width, h);
        } else {
            h = this.getPaddingTop() + this.getPaddingBottom();
            var w = this.getPaddingLeft() + this.getPaddingRight();
            for (i = 0; i < this.getChildCount(); i++) {
                child = this.getChildAt(i);
                child.measure(widthMS, heightMS);
                w += child.getMeasuredWidth();
            }
            if (this.getChildCount() > 0) {
                h += this.getChildAt(0).getMeasuredHeight();
            }
            this.setMeasuredDimension(w, h);
        }
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();

		var i;
		var child;
        if (mOrientation == this.VERTICAL) {
            for (i = 0; i < this.getChildCount(); i++) {
                child = this.getChildAt(i);
                child.layout(offsetX, offsetY);
                offsetY += child.getMeasuredHeight();
            }
        } else {
            for (i = 0; i < this.getChildCount(); i++) {
                child = this.getChildAt(i);
                child.layout(offsetX, offsetY);
                offsetX += child.getMeasuredWidth();
            }
        }

    };
}

function FrameLayout() {
    ViewGroup.apply(this, []);

    this.onMeasure = function(width, height) {
        var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            child.measure(childWidth, childHeight);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            child.layout(offsetX, offsetY);
        }
    };
}

function ScrollView() {
    ViewGroup.apply(this, []);

    this.getDiv().style.overflow = "auto";

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            var contentWidth = width - this.getPaddingLeft() - this.getPaddingRight();
            child.measure(contentWidth, heightMS);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            child.layout(offsetX, offsetY);
        }
    };
}

function Button() {
    ViewGroup.apply(this, []);

    this.setWillNotDraw(false);
    this.setBackgroundColor("#cccccc");

    this.getDiv().style.textAlign = "center";

    //var mInterval = null;
    //var mPressRadius = 5;
    //
    //this.onInterval = function(obj) {
    //    mPressRadius += 10;
    //    obj.invalidate();
    //}

    addTouchListener(this);

    this.registerTouchEvent = function() {
        this.getDiv().addEventListener("touchstart", this.touchStart, false);
        this.getDiv().addEventListener("touchend", this.touchEnd, false);
        this.getDiv().addEventListener("touchcancel", this.touchCancel, false);
    };

    this.registerTouchEvent();

    this.touchStart = function(event) {
        this.style.background = "#999999";
        //var button = findTouchObject(this);
        //mInterval = setInterval(button.onInterval, 100, button);
    };

    this.touchEnd = function(event) {
        this.style.background = "#cccccc";
    };

    this.touchCancel = function(event) {
        this.style.background = "#cccccc";
    };

    this.setText = function(text) {
        var div = document.createElement("div");
        div.style.width = "100%";
        div.style.lineHeight = "36px";
        div.style.position = "absolute";
        div.style.textAlign = "center";
        div.style.left = 0;
        div.style.top = 0;
        div.innerHTML = text;
        this.getDiv().appendChild(div);
    };

    this.onMeasure = function(width, height) {
        this.setMeasuredDimension(120, 36);
    };

    this.onDraw = function(canvas) {
        //canvas.beginPath();
        //canvas.arc(20, 15, mPressRadius, 0, Math.PI * 2, true);
        //canvas.closePath();
        //canvas.fillStyle = 'rgba(0,255,0,0.25)';
        //canvas.fill();
    };
}

function ImageView() {
    ViewGroup.apply(this, []);

    var mSrc = null;
    var mImg = null;

    this.getDiv().style.display = "table-cell";
    this.getDiv().style.textAlign = "center";
    this.getDiv().style.verticalAlign = "middle";

    this.setImgSrc = function(src) {
        mSrc = src;

        mImg = document.createElement("img");
        mImg.src = src;
        mImg.style.verticalAlign = "middle";
        mImg.setAttribute("alt"," ");
        this.getDiv().appendChild(mImg);
    };

    this.setImgWidth = function(width) {
        mImg.style.width = width + "px";
    };

    this.setImgHeight = function(height) {
        mImg.style.height = height + "px";
    };

    this.onMeasure = function (width, height) {
        this.getDiv().style.lineHeight = height + "px";

        this.setMeasuredDimension(width, height);
    };
}

function TextView() {
    ViewGroup.apply(this, []);

    var mGravity = 0;
    var mTextSize = 12;
    var mSingleLine = false;
    var mContent = document.createElement("div");
    mContent.style.overflow = "auto";
    mContent.style.whiteSpace = "normal";
    this.getDiv().appendChild(mContent);

    this.getText = function() {
        return mContent.innerHTML;
    };

    this.setText = function(text) {
        mContent.innerHTML = text;

        this.requestLayout();
        this.getDiv().scrollTop = "100px";
    };

    this.setTextColor = function(color) {
        mContent.style.color = Utils.toCssColor(color);
    };

    this.setTextSize = function(textsize) {
        mTextSize = textsize;
        mContent.style.fontSize = textsize + "px";
    };

    this.setLineHeight = function(lineHeight) {
        //mContent.style.lineHeight = lineHeight + "px";
    };

    this.setSingleLine = function(singleLine) {
        mSingleLine = singleLine;
        if (mSingleLine) {
            mContent.style.whiteSpace = "nowrap";
        } else {
            mContent.style.whiteSpace = "normal";
        }
        this.requestLayout();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var mode = MeasureSpec.getMode(heightMS);

        mContent.style.width = (width - this.getPaddingLeft() - this.getPaddingRight()) + "px";
        mContent.style.height = "100%";
        mContent.style.left = this.getPaddingLeft() + "px";

        var measureDiv = document.createElement("div");
        measureDiv.style.width = mContent.style.width;
        measureDiv.style.height = "100%";
        measureDiv.style.lineHeight = mContent.style.lineHeight;
        measureDiv.style.fontSize = mContent.style.fontSize;
        measureDiv.style.whiteSpace = mContent.style.whiteSpace;
        measureDiv.innerHTML = mContent.innerHTML;
        mHideDiv.appendChild(measureDiv);

        if (measureDiv.clientHeight !== 0) {
            var measureHeight = measureDiv.clientHeight;
            if (mode == MeasureSpec.UNSPECIFIED) {
                height = measureHeight;
            } else {
                if (mode != MeasureSpec.EXACTLY && height < measureHeight) {
                    height = measureHeight;
                } else {
                    if (height > measureHeight) {
                        mContent.style.clientHeight = measureHeight + "px";
                        mContent.style.height = "auto";
                        mContent.style.position = "absolute";
                        if (mGravity & Gravity.CENTER_VERTICAL) {
                            mContent.style.top = (height - measureHeight) / 2 + "px";
                        } else if (mGravity & Gravity.BOTTOM) {
                            mContent.style.top = (height - measureHeight) + "px";
                        } else {
                            mContent.style.top = 0 + "px";
                        }
                    }
                }
            }
        }
        mHideDiv.removeChild(measureDiv);

        mHideDiv.style.width = "auto";
        mHideDiv.style.height = "auto";

        this.setMeasuredDimension(width, height);

    };

    this.setGravity = function(gravity) {
        mGravity = gravity;

        if (gravity & Gravity.CENTER_HORIZONTAL) {
            this.getDiv().style.textAlign = "center";
        } else if (gravity & Gravity.RIGHT) {
            this.getDiv().style.textAlign = "right";
        } else {
            this.getDiv().style.textAlign = "left";
        }

    };
}

function EditText() {
    ViewGroup.apply(this, []);

    var mTag = "EditText" + (new Date()).getTime();

    var mInput;

    this.addInput = function() {
        this.getDiv().innerHTML = "";

        mInput = document.createElement("input");
        mInput.type = "text";
        mInput.style.position = "absolute";
        mInput.style.background = "none";
        mInput.style.border = "0";
        mInput.style.outline = "none";
        mInput.style.boxSizing = "border-box";

        this.getDiv().appendChild(mInput);
    };
    this.addInput();

    this.addTextArea = function() {
        this.getDiv().innerHTML = "";

        mInput = document.createElement("textarea");
        mInput.type = "text";
        mInput.style.boxSizing = "border-box";
        mInput.style.position = "absolute";
        mInput.style.background = "none";
        mInput.style.border = "0";
        mInput.style.outline = "none";
        mInput.style.boxSizing = "border-box";

        this.getDiv().appendChild(mInput);
    };

    this.setSingleLine = function(s) {
        if (s) {
            this.addInput();
        } else {
            this.addTextArea();
        }
    };

    this.setSelection = function(start, end) {
        mInput.selectionStart = start;
        if (end === undefined) {
            mInput.selectionEnd = start;
        } else {
            mInput.selectionEnd = end;
        }
    };

    this.getSelectionStart = function() {
        return mInput.selectionStart;
    };

    this.getSelectionEnd = function() {
        return mInput.selectionEnd;
    };

    this.setTextChangedListener = function(listener) {
        mInput.oninput = listener;
    };

    this.getText = function() {
        return mInput.value;
    };

    this.setText = function(text) {
        mInput.value = text;
    };

    this.setTextSize = function(size) {
        mInput.style.fontSize = size + "px";
    };

    this.setTextColor = function(color) {
        mInput.style.color = Utils.toCssColor(color);
    };

    this.setHintText = function(text) {
        mInput.placeholder = text;
    };

    this.setHintColor = function(color) {
        var css = document.createElement("style");
        css.innerHTML = "." + mTag + "::-webkit-input-placeholder{ color:" + Utils.toCssColor(color) + "}";
        document.head.appendChild(css);
        mInput.className += mTag + " ";
    };

    this.requestFocus = function() {
        mInput.focus();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        var contentWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var contentHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        mInput.style.width = contentWidth + "px";
        mInput.style.height = contentHeight + "px";

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        mInput.style.top = this.getPaddingTop() + "px";
        mInput.style.left = this.getPaddingLeft() + "px";
    };
}

function WebView() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor("#ffffff");

    var mFrame = document.createElement("iframe");
    mFrame.style.border = "none";
    this.getDiv().appendChild(mFrame);

    this.setSrc = function(src){
        mFrame.src = src;
    };

    this.getFrame = function() {
        return mFrame;
    };

    this.onMeasure = function(width, height) {
        mFrame.style.width = width + "px";
        mFrame.style.height = height + "px";
        this.setMeasuredDimension(width, height);
    };
}