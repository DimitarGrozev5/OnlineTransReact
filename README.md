# Online Trans

## Link to site

[bgstrans.online](https://bgstrans.online/)

## Interesting features

1. A simple **Rich Text Editor**

The input text area is actually a **table** with the **contenteditable** attribute set to _true_. The Component aims to behave like a normal textarea but to allow for specific css styling, that is impossible with the build in elements. The text area is configured similary to a **controlled component**. The contents of the text area and the current selection range are stored in the **Redux Store** and are rendered on the page. Event listeners are set on the **table** element, that catch all user input - _key presses, key combinations, mouse clicks, touch events, selection changes etc._ When an event is triggered, an **event handler** dispatches actions to the **Redux Store Reducers** and the new state is rerenderd on the page.

In order to support **Undo** and **Redu** actions, all of the relevent **Reducers** use the **_Immer_** library and more precisely the `produceWithPatches` function, that returns both an updated state and patches that can be used to return to the previous state. These **patches** are also stored in an **Undo Stack** in the **Redux Store**.

2. **Drop File** area

The Input Text Area is wraped in a `Draggable` Component, that reacts when the user _drags and drops_ a file. The Component can be used to wrap any other component, to allow for _Drag'n drop_ functionality. The dropped file is parsed if it's a _plain text_ file or a _DXF_ file. A plain text file gets treated as if it's pasted in the Text Area Component. A DXF file gets stored in the **Redux Store**.

3. **DXF Files** parsing

The **DXF data format** is a plain text format, used for storing **Computer-Aided Design (CAD)** data. There is no need to parse the whole file for the purposes of this Web App. Finding lines with coordiante data is all that is needed. The **DXF Parser** extracts coordinate data from the file and creates a mapping between the extracted points and the file lines, from which the data was taken. After the coordinate data gets transformed, the values are directly replaced in the **DXF File**. The data extraction does have some quirks.

Most entities in the **DXF Format** are stored using simple point data - **_X, Y and optional H_** coordinates. The **DXF Parser** goes through these entities and creates an object that maps a _point object_ to the _file line_ where the values are stored.  
A problem arises with entities that contain weird values - e.g.:

- The Radius of CIRCLE
- The Elevation of a PLINE, which is only an H coordinate, without X and Y data
- The parameters of an ELIPSE, which are coordinate values but are relative to the center of the ELLIPSE and not to the World Coordinate System.

All of these weird values get converted to point data by the **DXF Parser** - e.g. the _radius_ of a CIRCLE becomes two points - one is the center of the circle and the other point is calculated to be exactly one radius away from the first point.  
After the transformation the coordinate data is used to recalculate and replace the desired value.

4. A custom **Command Language** build for facilitating geodetic survey tasks and a **Canvas** used for visualizing the data

**_This section is mostly a proof of concept and is not production ready_**

Geodetic Surveying usually happens by using a GPS receiver to measure the coordinates of individual points. After that the points are used to draw the actual object by using a CAD Software like AutoCAD. Some parts of this process can benefit from automation. All professional GPS receivers allow a short description to be added to every measured point. This is a perfect opportunity to introduce a simple command language.

The Language **Interpreter** works in the following manner:

- Commands have to be executed in a specific order - e.g. delete commands have to be executed before creating polylines, so the polylines don't use false points
- The **main parser** has a queue with command parsers - one for each supported command
- The **main parser** atempts to execute them one by one. If one of the parsers returns a result, the main parser skips the rest
- **Command parsers** take the raw point data as input and output ***command objects*** that can be used directly to modify the app state
- **Command objects** have all the data needed to Create, Update or Delete points or polylines - e.g. The raw *delete previous* command code results in two ***Delete* command objects**
- All of the data is displayed on screen, using a *Canvas* element, that supports *pan* and *zoom*
- If the user decides, he can execute the current **Command objects** which will update the state and will prompt the **main parser** to execute all command parsers again
- **State updates** are perforemed using ***Immer***'s `produceWithPatches` function, so an undo and redo functionality is available


## Sample data

Feel free to use this data, to play around with the Web App and try out it's features.

> 1 4790817.978 697606.616 147.022 ter
2 4790805.915 697630.287 145.992 ter1  
3 4790806.999 697627.288 145.977 ter1  
4 4790808.349 697622.282 145.966 ter1  
5 4790809.520 697619.746 146.130 ter1  
6 4790805.655 697621.114 145.921 ter1  
7 4790804.038 697623.694 146.129 ter1  
8 4790802.641 697626.968 145.996 ter1  
9 4790803.731 697629.572 146.078 ter1.c  
10 4790802.153 697630.396 145.297 ter1  
11 4790798.364 697634.385 145.296 ter1  
12 4790794.953 697632.213 145.127 ter1  
13 4790793.998 697629.525 145.091 ter1  
14 4790794.372 697624.737 145.176 ter1  
15 4790803.278 697621.350 145.769 ter1  
16 4790801.759 697625.840 145.524 ter1  
17 4790801.089 697628.510 145.414 ter1.c  
18 4790806.805 697630.216 146.435 ter1  
19 4790809.896 697622.914 146.688 ter1  
20 4790810.736 697620.139 146.587 ter1  
21 4790818.331 697617.156 146.958 ter1  
22 4790825.157 697616.181 146.823 ter1  
23 4790831.515 697616.635 146.786 ter1  
24 4790837.090 697617.673 146.749 ter1  
25 4790842.092 697622.087 146.416 ter1  
26 4790843.686 697631.496 144.752 ter1  
27 4790844.238 697640.899 144.268 ter1  
28 4790843.481 697652.700 142.794 ter1.xyh  
29 4790841.797 697653.989 142.988 ter1.xyh  
30 4790840.159 697655.676 142.798 ter1  
31 4790835.244 697659.206 142.372 ter1  
32 4790826.303 697658.627 142.331 ter1  
33 4790822.437 697654.347 142.377 ter1  
34 4790820.391 697653.919 142.267 ter1  
35 4790820.494 697651.359 142.456 ter1  
36 4790819.096 697648.768 142.593 ter1  
37 4790818.949 697644.904 142.725 ter1  
38 4790813.146 697645.123 142.631 ter1  
39 4790802.881 697645.578 142.384 ter1  
40 4790794.474 697644.494 142.079 ter1  
41 4790793.404 697643.590 142.098 ter1  
42 4790794.938 697640.706 142.398 ter1  
43 4790796.594 697638.396 142.724 ter1  
44 4790800.621 697638.107 142.473 ter1  
45 4790805.370 697635.539 142.612 ter1  
46 4790811.324 697638.595 142.750 ter1  
47 4790815.320 697639.248 142.821 ter1  
48 4790818.096 697637.645 143.094 ter1  
49 4790821.721 697635.931 143.534 ter1  
50 4790826.334 697634.989 143.975 ter1  
51 4790829.598 697636.316 143.761 ter1  
52 4790832.593 697637.216 143.736 ter1  
53 4790833.138 697639.613 143.606 ter1  
54 4790833.710 697641.939 143.570 ter1  
55 4790834.215 697636.024 144.388 ter1  
56 4790834.369 697630.727 145.188 ter1  
57 4790832.992 697627.357 145.645 ter1  
58 4790829.752 697625.860 146.251 ter1  
59 4790826.362 697625.657 146.384 ter1  
60 4790821.793 697627.401 146.591 ter1  
61 4790818.329 697630.951 146.667 ter1  
62 4790814.135 697633.514 146.647 ter1.c  
63 4790815.707 697627.188 146.979 ter  
64 4790822.578 697623.535 146.648 ter  
65 4790834.375 697624.195 146.097 ter  
66 4790837.199 697629.003 145.455 ter  
67 4790838.897 697637.397 144.417 ter  
68 4790839.249 697645.097 143.691 ter  
69 4790836.899 697649.444 143.168 ter  
70 4790833.105 697656.965 142.462 ter  
71 4790833.723 697663.756 141.833 ter1  
72 4790832.921 697662.874 141.768 ter1  
73 4790828.418 697662.284 141.597 ter1  
74 4790825.087 697659.527 141.676 ter1  
75 4790821.472 697655.818 141.560 ter1  
76 4790819.209 697655.306 141.425 ter1  
77 4790818.783 697651.655 141.500 ter1  
78 4790817.338 697650.392 141.662 ter1  
79 4790817.728 697645.732 142.449 ter1  
80 4790813.163 697646.095 142.165 ter1  
81 4790809.884 697648.145 141.664 ter1  
82 4790803.453 697648.897 141.246 ter1  
83 4790800.865 697653.831 141.116 ter1  
84 4790807.470 697654.475 141.218 ter1  
85 4790809.726 697655.139 140.998 ter1  
86 4790805.917 697655.905 140.806 ter1  
87 4790801.172 697655.689 140.475 ter1  
88 4790802.004 697660.180 140.547 ter1  
89 4790812.200 697660.472 140.820 ter1  
90 4790821.598 697663.590 141.057 ter1  
91 4790825.390 697663.659 141.287 .del.p  
92 4790825.344 697663.767 141.284 ter1.c  
93 4790812.923 697652.449 141.238 ter  
94 4790824.592 697650.056 142.557 ter  
95 4790826.853 697643.262 143.222 ter  
96 4790823.808 697639.622 143.439 ter  
97 4790822.962 697641.954 143.022 ter
