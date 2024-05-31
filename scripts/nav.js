document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 5) {
            nav.classList.add("nav-dark");
        } else {
            nav.classList.remove("nav-dark");
        }
    });

    document.getElementById("playButton").addEventListener("click", function () {
        //window.localStorage.setItem("playEventTriggered", "playlist");
        window.location.href = "./page/player.html";
    });

    /*for (let i = 1; i <= 6; i++) {
        document.getElementById(`locandina${i}`).addEventListener("click", function () {
            window.localStorage.setItem("playEventTriggered", `locandina${i}`);
            window.location.href = "./page/player.html";
        });
    }*/
});
