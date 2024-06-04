/*
 Created by: Christian Niro
 Note. this is a original controller for player page in original version of the website
 */
document.addEventListener("DOMContentLoaded", function () {
	const videos = {
		locandina1: { videoId: "6RDSjDQGUqo", nextVideoId: "umZdaN37Nsc" },
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
