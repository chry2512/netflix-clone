/*
 Created by: Christian Niro
 Note. this is an adapter controller for github pages.
 */

class VideoPlayer {
	constructor() {
		this.index = 0;
		this.isEventTriggered = false;
		this.nav = document.querySelector("nav");
		this.playerElement = document.getElementById("player");
		this.playerElement.classList.remove("top");
		this.cssFiles = [
			"./styles/nav.css",
			"./styles/top.css",
			"./styles/content-row.css",
			"./styles/player.css"
		];
		this.videos = {
			locandina1: { videoId: "6RDSjDQGUqo", nextVideoId: "umZdaN37Nsc" },
			locandina2: { videoId: "umZdaN37Nsc", nextVideoId: "WEn9Ss7HAzc" },
			locandina3: { videoId: "WEn9Ss7HAzc", nextVideoId: "e6EhrUz3MRo" },
			locandina4: { videoId: "e6EhrUz3MRo", nextVideoId: "-f7rTlSyFvA" },
			locandina5: { videoId: "-f7rTlSyFvA", nextVideoId: "xibVBYLTtW0" },
			locandina6: { videoId: "xibVBYLTtW0", nextVideoId: "6RDSjDQGUqo" }
		};
	}

	preloadCSS(file) {
		const link = document.createElement("link");
		link.rel = "preload";
		link.href = file;
		link.as = "style";
		document.head.appendChild(link);
	}

	addCSS(filename) {
		return new Promise((resolve, reject) => {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
			fileref.onload = resolve;
			fileref.onerror = reject;
			document.getElementsByTagName("head")[0].appendChild(fileref);
		});
	}

	removeCSS(filename) {
		return new Promise((resolve, reject) => {
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
			resolve();
		});
	}

	updateView() {
		return new Promise((resolve, reject) => {
			if (this.isEventTriggered) {
				document.querySelector("#home").classList.add("hidden");
				document.querySelector("#redirect").classList.remove("hidden");
			} else {
				document.querySelector("#home").classList.remove("hidden");
				document.querySelector("#redirect").classList.add("hidden");
			}
			resolve();
		});
	}

	createPlayListPlayer(index) {
		return new YT.Player("player", {
			height: "390",
			width: "640",
			playerVars: {
				listType: "playlist",
				autoplay: 1,
				list: "PLada4GCFXoyTy5mkRElLK3bTfvUgMMrMz"
			},
			events: {
				onReady: function (event) {
					// Play the third video in the playlist
					event.target.playVideoAt(index);
				}
			}
		});
	}

	createPlayer(videoId, nextVideoId) {
		return new YT.Player("player", {
			height: "390",
			width: "640",
			videoId: videoId,
			playerVars: {
				autoplay: 1
			},
			events: {
				onStateChange: (e) => {
					if (e.data === 0 && nextVideoId) {
						e.target.loadVideoById(nextVideoId);
					}
				}
			}
		});
	}

	init() {
		this.cssFiles.forEach((file) => this.preloadCSS(file));

		window.addEventListener("scroll", () => {
			if (window.scrollY > 5) {
				this.nav.classList.add("nav-dark");
			} else {
				this.nav.classList.remove("nav-dark");
			}
		});

		document
			.getElementById("playButton")
			.addEventListener("click", async () => {
				this.isEventTriggered = true;
				this.playerElement.classList.add("top");

				await this.addCSS("./styles/player.css");
				await Promise.all([
					this.removeCSS("./styles/nav.css"),
					this.removeCSS("./styles/top.css"),
					this.removeCSS("./styles/content-row.css")
				]);

				await this.updateView();
				this.createPlayListPlayer();
			});

		for (let i = 1; i <= 6; i++) {
			document
				.getElementById(`locandina${i}`)
				.addEventListener("click", async () => {
					const videoInfo = this.videos[`locandina${i}`];
					this.isEventTriggered = true;
					this.playerElement.classList.add("top");

					await this.addCSS("./styles/player.css");
					await Promise.all([
						this.removeCSS("./styles/nav.css"),
						this.removeCSS("./styles/content-row.css")
					]);

					await this.updateView();

					//use this for custom player
					//this.createPlayer(videoInfo.videoId, videoInfo.nextVideoId);

					//use type playlist for default player with custoim index
				    this.index = i - 1;
					this.createPlayListPlayer(this.index);
					window.scrollTo(0, 0);
				});
		}

		document.querySelectorAll(".nav-item").forEach((item) => {
			item.addEventListener("click", async () => {
				this.isEventTriggered = false;
				const iframe = document.querySelector("iframe");
				if (iframe) {
					const player = YT.get(iframe.id);
					if (player) {
						player.stopVideo();
						player.destroy();
					}
				}
				// Add a delay before applying new CSS
				await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust the delay as needed
				await this.addCSS("./styles/nav.css");
				await Promise.all([
					this.addCSS("./styles/nav.css"),
					this.addCSS("./styles/top.css"),
					this.addCSS("./styles/content-row.css"),
					this.removeCSS("./styles/player.css")
				]);

				await this.updateView();
				console.log("returning to index");
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const videoPlayer = new VideoPlayer();
	videoPlayer.init();
});
