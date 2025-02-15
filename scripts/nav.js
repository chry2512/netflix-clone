
/**
 * Created by: Christian Niro
 * Class representing a video player. it's used in the current version of the website.
 */
class VideoPlayer {
	/**
	 * Create a video player.
	 */
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

		// this is the list of videos to play for the custom player, 
		// it's not used in the current version of the website.
		
		this.videos = {
			locandina1: { videoId: "FZKlTNUwct4", nextVideoId: "umZdaN37Nsc" },
			locandina2: { videoId: "umZdaN37Nsc", nextVideoId: "xibVBYLTtW0" },
			locandina3: { videoId: "xibVBYLTtW0", nextVideoId: "-f7rTlSyFvA" },
			locandina4: { videoId: "-f7rTlSyFvA", nextVideoId: "PBo5EWnHGWc" },
			locandina5: { videoId: "PBo5EWnHGWc", nextVideoId: "WEn9Ss7HAzc" },
			locandina6: { videoId: "WEn9Ss7HAzc", nextVideoId: "Kb8fxNGSRmo" },
			locandina7: { videoId: "Kb8fxNGSRmo", nextVideoId: "xibVBYLTtW0" },
			locandina8: { videoId: "xibVBYLTtW0", nextVideoId: "Olr22VyI3LE" },
			locandina9: { videoId: "Olr22VyI3LE", nextVideoId: "e6EhrUz3MRo" },
			locandina10: { videoId: "e6EhrUz3MRo", nextVideoId: "6RDSjDQGUqo" }
		};
	}

	/**
	 * Preload a CSS file.
	 * @param {string} file - The path to the CSS file.
	 */
	preloadCSS(file) {
		const link = document.createElement("link");
		link.rel = "preload";
		link.href = file;
		link.as = "style";
		document.head.appendChild(link);
	}

	/**
	 * Add a CSS file to the document.
	 * @param {string} filename - The path to the CSS file.
	 * @returns {Promise} A promise that resolves when the CSS file is loaded.
	 */
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

	/**
	 * Remove a CSS file from the document.
	 * @param {string} filename - The path to the CSS file.
	 * @returns {Promise} A promise that resolves when the CSS file is removed.
	 */
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

	/**
	 * Update the view based on the event trigger state.
	 * @returns {Promise} A promise that resolves when the view is updated.
	 */
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

	/**
	 * Create a YouTube playlist player.
	 * @param {number} index - The index of the video to play.
	 * @returns {YT.Player} The YouTube player instance.
	 */
	createPlayListPlayer(index) {
		return new YT.Player("player", {
			height: "390",
			width: "640",
			playerVars: {
				listType: "playlist",
				autoplay: 1,
				list: "PLada4GCFXoyQzGRaWRezpqRiEFOK95gzz"
			},
			events: {
				onReady: function (event) {
					// Play the third video in the playlist
					event.target.playVideoAt(index);
				}
			}
		});
	}

	/**
	 * Initialize the video player.
	 */
	init() {
		this.cssFiles.forEach((file) => this.preloadCSS(file));

		window.addEventListener("scroll", () => {
			if (window.scrollY > 5) {
				this.nav.classList.add("nav-dark");
			} else {
				this.nav.classList.remove("nav-dark");
			}
		});

		for (let i = 1; i <= 10; i++) {
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

		/**
		 * Handle player click event.
		 * @param {boolean} [scrollToTop=false] - Whether to scroll to the top of the page.
		 */
		async function handlePlayerClick(scrollToTop = false) {
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
		
			if (scrollToTop) {
				window.scrollTo(0, 0);
			}
		}

		document.getElementById("playButton").addEventListener("click", handlePlayerClick.bind(this));
		document.getElementById("run-all").addEventListener("click", handlePlayerClick.bind(this));
		document.getElementById("run-all-1").addEventListener("click", handlePlayerClick.bind(this));
		
		/**
		 * Handle navigation click event.
		 */
		async function handleNavigationClick() {
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
		}
		
		document.querySelectorAll(".nav-item").forEach((item) => {
			item.addEventListener("click", handleNavigationClick.bind(this));
		});
		
		document.getElementById("backhome").addEventListener("click", handleNavigationClick.bind(this));
		
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const videoPlayer = new VideoPlayer();
	videoPlayer.init();
});