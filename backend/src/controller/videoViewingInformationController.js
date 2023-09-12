const database = require("../database/index");
const ethController = require("../middleware/StreamingChain/Controller/ethController");

const createInfoVideo = async (idVideo, id_content_creator, contractAddress) => {
    try {
        const response = await database("video_viewing_information").returning("id").insert({
            total_views: 0,
            retention_rate: 0,
            total_viewing_time: 0,
            contract_address: contractAddress,
            id_video_info: idVideo,
            id_content_creator: id_content_creator
        });

        if(response === undefined) throw new Error()

        return response;
    } catch (error) {
        console.log(error);
        await database('video').where("id_video", idVideo).del()
        
    }
}

module.exports = { 
    createInfoVideo,
    async searchInfoVideo(req, res, next){
        try {
            const {id} = req.params;

            const response = 
                await database("video_viewing_information")
                .select("video_viewing_information.*", "video.*")
                .innerJoin("video", "id_video_info", "video.id_video")
                .where("id_video_info", id);

            if(response === undefined || response.length === 0) 
                return res.status(404).json({error: "Informações do vídeo não encontrado"});
            
            res.status(200).json({data: response[0]});
        } catch (error) {
            console.log(error);

            next(error);
        }
    },
    async updateInfoVideo(req, res, next){
        try {
            const {id} = req.params;

            const response = 
                await database("video_viewing_information")
                .where("id_video_info", id)
                .select(
                    "video_viewing_information.total_views",
                    "video_viewing_information.retention_rate",
                    "video_viewing_information.total_viewing_time",
                    "video_viewing_information.contract_address"
                ).first();
            
            if (response === undefined) {
                return res.status(400).json({ error: 'vídeo não encontrado' });
            }

            console.log(response)

            let newTotalViews = response.total_views + 1;
            let newRetentionRate = Math.trunc(((parseInt(response.retention_rate) + parseInt(req.body.assistedTime)) / parseInt(newTotalViews)));
            let newTotalViewingTime = parseInt(response.total_viewing_time) + parseInt(req.body.assistedTime);

            await database("video_viewing_information").where("id_video_info", id).update({
                total_views: newTotalViews,
                retention_rate: `${newRetentionRate}`,
                total_viewing_time: `${newTotalViewingTime}`,
            });

            console.log(response.contract_address)

            return res.status(200).json({message: "Data updated successfully"});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async searchInfoContract(req, res, next){
        try {
            const {contractAddress} = req.params;
          
            if(!contractAddress) return res.status(400).json({error: "query not found"});
            
            const data = await ethController.getInfoVideo(contractAddress);

            if(data === undefined){
                return res.status(400).json({error: "error get information"})
            }

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}