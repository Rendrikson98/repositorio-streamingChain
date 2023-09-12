const database = require("../database/index");
const crypto = require('crypto');
const { createInfoVideo } = require("./videoViewingInformationController");
const ethController = require("../middleware/StreamingChain/Controller/ethController");

module.exports = {
    async searchVideo(req, res, next){
        try {
            const {id} = req.params;
            
            const response = await database('video').select('*').where("id_video",id);

            if(response === undefined || response.length === 0) 
                return res.status(404).json({error: "Vídeo não encontrado"});
           
            return res.status(200).json({data: response[0]});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async searchVideosContentCreator(req, res, next){
        try {
            const {id} = req.params;

            const response = await database('video').select('*').where("id_content_creator_video",id);

            if(response === undefined || response.length === 0) 
                return res.status(404).json({error: "Vídeo não encontrado"});
           
            return res.status(200).json({response: response});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async rotaDeTeste(req, res, next){
        try {
            const {contentCreatorAddress, cpmValue} = req.body;

            //const data = await ethController.createVideo(contentCreatorAddress, cpmValue);
            //const data = await ethController.updateInfo("0x5644e432c7d6a8640e99833658f10b38ebc9ac46", 80);
            //const data = await ethController.getInfoVideo("0x5644e432c7d6a8640e99833658f10b38ebc9ac46");
            const data = await ethController.balanceOf("0x69607693be8D3fA0e053C0207C105D523a6bB468");
            // console.log("------- ROTA DE TESTE --------");
            // console.log(data);

            // if(data === undefined){
            //     return res.status(400).json({error: "error storing the information"})
            // }

            // return res.json(data);
            return res.json(data)
        } catch (error) {
            console.log(error);
            next();
        }
    },
    async createVideo(req, res, next){
        try {
            const {name, description, file_address, id_content_creator_video} = req.body;

            const fileNameHash = `${crypto.randomBytes(8).toString('HEX')}-${new Date().getTime()}-${file_address}`

            const response = await database("video").returning(["id_video", "id_content_creator_video"]).insert({
                name,
                description,
                file_address: fileNameHash,
                id_content_creator_video,
                created_at: new Date()
            });

            if(response[0] === undefined) return res.status(500).json({error: "erro com o servidor"});

            const walletAddressContentCreatorVideo = await database("content_creator").select("wallet_address").where("id",response[0].id_content_creator_video );
            
            if(walletAddressContentCreatorVideo[0] === undefined) return res.status(500).json({error: "erro com o servidor"});
            
            
            const contractData = await ethController.createVideo(walletAddressContentCreatorVideo[0].wallet_address, 1, response[0].id_video);

            const responseInfoVideo = await createInfoVideo(response[0].id_video, response[0].id_content_creator_video, contractData._address);
            
            return res.status(200).json({
                message: "Vídeo postado com sucesso",
                id: response[0].id_video,
                idInfo: responseInfoVideo[0].id
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: error.message,
            });
          
        }
    },
    async updateVideo(req, res, next){
        try {
            const {id} = req.params;

            const response =
                await database("video")
                .where("id_video", id)
                .select("video.name", "video.description")
                .first();
            
            if(response === undefined){
                return res.status(400).json({error: "vídeo não encontrado"})
            }

            await database("video").where("id_video", id).update({
                name: req.body.name,
                description: req.body.description
            });

            return res.status(200).json({message: "data updated success"});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};

