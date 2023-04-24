$(document).ready(function() {
    $('#width').val(100)
    $('#height').val(100)
    $('.copy-icon').hide()
    
    $("#square-color").val("#F08080")
    
    $('.individual-radius').hide()
    $('.individual-radius2').hide()
    
    $('#custom-shape').attr('checked', true);
    $('.image-settings').hide()
    
    //Whent input type range appear on the page
    const min = $('.track').attr('min') //.track is all the input type range belonging in #layer0
    const max = $('.track').attr('max')
    const value = $('.track').val()
    let calc = (value - min) * 100 / (max - min) + '% 100%'
    $(".track").css("background-size", `${calc}`)
    
    
    //When page first loads, the box-shadow text will appear in the .result
    $('.result').text("box-shadow:    ;")
    $('.copy-icon').show()
    
    //Function to let users upload images 
    $("#file-uploader").on("input", function(event) {
       $("#image-grid").empty();
       const reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
       reader.addEventListener('load', (event) => {
          const img = document.createElement('img');
          $("#image-grid").append(img);
          img.src = event.target.result;
          img.className = 'image';
          img.setAttribute("id", "image")
       });
    })
  
    
    //When users input their width and height for the square
    $('#width').on("input", function(e){
      let widthNow = $(this).val()
      let width = $(document).innerWidth()
      let max = Math.round(56 * width / 100)
      
      if (widthNow > max) { 
        $('.square').css("width", 100)
        $(this).val(100)
        $("#alert").text(`*The maximum width is: ${max}px`)
      } else {
        $('.square').css("width", widthNow)
        $("#alert").text("")
      }
      e.preventDefault();
    })
    
    $('#height').on("input", function(e){
      let heightNow = $(this).val()
      $('.square').css("height", heightNow)
      e.preventDefault();
    })
    
    //When users enter their color for the square
    $("#square-color").on("input", function() {
      let color = $(this).val()
      $(".square").css("background-color", `${color}`)
    })
    
    //When users enter their color for the background
    $(".background-color").on("input", function() {
      let color = $(this).val()
      $(".half-action").css("background-color", `${color}`)
    })
    
    
    //Slide Radius 1
    $('#slideRadius').on("input", function() { 
      $(".radius").html($(this).val())
      $('.square').css("border-radius", `${$(this).val()}%`)
    }) 
    
    //Slide radius 2
    $('#slideRadius2').on("input", function() { 
      $(".radius2").html($(this).val())
      $('.image').css("border-radius", `${$(this).val()}%`)
    }) 
    
    
    //When user checked the Individual radius 1 button
    $('#individual').change(function() {
      if(this.checked){
        $('.slideContainer').hide()
        $('.individual-radius').show()
      } else {
        $('.slideContainer').show()
        $('.individual-radius').hide()
      }
    })
    
    //When user checked the Individual radius 2 button
    $('#individual2').change(function() {
      if(this.checked){
        $('.slideContainer2').hide()
        $('.individual-radius2').show()
      } else {
        $('.slideContainer2').show()
        $('.individual-radius2').hide()
      }
    })
    
    //When user checked the Custom shape or the Upload image button
    $("input[type='radio']").change(function() {
      if($("#custom-shape").is(":checked")){
        $('.image-settings').hide()
        $('#image-grid').hide()
        $('.square').show()
        $('.square-settings').show()
      } else if ($("#upload-image").is(":checked")) {
        $('.image-settings').show()
        $('#image-grid').show()
        $('.square-settings').hide()
        $('.square').hide()
        $(".half-action").css("background-color", "#FFFFFF")
      }
    })
    
    
    
    //Slide individual borders 1
    $('#slideTopLeftRadius').on("input", function() { 
      $(".topLeftRadius").html($(this).val())
      $('.square').css("border-top-left-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideTopRightRadius').on("input", function() { 
      $(".topRightRadius").html($(this).val())
      $('.square').css("border-top-right-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideBottomRightRadius').on("input", function() { 
      $(".bottomRightRadius").html($(this).val())
      $('.square').css("border-bottom-right-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideBottomLeftRadius').on("input", function() { 
      $(".bottomLeftRadius").html($(this).val())
      $('.square').css("border-bottom-left-radius", `${$(this).val()}%`)
    })
    
    //Slide individual borders 1
    $('#slideTopLeftRadius2').on("input", function() { 
      $(".topLeftRadius2").html($(this).val())
      $('.image').css("border-top-left-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideTopRightRadius2').on("input", function() { 
      $(".topRightRadius2").html($(this).val())
      $('.image').css("border-top-right-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideBottomRightRadius2').on("input", function() { 
      $(".bottomRightRadius2").html($(this).val())
      $('.image').css("border-bottom-right-radius", `${$(this).val()}%`)
    }) 
    
    $('#slideBottomLeftRadius2').on("input", function() { 
      $(".bottomLeftRadius2").html($(this).val())
      $('.image').css("border-bottom-left-radius", `${$(this).val()}%`)
    })
    
    
    
    //// Box-Shadow Part ////
    
    let count = 0 ;
    
    let horizontalArray = []
    let verticalArray = []
    let blurArray = []
    let spreadArray = []
    let colorArray = []
    let insetArray = []
    
    
    //Combine all the values we've stored so far into one big variable, then pass it to .square and .result
    const showResults = function () {
      let result = ""
      for (let i = 0; i < horizontalArray.length; i++) {
        let array = `${horizontalArray[i]} ${verticalArray[i]} ${blurArray[i]} ${spreadArray[i]} ${colorArray[i]} ${insetArray[i]}`;
        if (array == "     " || array == "undefined undefined undefined undefined undefined undefined") { // 5 spaces
          continue;
        } 
        
        if(result == "") {
          result = result.concat(" ", array)
          
        } else if (result) {
          result = result.concat(", ", array)
        }
      }
      
      if($("#custom-shape").is(":checked")) {
        $('.square').css("box-shadow", result)
      } else if ($('#upload-image').is(":checked")) {
        $('.image').css("box-shadow", result)
      }
      
      $('.result').text(`box-shadow: ${result};`)
      $('.copy-icon').show()
    }
    
    
    //Function to store all box-shadow values into their respective arrays
    const storeElement = function(num) {
  
      let inset = " "
      if($(`#inset${num}`).is(":checked")){
        inset = "inset"
      } else {
        inset = " "
      }
      
      let horizontal = $(`#slideHorizontal${num}`).val()
      let vertical = $(`#slideVertical${num}`).val()
      let blur = $(`#slideBlur${num}`).val()
      let spread = $(`#slideSpread${num}`).val()
      let color = $(`#color-shadow${num}`).val()
      
      horizontalArray[num] = `${horizontal}px`
      verticalArray[num] = `${vertical}px`
      blurArray[num] = `${blur}px`
      spreadArray[num] = `${spread}px`
      colorArray[num] = `${color}`
      insetArray[num] = `${inset}`
      
      showResults();
      
    }
    
    
    //Function to start over when user delete all the shadow layers
    const startOver = function () {
      count = 0;
      
      for (let i = 1; i < horizontalArray.length; i++) {
        $(`#layer${i}`).remove()
      }
      
      horizontalArray = []
      verticalArray = []
      blurArray = []
      spreadArray = []
      colorArray = []
      insetArray = []
      
      const min = -50
      const max = 50
      const value = 0
      let calc = (value - min) * 100 / (max - min) + '% 100%';
      
      $("#layer0").show()
      $("#slideHorizontal0").val(0).css("background-size", `${calc}`)
      $("#horizontal-shadow0").text(0)
      
      $("#slideVertical0").val(0).css("background-size", `${calc}`)
      $("#vertical-shadow0").text(0)
      
      $("#slideBlur0").val(0).css("background-size", `${calc}`)
      $("#blur-shadow0").text(0)
      
      $("#slideSpread0").val(0).css("background-size", `${calc}`)
      $("#spread-shadow0").text(0)
      
      $("#color-shadow0").val("#000000")
      
      $("#inset0").prop('checked', false);
      
    }
    
    
    //Function to delete the entire layer
    const deleteElement = function(num) {
      $(`#layer${num}`).hide()
      horizontalArray[num] = ""
      verticalArray[num] = ""
      blurArray[num] = ""
      spreadArray[num] = ""
      colorArray[num] = ""
      insetArray[num] = ""
      
      if ($(".adjustment").children(':visible').length == 0) {
        startOver()
      } 
      
      showResults()
    }
    
    
    //Creating and renaming the newly cloned elements
    $(".add-shadow").click(function() {
      count += 1;
      
      const min = -50
      const max = 50
      const value = 0
      let calc = (value - min) * 100 / (max - min) + '% 100%';
      
      $("#layer0").clone(true).show().appendTo(".adjustment").attr('id', `layer${count}`); 
      //put clone(true) if you want to perform general selection on its children elements
      //Remember that when you clone a hidden element, the new element will inherit
      // the hiddenness as well, so make sure to make it show() each time you clone a hidden element
      let clone = $(`#layer${count}`)
      
      clone.find("#name0").attr("id", `name${count}`).text(`Shadow #${count + 1}`)
      
      clone.find("#slideHorizontal0").attr("id", `slideHorizontal${count}`).val(0).css("background-size", `${calc}`)
      clone.find("#horizontal-shadow0").attr("id", `horizontal-shadow${count}`).text(0)
      
      clone.find("#slideVertical0").attr("id", `slideVertical${count}`).val(0).css("background-size", `${calc}`)
      clone.find("#vertical-shadow0").attr("id", `vertical-shadow${count}`).text(0)
      
      clone.find("#slideBlur0").attr("id", `slideBlur${count}`).val(0).css("background-size", `${calc}`)
      clone.find("#blur-shadow0").attr("id", `blur-shadow${count}`).text(0)
      
      clone.find("#slideSpread0").attr("id", `slideSpread${count}`).val(0).css("background-size", `${calc}`)
      clone.find("#spread-shadow0").attr("id", `spread-shadow${count}`).text(0)
      
      clone.find("#color-shadow0").attr("id", `color-shadow${count}`).val("#000000")
      
      clone.find("#inset0").attr("id", `inset${count}`).prop('checked', false);
      
      clone.find("#delete0").attr("id", `delete${count}`)
      
    })
    
    //When users input on any of the layers
    $(".slider").on("input", function(){ 
      let attribute = $(this).attr("id") 
      let lastNum;
      
      if(count > 9) {
        lastNum = attribute.slice(-2)
      } else {
        lastNum = attribute.slice(-1)
      }
      
      storeElement(lastNum)
      
      if(attribute.toLowerCase().includes("horizontal")){
        $(`#horizontal-shadow${lastNum}`).html($(this).val())
      } else if(attribute.toLowerCase().includes("vertical")){
        $(`#vertical-shadow${lastNum}`).html($(this).val())
      } else if(attribute.toLowerCase().includes("blur")){
        $(`#blur-shadow${lastNum}`).html($(this).val())
      } else if(attribute.toLowerCase().includes("spread")){
        $(`#spread-shadow${lastNum}`).html($(this).val())
      }
      
      
    })
    
    
    //When users click on the delete button
    $(".delete").on("click", function() {
        let attribute = $(this).attr("id") 
        let lastNum;
      
        if(count > 9) {
          lastNum = attribute.slice(-2)
        } else {
          lastNum = attribute.slice(-1)
        }
      
        deleteElement(lastNum)
    })
    
    
    //Copy to Clipboard//
    $('.copy-icon').on({
      mousedown: function(){
        let temp = $("<input>");
        $("body").append(temp);
        temp.val($('.result').text()).select();
        document.execCommand("copy");
        temp.remove();
        $(this).addClass("clicked")
     },
      mouseup: function() {
        $(this).removeClass('clicked')
      }
    })
    
    
    //When user touch the input type range
    $('input[type="range"]').on("input", function(e) {
       let target = e.target
       const min = target.min
       const max = target.max
       const val = target.value
    
       target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    })
    
   
  })