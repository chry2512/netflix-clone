/**
 * @file navOriginal.js
 * @description This script is a deprecated original controller for the index page of the original version of the website.
 * It handles the navigation bar's appearance on scroll and sets up event listeners for play buttons.
 * 
 * @author Christian Niro
 */

document.addEventListener("DOMContentLoaded", function () {
	const nav = document.querySelector("nav");
	/**
	 * Handles the scroll event to toggle the "nav-dark" class on the navigation bar.
	 * @event window#scroll
	 */
	window.addEventListener("scroll", () => {
		// Code to toggle "nav-dark" class
		if (window.scrollY > 5) {
			nav.classList.add("nav-dark");
		} else {
			nav.classList.remove("nav-dark");
		}
	});

	/**
	 * Handles the click event on the play button to set a localStorage item and redirect to the player page.
	 * @event playButton#click
	 */
	document.getElementById("playButton").addEventListener("click", function () {
		// Code to handle play button click
		window.localStorage.setItem("playEventTriggered", "playlist");
		window.location.href = "./page/player.html";
	});

	/**
	 * Handles the click event on locandina elements to set a localStorage item and redirect to the player page.
	 * @event locandina#click
	 */
	for (let i = 1; i <= 6; i++) {
		document
			.getElementById(`locandina${i}`)
			.addEventListener("click", function () {
				// Code to handle locandina click
				window.localStorage.setItem("playEventTriggered", `locandina${i}`);
				window.location.href = "./page/player.html";
			});
	}
});
