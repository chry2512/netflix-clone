/*
 Created by: Christian Niro
 Note. this is an adapter controller for github pages.
 */
document.addEventListener("DOMContentLoaded", function () {
	let isEventTriggered = false;
	const nav = document.querySelector("nav");

	const videos = {
		locandina1: { videoId: "6RDSjDQGUqo", nextVideoId: "umZdaN37Nsc" },
		locandina2: { videoId: "umZdaN37Nsc", nextVideoId: "WEn9Ss7HAzc" },
		locandina3: { videoId: "WEn9Ss7HAzc", nextVideoId: "e6EhrUz3MRo" },
		locandina4: { videoId: "e6EhrUz3MRo", nextVideoId: "-f7rTlSyFvA" },
		locandina5: { videoId: "-f7rTlSyFvA", nextVideoId: "xibVBYLTtW0" },
		locandina6: { videoId: "xibVBYLTtW0", nextVideoId: "6RDSjDQGUqo" },
	};

	window.addEventListener("scroll", () => {
		if (window.scrollY > 5) {
			nav.classList.add("nav-dark");
		} else {
			nav.classList.remove("nav-dark");
		}
	});

	document.getElementById("playButton").addEventListener("click", function () {
		isEventTriggered = true;
		// Rimuovi i file CSS che non vuoi
		removeCSS("./styles/nav.css");
		removeCSS("./styles/top.css");
		removeCSS("./styles/content-row.css");

		// Aggiungi i file CSS che vuoi
		addCSS("./styles/player.css");
		updateView();

		createPlayListPlayer();
	});

	for (let i = 1; i <= 6; i++) {
		document
			.getElementById(`locandina${i}`)
			.addEventListener("click", function () {
				const videoInfo = videos[`locandina${i}`];
				isEventTriggered = true;
	
				// Rimuovi i file CSS che non vuoi
				removeCSS("./styles/nav.css");
				removeCSS("./styles/top.css");
				removeCSS("./styles/content-row.css");
	
				// Aggiungi i file CSS che vuoi
				addCSS("./styles/player.css");
				updateView();
				createPlayer(videoInfo.videoId, videoInfo.nextVideoId);
				window.scrollTo(0, 0);
			});
	}
	//dynamic css

	// Funzione per rimuovere un file CSS
	function removeCSS(filename) {
		var targetelement = "link";
		var targetattr = "href";
		var allsuspects = document.getElementsByTagName(targetelement);
		for (var i = allsuspects.length; i >= 0; i--) {
			if (
				allsuspects[i] &&
				allsuspects[i].getAttribute(targetattr) != null &&
				allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
			)
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
		}
	}

	// Funzione per aggiungere un file CSS
	function addCSS(filename) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}

	//update view for redirect
	function updateView() {
		if (isEventTriggered) {
			// Nascondi l'elemento home e mostra l'elemento redirect
			document.querySelector("#home").classList.add("hidden");
			document.querySelector("#redirect").classList.remove("hidden");
		} else {
			// Mostra l'elemento home e nascondi l'elemento redirect
			document.querySelector("#home").classList.remove("hidden");
			document.querySelector("#redirect").classList.add("hidden");
		}
	}

	// create player
	function createPlayListPlayer() {
		new YT.Player("player", {
			height: "390",
			width: "640",
			playerVars: {
				listType: "playlist",
				autoplay: 1,
				list: "PLada4GCFXoyTy5mkRElLK3bTfvUgMMrMz",
			},
		});
	}

	function createPlayer(videoId, nextVideoId) {
		return new YT.Player("player", {
			height: "390",
			width: "640",
			videoId: videoId,
			playerVars: {
				autoplay: 1, // auto play immediately
			},
			events: {
				//onReady: (e) => e.target.playVideo(), // play video when ready
				onStateChange: (e) => {
					if (e.data === 0 && nextVideoId) {
						e.target.loadVideoById(nextVideoId);
					}
				},
			},
		});
	}

	//return to home
	document.querySelectorAll(".nav-item").forEach((item) => {
		item.addEventListener("click", function () {
			isEventTriggered = false;
			// aggiungi i file CSS che non vuoi
			addCSS("./styles/nav.css");
			addCSS("./styles/top.css");
			addCSS("./styles/content-row.css");

			// rimuovi i file CSS che vuoi
			removeCSS("./styles/player.css");
			updateView();
			// Ferma il video
			const iframe = document.querySelector('iframe');
			if (iframe) {
				const player = YT.get(iframe.id);
				if (player) {
					player.stopVideo();
				}
			}
			console.log("returning to index");
		});
	});
});
