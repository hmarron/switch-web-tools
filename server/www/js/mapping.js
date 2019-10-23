mapping = {
    "A": 0,
    "B": 0,
    "Y": 0,
    "X": 0,
    "L": 0,
    "R": 0,
    "ZL": 0,
    "ZR": 0,
    "DPadUp": 0,
    "DPadRight": 0,
    "DPadDown": 0,
    "DPadLeft": 0,
    "LStickUp": 0,
    "LStickRight": 0,
    "LStickDown": 0,
    "LStickLeft": 0,
    "RStickUp": 0,
    "RStickRight": 0,
    "RStickDown": 0,
    "RStickLeft": 0,
    "RStick": 0
}

choosing_mapping = null

function getInputVal(input, control){
    return eval("input."+control)
}

function initMapping(){
    //Add keyboard
    html = "<div id='keyboard' class='simple-keyboard' style='display:none;'></div>"
    $("#mapping-config").append(html)

    //Generate buttons
    for (control in mapping){
        html = "<button id='button-"+control+"' class='mapping-button'>"+control+"</button>"
        $("#mapping-config").append(html)
    }

    //Init keyboard
    Keyboard = window.SimpleKeyboard.default;
    myKeyboard = new Keyboard({
      onKeyPress: function(button){
        log("Mapping " + choosing_mapping + " to " + button);
        mapping[choosing_mapping] = button
        $("#keyboard").hide()
        $("#button-"+choosing_mapping).html(choosing_mapping + " : " + button)
      }
    });

    //Open keyboard on button click
    $(".mapping-button").click(function(){
        choosing_mapping = $(this).attr('id').replace('button-','');
        log("choose a key to bind to " + choosing_mapping)
        $("#keyboard").show()
    });

    //Toggle config screen
    $("#mapping-config-button").click(function(){
        $("#mapping-config").toggle()
        $("#iframe").toggle()
    })

    //Inject event trigger into iframe
    var $iframe = $('#iframe');
    $iframe.ready(function() {
        $iframe.contents().find("body").append("<script> \
        function triggerEvent(e){ \
            $(document).trigger(e); \
        }</script>");
    });
}

function startMappingInputs(interval, target){
    var intervalID = window.setInterval(function(){
        etypes = {
            'keypress': input.getPressed(),
            'keydown': input.getHeld(),
            'keyup': input.getReleased()
        }

        for(etype in etypes){
            for(control in mapping){
                if(etypes[etype] == getInputVal(input, control)){
                    var e = $.Event(etype);
                    e.which = mapping[control];
                    $("#iframe")[0].contentWindow.triggerEvent(e);
                }
            }
        }

    }, interval);
    return intervalID
}
