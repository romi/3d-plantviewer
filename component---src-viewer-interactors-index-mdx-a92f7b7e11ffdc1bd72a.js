(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{JeXg:function(e,t,o){"use strict";o.r(t),o.d(t,"divStyle",(function(){return d})),o.d(t,"_frontmatter",(function(){return h})),o.d(t,"default",(function(){return f}));o("yvkl"),o("abGl");var n=o("mXGw"),r=o("/FXl"),a=o("TjRS"),i=o("ZFoC"),c=o("pPxZ"),l=o("gUpa"),s=o("R5RZ"),b=o("LTjw");o("aD51");function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}function u(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}const d={display:"flex",flexDirection:"row",justifyContent:"center"};void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"divStyle",filename:"src/Viewer/Interactors/index.mdx"}});const h={};void 0!==h&&h&&h===Object(h)&&Object.isExtensible(h)&&!h.hasOwnProperty("__filemeta")&&Object.defineProperty(h,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Viewer/Interactors/index.mdx"}});const m={divStyle:d,_frontmatter:h},y=a.a;function f(e){let{components:t}=e,o=u(e,["components"]);return Object(r.b)(y,p({},m,o,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"3d-view-interactors"},"3D view interactors"),Object(r.b)("h2",{id:"types-of-interactors"},"Types of interactors"),Object(r.b)("p",null,"If you're launched the app and opened a plant reconstruction, you noticed there\nare some interactors in the 3d view. Some enable or disable layers, other make\ncolor pickers or other tools appear (with the help of a\n",Object(r.b)("a",p({parentName:"p"},{href:"/plant-3d-explorer/Components/UI#menubox"}),"MenuBox")," for example)."),Object(r.b)("p",null,"Here's a quick summary of each type of interactors:"),Object(r.b)("h3",{id:"camera"},"Camera"),Object(r.b)("p",null,"These 2 interactors are in the center and control the display of\ncameras in 3D space. The second one resets the 3D view."),Object(r.b)("h3",{id:"layers"},"Layers"),Object(r.b)("p",null,"Those are what controls the display of the different layers of the 3D view."),Object(r.b)("h3",{id:"tools"},"Tools"),Object(r.b)("p",null,"Those are displayed below the layers, and contain some tools related to each\ncorresponding layer, for example color pickers for each layer."),Object(r.b)("h3",{id:"misc"},"Misc"),Object(r.b)("p",null,"Those are on the right and contain miscellaneous tools like background color\nor the snapshot tool."),Object(r.b)("h3",{id:"overlay"},"Overlay"),Object(r.b)("p",null,"This is a special set of interactors. Designed to display stuff on top of the\n3D view, at the time of writing this, it only manages the bubbles that appear\nwhen clicking on an organ."),Object(r.b)("h2",{id:"interactor"},"Interactor"),Object(r.b)("h3",{id:"description"},"Description"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"Interactor")," component is the basic interactive building block of those\nbuttons."),Object(r.b)("h3",{id:"props"},"Props"),Object(r.b)(i.d,{of:c.a,mdxType:"Props"}),Object(r.b)("h3",{id:"example"},"Example"),Object(r.b)(i.c,{__position:1,__code:"() => {\n  const [active, setActive] = useState(false)\n  return (\n    <Interactor\n      activated={active}\n      onClick={() => {\n        setActive(!active)\n      }}\n    />\n  )\n}",__scope:{props:o,DefaultLayout:a.a,Props:i.d,Playground:i.c,Interactor:c.b,DocInteractor:c.a,useState:n.useState,ToolButton:l.a,tools:l.b,ObjectFormatter:s.a,SketchPicker:b.SketchPicker,DefaultLayout:a.a,divStyle:d,_frontmatter:h},mdxType:"Playground"},()=>{const{0:e,1:t}=Object(n.useState)(!1);return Object(r.b)(c.b,{activated:e,onClick:()=>{t(!e)},mdxType:"Interactor"})}),Object(r.b)("p",null,"This example is simply an interactor that toggles from active to inactive\nwhen clicking on it. Interactors are basically a button, of course, it needs\nto be associated with things like ",Object(r.b)("a",p({parentName:"p"},{href:"/plant-3d-explorer/Components/UI#menubox"}),"MenuBox")),Object(r.b)("h2",{id:"toolbutton"},"Toolbutton"),Object(r.b)("h3",{id:"description-1"},"Description"),Object(r.b)("p",null,"The Toolbutton is not a functional component in itself but a group\nof components assembled together to make it easier to create tools."),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"index.js")," file contains, alongside the ToolButton component, an object\ncalled tools, that associates tool names with numbers to keep track\nof which tool is currently active easily."),Object(r.b)("p",null,"Here's the tool object :"),Object(r.b)(s.a,{object:l.b,mdxType:"ObjectFormatter"}),Object(r.b)("h3",{id:"props-1"},"Props"),Object(r.b)(i.d,{of:l.a,mdxType:"Props"}),Object(r.b)("h3",{id:"example-1"},"Example"),Object(r.b)(i.c,{__position:4,__code:'() => {\n  const toolsList = useState({\n    activeTool: null,\n  })\n  return (\n    <div style={divStyle}>\n      <ToolButton\n        toolsList={toolsList}\n        tool={tools.colorPickers.mesh}\n        layer={true}\n        tooltipId="Tooltip 1"\n      >\n        <SketchPicker />\n      </ToolButton>\n      <ToolButton\n        toolsList={toolsList}\n        tool={tools.colorPickers.skeleton}\n        layer={true}\n        tooltipId="Tooltip 2"\n      >\n        <SketchPicker />\n      </ToolButton>\n    </div>\n  )\n}',__scope:{props:o,DefaultLayout:a.a,Props:i.d,Playground:i.c,Interactor:c.b,DocInteractor:c.a,useState:n.useState,ToolButton:l.a,tools:l.b,ObjectFormatter:s.a,SketchPicker:b.SketchPicker,DefaultLayout:a.a,divStyle:d,_frontmatter:h},mdxType:"Playground"},()=>{const e=Object(n.useState)({activeTool:null});return Object(r.b)("div",{style:d},Object(r.b)(l.a,{toolsList:e,tool:l.b.colorPickers.mesh,layer:!0,tooltipId:"Tooltip 1",mdxType:"ToolButton"},Object(r.b)(b.SketchPicker,{mdxType:"SketchPicker"})),Object(r.b)(l.a,{toolsList:e,tool:l.b.colorPickers.skeleton,layer:!0,tooltipId:"Tooltip 2",mdxType:"ToolButton"},Object(r.b)(b.SketchPicker,{mdxType:"SketchPicker"})))}),Object(r.b)("p",null,"In this example, you can see we use the ToolButton to display color pickers.\nSince the object passed to the ",Object(r.b)("inlineCode",{parentName:"p"},"toolsList")," component is the same in both\nToolButtons, the tools are mutually exclusive. Try opening the second one while\nthe first one is already open, and you'll see that the first tool will close\non its own."))}void 0!==f&&f&&f===Object(f)&&Object.isExtensible(f)&&!f.hasOwnProperty("__filemeta")&&Object.defineProperty(f,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Viewer/Interactors/index.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-viewer-interactors-index-mdx-a92f7b7e11ffdc1bd72a.js.map