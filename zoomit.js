var thumbs;
var activeIndex;


$(document).ready(function () {
    thumbs = $(".thumbnail");
    makeZoomItElements();
//

    $("#zoomit").bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            previousImage();
        } else {
            nextImage();
        }

        e.preventDefault();

    });


    $(".thumbnail").click(function (e) {
        var link = $(this).attr("src");
        e.preventDefault();
        showImage($(this).index(".thumbnail"));
    });
})

$("html").click(function () {
    $("#zoomit").hide();
});


$(document).keydown(function (e) {

    if (e.keyCode == 37) {
        previousImage();
    }

    if (e.keyCode == 39) {
        nextImage();
    }

    if(e.keyCode==27){
    	$("#zoomit").hide();
    }

})


function nextImage() {
    if (activeIndex < thumbs.size() - 1) {
        activeIndex++;
        showImage(activeIndex);
    }
}

function previousImage() {
    if (activeIndex > 0) {
        activeIndex--;
        showImage(activeIndex);
    }
}

function sizeFix(img) {

	if($(document).width()<$(window).height()){
    if (img.width > $(document).width() - 100) {
        img.width = $(document).width() - ($(window).width()*0.1);
    }
}else{
    if (img.height > $(window).height() - 100) {
        img.height = $(window).height() - ($(window).height()*0.1);
    }
}
}

function makeZoomItElements() {
    $("html").append("<div id=\"zoomit\"\>");

}

function addDownload(img) {
    $("#zoomit").append("<div id=\"download\">");
    $("#download").append("<a href= \"" + img.src + "\">Raw URL</a>");
}

function showImage(index) {
    activeIndex = index;
    var thumbnail = $(".thumbnail").get(index);
    var img = new Image();
    img.src = $(thumbnail).attr("data-full");
    img.onload = function () {
        $('#zoomit').html(img);
        sizeFix(img);
        var center = $(document).width() / 2 - ($("#zoomit").width() / 2);
        var centerTop = $(window).height() / 2 - $("#zoomit").height() / 2;
        $("#zoomit").css("left", center);
        $("#zoomit").css("top", centerTop);
        addDownload(img);
        $("#zoomit").show();
    }
}