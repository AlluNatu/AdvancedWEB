# CT30A2910 Introduction to Web Programming

This is repository for my course I completed in LUT University while doing my Bachelors Degree in Computer Science.

This is for my course I did (LUT University) CT30A2910 Introduction to Web Programming. Which is worth 3 ECTS.

## Learning objectives

After completing the course, I am able to:

    - Understand the programming concepts of the web 
    - Know how to use HTML and CSS to build responsive web pages
    - Create simple applications with JavaScript to run inside browsers
    - Familiarize myself with responsive design and utilization of external APIs

## Course content
    - Web standards: HTTP, HTML, CSS and JavaScript
    - The browser environment with its Document object model (DOM)
    - Building web sites with commonly used tools.

## Grading

I got graded with a grade 5, from my Universitys grading scale 1-5.


# Assignment descriptions

## Week 1
This week you are going to be familiarized in web programming and introducing yourself in HTML and JavaScript environments. You are also going to create a simple notebook application. 

Note: If you do not want to use VSCode with the live server extension, you can install Node.js to your machine and run the website on a local server. Alternatively you can use CodeSandbox (not really recommended)
### 1. Hello world! 
Create an html file called index.html. This should be the main page for every week's exercises. Insert a h1 tag in the body of the document. The h1 tag should have the text “Hello world” inside.

### 2. Creating a button 
Create a <button> tag with an id of "my-button". The button should print “hello world” to console when clicked. 

Note: if you link an external JavaScript file, you should place the tag at the end of the body, or add a defer attribute to the <script> tag (<script src="foo/bar.js" defer></script>), in order to parse the entire document before running the script and referencing the DOM! Otherwise the script file could reference elements that the HTML parser hasn't parsed yet resulting in Null references!

### 3. Button DOM changes 
Let’s add some real functionality to the button. In addition to printing “hello world” to the console, it should also change the text inside the h1 tag to “Moi maailma”. 

### 4. Unordered list 
Add a ul tag and a button tag to the body of the document. The button should have an id of add-data and the list should have an id of my-list and the button should add an li element with text of your choice inside the ul tag. 

### 5. Custom text to list 
Add a textarea tag to the document. Now, instead of some arbitrary text the button (same as in task 4) should add the text written  inside the textarea to the li tag. 

## Week 2

In this week you are going to create a user database table and a form that can be used to add entries to the table.

### 1. Creating a table
Create an HTML table that contains the username and email text columns and one column that shows if the user is an admin or not depicted either by an X (admin) or - (not admin).
Populate the table with at least 2 rows of data.

Example table:

    Username 	Email 	Admin
    Webmaster 	example@email.com 	X
    User123 	example@email.com 	-
    AnotherUser222 	example@email.com 	-

### 2. Adding custom data to the table

Create a form, in which the user can fill information that is going to be added into the table.
The form should have the following input fields:

    Text input for username with an id of "input-username"

    Text input for email with an id of "input-email"

    Checkbox for the admin status with an id of "input-admin"

    Button for submitting data with an id of "submit-data"

When the "submit-data" button is pressed, the data in the form should be appended to the table.

Note! If you use the <form> element, make sure to add the event.preventDefault() to prevent the site from refreshing.


### 3. Emptying the table

Create a button with an id of "empty-table" that empties the table when clicked.


### 4. Editing existing data

Edit the form logic so that if the username in the form already exists in the table, instead of adding the form data to the table, the data for that row is edited instead.


### 5. Adding images

The user should be able to add an image for the user. Add a file input to the form with an id of "input-image" and implement the ability to “upload” the file and display it in the fourth column of the table. The image should have the following properties:

    Width: 64 pixels
    Height: 64 pixels


Useful reading

event.preventDefault()
URL.createObjectURL()

## Week 3

This week you are going to get familiarized with fetching data from an API and styling a webpage with CSS. This week’s goal is to make a table that shows population data from different municipalities. 

### 1. Creating the table

Create a table element and add thead element and a tbody element to it. The thead element should have 2 th elements: municipality and population. The tbody should be populated with data fetched from https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff (the data should be fetched upon page load)

    The municipalities can be found in dataset.dimension.Alue.category.label
    The values can be found in dataset.value


### 2. Styling the table

With plain HTML the table looks frankly horrible. Let’s add some styling to make it more tolerable. To make the table look a little better add the following styling: 

    The page body should have the font-family “Verdana, Arial, sans-serif” 

The table data cells (td elements) should have the following styling: 

    Padding of 6px 

    1 pixel wide solid gray bottom border 

The table header (th elements) should be adjusted as well to make it stand out better. 
The table header should have: 

    Background color “#b7d0ff” 

    Bold font 

    Padding of “12px 0px 12px 6px” 

    Border-bottom of “2px solid gray” 

And finally, the table:

    The table should have the property “border-collapse” set to “collapse” 

    The table should have the font size of 16px and the text should be aligned left 

### 3. Additional styling

Currently, the table is too narrow. Let’s center it and expand it. Create a div and give it “center” class. Put the table inside it. In addition to the table, create a h1 tag that should contain a header for the table, for example "Municipality employment statistics in Finland". The “center” class should have the following styling: 

    Margin should be set to “auto” 

    Padding should be 60px 

    Width should be set to 60% 

The table should also get adjusted:

    The table should have the “table-layout” set to “fixed” 

    The table should have its width set to 100%

The text for the h1 tag should also be centered.

Also, the even table rows should have the background color of “#f2f2f2”. Other rows (except for the header) should have a background color of "#ffffff"

### 4. Additional data

Let’s add more data to the table. Add one extra column to the table header called “Employment amount” and populate the column with data from https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065 

## 5. Conditional styling

    Add one extra column to the table called “Employment-%”. Calculate the percentage of employment by municipality, rounded to two decimals. 
    The rows (tr element) with over 45% employment should have a background color of “#abffbd” 
    The rows (tr element) with under 25% employment should have a background color of “#ff9e9e”

Useful reading

fetch()

Response.json()

Object.values()

## Week 4

This week you are going to make a simple TV-show viewer app that looks good on a desktop and mobile environment. You are also going to get yourself familiarized with URL query parameters. 
### 1. Fetching data
Create a form with a text input field with an id of "input-show" and a button with an id of "submit-data" and a div with a class of "show-container".
Using the form, fetch data from https://api.tvmaze.com/search/shows?q= where the value of the input field is set to the query parameter q (for example, when searching for "friends" the url would look like https://api.tvmaze.com/search/shows?q=friends). The API returns an array of shows that match the search parameter.
From the data, create show-data elements and add them to the child of the "show-container" div. An example of a show-data element is shown below. The container must not contain any previous search results.

    <div class="show-data"> 
        <img src="[show image medium]"> 
        <div class="show-info"> 
            <h1>[Show title]</h1> 
            <p>[Show summary]</p> 
        </div> 
    </div> 

Generate the template in JavaScript, one for each show. Don't copy-paste it into the HTML.

(Note that the API gives the summary already wrapped in <p> tags) 

### 2. Desktop environment styling
Let’s add some styling to the webpage to make it look acceptable on a desktop environment. Add the following tag to the head of the document: <meta name="viewport" content="width=device-width, initial-scale=1.0"> to let the browser know how to set the page’s dimensions and scaling. 

The document body should have: 

    Background color “#eceff1” 

The show-container class should have:

    Padding-left of 10px
    Padding-right of 10px

Additionally, the class show-data should have the following style properties: 

    Width should be set to 100% 

    Background color of “#cfd8dc” 

    Margin-top of 10px

    Margin-bottom of 10px

    Padding of 10px 

    Border radius of 6px 

    Box shadow to make it look like the elements are floating on the page. Box shadow can look whatever you think is best 

    The h1 element in this class should have its text centered 

    The image should have display set to block

Show-info class should have the following properties: 

    Width should be 100% 

Additionally, using CSS media queries, set the following properties to devices over 800px wide: 

    Show-data class should have its display set to flex 

    Show-info should have a padding of 10px 

 
### 3. Mobile environment styling
Currently, the webpage looks ok on PC but on a mobile environment the webpage looks less-than-ideal. We can fix this by using CSS media queries. Devices less than 800px wide should have the following properties:

    The img element should have “margin: auto” 

    The p element inside show-info should have its text centered and a padding of 10px 


### 4. Web fonts

Add the font “Roboto” to your webpage. https://fonts.google.com/selection?selection.family=Roboto. Press the "Get embedded code" to get the import URLs. Make sure to add the CSS rule provided in the website as well.

(Note. You have to import the font via HTML. Otherwise CodeGrade doesn't recognize it.)

### 5. Bootstrap

Add Bootstrap front-end framework to your website: https://getbootstrap.com/docs/5.2/getting-started/download/#cdn-via-jsdelivr use the hosted version. Add a Bootstrap navbar to your app and move the search form inside of it.


Useful reading

Media queries
Bootstrap navbar




## Week 5

This week you’re going to get familiarized in a JavaScript framework called Leaflet. The goal of this week is to make an interactive map that shows every municipality in Finland and some data from each one of them.


### 1. Creating the map

Add Leaflet library to your project: https://leafletjs.com/download.html Use the “Using a Hosted Version of Leaflet” version 1.9.4.

Fetch GeoJSON data from https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326 

Create a leaflet map to a div with an id of “map”. The map should have the following attributes to display the data properly: 

    minZoom: -3

The data should be displayed in GeoJSON format. The GeoJSON layer should have the following attributes: 

    weight: 2

The map must also be fitted to the GeoJSON data. This can be done with map.fitBounds(). The bounds can be gotten from the GeoJSON layer with getBounds()

Set the map's height to "97vh" from the CSS file. Make sure you do not have any other CSS rules.


### 2. Basic functionality

Add some functionality to the map. The map should show the name of the municipality when hovering over one as a leaflet tooltip. 


### 3. Background map

The map looks dull without a background image. Add OpenStreetMap background to the map: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png  (Note that you have to add the © OpenStreetMap attribution to the layer as per the copyright notice of Openstreetmap). 


### 4. Advanced functionality

Fetch positive migration data from https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f and negative migration data from https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e . In addition to the name of the municipality, the map should show positive and negative migration of a municipality upon clicking it as a leaflet popup. 

### 5. Conditional map styling

With leaflet one can color individual polygons using the style attribute of the GeoJSON layer. Using this attribute, we can color each municipality according to the net migration of that municipality.  

The color of a municipality can be easily colored using a Hue, saturation, lightness (HSL) color value. The color should be calculated as follows:

    color: hsl(hue, 75%, 50%) 

Where hue is calculated as follows: 

    (positive migration / negative migration)3 * 60 and it must be no greater than 120 

(Remember that you can pass functions as arguments in JavaScript!)

## Week 6

This week you are going to learn JSON POST requests and get familiarized with Frappe-chart JavaScript library. The goal of this week is to make a website that shows the population growth in a municipality in Finland.

### 1. Fetching data with POST

Create a post request to https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px upon page load and get the population data from the whole country. This data doesn’t have to be displayed anywhere yet. 

The request body consists of an array of objects. 

    The first object (“Vuosi”) determines which years the data will be get from. We want to select the years 2000-2021. (You don’t have to worry about this) 
    The second object (“Alue”) determines in which area the data is get from. The API requires the area to be in a municipality code form. The code for the whole country is “SSS”. 
    The third object (“Tiedot”) determines which data we want from the API. The code to get population data is “vaesto”. (You only have to worry about this in task 5) 

An example POST request to get population data from the whole country:

    {<br>    "query": [<br>        {<br>            "code": "Vuosi",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "2000",<br>                    "2001",<br>                    "2002",<br>                    "2003",<br>                    "2004",<br>                    "2005",<br>                    "2006",<br>                    "2007",<br>                    "2008",<br>                    "2009",<br>                    "2010",<br>                    "2011",<br>                    "2012",<br>                    "2013",<br>                    "2014",<br>                    "2015",<br>                    "2016",<br>                    "2017",<br>                    "2018",<br>                    "2019",<br>                    "2020",<br>                    "2021"<br>                ]<br>            }
            },
            {<br>            "code": "Alue",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "SSS"<br>                ]<br>            }
            },
            {<br>            "code": "Tiedot",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "vaesto"<br>                ]<br>            }
            }
        ],
        "response": {<br>        "format": "json-stat2"<br>    }
    }

Don't forget to set the content-type header to application/json!

### 2. Adding data to chart

Import the Frappe-chart.js library to your project. Use the "include it directly in your HTML" version. Use the version provided by unpkg ("https://unpkg.com/frappe-charts@latest")

After importing the library, add a div with the id “chart”. Map the fetched data on this chart. 

The chart should have the correct styling:

    It should be 450 high
    It should be of “line” type
    The line should have the color '#eb5146'
    The chart labels on the x axis should be the years ranging from 2000 to 2021
    The chart should have  title. 

 
### 3. Editing POST request body

Currently, the website only fetches the data from the whole country. To make the website a little more interesting, add a form that has an input field with an id of "input-area", where the user can type a municipality and a button with an id of "submit-data". After clicking the button the website tries to fetch the data of that municipality and put it to the chart. The search function should be case insensitive.

You have to edit the second object (Alue) of the JSON post body. The Alue field accepts only the area codes, not area names. You can get the municipality codes from https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px with a simple GET request (They are in the second object; the first array is the codes, and the second array is the area names).
 4. Simple data prediction

Let’s add some data predictions to the population chart. Add a button with the id of “add-data”. This button should add a data point to the chart using the following formula: 

    Calculate the mean value of the delta of every data point 
    Add the mean value to the last data point. 

For example, with the values of [5, 2, 4, -1] the next data point would be: ((2−5)+(4−2)+((−1)−4))/3+(−1)=(2−3−5)/3−1=(−6)/3−1=−3=> [5, 2, 4, -1, -3]

### 5. Fetching additional data

The API provides additional data that we can utilize. Add means of navigation (for example, <a> tag or a button) with an id of “navigation” that navigates to /newchart.html. This page should contain a bar type chart which shows the births and deaths of the same municipality as the main page as well as means of navigation (for example, <a> tag or a button) with an id of “navigation” that navigates to /index.html.

Now you have to edit the third object of the post body (“Tiedot”) in order to get the data you want. The code to get birth data is “vm01” and the code to get death data is “vm11”. Fetch the birth and death data separately.

Map the birth and death data into the chart. 

Like in the first task, the chart should have the correct styling.

    It should be 450 high
    It should be of “bar” type.
    The birth data bars should have the color '#63d0ff'
    The death bars should have the color '#363636'.
    The chart labels on the x axis should be the years ranging from 2000 to 2021. 
    The chart should have a title

## Week 7

This week your task is to develop a game with Phaser. You can create the game of your taste. Platformer, tank shooting, Angry birds stylish...

### 1. Create a simple game (1 point)

Follow for example the lecture video and build a game where player can move around.

### 2. Add other moving parts (3 points)

Add enemies, collectible items or any other things player can interact. It is required to have something more than in the lecture demo. You can for example have different kind of items to collect (some give more points than others – with different colors).
### 3. Communication with other parts (5 points)

Add something the player can "communicate" with. This means shooting, catching (collecting stars is NOT enough) running parts or something like that.
