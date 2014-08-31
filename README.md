# ezslider


A very simple jQuery plugin for slideshows iOS-style bullets on mobile devices.  No bells and whistles.


## Install

Node:

    npm install ezslider

Browser:

Since <em>ezslider</em> requires [HammerJS](http://hammerjs.github.io/) and [JQuery](http://jquery.org) to function, you can either include the dependencies yourself as follows:

    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="//hammerjs.github.io/dist/hammer.min.js"></script>
    <script src="//raw.githubusercontent.com/Like-Falling-Leaves/ezslider/master/dist/ezslider.css"></script>
    <script src="//raw.githubusercontent.com/Like-Falling-Leaves/ezslider/master/dist/ezslider.bullets.js"></script>
    <script src="//raw.githubusercontent.com/Like-Falling-Leaves/ezslider/master/dist/ezslider.js"></script>

Or, you can use the version which rolls up [HammerJS](http://hammerjs.github.io/):

    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="//raw.githubusercontent.com/Like-Falling-Leaves/ezslider/master/dist/ezslider.all.js"></script>

<p style="border: 1px solid red"> <em>Note #1<em> The first version (<em>ezslider.js</em>) above does not include the <em>bullets</em> plugin -- that should be included manually.  The second one (<em>ezslider.all.js</em>) rolls in the <em>bullet</em> plugin as well. </p>

<p style="border: 1px solid red"> <em>Note #2<em> The first version (<em>ezslider.js</em>) does not include styles required so you have to explicitly include the styles (see <em>ezslider.css</em> for sample styles).  The second one (<em>ezslider.all.js</em>) includes the styles by default though it can be disabled via options so you can still override them if you would like.

## Usage

<em>Examples</em>: All the examples use the following HTML

```html
<div class="slider">
   <div class="item">
      <p>This is the first slider item.</p>
      <p>Second Paragrah</p>
   </div>
   <div class="item">
      <p>This is the second slider item.</p>
      <p>Second Paragrah</p>
   </div>
   <div class="item">
      <p>This is the third slider item.</p>
   </div>
</div>
```

<em>Example #1</em>: Barebones with no styles loaded and no bullets

```javascript
   $(function () {
       $('.slider).slider({
           noStyles: true,
           bullets: false
       });
   });
```

<em>Example #2</em>: Bare-bones slider but use default styles

```javascriopt
   $(function () {
       $('.slider).slider({
           bullets: false
       });
   });
```

<em>Example #3</em>: Slider with bullets but not styles

```javascriopt
   $(function () {
       $('.slider).slider({
           noStyles: true,
           bullets: {noStyles: true}
       });
   });
```

<em>Example #3</em>: Slider with bullets and default styles

```javascriopt
   $(function () {
       $('.slider).slider({});
   });
```

