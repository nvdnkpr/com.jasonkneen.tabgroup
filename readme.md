# TabGroup for Alloy
## Overview
This is a widget for the [Appcelerator](http://www.appcelerator.com) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework which provides an iOS + Android TabGroup with enhanced customisation options.

The idea was to come up with something that could "just work" on both iOS and Android, and sit in the same position at the bottom of the screen for both, and wouldn't require too much integration changes.

### NOTE: This is very much "work in progress" and I'm tweaking as I use this in current projects

![TabGroup](https://raw.github.com/jasonkneen/images/master/tabGroup/ios.png)
![TabGroup](https://raw.github.com/jasonkneen/images/master/tabGroup/android.png)
![TabGroup](https://raw.github.com/jasonkneen/images/master/tabGroup/android2.png)

## Features
* Easy to add to existing XML
* Works with existing Window definitions
* Easy to customise
* Works on Android, iOS

### Wishlist
* more options for customisation, positioning (top / bottom)
* ability to open lightweight sub-windows in Android, keep TabGroup visible
* simulate left, right buttons and iOS style title bar in Android
* replace iOS titlebar with custom version with support for left, right buttons
* hide / show tabs dynamically, refresh
* custom, oversized tab buttons e.g. middle button
* click and hold - vertical (tweetbot style) sub tabs


## Quick Start
* [Download the latest version](https://github.com/jasonkneen/com.jasonkneen.tabgroup) of the widget as a ZIP file.
* Unzip the folder to your project under `app/widgets/com.jasonkneen.tabgroup`.
* Add the widget as a dependency to your `app/config.json` file:

```javascript
"dependencies": {
	"com.jasonkneen.tabgroup":"1.0"
}
```

* Add the widget as the last item in the view container you want to apply dynamic styles too, so your main window or view, just above the closing Window or View tags.

```xml
<Alloy>
    <Window>
        <Widget id="tabGroup" src="com.jasonkneen.tabgroup"/>
    </Window>
    <Window title="Tab 1" id="win1">
        <Label top="0">I am Window 1</Label>
    </Window>
    <Window title="Tab 2" id="win2" >
        <Label top="0">I am Window 2</Label>
    </Window>
    <Window title="Tab 3" id="win3" >
        <Label top="0">I am Window 3</Label>
    </Window>
    <Window title="Tab 4" id="win4" >
        <Label top="0">I am Window 4</Label>
    </Window>
</Alloy>
```

* Configure the widget from the controller .js file (current properties supported shown here)

```js
$.tabGroup.configure({
	backgroundColor : "#000",
	//backgroundImage : "PATH",

	tabs : {
		backgroundSelectedColor : "#666",
		color : "#DDD",
		selectedColor : "#fff",
		font : {
			fontWeight : "normal"
		},
		selectedFont : {
			fontWeight : "bold"
		}		
	}
});

$.tabGroup.addTab({
	caption : "Downloads",
	icon : "/images/icons/grey/516-archive-box.png",
	selectedIcon : "/images/icons/white/516-archive-box.png",
	win : $.win1,
	// view : custom Ti.UI.View
	// selectedView : custom Ti.UI.View for selected state
});

$.tabGroup.addTab({
	caption : "Settings",
	icon : "/images/icons/grey/519-tools-1.png",
	selectedIcon : "/images/icons/white/519-tools-1.png",
	win : $.win2
});

$.tabGroup.addTab({
	caption : "Save",
	icon : "/images/icons/grey/522-floppy-disk.png",
	selectedIcon : "/images/icons/white/522-floppy-disk.png",
	win : $.win3
});

$.tabGroup.addTab({
	caption : "Scoot",
	icon : "/images/icons/grey/530-scooter.png",
	selectedIcon : "/images/icons/white/530-scooter.png"
});

$.tabGroup.addTab({
	caption : "Fly",
	icon : "/images/icons/grey/533-helicopter.png",
	selectedIcon : "/images/icons/white/533-helicopter.png"
});

$.tabGroup.open();
```
## Quick Start

Methods & Properties:-

* .configure(dictionary) - set's up properties for tabGroup, default tabs

* .addTab(dictionary) - adds a new tab

* .open() - opens the Tabgroup

* .getActiveTab() - returns the current tab controller

* .setActiveTab(n) - sets the tab to n (0 - tabcount)

* .activeTab - current active tab

* .activeTab.open(win) - open a subwindow

## License

<pre>
Copyright 2013 Jason Kneen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
