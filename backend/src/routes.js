const express = require('express');

const routes = express.Router();
const Content_creator = require("./controller/contentCreatorController");
const Platform = require("./controller/plataformCreatorController");
const Video = require("./controller/videoController");
const InfoVideo = require("./controller/videoViewingInformationController");

const streamingChain = require("./middleware/StreamingChain/streamingChain");

// routes.get('/', collectorInformation, (req, res, next)=>{
//     return res.json({
//         message: 'ok'
//     })
// });

//content_creator
routes.get("/searchAllContentCreators", Content_creator.index );
routes.get("/searchAllContentCreator/:id", Content_creator.searchCreatorContent );
routes.post("/createContentCreator", Content_creator.create);
routes.post("/login", Content_creator.login);

//platform
routes.get("/searchPlatform", Platform.index);
routes.post("/createPlatform", Platform.create);
routes.post("/loginPlatform", Platform.login);

//video
routes.post("/videoPublication", Video.createVideo);
routes.get("/searchVideo/:id", Video.searchVideo);
routes.get("/searchVideosContentCreator/:id", Video.searchVideosContentCreator);
routes.patch("/updateVideo/:id", Video.updateVideo);

routes.post("/rotaDeTeste", Video.rotaDeTeste);
routes.get("/rotaDeTeste", streamingChain,  Video.rotaDeTeste);
routes.get("/rotaDeTeste/:id", streamingChain,  Video.rotaDeTeste);

//video_viewing_information
routes.get("/searchInfoVideo/:id", streamingChain, InfoVideo.searchInfoVideo);
routes.get("/searchInfoContract/:contractAddress",streamingChain, InfoVideo.searchInfoContract);
routes.patch("/updateInfoVideo/:id", streamingChain, InfoVideo.updateInfoVideo);


routes.get("/viewAccountsTransfer/:contractAddress", streamingChain, (req, res) => { res.status(200).json('ok')});
routes.post("/addTransfer/:contractAddress", streamingChain, (req, res) => { res.status(200).json('ok')});
routes.delete("/removeTransfer/:contractAddress", streamingChain, (req, res) => { res.status(200).json('ok')});


module.exports = routes;