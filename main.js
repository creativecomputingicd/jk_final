// --------------------------------------------- IMPORT MODULES -----------------------------------------------
//import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
//import { CSG } from '../utils/CSGMesh'
//import { CSG } from 'https://cdn.jsdelivr.net/gh/Sean-Bradley/THREE-CSGMesh@master/dist/client/CSGMesh.js';
//import { CSG } from './three-csgmesh';
import { CSG } from 'three-csgmesh/dist/client/CSGMesh';

import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';









// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------  NOTIZEN  -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------



// --------------------------------------------- COLORS -----------------------------------------------



// BLACK

// background
const background_color = new THREE.Color("rgb(0,0,0)");
// toolhead mesh
var display_toolhead_material = new THREE.MeshBasicMaterial( { color: 0xff8800, wireframe: false, transparent: true, opacity: 0.5} );
// helpoer lines
//const helper_lines_material = new THREE.LineBasicMaterial( { color: 'rgb(0, 0, 205)' } );
//const helper_lines_material = new THREE.LineBasicMaterial( { color: 'rgb(0, 0, 105)' } );
const helper_lines_material = new THREE.LineBasicMaterial( { color: 'rgb(72, 61, 139)' } );
//const helper_lines_material = new THREE.LineBasicMaterial( { color: 'rgb(255, 20, 157)' } );




// WHITE

// background
//const bacjground_color = new THREE.Color("rgb(255, 255, 255)");
// toolhead mesh
//var display_toolhead_material = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
// helper lines
//const helper_lines_material = new THREE.LineBasicMaterial( { color: 'rgb(241, 228, 195)' } );





/* --------------------------------------------- Color Palette -----------------------------------------------

https://colorhunt.co/palette/ffffecf1e4c3c6a969597e52
rgb(255, 255, 236)      beige hell
rgb(241, 228, 195)      beige dunkel
rgb(198, 169, 105)      braun
rgb(89, 126, 82)        grün dunkel


https://colorhunt.co/palette/f9efdbebd9b49dbc98638889
rgb(249, 239, 219)      beige hell
rgb(235, 217, 180)      beige dunkel
rgb(157, 188, 152)      grün
rgb(99, 136, 137)       teal
rgb(99, 126, 118)       teal dunkel


*/










// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- SOUNDS --------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------



// --------------------------------------------- Audible feedback -----------------------------------------------

// --- BGM Background Music (LOOP) ---

/*function bgmSoundLoop(){
    
    const bgmSoundListener = new THREE.AudioListener();
    const bgmSoundLoader = new THREE.AudioLoader();

    bgmSoundLoader.load ('sounds/wii.mp3', function(buffer) {

        const bgmSound = new THREE.Audio(bgmSoundListener);

        // Set the audio buffer to the loaded sound
        bgmSound.setBuffer(buffer);

        // Set looping to true to loop the sound endlessly
        bgmSound.setLoop(true);

        //Set volume
        bgmSound.setVolume = (0.1);

        bgmSound.play();

    });

}
*/

// Create the audio element for background music
const bgm = document.createElement("audio");
bgm.setAttribute("id", "bgm");
bgm.setAttribute("loop", "");
//bgm.innerHTML = '<source src = "sounds/wii.mp3", type = "audio/mpeg">';
bgm.innerHTML = '<source src = "sounds/vaporwave.mp3", type = "audio/mpeg">';
document.body.appendChild(bgm);



// --- Start Button ---
//startButton = [];
const startSound = new Audio ('sounds/startButton.wav');
//const startSound = new Audio ('sounds/drankdrugs.mp3');
//const startSound = new Audio ('sounds/start_jk.mp3');


// --- Create Mesh ---   @ booleanUnion 3
//const createSound = new Audio ('sounds/plop.mp3');
//const createSound = new Audio ('sounds/bam_kai.mp3');
const createSound = new Audio ('sounds/pop.mp3');


const erase_Sound = new Audio ('sounds/brr.mp3');


// --- Export Button ---
const exportSound = new Audio ('sounds/staple.wav');
//const exportSound = new Audio ('sounds/export_jona.mp3');


// --- Clear Button ---
const clearSound = new Audio('sounds/clearButton.wav');


// --- Toolhead Type Button ---
//const toolheadTypeSound = new Audio('sounds/plop_switch.mp3');
const toolheadTypeSound = new Audio('sounds/selectButton.wav');



// --- Toolhead Type Button ---
const toolheadSizeSound = new Audio('sounds/size_switch.mp3');



















// -------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- LANDING PAGE ------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------

const landingscene = new THREE.Scene();

//const color = new THREE.Color("rgb(255, 255, 255)");
//const color = new THREE.Color("rgb(255, 255, 236)");



landingscene.backgroundColor = background_color;


// --------------------------------------------- Dynamic "Start" button -----------------------------------------------

const startButton = document.createElement('button');

startButton.textContent = 'START APP';

startButton.style.padding = '30px 60px';
startButton.style.fontSize = '20px';



//olor: 0xff8800


// old background color
//startButton.style.backgroundColor = 'rgb(198, 169, 105)';

// new background color
startButton.style.backgroundColor = 'rgb(255,136,0)';


//var start_button_color = new THREE.Color(0xff8800);
//startButton.style.backgroundColor = start_button_color;

startButton.style.color = '#fff';
startButton.style.border = 'none';
startButton.style.borderRadius = '10px';

startButton.style.position = 'absolute';
startButton.style.top = '50%';
startButton.style.left = '50%';
startButton.style.transform = 'translate(-50%, -50%)'; // Adjust position based on button size

startButton.style.cursor = 'pointer'; // Change cursor on hover




// Visual feedback on hover
startButton.addEventListener ('mouseenter', function() {
    startButton.style.backgroundColor = 'rgb(0,0,205)'; // Darker background color on hover
    startButton.style.border = 'true';
});

startButton.addEventListener ('mouseleave', function() {
    startButton.style.backgroundColor = 'rgb(255,136,0)'; // Restore original background color
    //startButton.style.backgroundColor = start_button_color;
});


// Visual feedback on click
startButton.addEventListener ('mousedown', function() {
    startButton.style.backgroundColor = 'rgb(0,0,205)'; // Darker background color on click
});

startButton.addEventListener ('mouseup', function() {
    startButton.style.backgroundColor = 'rgb(255,136,0)'; // Restore original background color after click
});



// Audible feedback on click
startButton.addEventListener ('click', function() {

    // Play start sound
    startSound.play();
    bgm.pause();


    startButton.style.display = 'none'; // Hide the button
    
    startApp(); // Call the function to initialize Three.js

});


// document.body.insertBefore(startButton, document.getElementById('threejs-container').nextSibling); // Place button at specific position within DOM structure

document.body.appendChild (startButton); // Append button at the end of the body







// --------------------------------------------- Video (Show Reel) -----------------------------------------------

const videoLink = document.createElement('button');























// --------------------------------------------- APP AS FUNCTION -----------------------------------------------

function startApp() {

   


    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------ INITIALIZE -------------------------------------------------- 
    // -------------------------------------------------------------------------------------------------------------










    // --------------------------------------------- DOCUMENT -----------------------------------------------

    // set margin and padding to 0
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    // prevent scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    















    const scene = new THREE.Scene();

    //const color = new THREE.Color("rgb(255, 255, 255)");
    //const color = new THREE.Color("rgb(255, 255, 236)");
 
   

    scene.background = background_color;









    // --------------------------------------------- LIGHT -----------------------------------------------

    /*
    
    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
    //directionalLight.position.set(2,5,5);
    //directionalLight.target.position.set(-1,-1,0);
    scene.add( directionalLight );
    scene.add(directionalLight.target);
    */







    // --------------------------------------------- GUI  -----------------------------------------------
    
    
    //var gui = new GUI();

    /*.lil-gui {
        --background-color: #ffffec;
        --text-color: #000000;
        --title-background-color: #c6a96a;
        --title-text-color: #ffffff;
        --widget-color: #c6a96a;
        --hover-color: #587c51;
        --focus-color: #439344;
        --number-color: #ffffff;
        --string-color: #587c51;
    }*/   

    
    /*// Parameters
    var parameters = {
        toolheadSize: 1,
        toolheadType: 2
    }

    
    // Add sliders to GUI
    gui.add (parameters, 'toolheadSize', 1, 3 , 1);
    gui.add (parameters, 'toolheadType', 1, 2 , 1);

        
    // Apply custom styling to the GUI container
    gui.domElement.style.padding = '5px 5px';
    gui.domElement.style.fontSize = '12px'; // Set font size
    gui.domElement.style.backgroundColor = 'rgb(198, 169, 105)'; // Set background color
    gui.domElement.style.color = '#fff'; // Set text color
    gui.domElement.style.border = 'none'; // Remove border
    gui.domElement.style.borderRadius = '5px'; // Add border radius for rounded corners


    gui.domElement.style.position = 'fixed';
    gui.domElement.style.left = '20px'; // Adjust left position according to your preference
    gui.domElement.style.top = '10%'; // Adjust top position according to your preference

    */






    // --------------------------------------------- PARAMETERS -----------------------------------------------

    var x_size = 80;
    var y_size = 80;
    var z_size = 80;

    var toolhead_speed = 0.1;
    //var toolhead_size = parameters.toolheadSize;
    //var toolhead_type = parameters.toolheadType;


    // iniialwert des toolheads
    var button_toolhead_size = 1;
    var button_toohead_type = 2;

    // variablen die im code benutzt werden
    var toolhead_size = button_toolhead_size;
    var toolhead_type = button_toohead_type;
    

    var voxel_list = [];







    // --------------------------------------------- VOXEL PARAMETERS -----------------------------------------------






    // display toolhead material
 

    //0x888888
    // point geometry
    var point_geometry = new THREE.BufferGeometry();
    var point_material = new THREE.PointsMaterial( { size: 1, color: 0x000000 } );
    


    // voxel geometry
    const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    // transparent voxel material


    var phong_material = new THREE.MeshPhongMaterial({color: 0xFF0000});

    var normal_voxel_material = new THREE.MeshNormalMaterial( );

    var voxel_material = new THREE.MeshNormalMaterial( );
    //var voxel_material = new THREE.MeshDepthMaterial( { color: "rgb(198, 169, 105)", transparent: true, opacity: 1, depthTest : true, depthWrite: true } );
    //var voxel_material = new THREE.MeshBasicMaterial( { color: "rgb(198, 169, 105)", wireframe: false} );

    var transparent_material_voxel = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
    var transparent_material_yellow_voxel = new THREE.MeshBasicMaterial( { color: "rgb(198, 169, 105)", wireframe: false, transparent: true, opacity: 0.7} );

    // wireframe voxel material
    var wireframe_material_voxel = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true } );









    
    // --------------------------------------------- TOOLHEAD ----------------------------------------------- 

    var toolhead_list = [];
    var toolhead_display_geometry = [];

    // toolhead material
    const toolhead_material = new THREE.MeshBasicMaterial({ color: 'rgb(89, 126, 82)' });


    // initial toolhead position
    var toolhead_center = new THREE.Vector3(x_size / 2 ,y_size / 2 , 20 );



    //create_box_toolhead();
    //create_sphere_toolhead();
    create_toolhead();









  




    // --------------------------------------------- RENDERER + CAMERA -----------------------------------------------

    // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    //renderer.shadowMap.enabled = true;

    document.body.appendChild( renderer.domElement );



    // RESPONSIVE WINDOW
    window.addEventListener('resize', handleResize);
        
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth , window.innerHeight);
        renderer.render(scene, camera);
    }


    /*
    // CAMERA
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 700 );
    //camera.position.set( -10, -20, 25 );

    camera.position.set( toolhead_center.x -20,toolhead_center.y-20, toolhead_center.z+20);
    
    //camera.lookAt(toolhead_center);
    
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
    //camera.lookAt (toolhead_center.x,toolhead_center.y, toolhead_center.z);
    camera.lookAt (x_size / 2 ,y_size / 2 , 20 );

    camera.up.set(0, 0, 1);   // <=== spin around Z-axis

    */

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 700);
    // Setzen der Up-Richtung der Kamera 
    camera.up.set(0, 0, 1); // Hier wird die Kamera um die Z-Achse gedreht
    // Setzen der Position der Kamera
    //camera.position.set(toolhead_center.x - 50, toolhead_center.y - 50, toolhead_center.z + 50);
    // Setzen der Blickrichtung der Kamera auf toolhead_center
    //camera.lookAt(toolhead_center);

    //console.log(toolhead_center);
   
    
    //camera.position.set(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
    //camera.lookAt(toolhead_center);

    //var camera_offset_vector = new THREE.Vector3(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
    var camera_offset_vector = new THREE.Vector3(0,0,0);
    





    





    var lock_camera = true;

    function update_camera_position(){

        

        

        //camera.position.set(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        
        //camera_offset_vector = new THREE.Vector3(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        camera.position.set(toolhead_center.x  - camera_offset_vector.x , toolhead_center.y - camera_offset_vector.y, toolhead_center.z - camera_offset_vector.z);

        // condition für die erste iteration die die kamera position auf die richtige stelle setzt
        if(lock_camera == true){

            lock_camera = false;

            // abstand der kamera vom toolhead
            camera.position.set(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
            console.log("asdwasdwasdw");


            camera_offset_vector = toolhead_center.clone().sub(camera.position);
            //camera_offset_vector = new THREE.Vector3(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        }


        // Setzen der Blickrichtung der Kamera auf toolhead_center
        camera.lookAt(toolhead_center);
        // Setzen der Up-Richtung der Kamera (optional)


        //orbit_control.target.set(toolhead_center);
        orbit_control.target.set(toolhead_center.x, toolhead_center.y, toolhead_center.z);

    }




















    // -------------------------------------------- MOUSE CONTROL --------------------------------------------

    var orbit_control = new OrbitControls( camera, renderer.domElement );
    //var orbit = new THREE.OrbitControls()
    //var orbit_control = new OrbitControls(  );

    //orbit_control.target.set(toolhead_center.x, toolhead_center.y, toolhead_center.z);





    //init
    update_camera_position();

    


    // Hinzufügen eines Event Listeners für das 'change'-Ereignis
    orbit_control.addEventListener('change', function() {
        // Hier wird der Code ausgeführt, den Sie ausführen möchten, wenn die Orbit Controls geändert werden
        console.log('Orbit Controls wurden geändert!');
         

        camera_offset_vector = toolhead_center.clone().sub(camera.position);
        // Fügen Sie hier Ihren eigenen Code hinzu
    });     





    // --------------------------------------------- AXES HELPER ----------------------------------------------- 

    /*
    const axesHelper = new THREE.AxesHelper( 5 );


    axesHelper.position.set(-5, -5 , 0);
    scene.add( axesHelper );
    // The X axis is red. The Y axis is green. The Z axis is blue.







    // --------------------------------------------- HELPER LINES ----------------------------------------------- 
    */

    


    for (let i = 0; i<= y_size; i++) {

        const points = [];
        points.push( new THREE.Vector3( 0, i, 0 ) );
        points.push( new THREE.Vector3( x_size, i, 0 ) ); 

        const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( buffer_geometry, helper_lines_material );

        scene.add( line );
    }


    for (let i = 0; i<= x_size; i++) {

        const points = [];
        points.push( new THREE.Vector3( i, 0, 0 ) );
        points.push( new THREE.Vector3( i, y_size, 0 ) ); 

        const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( buffer_geometry, helper_lines_material );

        scene.add( line );
    }










    

    // --------------------------------------------- VOXELS GRID ----------------------------------------------- 
    var voxel_grid = [];
    
    create_voxel_grid();

    


    function create_voxel_grid(){

        voxel_grid = []

        for (let x = 0; x< x_size; x++) {

            const x_list = [];
    
            for (let y = 0; y< y_size; y++) {
    
                const y_list = [];
    
                /*
                const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
                //const voxel_wireframe = new THREE.WireframeGeometry ( voxel_geometry); 
    
                var transparent_material = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
                //outline_material.opacity = 0.5;
                var outline_material = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true, } );
    
                const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material ); 
                const voxel_cube2 = new THREE.Mesh( voxel_geometry, outline_material ); 
                voxel_cube.position.set( x+ 0.5, y + 0.5 , 0 + 0.5);
                voxel_cube2.position.set( x+ 0.5, y + 0.5 , 0 + 0.5);
                scene.add( voxel_cube );
                scene.add( voxel_cube2 );
                */
    
                for (let z = 0; z< z_size; z++) {
    
                    const voxel_value = 0;
    
                    y_list.push(voxel_value);
    
    
                }
    
                x_list.push(y_list);
    
            }
    
            voxel_grid.push(x_list);
    
        }
    



    }


   
   




    // ---------------------------------------------HEIGHT LINE ----------------------------------------------- 


    
    //var first_height_line = true;



    var height_line_list = [];



  





    var toolhead_center_xy = toolhead_center.clone();
    toolhead_center_xy.z = 0;

    // Erstellen Sie eine Geometry, die die Punkte enthält
    var height_line_geometry = new THREE.BufferGeometry().setFromPoints([toolhead_center, toolhead_center_xy]);

    // Erstellen Sie das Material für die Linie (z.B. rote Farbe)
    var height_line_material = new THREE.LineBasicMaterial({ color: 0xff8800 });


    // Erstellen Sie die Linie und fügen Sie sie der Szene hinzu
    var height_line = new THREE.Line(height_line_geometry, height_line_material);
    

    
    height_line_list.push(height_line);
    scene.add(height_line);







    var end_sphere_radius = 0.25; // Radius der Kugel
    //var widthSegments = 32; // Anzahl der horizontalen Segmente
    //var heightSegments = 32; // Anzahl der vertikalen Segmente
    var end_sphere_geometry = new THREE.SphereGeometry(end_sphere_radius);
    
    
    // 2. Erstelle das Material
    var end_sphere_material = new THREE.MeshBasicMaterial({ color: 0xff8800 }); // Zum Beispiel rotes Material
    
    
    // 3. Kombiniere die Geometrie und das Material zu einer Mesh
    var end_sphere = new THREE.Mesh(end_sphere_geometry, end_sphere_material);
    var end_sphere_up = new THREE.Mesh(end_sphere_geometry, end_sphere_material);


    end_sphere.position.copy(toolhead_center_xy);
    end_sphere_up.position.copy(toolhead_center);
    
    // 4. Füge die Mesh zur Szene hinzu
    







    height_line_list.push(end_sphere);
    height_line_list.push(end_sphere_up);
    scene.add(end_sphere);
    scene.add(end_sphere_up);


    //console.log(end_sphere);








    //create_height_line();


    function create_height_line(){

      
                        
        console.log("height_line_list.length = " + height_line_list.length);
        removeObject(height_line_list[2]);
        removeObject(height_line_list[1]);
        removeObject(height_line_list[0]);
        height_line_list = [];
        console.log("height_line_list.length = " + height_line_list.length);

        
        var toolhead_center_xy = toolhead_center.clone();
        toolhead_center_xy.z = 0;


        var point1 = new THREE.Vector3(0, 0, 0);
        var point2 = new THREE.Vector3(10, 10, 10);

        // Erstellen Sie eine Geometry, die die Punkte enthält
        height_line_geometry = new THREE.BufferGeometry().setFromPoints([toolhead_center, toolhead_center_xy]);



        // Erstellen Sie die Linie und fügen Sie sie der Szene hinzu
        var height_line = new THREE.Line(height_line_geometry, height_line_material);

        scene.add(height_line);

        height_line_list.push(height_line);







        var end_sphere = new THREE.Mesh(end_sphere_geometry, end_sphere_material);
        var end_sphere_up = new THREE.Mesh(end_sphere_geometry, end_sphere_material);


        end_sphere.position.copy(toolhead_center_xy);
        end_sphere_up.position.copy(toolhead_center);
        // 4. Füge die Mesh zur Szene hinzu
 
        height_line_list.push(end_sphere);
        height_line_list.push(end_sphere_up);
        scene.add(end_sphere);
        scene.add(end_sphere_up);





        console.log("HEIGHTLINE");
        


    }
























    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------ CONTROLS  -------------------------------------------------- 
    // -------------------------------------------------------------------------------------------------------------






    var key87 = false;
    var key83 = false;
    var key65 = false;
    var key68 = false;
    var key38 = false;
    var key40 = false;
    var key32 = false;
    var key16 = false;
    var key69 = false;
    var key81 = false;



    // onKeyDown function
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
    
        var keyCode = event.which;

        //console.log("check keydown");

        // single keys

        // W up
        if (keyCode == 87) {
            key87 = true;
            //console.log(key87);
        }  

        // S down
        if (keyCode == 83) {
            key83 = true;
        }  

        // A left
        if (keyCode == 65) {
            key65 = true;
        }  
        
        // D right
        if (keyCode == 68) {
            key68 = true;
        }  
        
        // E high
        if (keyCode == 38) {
            key38 = true;
        }  
        
        // Q low
        if (keyCode == 40) {
            key40 = true;
        }  
        
        // SPACE PAINT
        if (keyCode == 32) {
            key32 = true;
        }

        // SHIFT ERASE
        if (keyCode == 16) {
            key16 = true;
        }


        // E UP
        if (keyCode == 69) {
            key69 = true;
        }

        // Q DOWN
        if (keyCode == 81) {
            key81 = true;
        }


    };





    // onKeyUp function
    document.addEventListener("keyup", onDocumentKeyUp, false);
    function onDocumentKeyUp(event) {
    
        var keyCode = event.which;

        //console.log("check keyup");

        // single keys

        // W up
        if (keyCode == 87) {
            key87 = false;
        }  

        // S down
        if (keyCode == 83) {
            key83 = false;
        }  

        // A left
        if (keyCode == 65) {
            key65 = false;
        }  
        
        // D right
        if (keyCode == 68) {
            key68 = false;
        }  
        
        // E high
        if (keyCode == 38) {
            key38 = false;
        }  
        
        // Q low
        if (keyCode == 40) {
            key40 = false;
        }  
        
        // SPACE PAINT
        if (keyCode == 32) {
            key32 = false;
        }

        // SPACE PAINT
        if (keyCode == 16) {
            key16 = false;
        }
    
        // E UP
        if (keyCode == 69) {
            key69 = false;
        }

        // Q DOWN
        if (keyCode == 81) {
            key81 = false;
        }


        
    };






    var movement_x = 0;
    var movement_y = 0;
    var movement_z = 0;


    // calculate the resulting movement from all buttons that are pressed and applying it on the toolhead
    function move_toolhead_absolut() {

        //console.log("update_toolhead");

        movement_x = 0;
        movement_y = 0;
        movement_z = 0;

    
        //console.log(key32);

        if (key87 == true) {
            movement_y += toolhead_speed;
        }  
        
        if (key83 == true) {
            movement_y -= toolhead_speed;
        }  

        if (key65 == true) {
            movement_x -= toolhead_speed;
        }  
        
        if (key68 == true) {
            movement_x += toolhead_speed;
        }  

        if (key38 == true) {
            movement_z += toolhead_speed;
        }      

        if (key40 == true) {
            movement_z -= toolhead_speed;
        }  



        // create empty variables for adding up the sum of coordinates
        var sum_of_points_x = 0;
        var sum_of_points_y = 0;
        var sum_of_points_z = 0;

        //console.log(sum_of_points_x);
        
        if (movement_x != 0 || movement_y != 0 || movement_z != 0){



            //update_camera_position();



            for (let i = 0; i < toolhead_list.length; i++) {

                // TOOLHEAD KOORDINATEN WERDEN GEÄNDERT
                toolhead_list[i].position.x += movement_x;
                toolhead_list[i].position.y += movement_y;
                toolhead_list[i].position.z += movement_z;
    
    
                // adding up the sum of coordinates
                sum_of_points_x += toolhead_list[i].position.x;
                sum_of_points_y += toolhead_list[i].position.y;
                sum_of_points_z += toolhead_list[i].position.z;
    
            }
    
    
    
    
            toolhead_display_geometry[0].position.x += movement_x;
            toolhead_display_geometry[0].position.y += movement_y;
            toolhead_display_geometry[0].position.z += movement_z;




            
    

    

        


            // calculating the average coordinates
            var average_of_points_x = sum_of_points_x / (toolhead_list.length );
            var average_of_points_y = sum_of_points_y / (toolhead_list.length );
            var average_of_points_z = sum_of_points_z / (toolhead_list.length );

            // refreshing the toolhead center
            toolhead_center.x = average_of_points_x
            toolhead_center.y = average_of_points_y
            toolhead_center.z = average_of_points_z



            update_camera_position();

        }



    }


    var w_move_vector = new THREE.Vector3(0,0,0);
    var s_move_vector = new THREE.Vector3(0,0,0);
    var a_move_vector = new THREE.Vector3(0,0,0);
    var d_move_vector = new THREE.Vector3(0,0,0);
    
    var up_move_vector = new THREE.Vector3(0,0,1);
    var down_move_vector = new THREE.Vector3(0,0,-1);
    up_move_vector.normalize();
    down_move_vector.normalize();

    up_move_vector.multiplyScalar(toolhead_speed);
    down_move_vector.multiplyScalar(toolhead_speed);

    var new_toolhead_vectors = [];


    create_new_move_vectors();

    function create_new_move_vectors(){


        /*
        //camera.position.set(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        
        //camera_offset_vector = new THREE.Vector3(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        camera.position.set(toolhead_center.x  - camera_offset_vector.x , toolhead_center.y - camera_offset_vector.y, toolhead_center.z - camera_offset_vector.z);

        // condition für die erste iteration die die kamera position auf die richtige stelle setzt
        if(lock_camera == true){

            lock_camera = false;

            // abstand der kamera vom toolhead
            camera.position.set(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
            console.log("asdwasdwasdw");


            camera_offset_vector = toolhead_center.clone().sub(camera.position);
            //camera_offset_vector = new THREE.Vector3(toolhead_center.x - 20 , toolhead_center.y - 50, toolhead_center.z + 50);
        }


        // Setzen der Blickrichtung der Kamera auf toolhead_center
        camera.lookAt(toolhead_center);
        // Setzen der Up-Richtung der Kamera (optional)


        //orbit_control.target.set(toolhead_center);
        orbit_control.target.set(toolhead_center.x, toolhead_center.y, toolhead_center.z);
        */

        
        new_toolhead_vectors = [];




        w_move_vector = toolhead_center.clone().sub(camera.position);
        //w_move_vector = camera.position.clone().sub(toolhead_center);
        w_move_vector.z = 0;
        w_move_vector.normalize()

        s_move_vector = w_move_vector.clone().multiplyScalar(-1);


        // Winkel im Bogenmaß für eine 90-Grad-Drehung
        var angle = Math.PI / 2;

        // Rotiere den Vektor um 90 Grad um die Z-Achse
        a_move_vector = w_move_vector.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), angle);

        d_move_vector = a_move_vector.clone().multiplyScalar(-1);




        //w_move_vector.multiplyScalar(toolhead_speed);


        new_toolhead_vectors.push(w_move_vector);
        new_toolhead_vectors.push(s_move_vector);
        new_toolhead_vectors.push(a_move_vector);
        new_toolhead_vectors.push(d_move_vector);


        //return new_toolhead_vectors

    }



    // calculate the resulting movement from all buttons that are pressed and applying it on the toolhead
    function move_toolhead_relative() {

        //console.log("update_toolhead");

        movement_x = 0;
        movement_y = 0;
        movement_z = 0;


        create_new_move_vectors();




        var this_transform = new THREE.Vector3(0,0,0);

    
        //console.log(key32);

        if (key87 == true) {
            //movement_y += toolhead_speed;
            //this_transform += new_toolhead_vectors[0] * toolhead_speed;
            this_transform.add(new_toolhead_vectors[0].multiplyScalar(toolhead_speed));
        }  
        
        if (key83 == true) {
            //movement_y -= toolhead_speed;
            //this_transform += new_toolhead_vectors[1] * toolhead_speed;
            this_transform.add(new_toolhead_vectors[1].multiplyScalar(toolhead_speed));
        }  

        if (key65 == true) {
            //movement_x -= toolhead_speed;
            //this_transform += new_toolhead_vectors[2] * toolhead_speed;
            this_transform.add(new_toolhead_vectors[2].multiplyScalar(toolhead_speed));
        }  
        
        if (key68 == true) {
            //movement_x += toolhead_speed;
            //this_transform += new_toolhead_vectors[3] * toolhead_speed;
            this_transform.add(new_toolhead_vectors[3].multiplyScalar(toolhead_speed));
        }  

        if (key38 == true) {
            //movement_z += toolhead_speed;
            //this_transform += up_move_vector * toolhead_speed;
            this_transform.add(up_move_vector);
        }      

        if (key40 == true) {
            //movement_z -= toolhead_speed;
            //this_transform += down_move_vector * toolhead_speed;
            this_transform.add(down_move_vector);
        }  


        if (key69 == true) {
            //movement_z += toolhead_speed;
            //this_transform += up_move_vector * toolhead_speed;
            this_transform.add(up_move_vector);
        }      

        if (key81 == true) {
            //movement_z -= toolhead_speed;
            //this_transform += down_move_vector * toolhead_speed;
            this_transform.add(down_move_vector);
        }  



        // create empty variables for adding up the sum of coordinates
        var sum_of_points_x = 0;
        var sum_of_points_y = 0;
        var sum_of_points_z = 0;

        //console.log(sum_of_points_x);
        
        if (this_transform.x != 0 || this_transform.y != 0 || this_transform.z != 0){



            //update_camera_position();



            for (let i = 0; i < toolhead_list.length; i++) {

                // TOOLHEAD KOORDINATEN WERDEN GEÄNDERT

                /*
                toolhead_list[i].position.x += movement_x;
                toolhead_list[i].position.y += movement_y;
                toolhead_list[i].position.z += movement_z;
                */
                
                toolhead_list[i].position.x += this_transform.x;
                toolhead_list[i].position.y += this_transform.y;
                toolhead_list[i].position.z += this_transform.z;



    
                // adding up the sum of coordinates
                sum_of_points_x += toolhead_list[i].position.x;
                sum_of_points_y += toolhead_list[i].position.y;
                sum_of_points_z += toolhead_list[i].position.z;
    
            }
    
    
    
    
            toolhead_display_geometry[0].position.x += this_transform.x;
            toolhead_display_geometry[0].position.y += this_transform.y;
            toolhead_display_geometry[0].position.z += this_transform.z;




            
    

    

        


            // calculating the average coordinates
            var average_of_points_x = sum_of_points_x / (toolhead_list.length );
            var average_of_points_y = sum_of_points_y / (toolhead_list.length );
            var average_of_points_z = sum_of_points_z / (toolhead_list.length );

            // refreshing the toolhead center
            toolhead_center.x = average_of_points_x
            toolhead_center.y = average_of_points_y
            toolhead_center.z = average_of_points_z



            update_camera_position();
            create_height_line();

        }



    }

    







































    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------ FUNCTIONS -------------------------------------------------- 
    // -------------------------------------------------------------------------------------------------------------

    


     




    // --------------------------------------------- PAINT FUNCTION ----------------------------------------------- 


    var voxel_position_list = [];
    const points_array = [];



    function paint_points() {



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {




            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent


                        voxel_grid[var_x][var_y][var_z] = 1


                        const these_coordinates = [];

                        these_coordinates.push(var_x);
                        these_coordinates.push(var_y);
                        these_coordinates.push(var_z);

                        voxel_position_list.push(these_coordinates);







                        // this way also works!!
                        
                        removeObject( voxel_list[0]);
                        voxel_list = [];

                        const this_position_vec3 = new THREE.Vector3( var_x + 0.5, var_y + 0.5 , var_z + 0.5);
                        points_array.push(this_position_vec3);

                        point_geometry.setFromPoints(points_array);
                        var point = new THREE.Points( point_geometry, point_material );


                        voxel_list.push(point);
                        scene.add( point );
                        console.log("voxel created");
                        
                    



                       
                       


                        // this way wortks!!!!!!
                        /*
                        var dotGeometry = new THREE.BufferGeometry();
                        dotGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [var_x + 0.5, var_y + 0.5 , var_z + 0.5], 3 ) );
                        var point = new THREE.Points( dotGeometry, point_material );
                        //scene.add( dot ); 
                        
                        voxel_list.push(point);
                        scene.add( point );
                        console.log("voxel created");
                        */
                        
                       




                        
                        






                        /*
                        removeObject( voxel_list[0]);
                        voxel_list = [];



                        var count = voxel_position_list.length;

                        //var dotGeometry = new THREE.BufferGeometry();
                        //var dotMaterial = new THREE.PointsMaterial( { size: 1, color: 0x000000 } );


				        var mesh = new THREE.InstancedMesh( point_geometry, point_material, count );

                        const matrix = new THREE.Matrix4();


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );

						    mesh.setMatrixAt( i, matrix );
						    //mesh.setColorAt( i, color );

                        }
                        

                        voxel_list.push(mesh);

                        scene.add( mesh );

                        */

                        console.log("voxel created");
                        







                      



                    }
                    

                }


            }

        }

    }


    /*
    var last_voxel_positions = [];
    var mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material, 0 );
    var matrix = new THREE.Matrix4();
    */


    function paint_instanced_mesh_new() {



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {

            last_voxel_positions = [];


            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                 


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent


                        voxel_grid[var_x][var_y][var_z] = 1


                        const these_coordinates = [];

                        these_coordinates.push(var_x + 0.5);
                        these_coordinates.push(var_y + 0.5);
                        these_coordinates.push(var_z + 0.5);

                        voxel_position_list.push(these_coordinates);


                        last_voxel_positions.push(these_coordinates);



                        removeObject( voxel_list[0]);
                        voxel_list = [];



                        //const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
				        //const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                        //const material = new THREE.MeshNormalMaterial( );


                        var added_count = last_voxel_positions.length;

                        var old_count = mesh.count;
                          
                        var new_count = old_count + added_count

                        console.log(new_count); 




				        mesh.count = new_count;

                        var j = 0;


                        for (let i = old_count ; i < new_count; i++) {
                          
                            matrix.setPosition( last_voxel_positions[j][0], last_voxel_positions[j][1], last_voxel_positions[j][2] );

						    mesh.setMatrixAt( j, matrix );
						    //mesh.setColorAt( i, color );

                            j++;

                        }
                        

                        voxel_list.push(mesh);

                        //scene.add( mesh );



                        console.log("voxel created");



                        /*
                        const instancedMesh = new THREE.InstancedMesh(
                            voxel_geometry,
                            new THREE.MeshPhongMaterial()
                        );


                        const temp = new THREE.Object3D()


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            temp.position.set(voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2]);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(i, temp.matrix);

                        }
                        
                        instancedMesh.instanceMatrix.needsUpdate = true;



                        scene.add( instancedMesh );

                        */


                        /*
                        function createInstances(i_x, i_y, i_z, temp = new THREE.Object3D()) {

                            var this_x = i_x;
                            var this_y = i_y;
                            var this_z = i_z;

                            const instancedMesh = new THREE.InstancedMesh(
                                new THREE.BoxGeometry(),
                                new THREE.MeshPhongMaterial()
                            );
                        
                            
                            temp.position.set(this_x, this_y, this_z);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(1, temp.matrix);
                            
                        
                            instancedMesh.instanceMatrix.needsUpdate = true;
                        
                            return instancedMesh;
                        }
                        */


                        //const voxel_cube = createInstances(var_x + 0.5 , var_y + 0.5, var_z + 0.5);

                        
                        /*
                        // old way to create voxels
                        const voxel_cube = new THREE.InstancedMesh( voxel_geometry, transparent_material_voxel, 1 ); 
                        //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                        voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                        //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                        //voxel_cube.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

                        voxel_list.push(voxel_cube);

                        scene.add( voxel_cube );
                        //scene.add( voxel_cube2 );

                        console.group(voxel_cube);
                        */
                        




                    }
                    

                }


            }

        }

    }




    var create_new_voxels_here = [];



    function paint_instanced_mesh_clean_NEW() {s



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {

            var create_new_voxels = false;


            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent

                        create_new_voxels = true;


                        voxel_grid[var_x][var_y][var_z] = 1


                        const these_coordinates = [];

                        these_coordinates.push(var_x);
                        these_coordinates.push(var_y);
                        these_coordinates.push(var_z);

                        create_new_voxels_here.push(these_coordinates);



                        console.log("voxel created");



                        /*
                        const instancedMesh = new THREE.InstancedMesh(
                            voxel_geometry,
                            new THREE.MeshPhongMaterial()
                        );


                        const temp = new THREE.Object3D()


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            temp.position.set(voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2]);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(i, temp.matrix);

                        }
                        
                        instancedMesh.instanceMatrix.needsUpdate = true;



                        scene.add( instancedMesh );

                        */


                        /*
                        function createInstances(i_x, i_y, i_z, temp = new THREE.Object3D()) {

                            var this_x = i_x;
                            var this_y = i_y;
                            var this_z = i_z;

                            const instancedMesh = new THREE.InstancedMesh(
                                new THREE.BoxGeometry(),
                                new THREE.MeshPhongMaterial()
                            );
                        
                            
                            temp.position.set(this_x, this_y, this_z);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(1, temp.matrix);
                            
                        
                            instancedMesh.instanceMatrix.needsUpdate = true;
                        
                            return instancedMesh;
                        }
                        */


                        //const voxel_cube = createInstances(var_x + 0.5 , var_y + 0.5, var_z + 0.5);

                        
                        /*
                        // old way to create voxels
                        const voxel_cube = new THREE.InstancedMesh( voxel_geometry, transparent_material_voxel, 1 ); 
                        //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                        voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                        //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                        //voxel_cube.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

                        voxel_list.push(voxel_cube);

                        scene.add( voxel_cube );
                        //scene.add( voxel_cube2 );

                        console.group(voxel_cube);
                        */
                        




                    }
                    

                }


            }




            // gets inlyx executed if minimum 1 new voxel can be created
            if (create_new_voxels == true){

            
                removeObject( voxel_list[0]);
                voxel_list = [];

                ///voxel_grid[][][];
                create_new_voxels_here


                //const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
                //const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                //const material = new THREE.MeshNormalMaterial( );


                var count = voxel_position_list.length;

                var instanced_mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material,  count );

                const matrix = new THREE.Matrix4();


                for (let i = 0; i < voxel_position_list.length; i++) {
                
                    matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );

                    instanced_mesh.setMatrixAt( i, matrix );
                    //mesh.setColorAt( i, color );

                }
                

                voxel_list.push(instanced_mesh);

                scene.add( instanced_mesh );



                


            }


        }

    }



    


    function paint_instanced_mesh_clean() {



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {

            var create_new_voxels = false;


            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {




                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent

                        create_new_voxels = true;


                        voxel_grid[var_x][var_y][var_z] = 1;

                        /*
                        const these_coordinates = [];

                        these_coordinates.push(var_x + 0.5);
                        these_coordinates.push(var_y + 0.5);
                        these_coordinates.push(var_z + 0.5);

                        voxel_position_list.push(these_coordinates);
                        */


                        var this_point = new THREE.Vector3(var_x + 0.5, var_y + 0.5, var_z + 0.5)

                        voxel_position_list.push(this_point);






                        console.log("voxel created");



                        /*
                        const instancedMesh = new THREE.InstancedMesh(
                            voxel_geometry,
                            new THREE.MeshPhongMaterial()
                        );


                        const temp = new THREE.Object3D()


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            temp.position.set(voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2]);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(i, temp.matrix);

                        }
                        
                        instancedMesh.instanceMatrix.needsUpdate = true;



                        scene.add( instancedMesh );

                        */


                        /*
                        function createInstances(i_x, i_y, i_z, temp = new THREE.Object3D()) {

                            var this_x = i_x;
                            var this_y = i_y;
                            var this_z = i_z;

                            const instancedMesh = new THREE.InstancedMesh(
                                new THREE.BoxGeometry(),
                                new THREE.MeshPhongMaterial()
                            );
                        
                            
                            temp.position.set(this_x, this_y, this_z);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(1, temp.matrix);
                            
                        
                            instancedMesh.instanceMatrix.needsUpdate = true;
                        
                            return instancedMesh;
                        }
                        */


                        //const voxel_cube = createInstances(var_x + 0.5 , var_y + 0.5, var_z + 0.5);

                        
                        /*
                        // old way to create voxels
                        const voxel_cube = new THREE.InstancedMesh( voxel_geometry, transparent_material_voxel, 1 ); 
                        //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                        voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                        //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                        //voxel_cube.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

                        voxel_list.push(voxel_cube);

                        scene.add( voxel_cube );
                        //scene.add( voxel_cube2 );

                        console.group(voxel_cube);
                        */
                        




                    }
                    

                }


            }




            // gets inlyx executed if minimum 1 new voxel can be created
            if (create_new_voxels == true){

                //Audible feedback
                createSound.play();





            
                removeObject( voxel_list[0]);
                voxel_list = [];



                //const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
                //const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                //const material = new THREE.MeshNormalMaterial( );


                var count = voxel_position_list.length;

                var instanced_mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material,  count );

                const matrix = new THREE.Matrix4();


                for (let i = 0; i < voxel_position_list.length; i++) {
                
                    //matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );
                    matrix.setPosition( voxel_position_list[i].x, voxel_position_list[i].y, voxel_position_list[i].z );

                    instanced_mesh.setMatrixAt( i, matrix );
                    //mesh.setColorAt( i, color );

                }
                

                voxel_list.push(instanced_mesh);

                scene.add( instanced_mesh );



                


            }


        }

    }






    function paint_instanced_mesh() {



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {




            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent


                        voxel_grid[var_x][var_y][var_z] = 1


                        const these_coordinates = [];

                        these_coordinates.push(var_x + 0.5);
                        these_coordinates.push(var_y + 0.5);
                        these_coordinates.push(var_z + 0.5);

                        voxel_position_list.push(these_coordinates);



                        removeObject( voxel_list[0]);
                        voxel_list = [];



                        //const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
				        //const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                        //const material = new THREE.MeshNormalMaterial( );


                        var count = voxel_position_list.length;

				        var mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material, count );

                        const matrix = new THREE.Matrix4();


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );

						    mesh.setMatrixAt( i, matrix );
						    //mesh.setColorAt( i, color );

                        }
                        

                        voxel_list.push(mesh);

                        scene.add( mesh );



                        console.log("voxel created");



                        /*
                        const instancedMesh = new THREE.InstancedMesh(
                            voxel_geometry,
                            new THREE.MeshPhongMaterial()
                        );


                        const temp = new THREE.Object3D()


                        for (let i = 0; i < voxel_position_list.length; i++) {
                          
                            temp.position.set(voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2]);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(i, temp.matrix);

                        }
                        
                        instancedMesh.instanceMatrix.needsUpdate = true;



                        scene.add( instancedMesh );

                        */


                        /*
                        function createInstances(i_x, i_y, i_z, temp = new THREE.Object3D()) {

                            var this_x = i_x;
                            var this_y = i_y;
                            var this_z = i_z;

                            const instancedMesh = new THREE.InstancedMesh(
                                new THREE.BoxGeometry(),
                                new THREE.MeshPhongMaterial()
                            );
                        
                            
                            temp.position.set(this_x, this_y, this_z);
                            temp.updateMatrix();
                            instancedMesh.setMatrixAt(1, temp.matrix);
                            
                        
                            instancedMesh.instanceMatrix.needsUpdate = true;
                        
                            return instancedMesh;
                        }
                        */


                        //const voxel_cube = createInstances(var_x + 0.5 , var_y + 0.5, var_z + 0.5);

                        
                        /*
                        // old way to create voxels
                        const voxel_cube = new THREE.InstancedMesh( voxel_geometry, transparent_material_voxel, 1 ); 
                        //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                        voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                        //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                        //voxel_cube.instanceMatrix.setUsage( THREE.DynamicDrawUsage );

                        voxel_list.push(voxel_cube);

                        scene.add( voxel_cube );
                        //scene.add( voxel_cube2 );

                        console.group(voxel_cube);
                        */
                        




                    }
                    

                }


            }

        }

    }





    function paint_voxel() {



        // function should only be executed when the painting button is pressed
        if( key32 == true ) {




            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
            
            for (let i = 0; i < toolhead_list.length; i++) {
                
                


                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                    if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                        //console.log("000")

                        // den wert im voxel grid auf 1 setzent


                        voxel_grid[var_x][var_y][var_z] = 1



                        //console.log("voxel created");


                        
                        
                        // old way to create voxels
                        const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material_voxel ); 
                        //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                        voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                        //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                        voxel_list.push(voxel_cube);

                        scene.add( voxel_cube );
                        //scene.add( voxel_cube2 );

                        console.log("voxel created");
                            
                            
                        





            
                    

                    }
                    

                }


            }

        }

    }







    // --------------------------------------------- ERASE FUNCTION ----------------------------------------------- 


    var voxels_to_erase = [];




    function erase(){



        // es wird nur etwas ausgeführt wenn der löschen key gedrückt wird
        if (key16 == true) {


            var erase_voxels = false;




            // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen       
            for (let i = 0; i < toolhead_list.length; i++) {
                        
                // alle koordinaten werden gerundet   
                const var_x = Math.floor(toolhead_list[i].position.x)
                const var_y = Math.floor(toolhead_list[i].position.y)
                const var_z = Math.floor(toolhead_list[i].position.z)


                // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
                if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){


                    // jetzt wird geschaut ob an der stelle im grid ein voxel ist
                    if (   voxel_grid [var_x] [var_y] [var_z]  == 1  ) {

                        erase_voxels = true;

                        
                        /*
                        const these_coordinates = [];

                        these_coordinates.push(var_x + 0.5);
                        these_coordinates.push(var_y + 0.5);
                        these_coordinates.push(var_z + 0.5);

                        voxels_to_erase.push(these_coordinates);
                        */

                        var this_point = new THREE.Vector3(var_x + 0.5, var_y + 0.5, var_z + 0.5)

                        voxels_to_erase.push(this_point);



                        //falls ja, wird der wert an dieser stelle wieder auf 1 gesetzt
                        voxel_grid[var_x][var_y][var_z] = 0;


                        
                        //console.log("voxel created");


                        console.log("voxel erased");
                            
                            
                        
                        



                    

                    }
                    

                }


            }


            // gets inlyx executed if minimum 1 new voxel can be created
            if (erase_voxels == true){




                //Audible feedback
                erase_Sound.play();

                console.log("JAAAAAA");

            
                removeObject( voxel_list[0]);
                voxel_list = [];

                //console.log(voxel_list.length);



                //const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
                //const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                //const material = new THREE.MeshNormalMaterial( );


                //var count = voxel_position_list.length;

                //var instanced_mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material,  count );

                //const matrix = new THREE.Matrix4();

                /*
                for (let i = 0; i < voxel_position_list.length; i++) {


                    if(voxels_to_erase[i][0] == voxel_position_list[i][0] && voxels_to_erase[i][1] == voxel_position_list[i][1] && voxels_to_erase[i][2] == voxel_position_list[i][2] ){




                    }

                
                    matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );

                    instanced_mesh.setMatrixAt( i, matrix );
                    //mesh.setColorAt( i, color );

                }

                */

                //const A = [1, 4, 3, 2]
                //voxel_position_list

                //const B = [0, 2, 1, 2]
                //voxels_to_erase

                var new_voxel_position_list = []



                console.log(voxel_position_list.length);



                //voxel_position_list = voxel_position_list.filter(n => !voxels_to_erase.includes(n));

                //voxel_position_list = voxel_position_list.filter(item1 => !voxels_to_erase.some(item2 => item1.id === item2.id));



                /*
                voxel_position_list = voxel_position_list.filter(pos => {
                    // Überprüfen, ob die Position nicht in voxels_to_erase enthalten ist
                    return !voxels_to_erase.some(point => point.equals(pos));
                });

                */

                voxel_position_list = voxel_position_list.filter(pos => {
                    // Überprüfen, ob die Position nicht in voxels_to_erase enthalten ist
                    return !voxels_to_erase.some(point => 
                        point.x === pos.x && point.y === pos.y && point.z === pos.z
                    );
                });
                

                voxels_to_erase = [];
                

                //voxel_position_list = new_voxel_position_list


                console.log(voxel_position_list.length);
                

                //voxel_list.push(instanced_mesh);

                //scene.add( instanced_mesh );




                var count = voxel_position_list.length;

                var instanced_mesh = new THREE.InstancedMesh( voxel_geometry, normal_voxel_material,  count );

                const matrix = new THREE.Matrix4();


                for (let i = 0; i < voxel_position_list.length; i++) {
                
                    matrix.setPosition( voxel_position_list[i].x, voxel_position_list[i].y, voxel_position_list[i].z );

                    instanced_mesh.setMatrixAt( i, matrix );
                    //mesh.setColorAt( i, color );

                }
                

                voxel_list.push(instanced_mesh);

                scene.add( instanced_mesh );

                


            }



        }


    }




    


    // --------------------------------------------- BOOLEANUNION FUNCTION ----------------------------------------------- 


    //var _csg1;
    //var _csg2;


    function booleanUnion(){

        if(voxel_list.length > 3){




            //csg_list = [];

            //var voxel_singles = voxel_list;
            //var voxel_unions = [];

            /*
            for ( let i = 0 ; i<voxel_list.length  ; i++ ){
                const cylinderCSG1 = CSG.fromMesh(voxel_list[i], i)
                csg_list.push(cylinderCSG1);
                console.log("csg created");

            }
            */


            var _csg1 = CSG.fromMesh(voxel_list[0], object_index);
            //csg_list.push(_csg1);
            //console.log("csg 1 created");
            object_index += 1;

            var _csg2 = CSG.fromMesh(voxel_list[1],object_index);
            //csg_list.push(_csg2);
            //console.log("csg 2 created");
            object_index += 1;

            var _csg3 = CSG.fromMesh(voxel_list[2], object_index);
            //csg_list.push(_csg2);
            //console.log("csg 2 created");
            object_index += 1;

            var _csg4 = CSG.fromMesh(voxel_list[3], object_index);
            //csg_list.push(_csg2);
            //console.log("csg 2 created");
            object_index += 1;


            //var _csg2 = CSG.fromMesh

            //console.log(object_index);


        

            if(boolean_list.length>0){
                var unionCSG1 = csg_list[0].union(_csg1.union(_csg2.union(_csg3)));
                //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
                var unionMesh1 = CSG.toMesh(
                    unionCSG1,
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                )
            
                removeObject( boolean_list[0]);

                boolean_list = [];
                //console.log("length of boolean list : " + boolean_list.length);

                
                //removeObject( boolean_list[1]);
                

                boolean_list.push(unionMesh1);
                scene.add(unionMesh1);


                csg_list = [];
                csg_list.push(unionCSG1);


            }



            else{
                var unionCSG2 = _csg1.union(_csg2.union(_csg3));
            //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
            var unionMesh2 = CSG.toMesh(
                unionCSG2,
                new THREE.Matrix4(),
                transparent_material_yellow_voxel,
            )

            csg_list.push(unionCSG2);
            boolean_list.push(unionMesh2);
            scene.add(unionMesh2);

            }
            
            
            /*
            unionMesh.material = [
                transparent_material_yellow_voxel,
            ]
            */


            //unionMesh.position.set(toolhead_list[0].position);
            //unionMesh.position.set(-1,-1,0);
            //console.log(toolhead_list[0].position);


            
            // remove all voxels from scene
            for ( let i = 0 ; i<voxel_list.length-1  ; i++ ){
                removeObject( voxel_list[i]);
                console.log("voxel removed");
                
            }
            voxel_list = voxel_list.slice(-1);



            // empty the voxel_list
            //voxel_list = [];

            //voxel_list.push(unionMesh);
            

            console.log("length of boolean list : " + boolean_list.length);

            
                


            /*
            for ( let i = 0 ; i<csg_list.length  ; i++ ){
                const unionCSG = csg_list[i].union(csg_list[i+1]

            }
            */




            /*
            const cylinderCSG1 = CSG.fromMesh(cylinderMesh1, 2)
            const cylinderCSG2 = CSG.fromMesh(cylinderMesh2, 3)
            const cylinderCSG3 = CSG.fromMesh(cylinderMesh3, 4)
            const cylindersUnionCSG = cylinderCSG1.union(
                cylinderCSG2.union(cylinderCSG3)
            )

            const cylindersUnionMesh = CSG.toMesh(
                cylindersUnionCSG,
                new THREE.Matrix4()
            )
            cylindersUnionMesh.material = [
                cylinderMesh1.material,
                cylinderMesh2.material,
                cylinderMesh3.material,
            ]
            cylindersUnionMesh.position.set(2.5, 0, -3)
            scene.add(cylindersUnionMesh)
            */




            /*
            for ( let i = 0 ; i<voxel_singles.length -1 ; i+2 ){

            

                var voxel_union = voxel_singles[i].union(voxel_singles[i+1]);
                voxel_unions.push(voxel_union);

            }


            for ( let i = 0 ; i<voxel_unions.length  ; i++ ){
                const union_mesh = new THREE.Mesh( voxel_unions[i], transparent_material_voxel );
                scene.add(union_mesh);

            }
        
            //voxel_single = voxel_union;
            //var voxel_union = [];
            */

        }



    }





    function booleanUnion2(){






        // boolean union should only be executed when there is at least 1 new voxel
        if(voxel_list.length > 1){



            voxel_list[0].updateMatrix();
            var _csg1 = CSG.fromMesh(voxel_list[0], object_index);
            //csg_list.push(_csg1);
            //console.log("csg 1 created");
            object_index += 1;

            voxel_list[1].updateMatrix();
            var _csg2 = CSG.fromMesh(voxel_list[1],object_index);
            //csg_list.push(_csg2);
            //console.log("csg 2 created");
            object_index += 1;


        


            // condition for when we already have a boolean mesh
            if(boolean_list.length>0){
                var unionCSG1 = csg_list[0].union(_csg1.union(_csg2));
                //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
                var unionMesh1 = CSG.toMesh(
                    unionCSG1,
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                )
            
                // remove old mesh from scene
                removeObject( boolean_list[0]);
                // add new mesh into scene
                scene.add(unionMesh1);

                // remove old mesh from boolean list
                boolean_list = [];
                // add new mesh in the boolean list
                boolean_list.push(unionMesh1);
                //console.log("length of boolean list : " + boolean_list.length);
                

                // remove csg object from csg list
                csg_list = [];
                // ut new csg object into list
                csg_list.push(unionCSG1);


            }




            // condition for the first boolean mesh
            else {
                var unionCSG2 = _csg1.union(_csg2);
                //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
                var unionMesh2 = CSG.toMesh(
                    unionCSG2,
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                );


                // put first boolean mesh into boolean list
                boolean_list.push(unionMesh2);

                // put first boolean mesh into scene
                scene.add(unionMesh2);

                // put first csg object into csg list
                csg_list.push(unionCSG2);

        

            }
            
            
            

            // remove all voxels from scene
            for ( let i = 0 ; i<voxel_list.length  ; i++ ){
                removeObject( voxel_list[i]);
                console.log("voxel removed");
                
            }
            //voxel_list = voxel_list.slice(-1);
            voxel_list = [];
            

            console.log("length of boolean list : " + boolean_list.length);






        }



    }





    var object_index = 0;
    var csg_list = [];
    var boolean_list = [];
    var csg_voxel_list = [];
    var safety_num = 0;
    var csg_union_list = [];
    var boolean_mesh_list = [];
    var safety_num_limit = 1000000;


    // Define an array to store references to the meshes created in unionMesh
    const unionMeshes = []; 



    function booleanUnion3(){


        safety_num = 0;



        // boolean union should only be executed when there is at least 1 new voxel
        if(voxel_list.length > 0){


            // Audible feedback
            createSound.play();

            


            //consition for if there is no boolean mesh yet
            if (boolean_mesh_list.length == 0){



                // we have to unite all the voxels that were created in the last iteration (the ones in the voxel list)
                // fist we transform all new voxels into csg objects
                for ( let i = 0 ; i<voxel_list.length  ; i++ ){

                    voxel_list[i].updateMatrix();
                    var _csg = CSG.fromMesh(voxel_list[i], object_index);
                    object_index += 1;
                    csg_voxel_list.push(_csg);

                }



                // after we copied all the voxels into csg objects we can clean the voxel_list      
                // remove all voxels from scene
                for ( let i = 0 ; i < voxel_list.length  ; i++ ){
                    removeObject( voxel_list[i]);
                    console.log("voxel removed");
                
                }
                // clean the voxel list
                voxel_list = [];
                
                



                // if we have only 1 voxel created this one should be the new boolean geometry
                if (csg_voxel_list.length == 1){
                    var unionMesh = CSG.toMesh(
                        csg_voxel_list[0],
                        new THREE.Matrix4(),
                        voxel_material,
                        
                    );

                    console.log("csg_voxel_list.length == 1");
                    boolean_mesh_list.push(unionMesh);
                    // append the new single csg voxel union mesh into the union_mesh_list
                    csg_union_list.push(csg_voxel_list[0]);
                    scene.add(unionMesh);

                }




                // if there are multiple voxels created they should be united
                else{


                    // connect the first two voxels to the first union
                    var csg_union = csg_voxel_list[0].union(csg_voxel_list[1]);
                    // removing the first two objects from the csg list
                    csg_voxel_list = csg_voxel_list.slice(2);
                    csg_union_list.push(csg_union);



                    // now we can unite all csg objects
                    while(safety_num < safety_num_limit && csg_voxel_list.length > 0){

                        // adding 1 to the safety number
                        safety_num += 1;

                        // union the 
                        var csg_union = csg_union_list[0].union(csg_voxel_list[0]);
                        // removing the first object from the csg list
                        csg_voxel_list = csg_voxel_list.slice(1);

                        //clean the csg_union_list 
                        csg_union_list = []
                        // append the new csg union into the csg_union_list
                        csg_union_list.push(csg_union);

                    }


                    // now all of the vopxels are united as a csg object in the csg_union_list
                    // so we can now transform this one csg_object into a mesh 
                    var unionMesh = CSG.toMesh(
                        csg_union_list[0],
                        new THREE.Matrix4(),
                        voxel_material,
                    );
                    // and put it into the boolean_mesh_list
                    boolean_mesh_list.push(unionMesh);
                    scene.add(unionMesh);

                    
                }



            }


            

            //condition for if there already is a boolean mesh
            else{

            
                csg_voxel_list = [];


                // we have to unite all the voxels that were created in the last iteration (the ones in the voxel list)
                // fist we transform all new voxels into csg objects
                for ( let i = 0 ; i<voxel_list.length  ; i++ ){

                    voxel_list[i].updateMatrix();
                    var _csg = CSG.fromMesh(voxel_list[i], object_index);
                    object_index += 1;
                    csg_voxel_list.push(_csg);

                }



                // after we copied all the voxels into csg objects we can clean the voxel_list      
                // remove all voxels from scene
                for ( let i = 0 ; i < voxel_list.length  ; i++ ){
                    removeObject( voxel_list[i]);
                    console.log("voxel removed");
                
                }



                // clean the voxel list
                voxel_list = [];




                // if we have only 1 voxel created this one should be directly added to the union mesh
                if (csg_voxel_list.length == 1){
                    

                    var csg_union = csg_union_list[0].union(csg_voxel_list[0]);

                    // clean the csg_union_list
                    csg_union_list = [];
                    // append the new csg_union into the csg_union list
                    csg_union_list.push(csg_union);


                    var unionMesh = CSG.toMesh(
                        csg_union,
                        new THREE.Matrix4(),
                        voxel_material,
                    );


                    // remove the old boolean mesh from scene
                    removeObject( boolean_mesh_list[0]);
                    // clean the boolean_mesh_list
                    boolean_mesh_list = [];

                    // append the new union mesh into the boolean mesh list
                    boolean_mesh_list.push(unionMesh);
                    // add the new union mesh to the scene
                    scene.add(unionMesh);

                }





                // if there are multiple voxels created they should be united
                else{


                    var old_csg_object = csg_union_list[0];

                    //clean the csg_union_list
                    csg_union_list = [];

                    
                    // connect the first two voxels to the first union
                    var csg_union = csg_voxel_list[0].union(csg_voxel_list[1]);

                    // removing the first two objects from the csg list
                    csg_voxel_list = csg_voxel_list.slice(2);
                    
                    



                    csg_union_list.push(csg_union);



                    


                    // now we can unite all csg objects
                    while(safety_num < safety_num_limit && csg_voxel_list.length > 0){

                        // adding 1 to the safety number
                        safety_num += 1;

                        // union the 
                        var csg_union = csg_union_list[0].union(csg_voxel_list[0]);
                        // removing the first object from the csg list
                        csg_voxel_list = csg_voxel_list.slice(1);

                        //clean the csg_union_list 
                        csg_union_list = []
                        // append the new csg union into the csg_union_list
                        csg_union_list.push(csg_union);

                    }


                    // now all of the toolhead vopxels are united as a csg object in the csg_union_list
                    // now we can unite the toolhead voxels with the boolean mesh
                    var csg_union = csg_union_list[0].union(old_csg_object);


                    // now we clean and set the right csg object into the csg_union_list
                    //clean the csg_union_list 
                    csg_union_list = []
                    // append the new csg union into the csg_union_list
                    csg_union_list.push(csg_union);



                    // so we can now transform this one csg_object into a mesh 
                    var unionMesh = CSG.toMesh(
                        csg_union_list[0],
                        new THREE.Matrix4(),
                        voxel_material,
                    );


                    // remove the old boolean mesh from scene
                    removeObject( boolean_mesh_list[0]);
                    // clean the boolean_mesh_list
                    boolean_mesh_list = [];

                    // append the new union mesh into the boolean mesh list
                    boolean_mesh_list.push(unionMesh);
                    // add the new union mesh to the scene
                    scene.add(unionMesh);
                    
                }

            }


            console.log("boolean_mesh_list.length is : " + boolean_mesh_list.length);
            console.log("csg_union_list.length is : " + csg_union_list.length);


            //unionMesh.castShadow = true; //default is false
            //unionMesh.receiveShadow = false; //default


        }

    }







    // --------------------------------------------- TOOLHEAD FUNCTIONS ----------------------------------------------- 

    
    function create_toolhead(){

        if (toolhead_type == 1){

            create_box_toolhead();
            console.log("create_box_toolhead()");

        }

        else if (toolhead_type == 2){

            create_sphere_toolhead();
            console.log("create_sphere_toolhead()");

        }



    }





    function create_sphere_toolhead(){



        toolhead_list = [];
        toolhead_display_geometry = [];


        /*

        if (toolhead_size  == 1){

            // Toolhead geometry
            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);

            //console.log(toolhead_center);

            toolhead.position.set(toolhead_center.x,toolhead_center.y, toolhead_center.z );


            //console.log(toolhead.position);


            scene.add(toolhead);

            toolhead_list.push(toolhead);



            //toolhead_center = toolhead.position;

        }

        */



        if (toolhead_size == 1) {


            // toolhead display geometry
            var sphere_geometry = new THREE.SphereGeometry(4.2);
            var display_toolhead = new THREE.Mesh(sphere_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x , toolhead_center.y , toolhead_center.z );

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);
            



            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )


            var _x =  toolhead_center.x +  0.5
            var _y =  toolhead_center.y +  0.5
            var _z =  toolhead_center.z +  0.5


            var toolhead_coordinates = [


                
                [_x, _y, _z], // midlle point
                //[_x, _y, _z +1],
                //[_x, _y, _z -1],
                //[_x, _y, _z -2],
                

                // oberes kreuz
                [_x, _y, _z + 2],
                [_x -1, _y, _z + 2],
                [_x -1, _y -1, _z + 2],
                [_x, _y -1, _z + 2],

                [_x, _y +1, _z + 2],
                [_x -1, _y +1, _z + 2],

                [_x -2, _y, _z + 2],
                [_x -2, _y -1, _z + 2],

                [_x, _y -2, _z + 2],
                [_x -1, _y -2, _z + 2],

                [_x +1, _y, _z + 2],
                [_x +1, _y -1, _z + 2],


                // unteres kreuz
                [_x, _y, _z - 3],
                [_x -1, _y, _z - 3],
                [_x -1, _y -1, _z - 3],
                [_x, _y -1, _z - 3],

                [_x, _y +1, _z - 3],
                [_x -1, _y +1, _z - 3],

                [_x -2, _y, _z - 3],
                [_x -2, _y -1, _z - 3],

                [_x, _y -2, _z - 3],
                [_x -1, _y -2, _z - 3],

                [_x +1, _y, _z - 3],
                [_x +1, _y -1, _z - 3],



                // rechtes kreuz
                [_x +2, _y, _z],
                [_x +2, _y -1, _z],
                [_x +2, _y -1, _z -1],
                [_x +2, _y , _z -1],

                [_x +2, _y, _z +1],
                [_x +2, _y -1, _z +1],

                [_x +2, _y -2, _z],
                [_x +2, _y -2, _z -1],

                [_x +2, _y, _z -2],
                [_x +2, _y -1, _z -2],

                [_x +2, _y +1, _z],
                [_x +2, _y +1, _z -1],


                // linkes kreuz
                [_x -3, _y, _z],
                [_x -3, _y -1, _z],
                [_x -3, _y -1, _z -1],
                [_x -3, _y , _z -1],

                [_x -3, _y, _z +1],
                [_x -3, _y -1, _z +1],

                [_x -3, _y -2, _z],
                [_x -3, _y -2, _z -1],

                [_x -3, _y, _z -2],
                [_x -3, _y -1, _z -2],

                [_x -3, _y +1, _z],
                [_x -3, _y +1, _z -1],





                // vorderes kreuz
                [_x , _y +2, _z],
                [_x -1 , _y +2, _z],
                [_x -1, _y +2, _z -1],
                [_x , _y +2, _z -1],

                [_x +1, _y +2, _z],
                [_x +1, _y +2, _z -1],

                [_x , _y +2, _z -2],
                [_x -1 , _y +2, _z -2],

                [_x -2 , _y +2, _z],
                [_x -2 , _y +2, _z -1],

                [_x , _y +2, _z +1],
                [_x -1 , _y +2, _z +1],
                

                // hinteres kreuz
                [_x , _y -3, _z],
                [_x -1 , _y -3, _z],
                [_x -1, _y -3, _z -1],
                [_x , _y -3, _z -1],

                [_x +1, _y -3, _z],
                [_x +1, _y -3, _z -1],

                [_x , _y -3, _z -2],
                [_x -1 , _y -3, _z -2],

                [_x -2 , _y -3, _z],
                [_x -2 , _y -3, _z -1],

                [_x , _y -3, _z +1],
                [_x -1 , _y -3, _z +1],
                







                





            ];




            var _x =  toolhead_center.x +  0.5 -2;
            var _y =  toolhead_center.y +  0.5 -2;
            var _z =  toolhead_center.z +  0.5 -2;


            for (let x = 0 ; x < 4 ; x++){

                for (let y = 0; y < 4 ; y++){

                    for (let z = 0; z< 4; z++){

                        /*

                        toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        toolhead.position.set( _x + x   , _y + y  , _z + z );

                        scene.add(toolhead);

                        toolhead_list.push(toolhead);

                        console.log("yes");

                        */
                        var these_coordinates = [_x + x, _y + y,_z + z];

                        toolhead_coordinates.push(these_coordinates)

                        

                    } 


                } 


            }



            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);


            
        }





        else if (toolhead_size == 2) {




            // create toolhead display geometry
            var sphere_geometry = new THREE.SphereGeometry(5.5);
            var display_toolhead = new THREE.Mesh(sphere_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x , toolhead_center.y , toolhead_center.z );

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);

            
            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )


            var _x =  toolhead_center.x +  0.5
            var _y =  toolhead_center.y +  0.5
            var _z =  toolhead_center.z +  0.5


            var toolhead_coordinates = [


                
                [_x, _y, _z], // midlle point
                //[_x, _y, _z +1],
                //[_x, _y, _z -1],
                //[_x, _y, _z -2],
                

                // oberes kreuz
                [_x, _y, _z + 3],
                [_x -1, _y, _z + 3],
                [_x -1, _y -1, _z + 3],
                [_x, _y -1, _z + 3],

                [_x, _y +1, _z + 3],
                [_x -1, _y +1, _z + 3],

                [_x -2, _y, _z + 3],
                [_x -2, _y -1, _z + 3],

                [_x, _y -2, _z + 3],
                [_x -1, _y -2, _z + 3],

                [_x +1, _y, _z + 3],
                [_x +1, _y -1, _z + 3],


                
                // unteres kreuz
                [_x, _y, _z - 4],
                [_x -1, _y, _z - 4],
                [_x -1, _y -1, _z - 4],
                [_x, _y -1, _z - 4],

                [_x, _y +1, _z - 4],
                [_x -1, _y +1, _z - 4],

                [_x -2, _y, _z - 4],
                [_x -2, _y -1, _z - 4],

                [_x, _y -2, _z - 4],
                [_x -1, _y -2, _z - 4],

                [_x +1, _y, _z - 4],
                [_x +1, _y -1, _z - 4],


                
                // rechtes kreuz
                [_x +3, _y, _z],
                [_x +3, _y -1, _z],
                [_x +3, _y -1, _z -1],
                [_x +3, _y , _z -1],

                [_x +3, _y, _z +1],
                [_x +3, _y -1, _z +1],

                [_x +3, _y -2, _z],
                [_x +3, _y -2, _z -1],

                [_x +3, _y, _z -2],
                [_x +3, _y -1, _z -2],

                [_x +3, _y +1, _z],
                [_x +3, _y +1, _z -1],

                
                // linkes kreuz
                [_x -4, _y, _z],
                [_x -4, _y -1, _z],
                [_x -4, _y -1, _z -1],
                [_x -4, _y , _z -1],

                [_x -4, _y, _z +1],
                [_x -4, _y -1, _z +1],

                [_x -4, _y -2, _z],
                [_x -4, _y -2, _z -1],

                [_x -4, _y, _z -2],
                [_x -4, _y -1, _z -2],

                [_x -4, _y +1, _z],
                [_x -4, _y +1, _z -1],




                
                // vorderes kreuz
                [_x , _y +3, _z],
                [_x -1 , _y +3, _z],
                [_x -1, _y +3, _z -1],
                [_x , _y +3, _z -1],

                [_x +1, _y +3, _z],
                [_x +1, _y +3, _z -1],

                [_x , _y +3, _z -2],
                [_x -1 , _y +3, _z -2],

                [_x -2 , _y +3, _z],
                [_x -2 , _y +3, _z -1],

                [_x , _y +3, _z +1],
                [_x -1 , _y +3, _z +1],
                

                // hinteres kreuz
                [_x , _y -4, _z],
                [_x -1 , _y -4, _z],
                [_x -1, _y -4, _z -1],
                [_x , _y -4, _z -1],

                [_x +1, _y -4, _z],
                [_x +1, _y -4, _z -1],

                [_x , _y -4, _z -2],
                [_x -1 , _y -4, _z -2],

                [_x -2 , _y -4, _z],
                [_x -2 , _y -4, _z -1],

                [_x , _y -4, _z +1],
                [_x -1 , _y -4, _z +1],
                
                






                





            ];




            var _x =  toolhead_center.x +  0.5 -3;
            var _y =  toolhead_center.y +  0.5 -3;
            var _z =  toolhead_center.z +  0.5 -3;


            for (let x = 0 ; x < 6 ; x++){

                for (let y = 0; y < 6 ; y++){

                    for (let z = 0; z< 6; z++){

                        /*

                        toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        toolhead.position.set( _x + x   , _y + y  , _z + z );

                        scene.add(toolhead);

                        toolhead_list.push(toolhead);

                        console.log("yes");

                        */

                        var these_coordinates = [_x + x, _y + y,_z + z];

                        if(x == 0 && y == 0 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 0 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 5 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 5 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 0 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 0 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 5 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 5 && z == 5){
                            console.log("nix");
                        }
                        else{
                            toolhead_coordinates.push(these_coordinates)
                        }
                        

                        

                    } 


                } 


            }



            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);


            
        }




        else if (toolhead_size == 3) {


            
            // create toolhead display geometry
            var sphere_geometry = new THREE.SphereGeometry(7);
            var display_toolhead = new THREE.Mesh(sphere_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x + 0.5 , toolhead_center.y + 0.5, toolhead_center.z + 0.5);

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);



            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )


            var _x =  toolhead_center.x +  0.5
            var _y =  toolhead_center.y +  0.5
            var _z =  toolhead_center.z +  0.5


            var toolhead_coordinates = [


                
                [_x, _y, _z], // midlle point
                //[_x, _y, _z +1],
                //[_x, _y, _z -1],
                //[_x, _y, _z -2],
                

                // oberes kreuz
                [_x, _y, _z + 5],
                [_x , _y +1, _z + 5],
                [_x , _y +2, _z + 5],
                [_x , _y -1, _z + 5],
                [_x , _y -2, _z + 5],


                [_x -1, _y, _z + 5],
                [_x -1 , _y +1, _z + 5],
                [_x -1 , _y +2, _z + 5],
                [_x -1 , _y -1, _z + 5],
                [_x -1 , _y -2, _z + 5],

                [_x -2 , _y +1, _z + 5],
                [_x -2 , _y , _z + 5],
                [_x -2 , _y -1, _z + 5],


                [_x +1, _y, _z + 5],
                [_x +1 , _y +1, _z + 5],
                [_x +1 , _y +2, _z + 5],
                [_x +1 , _y -1, _z + 5],
                [_x +1 , _y -2, _z + 5],


                [_x +2 , _y +1, _z + 5],
                [_x +2 , _y , _z + 5],
                [_x +2 , _y -1, _z + 5],






                // unteres kreuz
                [_x, _y, _z -5],
                [_x , _y +1, _z -5],
                [_x , _y +2, _z -5],
                [_x , _y -1, _z -5],
                [_x , _y -2, _z -5],


                [_x -1, _y, _z -5],
                [_x -1 , _y +1, _z -5],
                [_x -1 , _y +2, _z -5],
                [_x -1 , _y -1, _z -5],
                [_x -1 , _y -2, _z -5],

                [_x -2 , _y +1, _z -5],
                [_x -2 , _y , _z -5],
                [_x -2 , _y -1, _z -5],


                [_x +1, _y, _z -5],
                [_x +1 , _y +1, _z -5],
                [_x +1 , _y +2, _z -5],
                [_x +1 , _y -1, _z -5],
                [_x +1 , _y -2, _z -5],


                [_x +2 , _y +1, _z -5],
                [_x +2 , _y , _z -5],
                [_x +2 , _y -1, _z -5],




                // linkes kreuz
                [_x -5, _y, _z],
                [_x -5, _y, _z +1],
                [_x -5, _y, _z -1],
                [_x -5, _y, _z +2],
                [_x -5, _y, _z -2],

                [_x -5, _y +1, _z],
                [_x -5, _y +1, _z +1],
                [_x -5, _y +1, _z -1],
                [_x -5, _y +1, _z +2],
                [_x -5, _y +1, _z -2],

                [_x -5, _y +2, _z],
                [_x -5, _y +2, _z +1],
                [_x -5, _y +2, _z -1],


                [_x -5, _y -1, _z],
                [_x -5, _y -1, _z +1],
                [_x -5, _y -1, _z -1],
                [_x -5, _y -1, _z +2],
                [_x -5, _y -1, _z -2],

                [_x -5, _y -2, _z],
                [_x -5, _y -2, _z +1],
                [_x -5, _y -2, _z -1],


                // rechtes kreuz
                [_x +5, _y, _z],
                [_x +5, _y, _z +1],
                [_x +5, _y, _z -1],
                [_x +5, _y, _z +2],
                [_x +5, _y, _z -2],

                [_x +5, _y +1, _z],
                [_x +5, _y +1, _z +1],
                [_x +5, _y +1, _z -1],
                [_x +5, _y +1, _z +2],
                [_x +5, _y +1, _z -2],

                [_x +5, _y +2, _z],
                [_x +5, _y +2, _z +1],
                [_x +5, _y +2, _z -1],


                [_x +5, _y -1, _z],
                [_x +5, _y -1, _z +1],
                [_x +5, _y -1, _z -1],
                [_x +5, _y -1, _z +2],
                [_x +5, _y -1, _z -2],

                [_x +5, _y -2, _z],
                [_x +5, _y -2, _z +1],
                [_x +5, _y -2, _z -1],



                // hinteres kreuz
                [_x , _y -5, _z],
                [_x , _y -5, _z +1],
                [_x , _y -5, _z -1],
                [_x , _y -5, _z +2],
                [_x , _y -5, _z -2],

                [_x -1 , _y -5, _z],
                [_x -1 , _y -5, _z +1],
                [_x -1 , _y -5, _z -1],
                [_x -1 , _y -5, _z +2],
                [_x -1 , _y -5, _z -2],

                [_x -2 , _y -5, _z],
                [_x -2 , _y -5, _z +1],
                [_x -2 , _y -5, _z -1],


                [_x +1 , _y -5, _z],
                [_x +1 , _y -5, _z +1],
                [_x +1 , _y -5, _z -1],
                [_x +1 , _y -5, _z +2],
                [_x +1 , _y -5, _z -2],

                [_x +2 , _y -5, _z],
                [_x +2 , _y -5, _z +1],
                [_x +2 , _y -5, _z -1],


                // vorderes kreuz
                [_x , _y +5, _z],
                [_x , _y +5, _z +1],
                [_x , _y +5, _z -1],
                [_x , _y +5, _z +2],
                [_x , _y +5, _z -2],

                [_x -1 , _y +5, _z],
                [_x -1 , _y +5, _z +1],
                [_x -1 , _y +5, _z -1],
                [_x -1 , _y +5, _z +2],
                [_x -1 , _y +5, _z -2],

                [_x -2 , _y +5, _z],
                [_x -2 , _y +5, _z +1],
                [_x -2 , _y +5, _z -1],


                [_x +1 , _y +5, _z],
                [_x +1 , _y +5, _z +1],
                [_x +1 , _y +5, _z -1],
                [_x +1 , _y +5, _z +2],
                [_x +1 , _y +5, _z -2],

                [_x +2 , _y +5, _z],
                [_x +2 , _y +5, _z +1],
                [_x +2 , _y +5, _z -1],





            ];









            







            // 2. layer unten
            var _x =  toolhead_center.x +  0.5 -4;
            var _y =  toolhead_center.y +  0.5 -4;
            var _z =  toolhead_center.z +  0.5 -4;

            for (let x = 1 ; x < 8 ; x++){

                for (let y = 1; y < 8 ; y++){

                    var z = 0;

                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(x == 1 && y == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && y == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && y == 7 ){
                        console.log("nix");
                    }
                    else if(x == 1 && y == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    

                } 


            }



            // 2. layer oben
            var _x =  toolhead_center.x +  0.5 -4;
            var _y =  toolhead_center.y +  0.5 -4;
            var _z =  toolhead_center.z +  0.5 +4;

            for (let x = 1 ; x < 8 ; x++){

                for (let y = 1; y < 8 ; y++){

                    var z = 0;

                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(x == 1 && y == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && y == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && y == 7 ){
                        console.log("nix");
                    }
                    else if(x == 1 && y == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    

                } 


            }



            // 2. layer links
            var _x =  toolhead_center.x +  0.5 -4;
            var _y =  toolhead_center.y +  0.5 -4;
            var _z =  toolhead_center.z +  0.5 -4;

            for (let y = 1 ; y < 8 ; y++){

                for (let z = 1; z < 8 ; z++){

                    var x = 0;


                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(y == 1 && z == 1 ){
                        console.log("nix");
                    }
                    else if(y == 7 && z == 1 ){
                        console.log("nix");
                    }
                    else if(y == 7 && z == 7 ){
                        console.log("nix");
                    }
                    else if(y == 1 && z == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    

                } 


            }


            // 2. layer rechts
            var _x =  toolhead_center.x +  0.5 +4;
            var _y =  toolhead_center.y +  0.5 -4;
            var _z =  toolhead_center.z +  0.5 -4;

            for (let y = 1 ; y < 8 ; y++){

                for (let z = 1; z < 8 ; z++){

                    var x = 0;


                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(y == 1 && z == 1 ){
                        console.log("nix");
                    }
                    else if(y == 7 && z == 1 ){
                        console.log("nix");
                    }
                    else if(y == 7 && z == 7 ){
                        console.log("nix");
                    }
                    else if(y == 1 && z == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    

                } 


            }



            // 2. layer hinten
            var _x =  toolhead_center.x +  0.5 -4;
            var _y =  toolhead_center.y +  0.5 -4;
            var _z =  toolhead_center.z +  0.5 -4;
 
             for (let x = 1 ; x < 8 ; x++){
 
                 for (let z = 1; z < 8 ; z++){
 
                    var y = 0;


                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(x == 1 && z == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && z == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && z == 7 ){
                        console.log("nix");
                    }
                    else if(x == 1 && z == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    
 
                } 
 
 
            }


            // 2. layer vorne
            var _x =  toolhead_center.x +  0.5 -4;
            var _y =  toolhead_center.y +  0.5 +4;
            var _z =  toolhead_center.z +  0.5 -4;
    
                for (let x = 1 ; x < 8 ; x++){
    
                    for (let z = 1; z < 8 ; z++){
    
                    var y = 0;


                    

                    var these_coordinates = [_x + x, _y + y,_z + z];

                    if(x == 1 && z == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && z == 1 ){
                        console.log("nix");
                    }
                    else if(x == 7 && z == 7 ){
                        console.log("nix");
                    }
                    else if(x == 1 && z == 7 ){
                        console.log("nix");
                    }
                    else{
                        toolhead_coordinates.push(these_coordinates)
                    }
                    
    
                } 
    
    
            }
 
            
 









            // innerer würfel
            var _x =  toolhead_center.x +  0.5 -3;
            var _y =  toolhead_center.y +  0.5 -3;
            var _z =  toolhead_center.z +  0.5 -3;



            for (let x = 0 ; x < 7 ; x++){

                for (let y = 0; y < 7 ; y++){

                    for (let z = 0; z< 7; z++){

                        /*

                        toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        toolhead.position.set( _x + x   , _y + y  , _z + z );

                        scene.add(toolhead);

                        toolhead_list.push(toolhead);

                        console.log("yes");

                        */

                        var these_coordinates = [_x + x, _y + y,_z + z];

                        toolhead_coordinates.push(these_coordinates);
                        

                    } 


                } 


            }













            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);


            
        }



        console.log(toolhead_list.length)


    }




    /*
    var _x =  toolhead_center.x +  0.5 -5;
            var _y =  toolhead_center.y +  0.5 -5;
            var _z =  toolhead_center.z +  0.5 -5;

            for (let x = 0 ; x < 6 ; x++){

                for (let y = 0; y < 6 ; y++){

                    for (let z = 0; z< 6; z++){

                        

                        var these_coordinates = [_x + x, _y + y,_z + z];

                        if(x == 0 && y == 0 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 0 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 5 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 5 && z == 0){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 0 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 0 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 5 && y == 5 && z == 5){
                            console.log("nix");
                        }
                        else if(x == 0 && y == 5 && z == 5){
                            console.log("nix");
                        }
                        else{
                            //toolhead_coordinates.push(these_coordinates)
                        }
                        

                        

                    } 


                } 


            }



    */











    function create_toolhead_from_coordinates(i_coordinates_list){


        var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);

        var coordinates_list = i_coordinates_list;

        var this_toolhead_list = [];

        for( let i = 0; i < coordinates_list.length; i++){


            var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
            toolhead.position.set( coordinates_list[i][0]  , coordinates_list[i][1]   , coordinates_list[i][2] );

            this_toolhead_list.push(toolhead);
            //scene.add(toolhead);


        }

        return this_toolhead_list;



    }
















    function create_box_toolhead(){

        toolhead_list = [];
        toolhead_display_geometry = [];



        /*
        if (toolhead_size  == 1){

            // Toolhead geometry
            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);

            //console.log(toolhead_center);

            toolhead.position.set(toolhead_center.x,toolhead_center.y, toolhead_center.z );


            //console.log(toolhead.position);


            scene.add(toolhead);

            toolhead_list.push(toolhead);



            //toolhead_center = toolhead.position;

        }



        else if (toolhead_size >= 2) {


            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )

            for (let x = - toolhead_size / 2 ; x < toolhead_size / 2 ; x++){

                for (let y = -toolhead_size / 2; y < toolhead_size / 2 ; y++){

                    for (let z = -toolhead_size / 2; z< toolhead_size / 2 ; z++){

                        var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        toolhead.position.set( toolhead_center.x + x + 0.5   , toolhead_center.y + y + 0.5 , toolhead_center.z + z+ 0.5);
                        scene.add(toolhead);

                        toolhead_list.push(toolhead);

                        

                    } 


                } 


            }
            
            
        }


        */

        if(toolhead_size == 1) {

            var toolhead_coordinates = [];



            // toolhead display geometry
            var box_geometry = new THREE.BoxGeometry(4, 4, 4);
            var display_toolhead = new THREE.Mesh(box_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x , toolhead_center.y , toolhead_center.z );

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);



            var cube_size = 3;


            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )

            for (let x = - cube_size / 2 ; x < cube_size / 2 ; x++){

                for (let y = -cube_size / 2; y < cube_size / 2 ; y++){

                    for (let z = -cube_size / 2; z< cube_size / 2 ; z++){

                        //var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        //toolhead.position.set( toolhead_center.x + x + 0.5   , toolhead_center.y + y + 0.5 , toolhead_center.z + z+ 0.5);


                        toolhead_coordinates.push([toolhead_center.x + x + 0.5, toolhead_center.y + y + 0.5, toolhead_center.z + z+ 0.5])
                        //scene.add(toolhead);

                        //toolhead_list.push(toolhead);

                        

                    } 


                } 


            }



            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);

            
            
        }





        if(toolhead_size == 2) {


            var toolhead_coordinates = [];


            // toolhead display geometry
            var box_geometry = new THREE.BoxGeometry(7, 7, 7);
            var display_toolhead = new THREE.Mesh(box_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x , toolhead_center.y , toolhead_center.z );

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);


            var cube_size = 6;


            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )

            for (let x = - cube_size / 2 ; x < cube_size / 2 ; x++){

                for (let y = -cube_size / 2; y < cube_size / 2 ; y++){

                    for (let z = -cube_size / 2; z< cube_size / 2 ; z++){

                        toolhead_coordinates.push([toolhead_center.x + x + 0.5, toolhead_center.y + y + 0.5, toolhead_center.z + z+ 0.5])

                        

                    } 


                } 


            }
            

            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);
            
        }




        if(toolhead_size == 3) {


            var toolhead_coordinates = []



            // toolhead display geometry
            var box_geometry = new THREE.BoxGeometry(10, 10, 10);
            var display_toolhead = new THREE.Mesh(box_geometry, display_toolhead_material);
            display_toolhead.position.set(toolhead_center.x , toolhead_center.y , toolhead_center.z );

            toolhead_display_geometry.push(display_toolhead);
            scene.add(display_toolhead);




            var cube_size = 9;


            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            
            //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )

            for (let x = - cube_size / 2 ; x < cube_size / 2 ; x++){

                for (let y = -cube_size / 2; y < cube_size / 2 ; y++){

                    for (let z = -cube_size / 2; z< cube_size / 2 ; z++){

                        toolhead_coordinates.push([toolhead_center.x + x + 0.5, toolhead_center.y + y + 0.5, toolhead_center.z + z+ 0.5])

                        

                    } 


                } 


            }


            toolhead_list = create_toolhead_from_coordinates(toolhead_coordinates);
            
            
        }

        





        /*
        else if (toolhead_size == 2) {


            var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
            


            for (let x = -1; x <= 1 ; x++){

                for (let y = -1; y<= 1 ; y++){

                    for (let z = -1; z<= 1 ; z++){

                        var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                        toolhead.position.set(x,y,z);
                        scene.add(toolhead);

                        toolhead_list.push(toolhead);

                    } 


                } 


            }
            
            
        }
        */


    }







    function remove_toolhead(){

        // remove all toolhead_voxels from scene
        for (let i = 0; i < toolhead_list.length; i++) {

            removeObject( toolhead_list[i]);
            //toolhead_list = [];

        }


        // remove the toolhead display mesh from scene
        removeObject(toolhead_display_geometry[0]);

    }







    // --------------------------------------------- REMOVE OBJECT ----------------------------------------------- 

    //  REMOVE OBJECTS AND CLEAN THE CACHES
    function removeObject(sceneObject){
        if (!(sceneObject instanceof THREE.Object3D)) return;
    
    
        //Remove geometries to free GPU resources
        if (sceneObject.geometry) sceneObject.geometry.dispose();
    
        /*
        //Remove materials to free GPU resources
        if (sceneObject.material) {
            if (sceneObject.material instanceof Array) {
                sceneObject.material.forEach(material => material.dispose());
            } else {
                sceneObject.material.dispose();
            }
        }
        */
    
        //Remove object from scene
        sceneObject.removeFromParent()
    };




    var final_voxel_list = [];
    var csg_voxel_list = [];
    var csg_union_list = [];
    var final_mesh_list = [];




    function create_final_mesh(){


        final_voxel_list = [];
        csg_voxel_list = [];
        csg_union_list = [];
        final_mesh_list = [];
        

        
        for (let i = 0; i < voxel_position_list.length; i++) {
                            
            //matrix.setPosition( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2] );

            



            // old way to create voxels
            const this_voxel = new THREE.Mesh( voxel_geometry, normal_voxel_material ); 
            //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


            this_voxel.position.set( voxel_position_list[i][0], voxel_position_list[i][1], voxel_position_list[i][2]);
            //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

            final_voxel_list.push(this_voxel);

            //scene.add( voxel_cube );
            //scene.add( voxel_cube2 );

            //console.log("voxel created");

        }




        // we have to unite all the voxels that were created in the last iteration (the ones in the voxel list)
        // fist we transform all new voxels into csg objects
        for ( let i = 0 ; i < final_voxel_list.length  ; i++ ){

            final_voxel_list[i].updateMatrix();
            var _csg = CSG.fromMesh(final_voxel_list[i], object_index);
            object_index += 1;
            csg_voxel_list.push(_csg);

        }
            






        /*
        // after we copied all the voxels into csg objects we can clean the voxel_list      
        // remove all voxels from scene
        for ( let i = 0 ; i < voxel_list.length  ; i++ ){
            removeObject( voxel_list[i]);
            console.log("voxel removed");
        
        }
        // clean the voxel list
        voxel_list = [];
        */
        



        // if there are multiple voxels created they should be united
        if (csg_voxel_list.length > 1){


            // connect the first two voxels to the first union
            var csg_union = csg_voxel_list[0].union(csg_voxel_list[1]);
            // removing the first two objects from the csg list
            csg_voxel_list = csg_voxel_list.slice(2);
            csg_union_list.push(csg_union);



            // now we can unite all csg objects
            while(safety_num < safety_num_limit && csg_voxel_list.length > 0){

                // adding 1 to the safety number
                safety_num += 1;

                // union the 
                var csg_union = csg_union_list[0].union(csg_voxel_list[0]);
                // removing the first object from the csg list
                csg_voxel_list = csg_voxel_list.slice(1);

                //clean the csg_union_list 
                csg_union_list = [];
                // append the new csg union into the csg_union_list
                csg_union_list.push(csg_union);

                console.log(safety_num);

            }


            // now all of the vopxels are united as a csg object in the csg_union_list
            // so we can now transform this one csg_object into a mesh 
            var unionMesh = CSG.toMesh(
                csg_union_list[0],
                new THREE.Matrix4(),
                voxel_material,
            );
            // and put it into the boolean_mesh_list
            final_mesh_list.push(unionMesh);
            //scene.add(unionMesh);

            

            
        }





        // if we have only 1 voxel created this one should be the new boolean geometry
        else if (csg_voxel_list.length == 1){
            var unionMesh = CSG.toMesh(
                csg_voxel_list[0],
                new THREE.Matrix4(),
                voxel_material,
                
            );

            console.log("csg_voxel_list.length == 1");
            final_mesh_list.push(unionMesh);
            // append the new single csg voxel union mesh into the union_mesh_list
            //csg_union_list.push(csg_voxel_list[0]);
            //scene.add(unionMesh);

        }




        



        return final_mesh_list[0];
        //console.log(final_mesh_list[0]);


        //return instanced_mesh;
        

    }

        













































    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------  BUTTONS  -------------------------------------------------- 
    // -------------------------------------------------------------------------------------------------------------

    // integrate Buttons
    exportFunction();
    clearFunction();
    muteFunction();
    toolheadTypeFunction();
    toolheadSizeFunction();



    // -------------------------------------------------- EXPORT ---------------------------------------------------

    function exportFunction() {

        // create export button
        const exportButton = document.createElement('button');
        exportButton.textContent = 'EXPORT .stl';


        // style
        exportButton.style.padding = '5px 5px';
        exportButton.style.fontSize = '12px'; // Set font size





        exportButton.style.color = '#fff'; // Set text color
        exportButton.style.border = 'none'; // Remove border
        exportButton.style.borderRadius = '5px'; // Add border radius for rounded corners

        exportButton.style.position = 'absolute';
        exportButton.style.top = '2%';
        exportButton.style.right = '20px';
        exportButton.style.zIndex = '9999'; // place in front of scene

        exportButton.style.cursor = 'pointer'; // Change cursor on hover


        document.body.appendChild(exportButton);








        // CHANGE COLORS FOR EXPORT BUTTON HERE
        
        //exportButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Set background color
        exportButton.style.backgroundColor = 'rgb(64,224,208)'; // Set background color

        // Visual feedback on hover
        exportButton.addEventListener ('mouseenter', function() {
            //exportButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            exportButton.style.backgroundColor = 'rgb(175, 238, 238)'; // background color on hover
            // exportButton.style.border = 'true';
        });

        exportButton.addEventListener ('mouseleave', function() {
            //exportButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            exportButton.style.backgroundColor = 'rgb(64,224,208)'; // original background color
        });



        // Visual feedback on click
        exportButton.addEventListener ('mousedown', function() {
            //exportButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            exportButton.style.backgroundColor = 'rgb(175, 238, 238)'; // background color on click
        });

        exportButton.addEventListener ('mouseup', function() {
            //exportButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            exportButton.style.backgroundColor = 'rgb(64,224,208)'; // original background color
        });









        /*// Global variables to keep track of meshes for export
        var meshesToExport = [];
        const finishButton = document.createElement('button'); // Finish button for exporting
        const returnButton = document.createElement('button'); // Return button for returning to drawing mode
        */

        

        // add click event listener to the export button and define which meshes to export
        exportButton.addEventListener('click', () => {

            // Audible feedback on click
            exportSound.play();

            // call the export stl function
            exportSTL();

            // Remove focus from the button
            exportButton.blur();

            // Prepare meshes for export and display in viewer
            //prepareMeshesForExport();

        });
        




        // EXPORT STL FUNCTION
        function exportSTL( ) {
            const exporter = new STLExporter();


            const exportScene = new THREE.Scene();
            exportScene.add(create_final_mesh());
            //exportScene.add(instanced_mesh);

            // Generate STL data
            const stlData = exporter.parse(exportScene, { binary: true, includeNormals: true });


            // Convert data to a blob and trigger download
            const blob = new Blob([stlData], { type: 'application/octet-stream' });
            const link = document.createElement('a');

            link.href = URL.createObjectURL(blob);
            link.download = 'model.stl';
            link.click();


            // Clean up
            URL.revokeObjectURL(link.href);

        }


        /*

        // Prepare meshes for export and display in viewer
        function prepareMeshesForExport() {
            meshesToExport = [];
            // Add meshes to the list for export
            meshesToExport.push(create_final_mesh()); // Assuming create_final_mesh() function returns the mesh to be exported
            // Add more meshes if needed

            // Clear existing scene and renderer
            clearScene();

            // Display meshes in viewer
            meshesToExport.forEach(mesh => {
                viewerScene.add(mesh);
            });

            // Show UI for exporting or returning to drawing mode
            showExportUI();
        }



        // Function to clear existing scene and renderer
        function clearScene() {
            // Remove all objects from the viewer scene
             scene.children.forEach(child => {
                scene.remove(child);
            });
        }



        // Function to show UI for exporting or returning to drawing mode
        function showExportUI() {
            // Display UI elements for exporting or returning to drawing mode
            // For example, you can show two buttons: "Finish" and "Return"
            document.body.appendChild(finishButton);
            finishButton.style.textContent = 'finish';
            finishButton.style.fontSize = '12px';
            finishButton.style.position = 'absolute';
            finishButton.style.bottom = '2%';
            finishButton.style.right = '20px';
            finishButton.style.zIndex = '9999'; // place in front of scene
            finishButton.style.cursor = 'pointer'; // Change cursor on hover

            document.body.appendChild(returnButton);
            returnButton.style.textContent = 'return';
            returnButton.style.fontSize = '12px';
            returnButton.style.position = 'absolute';
            returnButton.style.bottom = '2%';
            returnButton.style.right = '20px';
            returnButton.style.zIndex = '9999'; // place in front of scene
            returnButton.style.cursor = 'pointer'; // Change cursor on hover

            // Add click event listener to the "Finish" button
            finishButton.addEventListener('click', exportSelectedMeshes);

            // Add click event listener to the "Return" button
            returnButton.addEventListener('click', returnToDrawingMode);
        }



        // Function to export selected meshes
        function exportSelectedMeshes() {
            // Generate STL data for selected meshes
            const exporter = new STLExporter();
            const stlData = exporter.parse(new THREE.Group().add(...meshesToExport), { binary: true, includeNormals: true });

            // Convert data to a blob and trigger download
            const blob = new Blob([stlData], { type: 'application/octet-stream' });
            const link = document.createElement('a');
        
            link.href = URL.createObjectURL(blob);
            link.download = 'model.stl';
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
        }



        // Function to return to drawing mode
        function returnToDrawingMode() {
            // Clear viewer scene
            clearScene();

            // Hide UI elements for exporting or returning to drawing mode
            finishButton.style.display = 'none';
            returnButton.style.display = 'none';

            // Add back event listener for export button
            exportButton.addEventListener('click', prepareMeshesForExport);
        }

        */

        

    }
    
    





    // ----------------------------------------------  CLEAR SCENE  ------------------------------------------------ 
   
    function clearFunction() {

        /*
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'none'; // Hide modal by default

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const message = document.createElement('p');
        message.textContent = 'Are you sure you want to clear the scene?';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'I am sure';

        // Add modal content to modal
        modalContent.appendChild(message);
        modalContent.appendChild(confirmButton);
        modal.appendChild(modalContent);

        // Append modal to the document body
        document.body.appendChild(modal);

        // Style the modal dynamically
        modal.style.position = 'fixed';
        modal.style.zIndex = '9999';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        modalContent.style.position = 'absolute';
        modalContent.style.top = '50%';
        modalContent.style.left = '50%';
        modalContent.style.transform = 'translate(-50%, -50%)';
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';

        // Function to show the modal
        function showModal() {
            modal.style.display = 'block';
        }

        // Function to hide the modal
        function hideModal() {
            modal.style.display = 'none';
        }

        // Event listener for the Clear Scene button
        clearButton.addEventListener('click', () => {
            showModal();
        });

        // Event listener for the I am sure button
        confirmButton.addEventListener('click', () => {
        
            // Clear the scene (replace with your code to clear the scene)
            console.log('Scene cleared!');
            // Hide the modal
            hideModal();
        });
        */

        // Create clear button
        const clearButton = document.createElement('button');

        clearButton.textContent = 'CLEAR SCENE';

        // Style
        clearButton.style.padding = '5px 5px';
        clearButton.style.fontSize = '12px';
       
        clearButton.style.color = '#fff';
        clearButton.style.border = 'none';
        clearButton.style.borderRadius = '5px';

        clearButton.style.position = 'absolute';
        clearButton.style.top = '2%';
        clearButton.style.right = '110px';
        clearButton.style.zIndex = '9999'; // Place in front of scene

        clearButton.style.cursor = 'pointer'; // Change cursor on hover


        //clearButton.style.backgroundColor = 'rgb(198, 105, 105)';
        clearButton.style.backgroundColor = 'rgb(255,105,180)';

        
        // Visual feedback on hover
        clearButton.addEventListener('mouseenter', function() {
            //clearButton.style.backgroundColor = 'rgb(241, 195, 195)'; // Background color on hover
            clearButton.style.backgroundColor = 'rgb(255,182,193)'; // Background color on hover
        });

        clearButton.addEventListener('mouseleave', function() {
            //clearButton.style.backgroundColor = 'rgb(198, 105, 105)'; // Original background color
            clearButton.style.backgroundColor = 'rgb(255,105,180)';
        });


        // Visual feedback on click
        clearButton.addEventListener('mousedown', function() {
            //clearButton.style.backgroundColor = 'rgb(241, 195, 195)'; // Background color on click
            clearButton.style.backgroundColor = 'rgb(255,182,193)'; // Background color on hover
        });

        clearButton.addEventListener('mouseup', function() {
            //clearButton.style.backgroundColor = 'rgb(198, 105, 105)'; // Restore original background color after click
            clearButton.style.backgroundColor = 'rgb(255,105,180)';
        });


        document.body.appendChild(clearButton);


        



        // Add click event listener to the clear button
        clearButton.addEventListener('click', () => {
            
            // Play clear sound
            clearSound.play();

            // Clear the scene (replace with your clear scene function)
            clearScene();

            // Remove focus from the button
            clearButton.blur();

        });




        // clear scene function
        function clearScene() {
            


            // remove mesh from scene
            removeObject( voxel_list[0]);

            // remove mesh from list
            voxel_list = [];

            // delete voxel positions
            voxel_position_list = [];

            // reinitialize the voxel grid
            create_voxel_grid();


            //console.log(voxel_position_list.length);
            




            // Call your animate function to render the cleared scene
            //animate();

            console.log('Scene cleared!');

        }

    }







    // -------------------------------------------------- MUTE SOUND ---------------------------------------------------

    function muteFunction() {

        // Create the button element
        var muteButton = document.createElement("button");
        muteButton.setAttribute("id", "muteButton");
        
        // Create an image element for the icon
        var muteIcon = document.createElement("img");
        muteIcon.setAttribute("src", "icons/mute_red.png");
        muteIcon.setAttribute("alt", "Toggle bgm");
        muteIcon.style.width = '23px';
        muteIcon.style.height = '23px';
        muteIcon.style.position = 'absolute';
        muteIcon.style.top = '2%';
        muteIcon.style.right = '230px';
        muteIcon.style.zIndex = '9999'; // place in front of scene
        muteIcon.style.cursor = 'pointer'; // Change cursor on hover
        
        
        // Append the icon image to the button
        muteButton.appendChild(muteIcon);

        // Append the button element to the body
        document.body.appendChild(muteButton);



        /*// muteButton TEXT style
        muteButton.textContent = "Mute";

        muteButton.style.padding = '5px 5px';
        muteButton.style.fontSize = '12px'; // Set font size
        muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Set background color
        muteButton.style.color = '#fff'; // Set text color
        muteButton.style.border = 'none'; // Remove border
        muteButton.style.borderRadius = '5px'; // Add border radius for rounded corners
        
        muteButton.style.position = 'absolute';
        muteButton.style.top = '2%';
        muteButton.style.left = '20px';
        muteButton.style.zIndex = '9999'; // place in front of scene
        muteButton.style.border = 'none'; // Remove border
        muteButton.style.cursor = 'pointer'; // Change cursor on hover
        */


        // Visual feedback on hover
        muteButton.addEventListener ('mouseenter', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            // exportButton.style.border = 'true';
            muteIcon.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            muteIcon.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        muteButton.addEventListener ('mouseleave', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            muteIcon.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            muteIcon.style.opacity = "1"; // Adjust opacity level as needed
        });



        // Visual feedback on click
        muteButton.addEventListener ('mousedown', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            muteIcon.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            muteIcon.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        muteButton.addEventListener ('mouseup', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Restore original background color after click
            muteIcon.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            muteIcon.style.opacity = "1"; // Adjust opacity level as needed
        });
        


        




        // Set initial state
        var isMuted = false;

        // Function to toggle mute/play
        muteButton.addEventListener("click", function() {

            if (isMuted) {

                bgm.pause();
                //muteButton.textContent = "Mute";
                muteIcon.setAttribute("src", "icons/mute_red.png");

            } else {

                bgm.play();
                //muteButton.textContent = "Unmute";
                muteIcon.setAttribute("src", "icons/unmute_green.png");

            }

            isMuted = !isMuted;

            // Remove focus from the button
            muteButton.blur();

        });

    }
    
     





    // -------------------------------------------------- Toolhead TYPE Selection ---------------------------------------------------

    function toolheadTypeFunction() {

        // ----- Toolhead TYPE -----

        // Create the button element
        var typeButton = document.createElement("button");
        typeButton.setAttribute("id", "typeButton");
        
        // Create an image element for the icon
        var typeIcon = document.createElement("img");
        typeIcon.setAttribute("src", "icons/sphere.png");
        typeIcon.setAttribute("alt", "Toggle toolhead Type");
        typeIcon.style.width = '50px';
        typeIcon.style.height = '50px';
        typeIcon.style.position = 'absolute';
        typeIcon.style.top = '2%';
        typeIcon.style.left = '30px';
        typeIcon.style.zIndex = '9999'; // place in front of scene
        typeIcon.style.cursor = 'pointer'; // Change cursor on hover
        
        
        // Append the icon image to the button
        typeButton.appendChild(typeIcon);

        // Append the button element to the body
        document.body.appendChild(typeButton);



        /*// muteButton TEXT style
        muteButton.textContent = "Mute";

        muteButton.style.padding = '5px 5px';
        muteButton.style.fontSize = '12px'; // Set font size
        muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Set background color
        muteButton.style.color = '#fff'; // Set text color
        muteButton.style.border = 'none'; // Remove border
        muteButton.style.borderRadius = '5px'; // Add border radius for rounded corners
        
        muteButton.style.position = 'absolute';
        muteButton.style.top = '2%';
        muteButton.style.left = '20px';
        muteButton.style.zIndex = '9999'; // place in front of scene
        muteButton.style.border = 'none'; // Remove border
        muteButton.style.cursor = 'pointer'; // Change cursor on hover
        */


        // Visual feedback on hover
        typeButton.addEventListener ('mouseenter', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            // exportButton.style.border = 'true';
            typeIcon.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            typeIcon.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        typeButton.addEventListener ('mouseleave', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            typeIcon.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            typeIcon.style.opacity = "1"; // Adjust opacity level as needed
        });



        // Visual feedback on click
        typeButton.addEventListener ('mousedown', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            typeIcon.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            typeIcon.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        typeButton.addEventListener ('mouseup', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Restore original background color after click
            typeIcon.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            typeIcon.style.opacity = "1"; // Adjust opacity level as needed
        });
        


        




        // Set initial state
        var isSphere = false;

        // Function to toggle mute/play
        typeButton.addEventListener("click", function() {

            if (isSphere) {

                button_toohead_type = 2;
                //muteButton.textContent = "Mute";
                typeIcon.setAttribute("src", "icons/sphere.png");

                toolheadTypeSound.play();

                console.log('toolhead Type: sphere');

            } else {

                button_toohead_type = 1;
                //muteButton.textContent = "Unmute";
                typeIcon.setAttribute("src", "icons/cube.png");

                toolheadTypeSound.play();

                console.log('toolhead Type: cube')

            }

            isSphere = !isSphere;

            // Remove focus from the button
            typeButton.blur();

        });

    }
    
    
    




    // -------------------------------------------------- Toolhead SIZE Selection ---------------------------------------------------

    function toolheadSizeFunction() {

        // ----- Toolhead SIZE "sphere" -----

        // --- 1 BUTTON ---
        var sizeButton1 = document.createElement("button");
        sizeButton1.setAttribute("id", "sizeButton1");
        
        // Create an image element for the icon
        var sizeIcon1 = document.createElement("img");
        sizeIcon1.setAttribute("src", "icons/1s_f.png");
        sizeIcon1.setAttribute("alt", "Toggle toolhead Size");
        sizeIcon1.style.width = '30px';
        sizeIcon1.style.height = '30px';
        sizeIcon1.style.position = 'absolute';
        sizeIcon1.style.top = '2%';
        sizeIcon1.style.left = '120px';
        sizeIcon1.style.zIndex = '9999'; // place in front of scene
        sizeIcon1.style.cursor = 'pointer'; // Change cursor on hover
        
        
        // Append the icon image to the button
        sizeButton1.appendChild(sizeIcon1);

        // Append the button element to the body
        document.body.appendChild(sizeButton1);



        // Visual feedback on hover
        sizeButton1.addEventListener ('mouseenter', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            // exportButton.style.border = 'true';
            sizeIcon1.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon1.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton1.addEventListener ('mouseleave', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            sizeIcon1.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon1.style.opacity = "1"; // Adjust opacity level as needed
        });


        // Visual feedback on click
        sizeButton1.addEventListener ('mousedown', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            sizeIcon1.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon1.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton1.addEventListener ('mouseup', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Restore original background color after click
            sizeIcon1.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon1.style.opacity = "1"; // Adjust opacity level as needed
        });
        





        // --- 2 BUTTON ---
        var sizeButton2 = document.createElement("button");
        sizeButton2.setAttribute("id", "sizeButton2");
        
        // Create an image element for the icon
        var sizeIcon2 = document.createElement("img");
        sizeIcon2.setAttribute("src", "icons/2s_h.png");
        sizeIcon2.setAttribute("alt", "Toggle toolhead Size");
        sizeIcon2.style.width = '30px';
        sizeIcon2.style.height = '30px';
        sizeIcon2.style.position = 'absolute';
        sizeIcon2.style.top = '2%';
        sizeIcon2.style.left = '160px';
        sizeIcon2.style.zIndex = '9999'; // place in front of scene
        sizeIcon2.style.cursor = 'pointer'; // Change cursor on hover
        
        
        // Append the icon image to the button
        sizeButton2.appendChild(sizeIcon2);

        // Append the button element to the body
        document.body.appendChild(sizeButton2);



        // Visual feedback on hover
        sizeButton2.addEventListener ('mouseenter', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            // exportButton.style.border = 'true';
            sizeIcon2.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon2.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton2.addEventListener ('mouseleave', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            sizeIcon2.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon2.style.opacity = "1"; // Adjust opacity level as needed
        });


        // Visual feedback on click
        sizeButton2.addEventListener ('mousedown', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            sizeIcon2.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon2.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton2.addEventListener ('mouseup', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Restore original background color after click
            sizeIcon2.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon2.style.opacity = "1"; // Adjust opacity level as needed
        });






        // --- 3 BUTTON ---
        var sizeButton3 = document.createElement("button");
        sizeButton3.setAttribute("id", "sizeButton3");
        
        // Create an image element for the icon
        var sizeIcon3 = document.createElement("img");
        sizeIcon3.setAttribute("src", "icons/3s_h.png");
        sizeIcon3.setAttribute("alt", "Toggle toolhead Size");
        sizeIcon3.style.width = '30px';
        sizeIcon3.style.height = '30px';
        sizeIcon3.style.position = 'absolute';
        sizeIcon3.style.top = '2%';
        sizeIcon3.style.left = '200px';
        sizeIcon3.style.zIndex = '9999'; // place in front of scene
        sizeIcon3.style.cursor = 'pointer'; // Change cursor on hover
        
        
        // Append the icon image to the button
        sizeButton3.appendChild(sizeIcon3);

        // Append the button element to the body
        document.body.appendChild(sizeButton3);



        // Visual feedback on hover
        sizeButton3.addEventListener ('mouseenter', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on hover
            // exportButton.style.border = 'true';
            sizeIcon3.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon3.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton3.addEventListener ('mouseleave', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // original background color
            sizeIcon3.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon3.style.opacity = "1"; // Adjust opacity level as needed
        });


        // Visual feedback on click
        sizeButton3.addEventListener ('mousedown', function() {
            //muteButton.style.backgroundColor = 'rgb(180, 230, 180)'; // background color on click
            sizeIcon3.style.filter = "brightness(120%)"; // Adjust brightness level as needed
            sizeIcon3.style.opacity = "0.7"; // Adjust opacity level as needed
        });

        sizeButton3.addEventListener ('mouseup', function() {
            //muteButton.style.backgroundColor = 'rgb(69, 150, 69)'; // Restore original background color after click
            sizeIcon3.style.filter = "brightness(100%)"; // Adjust brightness level as needed
            sizeIcon3.style.opacity = "1"; // Adjust opacity level as needed
        });



        



        // Event Listeners to toggle between sizes:

        // --- 1 BUTTON ---
        sizeButton1.addEventListener("click", function() {

            button_toolhead_size = 1;

            sizeIcon1.setAttribute("src", "icons/1s_f.png");
            sizeIcon2.setAttribute("src", "icons/2s_h.png");
            sizeIcon3.setAttribute("src", "icons/3s_h.png");

            toolheadSizeSound.play();

            console.log('toolhead Size: 1');


            // Remove focus from the buttons
            sizeButton1.blur();
            
        });



        // --- 2 BUTTON ---
        sizeButton2.addEventListener("click", function() {

            button_toolhead_size = 2;

            sizeIcon1.setAttribute("src", "icons/1s_h.png");
            sizeIcon2.setAttribute("src", "icons/2s_f.png");
            sizeIcon3.setAttribute("src", "icons/3s_h.png");

            toolheadSizeSound.play();

            console.log('toolhead Size: 2');


            // Remove focus from the buttons
            sizeButton2.blur();
            
        });



        // --- 3 BUTTON ---
        sizeButton3.addEventListener("click", function() {

            button_toolhead_size = 3;

            sizeIcon1.setAttribute("src", "icons/1s_h.png");
            sizeIcon2.setAttribute("src", "icons/2s_h.png");
            sizeIcon3.setAttribute("src", "icons/3s_f.png");

            toolheadSizeSound.play();

            console.log('toolhead Size: 3');


            // Remove focus from the buttons
            sizeButton3.blur();
            
        });



        


    }
        
    





    /*function toolheadSizeFunction() {         // wanted to make the code more dynamic and elegant

        // initial left position
        var leftPosition1 = 120; // ...for 1 button
        var leftPosition2 = 160; // ...for 2 button
        var leftPosition3 = 200; // ...for 3 button

        // initial icon source
        var sizeIcon_1s_f = "icons/1s_f.png"
        var sizeIcon_2s_f = "icons/2s_f.png"
        var sizeIcon_3s_f = "icons/3s_f.png"


        // Create the button elements
        var sizeButton1 = createButton(sizeIcon_1s_f, button_toolhead_size, leftPosition1);
        var sizeButton2 = createButton(sizeIcon_2s_f, button_toolhead_size, leftPosition2);
        var sizeButton3 = createButton(sizeIcon_3s_f, button_toolhead_size, leftPosition3);

        

        // Append the button elements to the body
        document.body.appendChild(sizeButton1);
        document.body.appendChild(sizeButton2);
        document.body.appendChild(sizeButton3);


        function createButton(i_sizeIcon, i_button_toolhead_size, i_leftPosition) {

            // Create the button element
            var sizeButton = document.createElement("button");
            sizeButton.setAttribute("class", "size-button");
            
            // Create an image element for the icon
            var sizeIcon = document.createElement("img");
            sizeIcon.setAttribute("src", i_sizeIcon);
            sizeIcon.setAttribute("alt", "Toggle toolhead Size");
            sizeIcon.style.width = '30px';
            sizeIcon.style.height = '30px';
            sizeIcon.style.cursor = 'pointer'; // Change cursor on hover
            
            // Append the icon image to the button
            sizeButton.appendChild(sizeIcon);



            // Set position for the button
            sizeButton.style.position = 'absolute';
            sizeButton.style.top = '2%';
            sizeButton.style.left = "'" + i_leftPosition + "px'";
            

            console.log("button created")

            
            // Visual feedback on hover
            sizeButton.addEventListener('mouseenter', function() {
                sizeIcon.style.filter = "brightness(120%)"; // brightness level
                sizeIcon.style.opacity = "0.7"; // opacity level
            });

            sizeButton.addEventListener('mouseleave', function() {
                sizeIcon.style.filter = "brightness(100%)"; // brightness level
                sizeIcon.style.opacity = "1"; // opacity level
            });



            // Function to toggle toolhead size
            sizeButton.addEventListener("click", function() {

                // Reset all buttons
                document.querySelectorAll('.size-button').forEach(function(button) {
                    button.classList.remove('active');
                });

                // Set current button as active
                sizeButton.classList.add('active');

                // Apply toolhead size change
                changeToolheadSize(i_button_toolhead_size);

            });


            return sizeButton;

        }



        // Function to change toolhead size
        function changeToolheadSize(i_button_toolhead_size) {
            // Your logic for changing toolhead size based on the 'size' parameter
            console.log('Toolhead Size:', i_button_toolhead_size);
        }


    }
    */

    


    















    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------  ANIMATE  -------------------------------------------------- 
    // -------------------------------------------------------------------------------------------------------------


    //renderer.render( scene, camera );


    function animate() {

        
        renderer.render( scene, camera );
    
        
    
        // condition for recreating toolhead if parameters change
        if (toolhead_size != button_toolhead_size || toolhead_type != button_toohead_type){

            toolhead_size = button_toolhead_size;
            toolhead_type = button_toohead_type;

            remove_toolhead();
            create_toolhead();
            
            //update_toolhead();
            //create_box_toolhead();

        }
    
        //orbit_control.update(w);
        
        //update_camera_position();

        // enable orbit control update after update camera position for trippy effect!
        //orbit_control.update();
        
        
        //move_toolhead_absolut();
        move_toolhead_relative();
        


        paint_instanced_mesh_clean();
        //paint_instanced_mesh_new();
        //paint_points();
        erase();
        //booleanUnion3();


        //console.log(count);
        console.log(voxel_position_list.length);

        //console.log(toolhead_center);

        requestAnimationFrame( animate );

    }



    animate();





} // End of App as Function





