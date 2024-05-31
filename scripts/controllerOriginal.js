/*
 Created by: Christian Niro
 Note. this is a original controller for player page in original version of the website
 */
document.addEventListener("DOMContentLoaded", function () {
	const videos = {
		locandina1: { videoId: "6RDSjDQGUqo", nextVideoId: "umZdaN37Nsc" },
		locandina2: { videoId: "umZdaN37Nsc", nextVideoId: "WEn9Ss7HAzc" },
		locandina3: { videoId: "WEn9Ss7HAzc", nextVideoId: "e6EhrUz3MRo" },
		locandina4: { videoId: "e6EhrUz3MRo", nextVideoId: "-f7rTlSyFvA" },
		locandina5: { videoId: "-f7rTlSyFvA", nextVideoId: "xibVBYLTtW0" },
		locandina6: { videoId: "xibVBYLTtW0", nextVideoId: "6RDSjDQGUqo" }
	};

	document.querySelectorAll(".nav-item").forEach((item) => {
		item.addEventListener("click", function () {
			window.location.href = "../index.html";
			console.log("returning to index");
		});
	});

	function createPlayListPlayer() {
		new YT.Player("player", {
			height: "390",
			width: "640",
			playerVars: {
				listType: "playlist",
				autoplay: 1,
				list: "PLada4GCFXoyTy5mkRElLK3bTfvUgMMrMz"
			}
		});
	}

	function createPlayer(videoId, nextVideoId) {
		return new YT.Player("player", {
			height: "390",
			width: "640",
			videoId: videoId,
			playerVars: {
				autoplay: 1 // auto play immediately
			},
			events: {
				//onReady: (e) => e.target.playVideo(), // play video when ready
				onStateChange: (e) => {
					if (e.data === 0 && nextVideoId) {
						e.target.loadVideoById(nextVideoId);
					}
				}
			}
		});
	}

	window.onload = function () {
		const playEventTriggered =
			window.localStorage.getItem("playEventTriggered");
		const videoInfo = videos[playEventTriggered];

		switch (playEventTriggered) {
			case "playlist":
				createPlayListPlayer();
				break;
			default:
				createPlayer(videoInfo.videoId, videoInfo.nextVideoId);
				break;
		}

		window.localStorage.removeItem("playEventTriggered");
	};
});
