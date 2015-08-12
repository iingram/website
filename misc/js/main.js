var mobileMenuShown = false;
var widthmode = true;

window.onload = function() {
    var front_img = document.getElementById("front-img")
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (front_img) {
        if (front_img.clientHeight > (h-77)) {
            front_img.style.height = "100%";
            front_img.style.width = "auto";
        } else {
            front_img.style.height = "auto";
            front_img.style.width = "100%";
        }
    }
}

window.addEventListener("resize", function() {
    var menu = document.getElementById("mobile-menu")
    var btn = document.getElementById("mobile-nav")
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var front_img = document.getElementById("front-img")
    if (w >= 600) {
        menu.style.display = "none"
        btn.style.color = "#000"
    } else {
        if (menu.style.display = "none") {
            btn.style.color = "#000"
        }
    }
    if (front_img) {
        var front_img_ctr_h = document.getElementById("front-image").clientHeight
        if (widthmode) {
            if (front_img.clientHeight > front_img_ctr_h) {
                front_img.style.height = "100%";
                front_img.style.width = "auto";
                widthmode = false;
            } else {
                front_img.style.height = "auto";
                front_img.style.width = "100%";
                widthmode = true;
            }
        } else {
            if (front_img.clientWidth < w) {
                front_img.style.height = "100%";
                front_img.style.width = "auto";
                widthmode = false;
            } else {
                front_img.style.height = "auto";
                front_img.style.width = "100%";
                widthmode = true;
            }
        }
    }
});

document.getElementById("close-bg").addEventListener("click", function() {
    toggleMobileNav();
});

function toggleMobileNav() {
    var menu = document.getElementById("mobile-menu")
    var btn = document.getElementById("mobile-nav")
    var content = document.getElementById("content")
    if (mobileMenuShown==false) {
        menu.style.display = "block";
        btn.style.color = "#aaa";
        mobileMenuShown = true;
    } else {
        menu.style.display = "none";
        btn.style.color = "#000";
        mobileMenuShown = false;
  }
}