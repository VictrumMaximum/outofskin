import VideoColumnSchema from "../../../../schemas/VideoColumnSchema";

export const setVideos = (left: VideoColumnSchema, right: VideoColumnSchema) => {
	return {
		type: "SET_VIDEOS",
		left,
		right
	};
};
